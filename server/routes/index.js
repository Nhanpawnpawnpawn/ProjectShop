// Import Thư Viên
const express = require("express");
const router = express.Router();
const path = require("path");
// Import Controller
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const orderController = require("../controllers/orderController");
const revenueController = require("../controllers/revenueController");
const addressController = require("../controllers/addressController");
//Cấu hình multer để lưu ảnh
const uploadFields = require("../middlewares/upload");
const uploadAvatar = require("../middlewares/uploadAvatar");

// Định nghĩa các route
router.post("/products", uploadFields, productController.addProduct);
router.get("/products/", productController.getProducts);
router.get("/products/:id", productController.getProductById);
router.get("/productshop/:shopName", productController.getProductByShopName);
router.get("/shop/:shopName", userController.getShopByShopName);

// Route Đăng Nhập và Đăng Ký
router.post("/register", authController.register);
router.post("/login", authController.login);

// Route Update Avatar
router.post(
  "/users/update-avatar",
  uploadAvatar.single("avatar"),
  userController.updateAvatar
);

// Route Sửa Xoá Sản Phẩm
router.delete("/products/:id", productController.deleteProduct);
router.put("/products/:id", uploadFields, productController.updateProduct);

// Route Đặc Hàng
router.post("/orders", orderController.createOrder);
router.get("/orders/shop/:shopName", orderController.getOrdersByShop);
router.get("/orders/shipper/:shopName", orderController.getOrdersByShipper);
router.get("/orders/customer/:shopName", orderController.getOrdersByCustomer);
router.get("/shippers", userController.getShippers);
router.post("/orders/:orderId", orderController.approveOrder);
router.post("/orders/:orderId/deliver", orderController.markOrderAsDelivered);
// Cập nhật doanh thu của shop (cộng dồn doanh thu)
router.post("/revenue/:shopName/update", revenueController.updateShopRevenue);
router.get("/revenue/:shopName", revenueController.getRevenue);

// Route lấy Thành Phố Quận Huyện Phường Xã
router.get("/cities", addressController.getCities); // Lấy danh sách Thành phố
router.get("/districts/:cityCode", addressController.getDistricts); // Lấy danh sách Quận/Huyện
router.get("/wards/:cityCode/:districtCode", addressController.getWards); // Lấy danh sách Phường/Xã

module.exports = router;
