import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table, Button, Modal, Form } from "react-bootstrap";

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
    <div>
      <h3>Đơn Hàng Của Shop {shopName}</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã Đơn</th>
            <th>Tên Sp</th>
            <th>Khách Hàng</th>
            <th>Địa Chỉ Khách Hàng</th>
            <th>SĐT</th>
            <th>Tổng Tiền</th>
            <th>Trạng Thái</th>
            <th>Shipper</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(shopOrders) && shopOrders.length > 0 ? (
            shopOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.productName}</td>
                <td>{order.customerName}</td>
                <td>{order.address}</td>
                <td>{order.phone}</td>
                <td>{order.totalAmount.toLocaleString()} VND</td>
                <td>{order.status}</td>
                <td>
                  {order.shipper !== "Chưa Có" ? (
                    <span>{order.shipper}</span>
                  ) : (
                    <Button
                      onClick={() => {
                        setSelectedOrder(order._id);
                        setShowModal(true);
                      }}
                    >
                      Chọn Shipper
                    </Button>
                  )}
                </td>
                <td>
                  {order.shipper && order.status === "Đặt Hàng" && (
                    <Button
                      onClick={() => approveOrder(order._id, order.shipper)}
                      className="me-2"
                    >
                      Duyệt Đơn
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

      {/* Modal to select shipper */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chọn Shipper</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Chọn Shipper</Form.Label>
            <Form.Select
              value={selectedShipper}
              onChange={(e) => setSelectedShipper(e.target.value)}
            >
              <option value="">Chọn...</option>
              {shippers.map((shipper) => (
                <option key={shipper._id} value={shipper.displayName}>
                  {shipper.displayName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={assignShipper}>
            Giao Shipper
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShopOrders;
