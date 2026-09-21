import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity, total, itemCount } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart</h1>
        <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
        <Link
          to="/"
          className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors font-medium"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100"
          >
            <div className="flex-shrink-0 w-full sm:w-24">
              <img
                src={item.images?.[0]?.url || "https://via.placeholder.com/100x100?text=No+Image"}
                alt={item.name}
                className="w-full h-24 object-cover rounded-md"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
              <p className="text-indigo-600 font-bold mt-1">
                ${(item.discountPrice || item.price) * item.quantity}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 text-gray-600"
              >
                −
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                disabled={item.quantity >= item.stock}
                className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 text-gray-600 disabled:opacity-50"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-500 hover:text-red-700 text-sm font-medium self-end"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-lg font-bold text-gray-900">
          Total ({itemCount} items): ${total.toFixed(2)}
        </div>
        <Link
          to="/checkout"
          className="w-full sm:w-auto bg-indigo-600 text-white py-3 px-8 rounded-md hover:bg-indigo-700 transition-colors font-medium text-center"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default Cart;