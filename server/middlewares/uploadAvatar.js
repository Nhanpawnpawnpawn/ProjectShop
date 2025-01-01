// middlewares/upload.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/avatars"); // Lưu trữ ảnh trong thư mục uploads/avatars
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file dựa trên thời gian
  },
});

const uploadAvatar = multer({ storage: storage });

module.exports = uploadAvatar;
