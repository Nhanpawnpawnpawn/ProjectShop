const Revenue = require("../models/Revenue");
const User = require("../models/User");

const updateShopRevenue = async (req, res) => {
  const { shopName } = req.params;
  const { amount } = req.body;

  try {
    // Tìm shop theo tên
    const shop = await User.findOne({ displayName: shopName });
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Tìm doanh thu hiện tại của shop
    const existingRevenue = await Revenue.findOne({ shopId: shop._id }).sort({
      date: -1,
    });

    if (existingRevenue) {
      // Cập nhật doanh thu hiện tại bằng cách cộng dồn amount vào tổng doanh thu
      existingRevenue.amount += amount;
      await existingRevenue.save();
    } else {
      // Nếu không có doanh thu trước đó, tạo một bản ghi doanh thu mới
      const newRevenue = new Revenue({
        shopId: shop._id,
        amount: amount,
        date: new Date(),
      });

      await newRevenue.save();
    }

    res.status(200).json({ message: "Shop revenue updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating shop revenue" });
  }
};

// API để lấy doanh thu theo ngày/tháng
const getRevenue = async (req, res) => {
  const { shopName } = req.params; // Lấy shopName từ route parameter
  const { filter } = req.query; // Lấy filter từ query parameter

  try {
    // Tìm shop dựa trên tên shop
    const shop = await User.findOne({ displayName: shopName });
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Tạo điều kiện truy vấn dựa trên filter (theo tháng hoặc theo ngày)
    let revenueData = [];
    if (filter === "month") {
      // Truy vấn theo tháng
      revenueData = await Revenue.aggregate([
        { $match: { shopId: shop._id } },
        {
          $group: {
            _id: { $month: "$date" }, // Nhóm theo tháng
            totalAmount: { $sum: "$amount" },
          },
        },
        { $sort: { _id: 1 } }, // Sắp xếp theo tháng
      ]);
    } else if (filter === "day") {
      // Truy vấn theo ngày
      revenueData = await Revenue.aggregate([
        { $match: { shopId: shop._id } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, // Nhóm theo ngày
            totalAmount: { $sum: "$amount" },
          },
        },
        { $sort: { _id: 1 } }, // Sắp xếp theo ngày
      ]);
    }

    // Đảm bảo trả về mảng doanh thu
    res.json(
      revenueData.map((entry) => ({
        label: entry._id,
        amount: entry.totalAmount,
      }))
    );
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    res.status(500).json({ message: "Error fetching revenue data" });
  }
};

module.exports = { updateShopRevenue, getRevenue };
