import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../components/context/UserContext";

const ProductDetailPage = ({ product }) => {
  const { id } = useParams();
  const { addToCart } = useContext(UserContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const UserData = JSON.parse(localStorage.getItem("user"));
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState(
    `${UserData.address.specificAddress}, ${UserData.address.ward}, ${UserData.address.district}, ${UserData.address.city}`
  );
  const [phone, setPhone] = useState(UserData.phone);

  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.multiImages.length
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.multiImages.length) %
        product.multiImages.length
    );
  };

  const handleAddToCart = () => {
    addToCart({
      productId: id,
      productName: product.productName,
      quantity: quantity,
      productPrice: product.productPrice,
      image: product.singleImage,
    });
    toast.success(
      <span>
        Đã thêm {quantity} <b>({product.productName})</b> vào giỏ hàng!
      </span>
    );
  };

  const handleBuyNow = async () => {
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
      totalAmount: product.productPrice * quantity,
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
        setAddress("");
      } else {
        throw new Error("Đặt hàng thất bại!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi đặt hàng!");
    }
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 1);
    setQuantity(value);
  };

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

  useEffect(() => {
    const existingProductIndex = cart.findIndex(
      (item) => item.productId === id
    );
    if (existingProductIndex >= 0) {
      setQuantity(cart[existingProductIndex].quantity);
    }
  }, [id]);

  const calculatedPrice = product.productPrice * quantity;

  return (
    <div className="container mx-auto px-4 py-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="relative w-full mb-6 overflow-hidden rounded-lg shadow-md">
        <img
          src={`http://localhost:3000/${product.multiImages[currentImageIndex]}`}
          alt={`Hình ảnh ${currentImageIndex + 1}`}
          className="w-full object-cover max-h-[628px]"
        />
        <button
          onClick={handlePreviousImage}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
        >
          &#8249;
        </button>
        <button
          onClick={handleNextImage}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
        >
          &#8250;
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {product.multiImages.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === currentImageIndex ? "bg-white" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.productName}
          </h1>
          <p className="text-gray-600 text-sm mb-4">
            {product.productDescription}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <Link to={`/shop/${product.shopName}`} className="text-blue-600">
            <h4 className="text-lg font-bold mb-2">Shop: {product.shopName}</h4>
          </Link>
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
          <div className="flex items-center mb-4">
            <span className="text-gray-700 mr-2">Số lượng :</span>
            <input
              type="number"
              className="border border-gray-300 rounded px-2 py-1 w-20"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
          </div>
          <div className="flex gap-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </button>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
              onClick={handleShowAddressForm}
            >
              Mua ngay
            </button>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default ProductDetailPage;
