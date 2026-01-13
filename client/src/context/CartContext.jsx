import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { token } = useAuth(); // ✅ reactive token

  const normalizeCartItems = (items) => {
    if (!Array.isArray(items)) return [];
    return items.map((it) => ({
      id: it.productId?._id || it.productId,
      title: it.title || it.productId?.name || "",
      img: it.img || it.productId?.images?.[0] || "",
      price: Number(it.price || it.productId?.offerPrice || it.productId?.price || 0),
      oldPrice: Number(it.oldPrice || it.productId?.price || 0),
      quantity: Number(it.quantity || 1),
    }));
  };

  // 🔥 AUTO LOAD ON LOGIN / LOGOUT
  useEffect(() => {
    if (!token) {
      setCart([]);
      return;
    }

    loadCart();
  }, [token]); // ✅ KEY FIX

  const loadCart = async () => {
    try {
      const res = await api.get("/cart");
      const items = res?.data?.cart?.items || [];
      setCart(normalizeCartItems(items));
    } catch {
      setCart([]);
    }
  };

  const addToCart = async (product) => {
    if (!token) return;

    const exists = cart.find((item) => item.id === product.id);
    if (exists) return;

    const res = await api.post("/cart/items", {
      productId: product.id,
      quantity: product.quantity || 1,
    });

    setCart(normalizeCartItems(res?.data?.cart?.items || []));
  };

  const increaseQty = async (id) => {
    if (!token) return;
    const item = cart.find((x) => x.id === id);
    if (!item) return;

    const res = await api.patch(`/cart/items/${id}`, {
      quantity: Math.min(5, item.quantity + 1),
    });

    setCart(normalizeCartItems(res?.data?.cart?.items || []));
  };

  const decreaseQty = async (id) => {
    if (!token) return;
    const item = cart.find((x) => x.id === id);
    if (!item) return;

    const res = await api.patch(`/cart/items/${id}`, {
      quantity: Math.max(1, item.quantity - 1),
    });

    setCart(normalizeCartItems(res?.data?.cart?.items || []));
  };

  const removeFromCart = async (id) => {
    if (!token) return;

    const res = await api.delete(`/cart/items/${id}`);
    setCart(normalizeCartItems(res?.data?.cart?.items || []));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, decreaseQty, increaseQty, loadCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
