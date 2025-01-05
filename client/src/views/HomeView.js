// src/views/HomeView.js
import React from "react";
import { useState } from "react";
import axios from "axios";
import Header from "../components/layout/Header";
import Carousel from "../components/layout/Carousel";
import Card from "../components/layout/Card";
import Footer from "../components/layout/Footer";

const HomeView = () => {
  const [cards, setCards] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async (page, searchQuery) => {
    try {
      const response = await axios.get("/api/products", {
        params: {
          page,
          q: searchQuery, // Truyền từ khóa tìm kiếm
        },
      });
      const { data, currentPage, totalPages } = response.data;

      // Logic xử lý dữ liệu sản phẩm
      setCards((prevCards) => (page === 1 ? data : [...prevCards, ...data]));
      setHasMore(currentPage < totalPages);
    } catch (error) {
      console.error("Lỗi khi fetch sản phẩm:", error);
    }
  };
  return (
    <>
      <Header fetchProducts={fetchProducts} />
      <div className="container pb-4 border-r border-l">
        <Carousel />
        <Card cards={cards} hasMore={hasMore} fetchProducts={fetchProducts} />
      </div>
      <Footer />
    </>
  );
};

export default HomeView;
