const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  customerName: { type: String, required: true },
  shopName: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  address: { type: String, required: true },
  status: { type: String, default: "Đặt hàng" },
  shipper: { type: String, default: "Chưa Có" },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
