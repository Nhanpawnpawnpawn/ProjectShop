const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const AttributeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productDescription: { type: String },
    productPrice: { type: Number, required: true },
    shopName: { type: String, required: true },
    stars: { type: Number, default: 3 }, // Mặc định 3 sao
    type: { type: String, required: true },
    singleImage: { type: String },
    multiImages: [String],
    attributes: [AttributeSchema],
    sizes: [String],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
