import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CustomerOrders = () => {
  const { shopName } = useParams();
  const [customerOrders, setCustomerOrders] = useState([]);

  useEffect(() => {
    const fetchCustomerOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/orders/customer/${shopName}`
        );
        const data = await response.json();
        setCustomerOrders(data);
      } catch (error) {
        console.error("Error fetching customer orders:", error);
      }
    };

    fetchCustomerOrders();
  }, [shopName]);

  const rateProduct = (orderId) => {
    alert(`Đánh giá sản phẩm cho đơn hàng: ${orderId}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-bold mb-6 text-center">
        Đơn Hàng Của {shopName}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300">Mã Đơn</th>
              <th className="px-4 py-2 border border-gray-300">Sản Phẩm</th>
              <th className="px-4 py-2 border border-gray-300">Tổng Tiền</th>
              <th className="px-4 py-2 border border-gray-300">Trạng Thái</th>
              <th className="px-4 py-2 border border-gray-300">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(customerOrders) && customerOrders.length > 0 ? (
              customerOrders.map((order) => (
                <tr key={order._id} className="odd:bg-white even:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">
                    {order._id}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {order.productName}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {order.totalAmount.toLocaleString()} VND
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {order.status}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <button
                      onClick={() => rateProduct(order.productName)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Đánh Giá
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-2 text-center border border-gray-300"
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

export default CustomerOrders;
