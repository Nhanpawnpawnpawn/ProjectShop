// middlewares/upload.js
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).fields([
  { name: "singleImage", maxCount: 1 },
  { name: "multiImages", maxCount: 3 },
]);

module.exports = upload;
