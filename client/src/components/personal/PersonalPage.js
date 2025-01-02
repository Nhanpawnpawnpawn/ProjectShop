import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaShoppingCart,
  FaPlus,
  FaCamera,
  FaHome,
  FaMoneyBill,
  FaClipboardList,
  FaTruck,
} from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PersonalInfo from "./PersonalInfo";
import ProductList from "./ProductList";
import AddProduct from "../actions/AddProduct";
import Revenue from "./Revenue";
import ShopOrders from "./ShopOrders";
import CustomerOrders from "./CustomerOrders";
import ShipperOrders from "./ShipperOrders";

const PersonalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.user;

  const [activeKey, setActiveKey] = useState("info");
  const [avatar, setAvatar] = useState(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    return (
      storedUserData?.avatar ||
      (storedUserData?.gender === "male"
        ? "/images/male_avatar.png"
        : "/images/female_avatar.png")
    );
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    }
  }, [navigate]);

  const updateAvatar = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userId", userData.id);

    const response = await fetch(
      "http://localhost:5000/api/users/update-avatar",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const { avatar: updatedAvatar } = await response.json();
      setAvatar(updatedAvatar);
      const updatedUserData = { ...userData, avatar: updatedAvatar };
      localStorage.setItem("user", JSON.stringify(updatedUserData));
      alert("Avatar cập nhật thành công!");
    } else {
      alert("Cập nhật avatar thất bại!");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateAvatar(file);
    }
  };

  const { shopName } = useParams();
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/productshop/${shopName}?page=${page}&limit=20`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProductList((prevCards) => [...prevCards, ...data.data]);
      setHasMore(page < data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProductList(
        productList.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const renderMenuItems = () => {
    switch (userData?.accountType) {
      case "shop":
        return [
          { key: "info", icon: <FaUser />, text: "Thông Tin" },
          {
            key: "productList",
            icon: <FaShoppingCart />,
            text: "Danh Sách Sản Phẩm",
          },
          { key: "addProduct", icon: <FaPlus />, text: "Thêm Sản Phẩm" },
          { key: "revenue", icon: <FaMoneyBill />, text: "Doanh Thu" },
          { key: "shopOrders", icon: <FaClipboardList />, text: "Đơn Hàng" },
        ];
      case "personal":
        return [
          { key: "info", icon: <FaUser />, text: "Thông Tin" },
          {
            key: "customerOrders",
            icon: <FaClipboardList />,
            text: "Đơn Hàng Khách Hàng",
          },
        ];
      case "shipper":
        return [
          { key: "info", icon: <FaUser />, text: "Thông Tin" },
          { key: "shipperOrders", icon: <FaTruck />, text: "Đơn Hàng Shipper" },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-blue-500 text-white p-6 flex flex-col items-center">
        <div className="relative">
          <img
            src={avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-white"
          />
          <label className="absolute bottom-0 right-2 bg-blue-500 border-2 border-white p-2 rounded-full cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>
        <h5 className="text-white mt-3 text-center">{userData?.displayName}</h5>

        {/* Menu */}
        <ul className="mt-6 space-y-4 w-full">
          {renderMenuItems().map((item) => (
            <li key={item.key}>
              <button
                onClick={() => setActiveKey(item.key)}
                className={`w-full flex items-center p-3 rounded-lg hover:bg-blue-600 ${
                  activeKey === item.key ? "bg-blue-600" : ""
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.text}</span>
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center p-3 rounded-lg hover:bg-blue-600"
            >
              <FaHome className="mr-3" />
              <span>Trang Chủ</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {activeKey === "info" && <PersonalInfo userData={userData} />}
        {activeKey === "productList" && (
          <ProductList
            productList={productList}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            onDelete={handleDeleteProduct}
          />
        )}
        {activeKey === "addProduct" && <AddProduct userData={userData} />}
        {activeKey === "revenue" && <Revenue shopName={shopName} />}
        {activeKey === "shopOrders" && <ShopOrders />}
        {activeKey === "customerOrders" && <CustomerOrders />}
        {activeKey === "shipperOrders" && <ShipperOrders />}
      </div>
    </div>
  );
};

export default PersonalPage;
