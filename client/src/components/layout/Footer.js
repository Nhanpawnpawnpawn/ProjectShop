import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer() {
  return (
    <footer className="bg-white text-gray-700 pt-10 pb-6 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Cột Hỗ Trợ Khách Hàng */}
          <div>
            <h5 className="font-bold text-lg mb-4">Hỗ Trợ Khách Hàng</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-500">
                  Hotline: 1900-6035
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Hướng dẫn đặt hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Phương thức vận chuyển
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Chính sách kiểm hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Chính sách đổi trả
                </a>
              </li>
            </ul>
          </div>

          {/* Cột Về HASHOPING */}
          <div>
            <h5 className="font-bold text-lg mb-4">Về HASHOPING</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-500">
                  Giới thiệu HASHOPING
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  HASHOPING Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Tuyển dụng HASHOPING
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Chính sách bảo mật và khiếu nại
                </a>
              </li>
            </ul>
          </div>

          {/* Cột Hợp tác và liên kết */}
          <div>
            <h5 className="font-bold text-lg mb-4">Hợp tác và Liên kết</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-500">
                  Bán hàng cùng Tiki
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Bán hàng doanh nghiệp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Tiếp thị liên kết cùng Tiki
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Điều kiện vận chuyển
                </a>
              </li>
            </ul>
          </div>

          {/* Cột Kết nối với chúng tôi */}
          <div>
            <h5 className="font-bold text-lg mb-4">Kết nối với chúng tôi</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 flex items-center gap-2"
                >
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 flex items-center gap-2"
                >
                  <i className="fab fa-youtube"></i> YouTube
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 flex items-center gap-2"
                >
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 flex items-center gap-2"
                >
                  <i className="fab fa-tiktok"></i> TikTok
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@hashoping.com"
                  className="hover:text-blue-500 flex items-center gap-2"
                >
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
