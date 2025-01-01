import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
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
import "../../css/personalpage.css";

const PersonalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.user;

  const [activeKey, setActiveKey] = useState("info");
  const [avatar, setAvatar] = useState(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if (!storedUserData?.avatar) {
      return storedUserData?.gender === "male"
        ? "/images/male_avatar.png"
        : "/images/female_avatar.png";
    } else {
      return storedUserData.avatar;
    }
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
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col
          md={2}
          className="menu-container text-white p-4"
          style={{
            position: "fixed",
            minHeight: "100vh",
            backgroundColor: "#00bfff",
            borderRadius: "10px 0 0 10px",
          }}
        >
          <div className="text-center">
            <div className="position-relative">
              <img
                src={avatar}
                alt="Avatar"
                className="rounded-circle"
                style={{
                  width: "100px",
                  height: "100px",
                  border: "2px solid #fff",
                }}
              />
              <label
                className="position-absolute"
                style={{
                  bottom: 0,
                  right: 10,
                  borderRadius: "100%",
                  cursor: "pointer",
                  padding: "5px",
                  backgroundColor: "#00bfff",
                  border: "2px solid #fff",
                }}
              >
                <FaCamera style={{ fontSize: "20px", color: "#000" }} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>
            <h5 className="text-white mt-3">{userData?.displayName}</h5>
          </div>

          {/* Menu */}
          <nav>
            <ul className="list-unstyled menu-list mt-4">
              {renderMenuItems().map((item) => (
                <li key={item.key}>
                  <Button
                    variant="link"
                    onClick={() => setActiveKey(item.key)}
                    className={`menu-item ${
                      activeKey === item.key ? "active" : ""
                    }`}
                  >
                    {item.icon}
                    <span className="menu-text ms-3">{item.text}</span>
                  </Button>
                </li>
              ))}
              <li>
                <Button
                  variant="link"
                  onClick={() => navigate("/")}
                  className="menu-item"
                >
                  <FaHome className="me-3" />
                  <span className="menu-text">Trang Chủ</span>
                </Button>
              </li>
            </ul>
          </nav>
        </Col>

        {/* Content */}
        <Col
          md={10}
          className="content p-4 ms-auto"
          style={{ marginLeft: "18%" }}
        >
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
        </Col>
      </Row>
    </Container>
  );
};

export default PersonalPage;
