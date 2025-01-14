// src/views/ProductView.js
import React from "react";
import ProductPage from "../pages/ProductPage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductView = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`) // Thay thế :id bằng giá trị thực
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi tải dữ liệu sản phẩm");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Không tìm thấy sản phẩm!</div>;
  }

  return (
    <>
      <ProductPage product={product} />
    </>
  );
};

export default ProductView;
