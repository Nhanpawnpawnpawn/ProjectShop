import React, { useState } from "react";
import { Form, Button, Row, Col, Card, Alert } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

const AddProduct = ({ userData }) => {
  const [singleImage, setSingleImage] = useState(null);
  const [multiImages, setMultiImages] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    shopName: "",
    stars: 3, // Mặc định 3 sao
  });
  const [alertMessage, setAlertMessage] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSingleImageUpload = (e) => {
    const file = e.target.files[0];
    setSingleImage(file);
  };

  const handleMultiImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length < 3) {
      setAlertMessage({
        type: "danger",
        message: "Vui lòng tải lên ít nhất 3 hình ảnh.",
      });
    } else {
      setMultiImages(files);
      setAlertMessage(null); // Clear any error messages
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Chuẩn bị dữ liệu để gửi lên server
    const productData = new FormData();
    productData.append("productName", formData.productName);
    productData.append("productDescription", formData.productDescription);
    productData.append("productPrice", formData.productPrice);
    productData.append("shopName", userData.displayName);
    productData.append("stars", formData.stars);
    productData.append("singleImage", singleImage);
    multiImages.forEach((file, idx) => {
      productData.append(`multiImages`, file);
    });

    // Gửi yêu cầu lên server
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: productData,
      });

      if (response.ok) {
        setAlertMessage({
          type: "success",
          message: "Thêm sản phẩm thành công!",
        });
      } else {
        setAlertMessage({
          type: "danger",
          message: "Đã xảy ra lỗi khi thêm sản phẩm.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage({
        type: "danger",
        message: "Đã xảy ra lỗi. Vui lòng thử lại.",
      });
    }
  };

  return (
    <div className="container">
      <h4
        className="mb-4 text-center text-primary font-weight-bold"
        style={{ fontSize: "28px" }}
      >
        Thêm Sản Phẩm
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

      <Form onSubmit={handleSubmit}>
        <Card className="shadow-sm p-4 mb-4">
          <Row>
            <Col md={6}>
              <Form.Group controlId="productName">
                <Form.Label>Tên sản phẩm</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên sản phẩm"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="productShop">
                <Form.Label>Tên shop</Form.Label>
                <Form.Control
                  type="text"
                  value={userData.displayName}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="productDescription" className="mt-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Nhập mô tả sản phẩm"
              name="productDescription"
              value={formData.productDescription}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Row className="mt-3">
            <Col md={6}>
              <Form.Group controlId="productPrice">
                <Form.Label>Giá sản phẩm</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Nhập giá sản phẩm"
                  name="productPrice"
                  value={formData.productPrice}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="stars">
                <Form.Label>Số sao đánh giá</Form.Label>
                <Form.Control type="text" value="3 Sao" disabled />
              </Form.Group>
            </Col>
          </Row>
        </Card>

        {/* Hình ảnh sản phẩm */}
        <Card className="shadow-sm p-4 mb-4">
          <Form.Group controlId="singleImage">
            <Form.Label>Hình ảnh chính sản phẩm</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleSingleImageUpload}
            />
            {singleImage && (
              <img
                src={URL.createObjectURL(singleImage)}
                alt="Preview"
                className="mt-2"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            )}
          </Form.Group>

          <Form.Group controlId="multiImages" className="mt-3">
            <Form.Label>Tải lên ít nhất 3 hình ảnh</Form.Label>
            <Form.Control
              type="file"
              multiple
              accept="image/*"
              onChange={handleMultiImageUpload}
            />
            {multiImages.length > 0 && (
              <div className="mt-2">
                {multiImages.map((file, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${idx + 1}`}
                    className="me-2"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                ))}
              </div>
            )}
          </Form.Group>
        </Card>

        {/* Submit Button */}
        <Button variant="success" type="submit" className="mt-4 float-end">
          <FaPlus /> Thêm sản phẩm
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
