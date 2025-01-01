const mongoose = require("mongoose");

const revenueSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Tham chiếu đến shop
  amount: { type: Number, required: true }, // Số tiền doanh thu
  date: { type: Date, required: true, default: Date.now }, // Ngày của giao dịch
});

module.exports = mongoose.model("Revenue", revenueSchema);
