const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Secret key for JWT
const SECRET_KEY = "your_secret_key";

// Đăng Ký
exports.register = async (req, res) => {
  try {
    const {
      username,
      email,
      phone,
      displayName,
      password,
      confirmPassword,
      gender,
      accountType,
      address, // Thêm địa chỉ vào đây
    } = req.body;

    // Kiểm tra tài khoản tồn tại
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Tài khoản đã tồn tại!" });
    }

    // Kiểm tra email đã tồn tại
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email này đã được đăng ký!" });
    }

    // Kiểm tra số điện thoại đã tồn tại
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res
        .status(400)
        .json({ message: "Số điện thoại này đã được đăng ký!" });
    }

    // Kiểm tra tên hiển thị đã tồn tại
    const existingDisplayName = await User.findOne({ displayName });
    if (existingDisplayName) {
      return res
        .status(400)
        .json({ message: "Tên hiển thị này đã được sử dụng!" });
    }

    // Kiểm tra mật khẩu và xác nhận mật khẩu
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Mật khẩu và xác nhận mật khẩu không khớp!" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = new User({
      username,
      email,
      phone,
      displayName,
      password: hashedPassword,
      gender,
      accountType,
      address, // Lưu địa chỉ vào đây
    });

    await newUser.save();
    res.status(201).json({
      message: "Đăng ký thành công!",
      success: true,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Đã xảy ra lỗi, vui lòng thử lại sau!" });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra tài khoản
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Tài khoản không tồn tại!" });
    }

    // So khớp mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Mật khẩu không đúng!" });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Đăng nhập thành công!",
      token,
      username: user.username,
      email: user.email,
      phone: user.phone,
      displayName: user.displayName,
      gender: user.gender,
      id: user._id,
      avatar: user.avatar,
      accountType: user.accountType,
      address: user.address,
    });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi server!" });
  }
};
