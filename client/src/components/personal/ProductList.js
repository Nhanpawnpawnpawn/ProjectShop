import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Sử dụng useNavigate để điều hướng

const ProductList = ({ productList, onLoadMore, hasMore, onDelete }) => {
  const navigate = useNavigate(); // Khởi tạo navigate
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Quản lý trạng thái modal
  const [selectedProduct, setSelectedProduct] = useState(null); // Sản phẩm được chọn để xóa
  const [alertMessage, setAlertMessage] = useState(null); // Thông báo thành công hoặc thất bại

  const handleEdit = (product) => {
    // Điều hướng đến trang Chỉnh sửa sản phẩm với dữ liệu sản phẩm
    navigate(`/edit-product/${product._id}`, { state: { product } });
  };

  const handleDeleteConfirmation = (product) => {
    // Hiển thị modal xác nhận xóa sản phẩm
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (selectedProduct) {
      try {
        await onDelete(selectedProduct._id);
        setAlertMessage({
          type: "success",
          message: "Sản phẩm đã được xóa thành công.",
        });
        setShowDeleteModal(false); // Đóng modal
      } catch (error) {
        setAlertMessage({
          type: "danger",
          message: "Đã xảy ra lỗi khi xóa sản phẩm.",
        });
      }
    }
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false); // Đóng modal nếu không muốn xóa
    setSelectedProduct(null); // Reset sản phẩm đã chọn
  };

  return (
    <div>
      <h4 className="mb-6 text-center text-blue-600 font-bold text-3xl">
        Danh Sách Sản Phẩm
      </h4>

      {/* Thông báo nếu có */}
      {alertMessage && (
        <div
          className={`alert-${alertMessage.type} mb-4 p-4 border-l-4 bg-${
            alertMessage.type === "success" ? "green" : "red"
          }-100 text-${alertMessage.type === "success" ? "green" : "red"}-700`}
        >
          <span>{alertMessage.message}</span>
        </div>
      )}

      <table className="min-w-full table-auto border-collapse shadow-sm border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">STT</th>
            <th className="px-4 py-2 text-left">Tên Sản Phẩm</th>
            <th className="px-4 py-2 text-left">Hình ảnh</th>
            <th className="px-4 py-2 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product, index) => (
            <tr key={product._id} className="border-b border-gray-200">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{product.productName}</td>
              <td className="px-4 py-2">
                <img
                  src={`http://localhost:3000/${product.singleImage}`}
                  alt={product.productName}
                  className="w-24 h-24 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2">
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 mr-2"
                  onClick={() => handleEdit(product)}
                >
                  <FaEdit className="inline-block mr-2" /> Sửa
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  onClick={() => handleDeleteConfirmation(product)}
                >
                  <FaTrash className="inline-block mr-2" /> Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {hasMore && (
        <button
          className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mx-auto block"
          onClick={onLoadMore}
        >
          Xem Thêm
        </button>
      )}

      {/* Modal xác nhận xóa */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h5 className="font-bold text-lg">Xác Nhận Xóa</h5>
              <button className="text-gray-600" onClick={handleCloseModal}>
                ✕
              </button>
            </div>
            <div className="mb-4">
              Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này không
              thể hoàn tác.
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={handleCloseModal}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={handleDelete}
              >
                Xoá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
