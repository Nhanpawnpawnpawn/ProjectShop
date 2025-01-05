const path = require("path");
const fs = require("fs");
const Product = require("../models/productModel");

// Controller: Thêm sản phẩm
const addProduct = async (req, res) => {
  try {
    const { productName, productDescription, productPrice, shopName, stars } =
      req.body;
    const singleImage = req.files.singleImage[0].path;
    const multiImages = req.files.multiImages.map((file) => file.path);

    const newProduct = new Product({
      productName,
      productDescription,
      productPrice,
      shopName,
      stars,
      singleImage,
      multiImages,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Thêm sản phẩm thành công!", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller: Lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Lấy tất cả sản phẩm
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller: Lấy sản phẩm theo thời gian mới nhất
const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 40, sort = "-createdAt", q = "" } = req.query;

    const searchQuery = q
      ? { productName: { $regex: q, $options: "i" } } // Tìm kiếm không phân biệt chữ hoa/thường
      : {};

    const products = await Product.find(searchQuery)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalProducts = await Product.countDocuments(searchQuery);

    res.status(200).json({
      data: products,
      currentPage: Number(page),
      totalPages: Math.ceil(totalProducts / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Controller: Lấy sản phẩm theo ID
const getProductById = async (req, res) => {
  const { id } = req.params; // Lấy ID từ URL
  try {
    const product = await Product.findById(id); // Tìm sản phẩm theo ID
    if (!product) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller: Lấy sản phẩm theo Tên Shop
const getProductByShopName = async (req, res) => {
  const { shopName } = req.params; // Lấy shopName từ URL
  const { page = 1, limit = 20 } = req.query; // Lấy số trang và giới hạn từ query

  try {
    if (!shopName) {
      return res.status(400).json({ error: "Thiếu tên cửa hàng" });
    }

    // Sắp xếp theo thời gian mới nhất và phân trang
    const products = await Product.find({ shopName })
      .sort({ createdAt: -1 }) // Sắp xếp giảm dần theo thời gian
      .skip((page - 1) * limit) // Bỏ qua sản phẩm của trang trước
      .limit(Number(limit)); // Giới hạn số lượng sản phẩm

    const totalProducts = await Product.countDocuments({ shopName }); // Tổng số sản phẩm cùng shopName

    if (!products || products.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm nào" });
    }

    res.status(200).json({
      data: products, // Danh sách sản phẩm
      currentPage: Number(page), // Trang hiện tại
      totalPages: Math.ceil(totalProducts / limit), // Tổng số trang
      hasMore: page < Math.ceil(totalProducts / limit), // Có thêm sản phẩm để load không
    });
  } catch (err) {
    console.error("Lỗi khi tải dữ liệu sản phẩm:", err);
    res.status(500).json({ error: "Lỗi khi tải dữ liệu sản phẩm" });
  }
};

// Controller: Thêm đánh giá vào sản phẩm
const createComment = async (req, res) => {
  const { id } = req.params;
  const { user, text } = req.body;

  if (!text || !user) {
    return res.status(400).json({ error: "Cần có thông tin 'user' và 'text'" });
  }

  try {
    // Tìm sản phẩm và thêm đánh giá
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Sản phẩm không tồn tại" });
    }

    const newComment = { user, text };
    product.comments.push(newComment); // Thêm đánh giá mới vào danh sách
    await product.save(); // Lưu vào cơ sở dữ liệu

    res.status(200).json({ message: "Đánh giá được thêm thành công", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi server" });
  }
};

// Xoá Sản Phẩm Theo Id
const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
    }

    // Xóa ảnh đơn
    if (product.singleImage) {
      const singleImagePath = path.join(__dirname, "../", product.singleImage);
      if (fs.existsSync(singleImagePath)) {
        fs.unlinkSync(singleImagePath);
      } else {
        console.warn("Single image file does not exist:", singleImagePath);
      }
    }

    // Xóa các ảnh trong danh sách multiImages
    if (product.multiImages && Array.isArray(product.multiImages)) {
      for (const imagePath of product.multiImages) {
        const fullImagePath = path.join(__dirname, "../", imagePath);
        if (fs.existsSync(fullImagePath)) {
          fs.unlinkSync(fullImagePath);
          console.log("Deleted image:", fullImagePath);
        } else {
          console.warn("Image file does not exist:", fullImagePath);
        }
      }
    }

    res
      .status(200)
      .json({ message: "Xóa sản phẩm và các file liên quan thành công!" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Xóa sản phẩm thất bại!", error });
  }
};

// Sửa Sản Phẩm
const updateProduct = async (req, res) => {
  const { productName, productDescription, productPrice, stars } = req.body;

  try {
    // Tìm sản phẩm
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Sản phẩm không tồn tại.");

    // Cập nhật thông tin cơ bản
    product.productName = productName || product.productName;
    product.productDescription =
      productDescription || product.productDescription;
    product.productPrice = productPrice || product.productPrice;
    product.stars = stars || product.stars;

    // Xử lý cập nhật hình ảnh đơn
    if (req.files.singleImage && req.files.singleImage.length > 0) {
      if (product.singleImage && fs.existsSync(product.singleImage)) {
        fs.unlinkSync(path.join(__dirname, "../", product.singleImage)); // Xóa hình ảnh cũ
      }
      product.singleImage = req.files.singleImage[0].path; // Gán hình ảnh mới
    }

    // Xử lý cập nhật hình ảnh đa
    if (req.files.multiImages && req.files.multiImages.length > 0) {
      // Xóa các hình ảnh cũ nếu có
      if (product.multiImages && product.multiImages.length > 0) {
        product.multiImages.forEach((imagePath) => {
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(path.join(__dirname, "../", imagePath));
          }
        });
      }
      // Gán hình ảnh mới
      product.multiImages = req.files.multiImages.map((file) => file.path);
    }

    // Lưu sản phẩm
    await product.save();

    res.json({ success: true, product });
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    res
      .status(500)
      .json({ success: false, message: "Cập nhật sản phẩm thất bại." });
  }
};

module.exports = {
  getProductByShopName,
  addProduct,
  getAllProducts,
  getProducts,
  getProductById,
  createComment,
  deleteProduct,
  updateProduct,
};
