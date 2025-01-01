import { Outlet, Link } from "react-router-dom";
import React from "react";
import "../../css/footer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer() {
  return (
    <footer className="bg-white text-dark pt-5 pb-3 mt-3 shadow-sm">
      <div className="container">
        <div className="row">
          {/* Cột Hỗ Trợ Khách Hàng */}
          <div className="col-12 col-md-2 mb-3">
            <h5>Hỗ Trợ Khách Hàng</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-dark">
                  Hotline: 1900-6035
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  Hướng dẫn đặt hàng
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  Phương thức vận chuyển
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  Chính sách kiểm hàng
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  Chính sách đổi trả
                </a>
              </li>
            </ul>
          </div>

          {/* Cột Về HASHOPING */}
          <div className="col-12 col-md-2 mb-3">
            <h5>Về HASHOPING</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-dark">
                  Giới thiệu HASHOPING
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  HASHOPING Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  Tuyển dụng HASHOPING
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  Chính sách bảo mật và khiếu nại
                </a>
              </li>
            </ul>
          </div>

          {/* Cột Hợp tác và liên kết */}
          <div className="col-12 col-md-2 mb-3">
            <h5>Hợp tác và Liên kết</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-dark">
                  Bán hàng cùng Tiki
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  Bán hàng doanh nghiệp
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  Tiếp thị liên kết cùng Tiki
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  Điều kiện vận chuyển
                </a>
              </li>
            </ul>
          </div>

          {/* Cột Phương thức thanh toán */}
          <div className="col-12 col-md-3 mb-3">
            <h5>Phương thức thanh toán</h5>
            <div className="row">
              <div className="col-3">
                <img
                  src="https://via.placeholder.com/50x30?text=Visa"
                  alt="Visa"
                  className="img-fluid"
                />
              </div>
              <div className="col-3">
                <img
                  src="https://via.placeholder.com/50x30?text=Bank"
                  alt="Bank"
                  className="img-fluid"
                />
              </div>
              <div className="col-3">
                <img
                  src="https://via.placeholder.com/50x30?text=PayPal"
                  alt="PayPal"
                  className="img-fluid"
                />
              </div>
              <div className="col-3">
                <img
                  src="https://via.placeholder.com/50x30?text=ZaloPay"
                  alt="ZaloPay"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-3">
                <img
                  src="https://via.placeholder.com/50x30?text=Momo"
                  alt="Momo"
                  className="img-fluid"
                />
              </div>
              <div className="col-3">
                <img
                  src="https://via.placeholder.com/50x30?text=ATM"
                  alt="ATM"
                  className="img-fluid"
                />
              </div>
              <div className="col-3">
                <img
                  src="https://via.placeholder.com/50x30?text=Mastercard"
                  alt="Mastercard"
                  className="img-fluid"
                />
              </div>
              <div className="col-3">
                <img
                  src="https://via.placeholder.com/50x30?text=Amex"
                  alt="Amex"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-3">
                <img
                  src="https://via.placeholder.com/50x30?text=VNPAY"
                  alt="VNPAY"
                  className="img-fluid"
                />
              </div>
              <div className="col-3">
                <img
                  src="https://via.placeholder.com/50x30?text=JCB"
                  alt="JCB"
                  className="img-fluid"
                />
              </div>
              <div className="col-3">
                <img
                  src="https://via.placeholder.com/50x30?text=QR"
                  alt="QR"
                  className="img-fluid"
                />
              </div>
              <div className="col-3">
                <img
                  src="https://via.placeholder.com/50x30?text=Cash"
                  alt="Cash"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>

          {/* Cột Kết nối với chúng tôi */}
          <div className="col-12 col-md-3 mb-3">
            <h5>Kết nối với chúng tôi</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-dark">
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  <i className="fab fa-youtube"></i> YouTube
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  <i className="fab fa-tiktok"></i> TikTok
                </a>
              </li>
              <li>
                <a href="mailto:contact@hashoping.com" className="text-dark">
                  <i className="fas fa-envelope"></i> Gmail
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
