import React from "react";
import EditProduct from "../components/actions/EditProduct";
import { useParams } from "react-router-dom";

const EditProductView = () => {
  const { productId } = useParams();

  const fetchProduct = async (productId) => {
    const response = await fetch(
      `http://localhost:5000/api/products/${productId}`
    );
    if (!response.ok) {
      throw new Error(`API trả về lỗi: ${response.status}`);
    }
    const data = await response.json();
    return data;
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
    <EditProduct
      productId={productId}
      fetchProduct={fetchProduct}
      updateProduct={updateProduct}
    />
  );
};

export default EditProductView;
