// src/views/HomeView.js
import React from "react";
import { useState } from "react";
import Header from "../components/layout/Header";
import Carousel from "../components/layout/Carousel";
import Card from "../components/layout/Card";
import Footer from "../components/layout/Footer";

const HomeView = () => {
  const [cards, setCards] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products?page=${page}&limit=40`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCards((prevCards) => [...prevCards, ...data.data]);
      setHasMore(page < data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  return (
    <>
      <Header />
      <div className="container pb-4 border-r border-l">
        <Carousel />
        <Card cards={cards} hasMore={hasMore} fetchProducts={fetchProducts} />
      </div>
      <Footer />
    </>
  );
};

export default HomeView;
