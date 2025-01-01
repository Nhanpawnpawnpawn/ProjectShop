const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  displayName: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  accountType: {
    type: String,
    enum: ["personal", "shop", "shipper"],
    required: true,
  },
  avatar: { type: String },
  address: {
    city: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String, required: true },
    specificAddress: { type: String, required: true },
  },
});

module.exports = mongoose.model("User", userSchema);
