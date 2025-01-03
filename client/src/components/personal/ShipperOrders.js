import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ShipperOrders = () => {
  const { shopName } = useParams();
  const [shipperOrders, setShipperOrders] = useState([]);

  useEffect(() => {
    const fetchShipperOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/orders/shipper/${shopName}`
        );
        const data = await response.json();
        setShipperOrders(data);
      } catch (error) {
        console.error("Error fetching shipper orders:", error);
      }
    };

    fetchShipperOrders();
  }, [shopName]);

  const markAsDelivered = async (orderId, shopName, totalAmount) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/orders/${orderId}/deliver`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        await fetch(`http://localhost:3000/api/revenue/${shopName}/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: totalAmount }),
        });

        setShipperOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: "Đã Giao" } : order
          )
        );
      }
    } catch (error) {
      console.error("Error marking order as delivered:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="text-xl font-bold mb-6">
        Đơn Hàng Của Shipper {shopName}
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">Mã Đơn</th>
              <th className="px-4 py-2 border">Sản Phẩm</th>
              <th className="px-4 py-2 border">Tên Shop</th>
              <th className="px-4 py-2 border">Địa Chỉ Shop</th>
              <th className="px-4 py-2 border">SĐT Shop</th>
              <th className="px-4 py-2 border">Khách Hàng</th>
              <th className="px-4 py-2 border">Địa Chỉ KH</th>
              <th className="px-4 py-2 border">SĐT KH</th>
              <th className="px-4 py-2 border">Tổng Tiền</th>
              <th className="px-4 py-2 border">Trạng Thái</th>
              <th className="px-4 py-2 border">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(shipperOrders) && shipperOrders.length > 0 ? (
              shipperOrders.map((order) => (
                <tr
                  key={order._id}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                >
                  <td className="px-4 py-2 border">{order._id}</td>
                  <td className="px-4 py-2 border">{order.productName}</td>
                  <td className="px-4 py-2 border">{order.shopName}</td>
                  <td className="px-4 py-2 border">{order.addressshop}</td>
                  <td className="px-4 py-2 border">{order.phoneshop}</td>
                  <td className="px-4 py-2 border">{order.customerName}</td>
                  <td className="px-4 py-2 border">{order.address}</td>
                  <td className="px-4 py-2 border">{order.phone}</td>
                  <td className="px-4 py-2 border">
                    {order.totalAmount.toLocaleString()} VND
                  </td>
                  <td className="px-4 py-2 border">{order.status}</td>
                  <td className="px-4 py-2 border">
                    {order.status !== "Đã Giao" && (
                      <button
                        onClick={() =>
                          markAsDelivered(
                            order._id,
                            order.shopName,
                            order.totalAmount
                          )
                        }
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Đã Giao
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="11"
                  className="px-4 py-2 text-center text-gray-500"
                >
                  Không có đơn hàng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipperOrders;
