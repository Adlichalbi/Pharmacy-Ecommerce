import Order from "../models/order.model.js";

export const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find({})
      .populate("user", "email")
      .populate("products.product", "name image");
      if (!orders || !Array.isArray(orders)) {
        return res.status(404).json({ message: "No orders found" });
      }
      console.log("Orders fetched successfully:", orders);
      return res.status(200).json(orders);
    } catch (error) {
      console.error("Error in getAllOrders controller:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    const allowedStatuses = ["Pending", "Processing", "Delivered", "Cancelled"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
  
    try {
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      order.status = status;
      await order.save();
  
      res.status(200).json({ message: "Status updated successfully", order });
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };