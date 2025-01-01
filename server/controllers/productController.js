const path = require("path");
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
    const { page = 1, limit = 40, sort = "-createdAt" } = req.query;

    const products = await Product.find()
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalProducts = await Product.countDocuments();

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
    res.status(200).json({ message: "Xoá sản phẩm thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Xoá sản phẩm thất bại!" });
  }
};

// Sửa Sản Phẩm Theo Id
const updateProduct = async (req, res) => {
  const { productName, productDescription, productPrice, stars } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send("Sản phẩm không tồn tại.");

  product.productName = productName || product.productName;
  product.productDescription = productDescription || product.productDescription;
  product.productPrice = productPrice || product.productPrice;
  product.stars = stars || product.stars;

  if (req.files.singleImage && req.files.singleImage.length > 0) {
    product.singleImage = req.files.singleImage[0].path;
  }

  // Xử lý cập nhật hình ảnh đa
  if (req.files.multiImages && req.files.multiImages.length > 0) {
    product.multiImages = req.files.multiImages.map((file) => file.path);
  }

  await product.save();
  res.json({ success: true, product });
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
