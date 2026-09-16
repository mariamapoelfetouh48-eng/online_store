
import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((oldCart) => [...oldCart, product]);
  }

  function removeFromCart(productId) {
    setCart((oldCart) =>
      oldCart.filter((product) => product.id !== productId)
    );
  }

  function updateQuantity(productId, quantity) {
    setCart((oldCart) =>
      oldCart.map((product) =>
        product.id === productId
          ? { ...product, quantity: quantity }
          : product
      )
    );
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

