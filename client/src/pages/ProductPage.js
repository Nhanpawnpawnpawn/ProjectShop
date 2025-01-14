import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../context/UserContext";
import { FaShoppingCart, FaMoneyBillWave, FaStore } from "react-icons/fa";
import Cart from "../components/Cart";

const ProductPage = ({ product }) => {
  // Lấy id sản phẩm từ URL
  const { id } = useParams();

  // Sử dụng context để quản lý giỏ hàng
  const { addToCart } = useContext(UserContext);

  // Khởi tạo state cho các thuộc tính sản phẩm
  const [price, setPrice] = useState(
    product.attributes[0]?.price || product.productPrice
  );
  const [selectedType, setSelectedType] = useState(
    product.attributes[0]?.name || ""
  );
  const [currentImage, setCurrentImage] = useState(
    product.attributes[0]?.image || product.multiImages[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");

  // Lấy thông tin người dùng từ localStorage
  const UserData = JSON.parse(localStorage.getItem("user"));
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Thêm sản phẩm vào giỏ hàng
  const handleAddToCart = () => {
    addToCart({
      productId: id,
      productName: product.productName,
      quantity: quantity,
      productPrice: price,
      image: currentImage,
    });
    toast.success(
      <span>
        Đã thêm {quantity} <b>({product.productName})</b> vào giỏ hàng!
      </span>
    );
  };

  // State cho form nhập địa chỉ giao hàng
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState(
    `${UserData.address.specificAddress}, ${UserData.address.ward}, ${UserData.address.district}, ${UserData.address.city}`
  );
  const [phone, setPhone] = useState(UserData.phone);

  // Tính toán tổng giá
  const calculatedPrice = price * quantity;

  // Xử lý khi người dùng nhấn "Mua ngay"
  const handleBuyNow = async () => {
    if (!UserData) {
      toast.error("Vui lòng đăng nhập để mua hàng!");
      return;
    }

    if (UserData.accountType === "shop" || UserData.accountType === "shipper") {
      toast.error("Shop và Shipper không thể đặt hàng!");
      return;
    }

    if (!address) {
      toast.error("Vui lòng nhập địa chỉ giao hàng!");
      return;
    }

    const orderData = {
      productName: product.productName,
      customerName: UserData?.displayName,
      shopName: product.shopName,
      totalAmount: calculatedPrice,
      address: address,
      phone: phone,
      status: "Đặt Hàng",
      shipper: "Chưa Có",
      addressshop: "Chưa có",
      phoneshop: "Chưa có",
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        toast.success("Đặt hàng thành công!");
        setShowAddressForm(false);
      } else {
        throw new Error("Đặt hàng thất bại!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi đặt hàng!");
    }
  };

  // Hiển thị form nhập địa chỉ
  const handleShowAddressForm = () => {
    setShowAddressForm(true);
    setAddress(
      UserData.address.specificAddress +
        "," +
        UserData.address.ward +
        "," +
        UserData.address.district +
        "," +
        UserData.address.city
    );
    setPhone(UserData.phone);
  };

  // Thay đổi loại sản phẩm
  const handleTypeChange = (name, index) => {
    setPrice(product.attributes[index].price);
    setSelectedType(name);
    setCurrentImage(product.multiImages[index]);
  };

  // Thay đổi kích thước sản phẩm
  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  // Thay đổi số lượng sản phẩm
  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 1);
    setQuantity(value);
  };

  // Kiểm tra giỏ hàng để cập nhật số lượng
  useEffect(() => {
    const existingProductIndex = cart.findIndex(
      (item) => item.productId === id
    );
    if (existingProductIndex >= 0) {
      setQuantity(cart[existingProductIndex].quantity);
    }
  }, [id]);

  // Lấy thông tin shop từ API
  const [shopInfo, setShopInfo] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:5000/api/shop/${product.shopName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi tải thông tin shop");
        }
        return response.json();
      })
      .then((data) => {
        setShopInfo(data[0]); // Lấy thông tin shop từ mảng
      })
      .catch((error) => {
        console.error("Error fetching shop data:", error);
      });
  }, [product.shopName]);

  return (
    <div className="container mx-auto px-4 py-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Hình ảnh và thông tin sản phẩm */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative w-full mb-6 rounded-lg shadow-md">
          <img
            src={`http://localhost:3000/${currentImage}`}
            alt={selectedType}
            className="w-full object-cover max-h-[628px] rounded"
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.productName}
          </h1>
          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`fa fa-star ${
                  index < product.stars ? "text-yellow-500" : "text-gray-300"
                }`}
              ></span>
            ))}
          </div>
          <h3 className="text-2xl text-blue-600 font-bold mb-4">
            {calculatedPrice.toLocaleString()} VND
          </h3>

          {/* Lựa chọn loại */}
          {product.attributes && product.attributes.length > 0 && (
            <div className="mb-4">
              <span className="text-gray-700 mr-2">{product.type} : </span>
              {product.attributes.map((attr, index) => (
                <button
                  key={index}
                  onClick={() => handleTypeChange(attr.name, index)}
                  className={`py-1 px-3 rounded border mr-2 mt-1 ${
                    selectedType === attr.name
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700"
                  } hover:bg-blue-400 hover:text-white transition`}
                >
                  {attr.name}
                </button>
              ))}
            </div>
          )}

          {/* Lựa chọn kích thước */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-4">
              <span className="text-gray-700 mr-2">Kích thước:</span>
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => handleSizeChange(size)}
                  className={`py-1 px-3 rounded border mr-2 mt-1 ${
                    selectedSize === size
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700"
                  } hover:bg-blue-400 hover:text-white transition`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          {/* Số Lượng */}
          <div className="flex items-center mb-4">
            <span className="text-gray-700 mr-2">Số lượng :</span>
            <input
              type="number"
              className="border text-center border-gray-300 rounded px-2 py-1 w-20"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              onClick={handleAddToCart}
            >
              <FaShoppingCart className="inline-block" /> Thêm vào giỏ hàng
            </button>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
              onClick={handleShowAddressForm}
            >
              <FaMoneyBillWave className="inline-block" /> Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Form nhập địa chỉ */}
      {showAddressForm && (
        <div className="bg-white p-6 mt-6 rounded-lg shadow-md border">
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 mb-2">
              Nhập địa chỉ giao hàng:
            </label>
            <input
              type="text"
              id="address"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 mb-2">
              Nhập số điện thoại:
            </label>
            <input
              type="text"
              id="phone"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
              onClick={() => handleBuyNow()}
            >
              Xác nhận mua hàng
            </button>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
              onClick={() => setShowAddressForm(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {/* Thông tin shop */}
      <div className="bg-white p-6 mt-6 rounded-lg shadow-lg border">
        <div className="flex items-center gap-6 mb-6">
          <img
            src={`http://localhost:3000/${shopInfo?.avatar}`}
            alt={product.shopName}
            className="w-28 h-28 rounded-full shadow-md border"
          />
          <div>
            <h4 className="text-2xl font-bold text-gray-800 mb-2">
              {product.shopName}
            </h4>
            <Link to={`/shop/${product.shopName}`}>
              <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">
                <FaStore className="text-lg" />
                <span className="text-lg font-medium">Xem Shop</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Thống kê shop */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`fa fa-star ${
                  index < 3 ? "text-yellow-500" : "text-gray-300"
                } text-lg`}
              ></span>
            ))}
            <span className="ml-2 text-gray-600 text-sm">(3 sao)</span>
          </div>

          <div>
            <span className="text-gray-700 text-base mr-2">Sản phẩm:</span>
            <span className="text-gray-900 font-bold text-lg">123</span>
          </div>
        </div>
      </div>

      {/* Mô tả và bình luận */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-bold mb-4">Mô tả sản phẩm</h3>
          <p className="text-gray-700">{product.productDescription}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-bold mb-4">Bình luận</h3>
          <p className="text-gray-700">Hiện chưa có bình luận nào.</p>
        </div>
      </div>
      <Cart />
    </div>
  );
};

export default ProductPage;
