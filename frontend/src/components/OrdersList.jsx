import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders"); // Ensure you use `.data`
        console.log("Orders fetched:", response.data); // Check if it's an array
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`/api/orders/${orderId}/status`, { status: newStatus });
      if (response.status === 200) {
        // Update the status locally for instant feedback
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className="min-w-full divide-y divide-gray-700">
      <thead className="bg-gray-700">
  <tr>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
      Order ID
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
      User
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
      Products
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
      Total Amount
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
      Status
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
      Date
    </th>
  </tr>
</thead>

<tbody className="bg-gray-800 divide-y divide-gray-700">
      {orders.map((order) => (
        <tr key={order._id} className="hover:bg-gray-700">
          {/* Order ID */}
          <td className="px-6 py-6 whitespace-nowrap">
            <div className="text-sm font-medium text-white">{order._id}</div>
          </td>

          {/* User Email */}
          <td className="px-6 py-6 whitespace-nowrap">
            <div className="text-sm font-semibold text-gray-300">
              {order.user?.email || "N/A"}
            </div>
          </td>

          {/* Products */}
          <td className="px-6 py-6 whitespace-nowrap">
            <ul className="space-y-4">
              {order.products.map((product) => (
                <li key={product.product._id} className="flex items-center space-x-4">
                  <img
                    src={product.product.image || "/placeholder.png"}
                    alt={product.product.name}
                    className="h-16 w-16 rounded-lg object-cover shadow-md"
                  />
                  <div>
                    <div className="text-sm font-medium text-white">
                      {product.product.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      Quantity: {product.quantity} | ${product.price.toFixed(2)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </td>

          {/* Total Amount */}
          <td className="px-6 py-6 whitespace-nowrap">
            <div className="text-lg font-bold text-gray-300">
              ${order.totalAmount.toFixed(2)}
            </div>
          </td>

         {/* Status with Dropdown */}
<td className="px-6 py-6 whitespace-nowrap">
  <div className="relative">
    <select
      className={`text-sm font-bold px-3 py-2 rounded-lg ${
        order.status === "Pending"
          ? "bg-orange-500 text-black" // Ensure "Pending" is always orange
          : order.status === "Processing"
          ? "bg-blue-500 text-white"
          : order.status === "Shipped"
          ? "bg-purple-500 text-white"
          : order.status === "Delivered"
          ? "bg-green-500 text-white"
          : "bg-red-500 text-white" // Only "Cancelled" should be red
      }`}
      value={order.status}
      onChange={(e) => handleStatusChange(order._id, e.target.value)}
    >
      <option value="Pending" className="bg-white text-black">
        Pending
      </option>
      <option value="Processing" className="bg-white text-black">
        Processing
      </option>
      
      <option value="Delivered" className="bg-white text-black">
        Delivered
      </option>
      <option value="Cancelled" className="bg-white text-black">
        Cancelled
      </option>
    </select>
  </div>
</td>

          {/* Date */}
          <td className="px-6 py-6 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-300">
              {new Date(order.createdAt).toLocaleDateString()}
            </div>
          </td>
        </tr>
      ))}
    </tbody>

      </table>
    </motion.div>
  );
};

export default OrdersList;
