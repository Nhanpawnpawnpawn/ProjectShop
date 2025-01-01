const mongoose = require("mongoose");

const WardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: Number, required: true, unique: true },
  codename: { type: String, required: true },
  shortCodename: { type: String },
  divisionType: { type: String, required: true },
});

const DistrictSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: Number, required: true, unique: true },
  codename: { type: String, required: true },
  shortCodename: { type: String },
  divisionType: { type: String, required: true },
  wards: [WardSchema],
});

const CitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: Number, required: true, unique: true },
  codename: { type: String, required: true },
  divisionType: { type: String, required: true },
  phoneCode: { type: Number, required: true },
  districts: [DistrictSchema],
});

const City = mongoose.model("City", CitySchema);

module.exports = City;
