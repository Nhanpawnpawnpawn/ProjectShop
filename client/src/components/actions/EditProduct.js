import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { FaSave } from "react-icons/fa";

const EditProduct = ({ productId, fetchProduct, updateProduct }) => {
  const [productData, setProductData] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    stars: 3,
    singleImage: null,
    multiImages: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [previewSingleImage, setPreviewSingleImage] = useState(null);
  const [previewMultiImages, setPreviewMultiImages] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const product = await fetchProduct(productId);
        setProductData(product);
        if (product.singleImage) {
          setPreviewSingleImage(product.singleImage);
        }
        if (product.multiImages && product.multiImages.length > 0) {
          setPreviewMultiImages(product.multiImages);
        }
      } catch (err) {
        setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [productId]);

  const handleInputChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e, field) => {
    const files =
      field === "multiImages" ? Array.from(e.target.files) : e.target.files[0];
    setProductData({
      ...productData,
      [field]: files,
    });

    if (field === "singleImage") {
      // Preview for single image
      setPreviewSingleImage(URL.createObjectURL(files));
    } else if (field === "multiImages") {
      // Preview for multiple images
      const imagePreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewMultiImages(imagePreviews);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    try {
      await updateProduct(productId, productData);
      setSuccess(true);
    } catch (error) {
      setError("Cập nhật sản phẩm không thành công. Vui lòng thử lại.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    );
  }

  return (
    <Card className="shadow-sm p-4">
      <h4 className="mb-4 text-center">Sửa Sản Phẩm</h4>
      {success && (
        <Alert variant="success" className="text-center">
          Cập nhật thành công!
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="productName" className="mb-3">
          <Form.Label>Tên sản phẩm</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên sản phẩm"
            name="productName"
            value={productData?.productName || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="productDescription" className="mb-3">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Nhập mô tả sản phẩm"
            name="productDescription"
            value={productData?.productDescription || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="productPrice" className="mb-3">
          <Form.Label>Giá sản phẩm</Form.Label>
          <Form.Control
            type="number"
            placeholder="Nhập giá sản phẩm"
            name="productPrice"
            value={productData?.productPrice || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group controlId="singleImage" className="mb-3">
              <Form.Label>Hình ảnh sản phẩm</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "singleImage")}
              />
              {previewSingleImage && (
                <div className="mt-3">
                  <img
                    src={previewSingleImage}
                    alt=""
                    className="mt-2"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="multiImages" className="mb-3">
              <Form.Label>Tải lên 3 hình ảnh</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(e, "multiImages")}
              />
              {previewMultiImages.length > 0 && (
                <div className="mt-3 d-flex">
                  {previewMultiImages.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt=""
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
          </Col>
        </Row>

        <div className="text-center">
          <Button variant="success" type="submit">
            <FaSave /> Lưu thay đổi
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default EditProduct;
