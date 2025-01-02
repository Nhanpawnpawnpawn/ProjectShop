import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../components/context/UserContext";

function Header() {
  const { user, setUser } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

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

  return (
    <nav className="bg-white border-b shadow">
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
        <form className="hidden md:flex items-center w-1/2">
          <input
            type="text"
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
              {/* Cart */}
              <Link
                to="/cart"
                className="text-gray-700 hover:text-blue-500 flex items-center"
              >
                <i className="fa fa-shopping-cart text-xl"></i>
                <span className="ml-2">Giỏ Hàng</span>
              </Link>

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
                  <ul className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
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
