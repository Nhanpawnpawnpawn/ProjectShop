import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

function Header({ fetchProducts }) {
  const { user, setUser } = useContext(UserContext);
  const notifications = [
    { title: "Khuyến mãi", message: "Giảm giá 50% cho đơn hàng hôm nay!" },
    { title: "Cập nhật", message: "Phiên bản mới đã được cập nhật." },
  ];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifydownOpen, setisNotifydownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    if (isNotifydownOpen) setisNotifydownOpen(false);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNotifyDropdown = () => {
    if (isDropdownOpen) setIsDropdownOpen(false);
    setisNotifydownOpen(!isNotifydownOpen);
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      setUser(savedUser);
    }
  }, [setUser]);

  const handleProfileClick = () => {
    navigate(`/personalpage/${user.displayName}`, { state: { user } });
  };

  const handleLogout = () => {
    setUser({ isLoggedIn: false, displayName: "", username: "" });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchProducts(currentPage, searchQuery); // Truyền từ khóa vào hàm fetchProducts
  }, [currentPage, searchQuery]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchQuery(inputValue);
    setCurrentPage(1); // Reset lại trang khi tìm kiếm mới
  };

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="https://via.placeholder.com/100x50?text=Logo"
            alt="Logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center w-1/2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Tìm kiếm sản phẩm..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Tìm
          </button>
        </form>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {user.isLoggedIn ? (
            <>
              {/* Notify */}
              <div className="relative">
                <button
                  onClick={toggleNotifyDropdown}
                  className="text-gray-700 hover:text-blue-500 flex items-center"
                >
                  <i className="fa fa-bell text-xl"></i>
                  <span className="ml-2">Thông Báo</span>
                </button>
                {isNotifydownOpen && (
                  <div className="absolute right-[-200px] mt-2 w-[360px] bg-white border rounded shadow-lg z-50">
                    {notifications && notifications.length > 0 ? (
                      <div>
                        <ul className="divide-y">
                          {notifications.map((notification, index) => (
                            <li
                              key={index}
                              className="flex items-center space-x-4 hover:bg-gray-100 cursor-pointer px-4 py-2"
                            >
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-700">
                                  {notification.title}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {notification.message}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="p-4 text-gray-700">
                        Hiện chưa có thông báo nào
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-gray-700 hover:text-blue-500"
                >
                  <i className="fa fa-user text-xl"></i>
                  <span className="ml-2">{user.displayName}</span>
                </button>
                {isDropdownOpen && (
                  <ul className="absolute right-[-60px] mt-2 w-44 bg-white border rounded shadow-lg z-50">
                    <li>
                      <button
                        onClick={handleProfileClick}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Trang Cá Nhân
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Đăng Xuất
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Register */}
              <Link
                to="/auth"
                className="text-gray-700 hover:text-blue-500 flex items-center"
              >
                <i className="fa fa-user-plus text-xl"></i>
                <span className="ml-2">Đăng Ký</span>
              </Link>

              {/* Login */}
              <Link
                to="/auth"
                className="text-gray-700 hover:text-blue-500 flex items-center"
              >
                <i className="fa fa-sign-in text-xl"></i>
                <span className="ml-2">Đăng Nhập</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
