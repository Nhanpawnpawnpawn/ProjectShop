const City = require("../models/addressModel.js");

const getCities = async (req, res) => {
  try {
    const cities = await City.find({}, { name: 1, code: 1 }); // Chỉ trả về tên và mã
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách thành phố", error });
  }
};

const getDistricts = async (req, res) => {
  const { cityCode } = req.params;
  try {
    const city = await City.findOne({ name: cityCode }, { districts: 1 });
    if (!city)
      return res.status(404).json({ message: "Thành phố không tồn tại" });
    res.status(200).json(city.districts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách quận/huyện", error });
  }
};

const getWards = async (req, res) => {
  const { cityCode, districtCode } = req.params;
  try {
    const city = await City.findOne(
      { name: cityCode, "districts.name": districtCode },
      { "districts.$": 1 }
    );

    if (!city)
      return res.status(404).json({ message: "Quận/Huyện không tồn tại" });

    const wards = city.districts[0].wards;
    res.status(200).json(wards);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách phường/xã", error });
  }
};

module.exports = { getCities, getDistricts, getWards };
