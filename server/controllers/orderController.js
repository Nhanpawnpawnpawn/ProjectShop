const Order = require("../models/oderModel");

const createOrder = async (req, res) => {
  const {
    productName,
    customerName,
    shopName,
    totalAmount,
    address,
    status,
    shipper,
  } = req.body;
  if (
    !productName ||
    !customerName ||
    !shopName ||
    !totalAmount ||
    !address ||
    !status
  ) {
    return res
      .status(400)
      .json({ message: "Vui lòng cung cấp đầy đủ thông tin!" });
  }

  try {
    const newOrder = new Order({
      productName,
      customerName,
      shopName,
      totalAmount,
      address,
      status,
      shipper,
    });

    await newOrder.save();

    res.status(201).json({ message: "Đặt hàng thành công!", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi đặt hàng!" });
  }
};

// Controller: Hiển thị đơn hàng theo tên khách hàng
const getOrdersByCustomer = async (req, res) => {
  const { shopName } = req.params; // Lấy tên khách hàng từ đường dẫn

  try {
    const orders = await Order.find({
      customerName: shopName,
    })
      .sort({ createdAt: -1 }) // Sắp xếp theo thời gian mới nhất
      .select("_id shopName totalAmount status createdAt productName"); // Chỉ lấy các trường cần thiết

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy đơn hàng cho khách hàng này." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng của khách hàng:", error);
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi lấy danh sách đơn hàng." });
  }
};

// Controller: Hiển thị đơn hàng theo tên shop
const getOrdersByShop = async (req, res) => {
  const { shopName } = req.params; // Lấy tên shop từ đường dẫn

  try {
    const orders = await Order.find({ shopName })
      .sort({ createdAt: -1 }) // Sắp xếp theo thời gian mới nhất
      .select(
        "_id customerName address totalAmount status shipper createdAt productName"
      ); // Chỉ lấy các trường cần thiết

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy đơn hàng cho shop này." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng của shop:", error);
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi lấy danh sách đơn hàng." });
  }
};

// Controller: Hiển thị đơn hàng theo tên shipper
const getOrdersByShipper = async (req, res) => {
  const { shopName } = req.params; // Lấy tên shipper từ đường dẫn

  try {
    const orders = await Order.find({ shipper: shopName })
      .sort({ createdAt: -1 }) // Sắp xếp theo thời gian mới nhất
      .select(
        "_id shopName customerName address totalAmount status createdAt productName"
      ); // Chỉ lấy các trường cần thiết

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy đơn hàng cho shipper này." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng của shipper:", error);
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi lấy danh sách đơn hàng." });
  }
};

// Cập nhật trạng thái Đang Vận Chuyển
const approveOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { shipper } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "Đang Vận Chuyển";
    order.shipper = shipper;

    await order.save();
    res.json({ message: "Order approved and shipper assigned", order });
  } catch (error) {
    res.status(500).json({ message: "Error approving order", error });
  }
};

// Cập nhật trạng thái Đẫ Giao Hàng
const markOrderAsDelivered = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Cập nhật trạng thái đơn hàng thành "Đã Giao"
    order.status = "Đã Giao";
    await order.save();

    res.status(200).json({ message: "Order marked as delivered" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating order status" });
  }
};

module.exports = {
  markOrderAsDelivered,
  approveOrder,
  createOrder,
  getOrdersByCustomer,
  getOrdersByShop,
  getOrdersByShipper,
};
