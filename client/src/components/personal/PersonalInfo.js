import React, { useState } from "react";
import { Table, Button, Modal, Alert } from "react-bootstrap";
import { FaUser, FaEnvelope, FaPhone, FaEdit } from "react-icons/fa";

const PersonalInfo = ({ userData }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  if (!userData) {
    return <p>Đang tải thông tin...</p>;
  }

  const handleEditClick = () => {
    setAlertMessage({
      type: "info",
      message: "Chức năng chỉnh sửa thông tin sẽ được cập nhật sau.",
    });
  };

  const handleCloseAlert = () => {
    setAlertMessage(null);
  };

  return (
    <div>
      <h4
        className="mb-4 text-center text-primary font-weight-bold"
        style={{ fontSize: "28px" }}
      >
        Thông Tin Cá Nhân
      </h4>

      {/* Thông báo nếu có */}
      {alertMessage && (
        <Alert
          variant={alertMessage.type}
          onClose={handleCloseAlert}
          dismissible
          className="mb-4"
        >
          {alertMessage.message}
        </Alert>
      )}

      <Table bordered responsive className="shadow-sm">
        <tbody>
          <tr>
            <th>
              <FaUser /> Tài khoản
            </th>
            <td>{userData.username}</td>
          </tr>
          <tr>
            <th>
              <FaEnvelope /> Email
            </th>
            <td>
              {userData.email
                ? `${userData.email.substring(0, 4)}****@gmail.com`
                : "Không có email"}
            </td>
          </tr>
          <tr>
            <th>
              <FaPhone /> Số điện thoại
            </th>
            <td>
              {userData.phone
                ? `${userData.phone.substring(0, 4)}****`
                : "Không có số điện thoại"}
            </td>
          </tr>
          <tr>
            <th>Tên hiển thị</th>
            <td>{userData.displayName}</td>
          </tr>
          <tr>
            <th>Địa Chỉ</th>
            <td>
              {userData.address.specificAddress},{userData.address.ward},
              {userData.address.district},{userData.address.city}
            </td>
          </tr>
          <tr>
            <th>
              <FaEdit /> Mật khẩu
            </th>
            <td>****************</td>
          </tr>
        </tbody>
      </Table>

      <Button variant="warning" onClick={handleEditClick} className="float-end">
        <FaEdit /> Chỉnh sửa thông tin
      </Button>

      {/* Modal chỉnh sửa */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Chức năng chỉnh sửa sẽ được cập nhật sau. Cảm ơn bạn đã thông cảm.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => setShowEditModal(false)}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PersonalInfo;
