import { createContext, useContext, useState } from "react";

const CartContext = createContext();



export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

const addToCart = (product) => {
  const exists = cart.find((item) => item.id === product.id);

  if (exists) return; // do nothing if already exists

  setCart([
    ...cart,
    { 
      ...product,
      quantity: product.quantity ? product.quantity : 1  // ⭐ use quantity from ProductDetail
    }
  ]);
};

const increaseQty = (id) => {
  setCart(
    cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.min(5, item.quantity + 1) } // ⭐ MAX = 5
        : item
    )
  );
};



  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, decreaseQty, increaseQty }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
