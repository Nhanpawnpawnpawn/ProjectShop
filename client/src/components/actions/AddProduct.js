import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [attributes, setAttributes] = useState([]); // Chứa các loại, màu sắc, hoặc combo
  const [sizes, setSizes] = useState([]); // Chứa danh sách các size
  const [selectedAttributeType, setSelectedAttributeType] = useState(""); // Loại thuộc tính

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
      toast.danger("Vui lòng tải lên ít nhất 3 hình ảnh.");
    } else {
      setMultiImages(files);
    }
  };

  const handleAddAttribute = () => {
    if (!selectedAttributeType) {
      toast.error("Vui lòng chọn loại thuộc tính trước khi thêm!");
      return;
    }
    setAttributes([...attributes, { name: "", price: "" }]);
  };

  const handleAttributeChange = (index, field, value) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index][field] = value;
    setAttributes(updatedAttributes);
  };

  const handleDeleteAttribute = (index) => {
    const updatedAttributes = attributes.filter((_, i) => i !== index);
    setAttributes(updatedAttributes);
  };

  const handleAddSize = () => {
    setSizes([...sizes, ""]);
  };

  const handleSizeChange = (index, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index] = value;
    setSizes(updatedSizes);
  };

  const handleDeleteSize = (index) => {
    const updatedSizes = sizes.filter((_, i) => i !== index);
    setSizes(updatedSizes);
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
    productData.append(`type`, selectedAttributeType);
    attributes.forEach((attr, index) => {
      productData.append(`attributes[${index}][name]`, attr.name);
      productData.append(`attributes[${index}][price]`, attr.price);
    });

    sizes.forEach((size, index) => {
      productData.append(`sizes[${index}]`, size);
    });
    // Gửi yêu cầu lên server
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: productData,
      });

      if (response.ok) {
        toast.success("Thêm sản phẩm thành công!");
      } else {
        toast.error("Đã xảy ra lỗi khi thêm sản phẩm.");
        //console.log(Object.values(req.body));
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h4 className="mb-6 text-center text-blue-600 font-bold text-2xl">
        Thêm Sản Phẩm
      </h4>

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="productPrice"
              >
                Giá hiển thị
              </label>
              <input
                type="number"
                id="productPrice"
                name="productPrice"
                placeholder="Nhập giá hiển thị"
                value={formData.productPrice}
                onChange={handleInputChange}
                className="w-full border rounded px-4 py-2 focus:ring focus:ring-blue-300"
              />
            </div>
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
                  className="mt-4 w-12 h-12 object-cover"
                />
              )}
            </div>
            <div>
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
                <div className="mt-4 flex flex-wrap gap-1">
                  {multiImages.map((file, idx) => (
                    <img
                      key={idx}
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${idx + 1}`}
                      className="w-12 h-12 object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 shadow border rounded">
          <h5 className="text-lg font-medium mb-4">Thuộc tính</h5>
          <select
            value={selectedAttributeType}
            onChange={(e) => setSelectedAttributeType(e.target.value)}
            className="mb-4 border rounded px-4 py-2 w-full"
          >
            <option value="">Chọn loại thuộc tính</option>
            <option value="Loại">Loại</option>
            <option value="Màu sắc">Màu sắc</option>
            <option value="Combo">Combo</option>
          </select>
          {attributes.map((attr, index) => (
            <div key={index} className="row mb-4 border-b pb-4 relative">
              <div className="col-lg-11 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Tên thuộc tính"
                  value={attr.name}
                  onChange={(e) =>
                    handleAttributeChange(index, "name", e.target.value)
                  }
                  className="border rounded px-4 py-2"
                />
                <input
                  type="number"
                  placeholder="Giá"
                  value={attr.price}
                  onChange={(e) =>
                    handleAttributeChange(index, "price", e.target.value)
                  }
                  className="border rounded px-4 py-2"
                />
              </div>
              <div className="col-lg-1 flex justify-center items-center">
                <button
                  type="button"
                  onClick={() => handleDeleteAttribute(index)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAttribute}
            className="bg-blue-500 text-white font-medium py-2 px-6 rounded shadow hover:bg-blue-600 transition"
          >
            <FaPlus className="inline-block mr-2" /> Thêm thuộc tính
          </button>
        </div>

        <div className="bg-white p-6 shadow border rounded">
          <h5 className="text-lg font-medium mb-4">Kích thước</h5>
          {sizes.map((size, index) => (
            <div key={index} className="relative mb-2 flex items-center">
              <input
                type="text"
                placeholder="Nhập kích thước"
                value={size}
                onChange={(e) => handleSizeChange(index, e.target.value)}
                className="border rounded px-4 py-2 w-full"
              />
              <button
                type="button"
                onClick={() => handleDeleteSize(index)}
                className="ml-2 text-red-500 hover:text-red-700 flex justify-center items-center"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSize}
            className="bg-blue-500 text-white font-medium py-2 px-6 rounded shadow hover:bg-blue-600 transition"
          >
            <FaPlus className="inline-block mr-2" /> Thêm kích thước
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="md:w-[10%] sm:[w-30%] xs:[20%] flex justify-center items-center bg-green-500 text-white font-medium py-2 px-6 rounded shadow hover:bg-green-600 transition"
          >
            <FaPlus className="inline-block" />
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
