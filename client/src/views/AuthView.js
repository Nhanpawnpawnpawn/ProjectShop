// src/views/AuthView.js
import React, { useState, useContext, useEffect } from "react";
import AuthPage from "../pages/AuthPage";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";

const AuthView = () => {
  const { setUser } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    displayName: "",
    password: "",
    confirmPassword: "",
    accountType: "personal",
    gender: "male",
    address: {
      city: "",
      district: "",
      ward: "",
      specificAddress: "",
    },
  });
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [cityName, setcityName] = useState("");
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập khi trang được tải lại
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (user && token) {
      setUser(user); // Cập nhật trạng thái người dùng vào Context
      navigate("/"); // Điều hướng về trang chủ nếu đã đăng nhập
    }
  }, [setUser, navigate]);

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setMessage("");
    setFormData({
      username: "",
      email: "",
      phone: "",
      displayName: "",
      password: "",
      confirmPassword: "",
      accountType: "personal",
      gender: "male",
      address: {
        city: "",
        district: "",
        ward: "",
        specificAddress: "",
      },
    });
  };

  useEffect(() => {
    // Lấy danh sách Thành phố từ API
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cities");
        setCities(response.data);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };
    fetchCities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        address: { ...prevFormData.address, [field]: value },
      }));

      // Tải Quận/Huyện hoặc Phường/Xã nếu cần
      if (field === "city" && value) {
        fetchDistricts(value); // Truyền mã thành phố khi chọn thành phố
      } else if (field === "district" && value) {
        fetchWards(value); // Truyền mã quận/huyện khi chọn quận
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const fetchDistricts = async (cityCode) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/districts/${cityCode}`
      );
      setDistricts(response.data);
      setcityName(cityCode);
      setFormData((prevFormData) => ({
        ...prevFormData,
        address: { ...prevFormData.address, district: "", ward: "" },
      }));
      setWards([]); // Reset danh sách Phường/Xã
    } catch (error) {
      console.error("Failed to fetch districts:", error);
    }
  };

  const fetchWards = async (districtCode) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/wards/${cityName}/${districtCode}`
      );
      setWards(response.data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        address: { ...prevFormData.address, ward: "" },
      }));
    } catch (error) {
      console.log("Failed to fetch wards:");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post("http://localhost:5000/api/login", {
          username: formData.username,
          password: formData.password,
        });

        const {
          token,
          username,
          email,
          phone,
          displayName,
          gender,
          id,
          avatar,
          accountType,
          address,
        } = response.data;
        localStorage.setItem("token", token);

        // Cập nhật trạng thái người dùng vào Context
        const user = {
          isLoggedIn: true,
          username,
          email,
          phone,
          displayName,
          gender,
          id,
          avatar,
          accountType,
          address,
        };
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user)); // Lưu thông tin người dùng vào localStorage

        // Điều hướng sang trang chủ
        navigate("/");
      } else {
        if (formData.password !== formData.confirmPassword) {
          setMessage("Mật khẩu và xác nhận mật khẩu không khớp!");
          return;
        }
        const response = await axios.post(
          "http://localhost:5000/api/register",
          formData
        );
        setMessage(response.data.message);

        if (response.data.message === "Đăng ký thành công!") {
          setShowModal(true);
        }
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Đã xảy ra lỗi!");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsLogin(true);
  };

  return (
    <AuthPage
      handleToggle={handleToggle}
      handleChange={handleChange}
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
      isLogin={isLogin}
      formData={formData}
      cities={cities}
      districts={districts}
      wards={wards}
      message={message}
      showModal={showModal}
    />
  );
};

export default AuthView;
