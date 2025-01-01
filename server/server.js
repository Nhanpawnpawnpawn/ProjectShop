const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const Routes = require("./routes/index");
const path = require("path");

const app = express();
const port = 5000;

// Cấu hình middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kết nối MongoDB
connectDB();

// Cung cấp thư mục tĩnh cho file ảnh
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Sử dụng routes
app.use("/api", Routes);

// Khởi động server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
