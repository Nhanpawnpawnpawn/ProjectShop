import React, { useState, useEffect } from "react";
import { FaSave } from "react-icons/fa";

const EditProductPage = ({ productId, fetchProduct, updateProduct }) => {
  const [productData, setProductData] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    stars: 3,
    singleImage: null,
    multiImages: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [previewSingleImage, setPreviewSingleImage] = useState(null);
  const [previewMultiImages, setPreviewMultiImages] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const product = await fetchProduct(productId);
        setProductData(product);
        if (product.singleImage) {
          setPreviewSingleImage(product.singleImage);
        }
        if (product.multiImages && product.multiImages.length > 0) {
          setPreviewMultiImages(product.multiImages);
        }
      } catch (err) {
        setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [productId]);

  const handleInputChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e, field) => {
    const files =
      field === "multiImages" ? Array.from(e.target.files) : e.target.files[0];
    setProductData({
      ...productData,
      [field]: files,
    });

    if (field === "singleImage") {
      const file = e.target.files[0];
      setPreviewSingleImage(file ? URL.createObjectURL(file) : null);
    } else if (field === "multiImages") {
      const imagePreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewMultiImages(imagePreviews);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    try {
      await updateProduct(productId, productData);
      setSuccess(true);
    } catch (error) {
      setError("Cập nhật sản phẩm không thành công. Vui lòng thử lại.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-800 px-4 py-3 rounded text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md p-8 rounded-md">
      <h4 className="text-2xl font-semibold text-center mb-6">Sửa Sản Phẩm</h4>
      {success && (
        <div className="bg-green-100 text-green-800 px-4 py-3 rounded text-center">
          Cập nhật thành công!
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="productName" className="block font-medium mb-1">
            Tên sản phẩm
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={productData.productName || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="productDescription"
            className="block font-medium mb-1"
          >
            Mô tả
          </label>
          <textarea
            id="productDescription"
            name="productDescription"
            rows={3}
            value={productData.productDescription || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label htmlFor="productPrice" className="block font-medium mb-1">
            Giá sản phẩm
          </label>
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            value={productData.productPrice || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="singleImage" className="block font-medium mb-1">
              Hình ảnh sản phẩm
            </label>
            <input
              type="file"
              id="singleImage"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "singleImage")}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {previewSingleImage && (
              <div className="mt-3">
                <img
                  src={
                    previewSingleImage.startsWith("blob:")
                      ? previewSingleImage // Preview cho ảnh tải lên
                      : `http://localhost:3000/${previewSingleImage}` // Ảnh từ server
                  }
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-md border"
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="multiImages" className="block font-medium mb-1">
              Tải lên ít nhất 3 hình ảnh
            </label>
            <input
              type="file"
              id="multiImages"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, "multiImages")}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {/* Preview Multi Images */}
            {previewMultiImages.length > 0 && (
              <div className="flex gap-2 mt-3">
                {previewMultiImages.map((preview, index) => (
                  <img
                    key={index}
                    src={
                      preview.startsWith("blob:")
                        ? preview // Preview cho ảnh tải lên
                        : `http://localhost:3000/${preview}` // Ảnh từ server
                    }
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-md border"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            <FaSave className="inline-block mr-2" /> Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
