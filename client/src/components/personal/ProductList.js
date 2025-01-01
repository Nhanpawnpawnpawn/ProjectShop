import React, { useState } from "react";
import { Table, Button, Modal, Alert } from "react-bootstrap";
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
      <h4
        className="mb-4 text-center text-primary font-weight-bold"
        style={{ fontSize: "28px" }}
      >
        Danh Sách Sản Phẩm
      </h4>

      {alertMessage && (
        <Alert
          variant={alertMessage.type}
          onClose={() => setAlertMessage(null)}
          dismissible
        >
          {alertMessage.message}
        </Alert>
      )}

      <Table striped bordered hover responsive className="shadow-sm">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên Sản Phẩm</th>
            <th>Hình ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.productName}</td>
              <td>
                <img
                  src={`http://localhost:3000/${product.singleImage}`}
                  alt={product.productName}
                  width="100"
                  height="100"
                />
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(product)}
                >
                  <FaEdit /> Sửa
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteConfirmation(product)}
                >
                  <FaTrash /> Xoá
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {hasMore && (
        <Button
          variant="primary"
          onClick={onLoadMore}
          className="d-block mx-auto"
        >
          Xem Thêm
        </Button>
      )}

      {/* Modal xác nhận xóa */}
      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xác Nhận Xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này không thể
          hoàn tác.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Xoá
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductList;
