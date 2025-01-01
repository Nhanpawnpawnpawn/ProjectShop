import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductDetailPage = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState("");
  const UserData = JSON.parse(localStorage.getItem("user"));

  const handleAddToCart = () => {
    alert(`Đã thêm ${quantity} ${product.productName} vào giỏ hàng!`);
  };

  const handleBuyNow = async () => {
    if (!address) {
      alert("Vui lòng nhập địa chỉ giao hàng!");
      return;
    }

    const orderData = {
      productName: product.productName,
      customerName: UserData?.displayName,
      shopName: product.shopName,
      totalAmount: product.productPrice * quantity,
      address: address,
      status: "Đặt Hàng",
      shipper: "Chưa Có",
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      const responseData = await response.json();
      if (response.ok) {
        alert("Đặt hàng thành công!");
        setShowAddressForm(false);
        setAddress("");
      } else {
        throw new Error("Đặt hàng thất bại!");
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi đặt hàng!");
    }
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 1);
    setQuantity(value);
  };

  const calculatedPrice = product.productPrice * quantity;

  return (
    <div className="container mt-4">
      {/* Phần trên: Carousel hình ảnh */}
      <div
        id="productCarousel"
        className="carousel slide mb-4"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner rounded shadow-sm">
          {product.multiImages.map((image, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <img
                src={`http://localhost:3000/${image}`}
                className="d-block w-100"
                alt={`Hình ảnh ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#productCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#productCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Phần thông tin sản phẩm */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h1 className="display-5 fw-bold">
            Sản Phẩm : {product.productName}
          </h1>
          <p className="text-muted">
            Mô Tả Sản Phẩm : {product.productDescription}
          </p>
        </div>
        <div className="col-md-4">
          <div className="mb-3">
            <Link
              to={`/shop/${product.shopName}`}
              className="text-decoration-none"
            >
              <h4 className="mb-0 fw-bold" style={{ fontSize: "1.5rem" }}>
                Shop ({product.shopName})
              </h4>
            </Link>
            <div
              className="rating"
              style={{ fontSize: "1.25rem", color: "#f4c150" }}
            >
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`fa fa-star ${
                    index < product.stars ? "checked" : ""
                  }`}
                ></span>
              ))}
            </div>
          </div>
          <h3 className="text-primary">
            {calculatedPrice.toLocaleString()} VND
          </h3>
          <div className="d-flex align-items-center mt-3">
            <span className="me-2">Số lượng:</span>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              style={{ width: "80px" }}
            />
          </div>
        </div>
      </div>

      {/* Nút thêm vào giỏ hàng và mua ngay */}
      <div className="mt-5 pb-3 d-flex gap-3">
        <button
          className="btn btn-outline-primary w-50 shadow-sm"
          onClick={handleAddToCart}
        >
          Thêm vào giỏ hàng
        </button>
        <button
          className="btn btn-primary w-50 shadow-sm"
          onClick={() => setShowAddressForm(true)}
        >
          Mua ngay
        </button>
      </div>

      {/* Form nhập địa chỉ */}
      {showAddressForm && (
        <div className="mt-4 p-3 border rounded shadow-sm">
          <h5>Nhập địa chỉ giao hàng:</h5>
          <div className="mb-3">
            <label className="form-label">Địa chỉ</label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-success" onClick={handleBuyNow}>
            Xác nhận mua hàng
          </button>
          <button
            className="btn btn-secondary ms-2"
            onClick={() => setShowAddressForm(false)}
          >
            Hủy
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
