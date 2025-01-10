import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders/my-orders"); // Update URL if needed
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();

    const socket = io("http://localhost:5000", {
      withCredentials: true,
    }); // WebSocket connection to the backend

    // Listen for real-time updates
    socket.on("order-updated", (updatedOrder) => {
      console.log("Order updated:", updatedOrder); // Debugging log
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    });

    return () => {
      socket.disconnect(); // Cleanup
    };
  }, []);

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-6xl mx-auto px-6 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {orders.length === 0 ? (
        <div className="text-center text-gray-300 text-lg">
          No Orders Found
        </div>
      ) : (
        <div className="overflow-x-auto">
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{order._id}</div>
                  </td>

                  {/* User Email */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-300">
                      {order.user?.email || "N/A"}
                    </div>
                  </td>

                  {/* Products */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ul className="space-y-4">
                      {order.products.map((product,index) => (
                        <li key={`${product.product._id}-${index}`} className="flex items-center space-x-4">
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg font-bold text-gray-300">
                      ${order.totalAmount.toFixed(2)}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`text-sm font-bold px-3 py-1 rounded-lg ${
                        order.status === "Pending"
                          ? "bg-orange-500 text-black"
                          : order.status === "Processing"
                          ? "bg-blue-500 text-white"
                          : order.status === "Shipped"
                          ? "bg-purple-500 text-white"
                          : order.status === "Delivered"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {order.status}
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-300">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default MyOrdersPage;
