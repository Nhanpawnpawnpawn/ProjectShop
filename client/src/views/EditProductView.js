import React from "react";
import EditProductPage from "../pages/EditProductPage";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditProductPageView = () => {
  const { productId } = useParams();

  const fetchProduct = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/${productId}`
      );
      return response.data; // Dữ liệu JSON đã được parse tự động
    } catch (error) {
      // Xử lý lỗi HTTP hoặc lỗi mạng
      if (error.response) {
        // Lỗi từ server (có response)
        throw new Error(
          `API trả về lỗi: ${error.response.status} - ${error.response.data}`
        );
      } else if (error.request) {
        // Lỗi do không nhận được response (network)
        throw new Error("Không thể kết nối đến server.");
      } else {
        // Lỗi khác
        throw new Error(`Đã xảy ra lỗi: ${error.message}`);
      }
    }
  };

  const updateProduct = async (productId, productData) => {
    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("productDescription", productData.productDescription);
    formData.append("productPrice", productData.productPrice);
    formData.append("stars", productData.stars);
    // Thêm hình ảnh đơn
    if (productData.singleImage) {
      formData.append("singleImage", productData.singleImage);
    }

    // Thêm hình ảnh đa
    if (productData.multiImages && productData.multiImages.length > 0) {
      productData.multiImages.forEach((file) => {
        formData.append("multiImages", file);
      });
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "PUT",
          body: formData,
        }
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      alert("Có lỗi xảy ra khi cập nhật sản phẩm.");
    }
  };

  return (
    <EditProductPage
      productId={productId}
      fetchProduct={fetchProduct}
      updateProduct={updateProduct}
    />
  );
};

export default EditProductPageView;
