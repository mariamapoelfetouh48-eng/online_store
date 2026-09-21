import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const { cart, total, clearCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      try {
        const response = await api.get("/orders");
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [user]);

  async function handleCheckout() {
    if (cart.length === 0) return;
    try {
      const response = await api.post("/orders", {
        items: cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          price: item.discountPrice || item.price,
        })),
        totalPrice: total,
      });
      setOrders((prev) => [response.data, ...prev]);
      clearCart();
    } catch (err) {
      setError(err.response?.data?.message || "Checkout failed");
    }
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500 text-lg">Please log in to view your orders.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No orders yet.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {cart.length > 0 ? (
              <button
                onClick={handleCheckout}
                className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors font-medium"
              >
                Checkout Your Cart (${total.toFixed(2)})
              </button>
            ) : (
              <Link
                to="/"
                className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors font-medium"
              >
                Browse Products
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID: {order._id}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-lg font-bold text-indigo-600">
                  ${order.totalPrice?.toFixed(2) || "N/A"}
                </span>
              </div>
              <div className="space-y-2">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>{item.productId?.name || "Product"} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {cart.length > 0 && (
            <div className="mt-6 border-t pt-6">
              <h2 className="text-xl font-bold mb-4">Cart Total: ${total.toFixed(2)}</h2>
              <button
                onClick={handleCheckout}
                className="w-full sm:w-auto bg-indigo-600 text-white py-3 px-8 rounded-md hover:bg-indigo-700 transition-colors font-medium"
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Orders;