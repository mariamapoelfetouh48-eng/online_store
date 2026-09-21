import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    setCart((oldCart) => {
      const existing = oldCart.find((item) => item._id === product._id);
      if (existing) {
        return oldCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...oldCart, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart((oldCart) => oldCart.filter((product) => product._id !== productId));
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((oldCart) =>
      oldCart.map((product) =>
        product._id === productId
          ? { ...product, quantity }
          : product
      )
    );
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem("cart");
  }

  const total = cart.reduce(
    (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
    0
  );

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
        loading,
        setLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}