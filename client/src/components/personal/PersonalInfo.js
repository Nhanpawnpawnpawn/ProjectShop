import React, { useState } from "react";
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
      <h4 className="mb-4 text-center text-blue-600 font-bold text-2xl">
        Thông Tin Cá Nhân
      </h4>

      {/* Thông báo nếu có */}
      {alertMessage && (
        <div className={`alert-${alertMessage.type} mb-4 p-4 border-l-4`}>
          <div className="flex items-center">
            <span className="font-medium text-lg">{alertMessage.message}</span>
            <button
              className="ml-auto text-gray-500"
              onClick={handleCloseAlert}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <table className="table-auto w-full border border-gray-300 rounded-lg shadow-sm">
        <tbody>
          <tr className="border-b border-gray-300">
            <th className="px-4 py-2 font-medium text-left">
              <FaUser className="inline-block mr-2" /> Tài khoản
            </th>
            <td className="px-4 py-2">{userData.username}</td>
          </tr>
          <tr className="border-b border-gray-300">
            <th className="px-4 py-2 font-medium text-left">
              <FaEnvelope className="inline-block mr-2" /> Email
            </th>
            <td className="px-4 py-2">
              {userData.email
                ? `${userData.email.substring(0, 4)}****@gmail.com`
                : "Không có email"}
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <th className="px-4 py-2 font-medium text-left">
              <FaPhone className="inline-block mr-2" /> Số điện thoại
            </th>
            <td className="px-4 py-2">
              {userData.phone
                ? `${userData.phone.substring(0, 4)}****`
                : "Không có số điện thoại"}
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <th className="px-4 py-2 font-medium text-left">Tên hiển thị</th>
            <td className="px-4 py-2">{userData.displayName}</td>
          </tr>
          <tr className="border-b border-gray-300">
            <th className="px-4 py-2 font-medium text-left">Địa Chỉ</th>
            <td className="px-4 py-2">
              {userData.address.specificAddress},{userData.address.ward},
              {userData.address.district},{userData.address.city}
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <th className="px-4 py-2 font-medium text-left">
              <FaEdit className="inline-block mr-2" /> Mật khẩu
            </th>
            <td className="px-4 py-2">****************</td>
          </tr>
        </tbody>
      </table>

      <button
        className="mt-4 px-6 py-2 bg-yellow-500 text-white font-medium rounded-md shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        onClick={handleEditClick}
      >
        <FaEdit className="inline-block mr-2" /> Chỉnh sửa thông tin
      </button>

      {/* Modal chỉnh sửa */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h5 className="font-bold text-lg">Chỉnh sửa thông tin</h5>
              <button
                className="text-gray-600"
                onClick={() => setShowEditModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="mb-4">
              Chức năng chỉnh sửa sẽ được cập nhật sau. Cảm ơn bạn đã thông cảm.
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={() => setShowEditModal(false)}
              >
                Đóng
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => setShowEditModal(false)}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
