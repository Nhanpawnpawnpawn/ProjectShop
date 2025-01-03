const User = require("../models/User");
const path = require("path");
const fs = require("fs");

// Controller để xử lý cập nhật avatar
const updateAvatar = async (req, res) => {
  try {
    const { userId } = req.body; // Lấy userId từ body request
    if (!req.file) {
      return res.status(400).json({ message: "Không có file được tải lên" });
    }

    // Tìm người dùng theo ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    // Đường dẫn avatar mới
    const avatarPath = `/uploads/avatars/${req.file.filename}`;

    // Xóa avatar cũ nếu có
    if (user.avatar) {
      const oldPath = path.join(__dirname, "../", user.avatar);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath); // Xóa file avatar cũ khỏi server
      }
    }

    // Cập nhật avatar trong cơ sở dữ liệu
    user.avatar = avatarPath;
    await user.save();
    res.status(200).json({
      message: "Avatar được cập nhật thành công",
      avatar: avatarPath, // Trả về đường dẫn avatar mới
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi trong quá trình cập nhật avatar" });
  }
};

// Controller: Lấy thông tin shop theo tên shop
const getShopByShopName = async (req, res) => {
  const { shopName } = req.params; // Lấy ID từ URL
  try {
    const user = await User.find({ displayName: shopName });
    if (!user) {
      return res.status(404).json({ error: "Không tìm thông tin shop" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getShippers = async (req, res) => {
  try {
    const shippers = await User.find({ accountType: "shipper" }).select(
      "displayName"
    );
    res.json(shippers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shippers", error });
  }
};

module.exports = {
  getShippers,
  getShopByShopName,
  updateAvatar,
};
