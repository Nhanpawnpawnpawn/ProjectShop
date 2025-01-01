const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productDescription: { type: String },
    productPrice: { type: Number, required: true },
    shopName: { type: String, required: true },
    stars: { type: Number, default: 3 }, // Mặc định 3 sao
    singleImage: { type: String },
    multiImages: [String],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
