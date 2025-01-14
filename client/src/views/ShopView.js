import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ShopPage from "../pages/ShopPage";
import Card from "../components/Card";

const ShopView = () => {
  const [cards, setCards] = useState([]); // Dữ liệu sản phẩm
  const { shopName } = useParams(); // Lấy shopName từ URL
  const [hasMore, setHasMore] = useState(true); // Kiểm tra nếu còn dữ liệu để tải thêm
  const [shopInfo, setShopInfo] = useState(null); // Thông tin shop

  // Hàm lấy sản phẩm từ API
  const fetchProducts = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/productshop/${shopName}?page=${page}&limit=20`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setCards((prevCards) => [...prevCards, ...data.data]); // Gộp dữ liệu cũ và mới
      setHasMore(page < data.totalPages); // Kiểm tra nếu còn trang để tải thêm
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Lấy thông tin shop từ API
  useEffect(() => {
    fetch(`http://localhost:5000/api/shop/${shopName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi tải thông tin shop");
        }
        return response.json();
      })
      .then((data) => {
        setShopInfo(data[0]); // Lấy thông tin shop từ mảng
      })
      .catch((error) => {
        console.error("Error fetching shop data:", error);
      });
  }, [shopName]);

  return (
    <>
      <ShopPage shopInfo={shopInfo} /> {/* Truyền thông tin shop */}
      <Card cards={cards} hasMore={hasMore} fetchProducts={fetchProducts} />
    </>
  );
};

export default ShopView;
