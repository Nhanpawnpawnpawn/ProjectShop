import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

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
    <div>
      <h3>Đơn Hàng Của {shopName}</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã Đơn</th>
            <th>Sản Phẩm</th>
            <th>Tổng Tiền</th>
            <th>Trạng Thái</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(customerOrders) && customerOrders.length > 0 ? (
            customerOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.productName}</td>
                <td>{order.totalAmount.toLocaleString()} VND</td>
                <td>{order.status}</td>
                <td>
                  <Button onClick={() => rateProduct(order.productName)}>
                    Đánh Giá
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Không có đơn hàng nào
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomerOrders;
