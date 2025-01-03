import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const AddProduct = ({ userData }) => {
  const [singleImage, setSingleImage] = useState(null);
  const [multiImages, setMultiImages] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    shopName: "",
    stars: 3, // Mặc định 3 sao
  });
  const [alertMessage, setAlertMessage] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSingleImageUpload = (e) => {
    const file = e.target.files[0];
    setSingleImage(file);
  };

  const handleMultiImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length < 3) {
      setAlertMessage({
        type: "danger",
        message: "Vui lòng tải lên ít nhất 3 hình ảnh.",
      });
    } else {
      setMultiImages(files);
      setAlertMessage(null); // Clear any error messages
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Chuẩn bị dữ liệu để gửi lên server
    const productData = new FormData();
    productData.append("productName", formData.productName);
    productData.append("productDescription", formData.productDescription);
    productData.append("productPrice", formData.productPrice);
    productData.append("shopName", userData.displayName);
    productData.append("stars", formData.stars);
    productData.append("singleImage", singleImage);
    multiImages.forEach((file) => {
      productData.append("multiImages", file);
    });

    // Gửi yêu cầu lên server
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: productData,
      });

      if (response.ok) {
        setAlertMessage({
          type: "success",
          message: "Thêm sản phẩm thành công!",
        });
      } else {
        setAlertMessage({
          type: "danger",
          message: "Đã xảy ra lỗi khi thêm sản phẩm.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage({
        type: "danger",
        message: "Đã xảy ra lỗi. Vui lòng thử lại.",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h4 className="mb-6 text-center text-blue-600 font-bold text-2xl">
        Thêm Sản Phẩm
      </h4>

      {alertMessage && (
        <div
          className={`alert ${
            alertMessage.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          } p-4 rounded mb-4`}
        >
          <span>{alertMessage.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 shadow border rounded">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="productName"
              >
                Tên sản phẩm
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                placeholder="Nhập tên sản phẩm"
                value={formData.productName}
                onChange={handleInputChange}
                className="w-full border rounded px-4 py-2 focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="productShop"
              >
                Tên shop
              </label>
              <input
                type="text"
                id="productShop"
                value={userData.displayName}
                disabled
                className="w-full border rounded px-4 py-2 bg-gray-100"
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="productDescription"
            >
              Mô tả
            </label>
            <textarea
              id="productDescription"
              name="productDescription"
              rows={3}
              placeholder="Nhập mô tả sản phẩm"
              value={formData.productDescription}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2 focus:ring focus:ring-blue-300"
            ></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="productPrice"
              >
                Giá sản phẩm
              </label>
              <input
                type="number"
                id="productPrice"
                name="productPrice"
                placeholder="Nhập giá sản phẩm"
                value={formData.productPrice}
                onChange={handleInputChange}
                className="w-full border rounded px-4 py-2 focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="stars"
              >
                Số sao đánh giá
              </label>
              <input
                type="text"
                id="stars"
                value="3 Sao"
                disabled
                className="w-full border rounded px-4 py-2 bg-gray-100"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 shadow border rounded">
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="singleImage"
            >
              Hình ảnh chính sản phẩm
            </label>
            <input
              type="file"
              id="singleImage"
              accept="image/*"
              onChange={handleSingleImageUpload}
              className="w-full border rounded px-4 py-2"
            />
            {singleImage && (
              <img
                src={URL.createObjectURL(singleImage)}
                alt="Preview"
                className="mt-4 w-24 h-24 object-cover"
              />
            )}
          </div>
          <div className="mt-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="multiImages"
            >
              Tải lên ít nhất 3 hình ảnh
            </label>
            <input
              type="file"
              id="multiImages"
              multiple
              accept="image/*"
              onChange={handleMultiImageUpload}
              className="w-full border rounded px-4 py-2"
            />
            {multiImages.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
                {multiImages.map((file, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${idx + 1}`}
                    className="w-24 h-24 object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white font-medium py-2 px-6 rounded shadow hover:bg-green-600 transition float-right"
        >
          <FaPlus className="inline-block mr-2" /> Thêm sản phẩm
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
