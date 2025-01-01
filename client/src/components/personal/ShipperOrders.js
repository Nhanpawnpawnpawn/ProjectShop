import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

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
      // Gửi yêu cầu cập nhật trạng thái đơn hàng
      const response = await fetch(
        `http://localhost:3000/api/orders/${orderId}/deliver`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        // Sau khi đơn hàng được đánh dấu là đã giao, cập nhật doanh thu của shop
        await fetch(`http://localhost:3000/api/revenue/${shopName}/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: totalAmount }),
        });
        // Cập nhật lại trạng thái đơn hàng trong giao diện
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
    <div>
      <h3>Đơn Hàng Của Shipper {shopName}</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã Đơn</th>
            <th>Sản Phẩm</th>
            <th>Tên Shop</th>
            <th>Khách Hàng</th>
            <th>Địa Chỉ</th>
            <th>Tổng Tiền</th>
            <th>Trạng Thái</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(shipperOrders) && shipperOrders.length > 0 ? (
            shipperOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.productName}</td>
                <td>{order.shopName}</td>
                <td>{order.customerName}</td>
                <td>{order.address}</td>
                <td>{order.totalAmount.toLocaleString()} VND</td>
                <td>{order.status}</td>
                <td>
                  {order.status !== "Đã Giao" && (
                    <Button
                      onClick={() =>
                        markAsDelivered(
                          order._id,
                          order.shopName,
                          order.totalAmount
                        )
                      }
                    >
                      Đã Giao
                    </Button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                Không có đơn hàng nào
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ShipperOrders;
