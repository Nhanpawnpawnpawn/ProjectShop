import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/header.css";
import UserContext from "../../components/context/UserContext";

function Header() {
  const { user, setUser } = useContext(UserContext); // Sử dụng setUser để cập nhật trạng thái
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => setIsCollapsed(!isCollapsed);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Kiểm tra và lấy thông tin người dùng từ localStorage khi component được tải lại
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      setUser(savedUser); // Cập nhật trạng thái người dùng từ localStorage
    }
  }, [setUser]);

  // Xử lý khi nhấn vào Trang Cá Nhân
  const handleProfileClick = () => {
    navigate(`/personalpage/${user.displayName}`, { state: { user } }); // Truyền dữ liệu người dùng
  };

  // Xử lý khi nhấn Đăng Xuất
  const handleLogout = () => {
    setUser({ isLoggedIn: false, displayName: "", username: "" }); // Reset trạng thái người dùng
    localStorage.removeItem("token"); // Xóa token nếu được lưu
    localStorage.removeItem("user"); // Xóa thông tin người dùng trong localStorage
    navigate("/"); // Điều hướng về trang chủ
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <div className="container">
        {/* Logo bên trái */}
        <Link className="navbar-brand" to="/">
          <img
            src="https://via.placeholder.com/100x50?text=Logo"
            alt="Logo"
            className="d-inline-block align-text-top custom-logo"
          />
        </Link>

        {/* Thanh tìm kiếm ở giữa */}
        <form className="d-flex w-50 mx-auto">
          <input
            className="form-control me-2 custom-search-input"
            type="search"
            placeholder="Tìm kiếm sản phẩm..."
            aria-label="Search"
          />
          <button
            className="btn btn-outline-primary custom-search-btn"
            type="submit"
          >
            Tìm
          </button>
        </form>

        {/* Hamburger Menu */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Các mục bên phải */}
        <div
          className={`collapse navbar-collapse ${isCollapsed ? "" : "show"}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto custom-nav-links">
            {user.isLoggedIn ? (
              <>
                {/* Giỏ Hàng */}
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <i className="fa fa-shopping-cart"></i> Giỏ Hàng
                  </Link>
                </li>

                {/* Tên Người Dùng và Dropdown */}
                <li className="nav-item dropdown">
                  <button
                    className="nav-link btn btn-link dropdown-toggle"
                    onClick={toggleDropdown}
                    aria-expanded={isDropdownOpen ? "true" : "false"}
                  >
                    <i className="fa fa-user"></i> {user.displayName}
                  </button>
                  <ul
                    className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={handleProfileClick}
                      >
                        Trang Cá Nhân
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Đăng Xuất
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                {/* Đăng Ký */}
                <li className="nav-item">
                  <Link className="nav-link" to="/auth">
                    <i className="fa fa-user-plus"></i> Đăng Ký
                  </Link>
                </li>
                {/* Đăng Nhập */}
                <li className="nav-item">
                  <Link className="nav-link" to="/auth">
                    <i className="fa fa-sign-in"></i> Đăng Nhập
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
