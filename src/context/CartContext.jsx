// src/context/CartContext.jsx
import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); 
  // item: { productId, nombre, precio, imagenUrl, cantidad }

  function addItem(producto, qty) {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.productId === producto.productId);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], cantidad: copy[i].cantidad + qty };
        return copy;
        }
      return [...prev, { ...producto, cantidad: qty }];
    });
  }

  function removeItem(productId) {
    setItems((prev) => prev.filter((x) => x.productId !== productId));
  }

  function clear() {
    setItems([]);
  }

  const totalQty = useMemo(
    () => items.reduce((a, b) => a + b.cantidad, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((a, b) => a + b.cantidad * b.precio, 0),
    [items]
  );

  const value = { items, addItem, removeItem, clear, totalQty, totalPrice };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
