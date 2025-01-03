import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ShopOrders = () => {
  const { shopName } = useParams();
  const [shopOrders, setShopOrders] = useState([]);
  const [shippers, setShippers] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedShipper, setSelectedShipper] = useState("");
  const [showModal, setShowModal] = useState(false);
  const storedUserData = JSON.parse(localStorage.getItem("user"));

  // Get Đơn Hàng
  useEffect(() => {
    const fetchShopOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/orders/shop/${shopName}`
        );
        const data = await response.json();
        setShopOrders(data);
      } catch (error) {
        console.error("Error fetching shop orders:", error);
      }
    };

    fetchShopOrders();
  }, [shopName]);

  // Get Shipper
  useEffect(() => {
    const fetchShippers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/shippers`);
        const data = await response.json();
        setShippers(data);
      } catch (error) {
        console.error("Error fetching shippers:", error);
      }
    };

    fetchShippers();
  }, []);

  // Duyệt Đơn
  const approveOrder = async (orderId, shipper) => {
    if (shipper === "Chưa Có") {
      alert("Vui lòng chọn shipper trước khi duyệt đơn!");
      return;
    }
    try {
      await fetch(`http://localhost:3000/api/orders/${orderId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "Đang Vận Chuyển",
          shipper,
          addressshop:
            storedUserData.address.specificAddress +
            "," +
            storedUserData.address.ward +
            "," +
            storedUserData.address.district +
            "," +
            storedUserData.address.city,
          phoneshop: storedUserData.phone,
        }),
      });

      setShopOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: "Đang Vận Chuyển",
              }
            : order
        )
      );
    } catch (error) {
      console.error("Error approving order:", error);
    }
  };

  // Set Shipper
  const assignShipper = async () => {
    if (!selectedOrder || !selectedShipper) return;

    try {
      await fetch(`http://localhost:3000/api/orders/${selectedOrder}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shipper: selectedShipper }),
      });

      setShopOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrder
            ? { ...order, shipper: selectedShipper }
            : order
        )
      );
      setShowModal(false); // Close modal
    } catch (error) {
      console.error("Error assigning shipper:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 border border-gray-300 rounded-md">
      <h3 className="text-xl font-bold mb-4">Đơn Hàng Của Shop {shopName}</h3>
      <div className="overflow-x-auto border border-gray-300 rounded-md">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border-b border-gray-300">Mã Đơn</th>
              <th className="px-4 py-2 border-b border-gray-300">Tên SP</th>
              <th className="px-4 py-2 border-b border-gray-300">Khách Hàng</th>
              <th className="px-4 py-2 border-b border-gray-300">
                Địa Chỉ Khách Hàng
              </th>
              <th className="px-4 py-2 border-b border-gray-300">SĐT</th>
              <th className="px-4 py-2 border-b border-gray-300">Tổng Tiền</th>
              <th className="px-4 py-2 border-b border-gray-300">Trạng Thái</th>
              <th className="px-4 py-2 border-b border-gray-300">Shipper</th>
              <th className="px-4 py-2 border-b border-gray-300">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(shopOrders) && shopOrders.length > 0 ? (
              shopOrders.map((order) => (
                <tr key={order._id} className="odd:bg-white even:bg-gray-50">
                  <td className="px-4 py-2 border-b border-gray-300">
                    {order._id}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {order.productName}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {order.customerName}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {order.address}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {order.phone}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {order.totalAmount.toLocaleString()} VND
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {order.status}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {order.shipper !== "Chưa Có" ? (
                      <span>{order.shipper}</span>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedOrder(order._id);
                          setShowModal(true);
                        }}
                        className="text-blue-500 hover:underline"
                      >
                        Chọn Shipper
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {order.shipper && order.status === "Đặt Hàng" && (
                      <button
                        onClick={() => approveOrder(order._id, order.shipper)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Duyệt Đơn
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="px-4 py-2 text-center border-b border-gray-300"
                >
                  Không có đơn hàng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal to select shipper */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Chọn Shipper</h3>
            <div className="mb-4">
              <label htmlFor="shipper" className="block font-medium mb-2">
                Chọn Shipper
              </label>
              <select
                id="shipper"
                value={selectedShipper}
                onChange={(e) => setSelectedShipper(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Chọn...</option>
                {shippers.map((shipper) => (
                  <option key={shipper._id} value={shipper.displayName}>
                    {shipper.displayName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
              >
                Đóng
              </button>
              <button
                onClick={assignShipper}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Giao Shipper
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopOrders;
