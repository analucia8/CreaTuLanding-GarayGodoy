import { useState } from "react";
import { useCart } from "../context/CartContext";
import { createOrderWithStockCheck } from "../services/firestore";
import CheckoutForm from "./CheckoutForm";

export default function Checkout() {
  const { items, clear } = useCart();
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleConfirm(buyer) {
    try {
      setLoading(true);
      setError(null);

      const orderItems = items.map((it) => ({
        productId: it.productId,
        nombre: it.nombre,
        precio: it.precio,
        cantidad: it.cantidad,
      }));

      const id = await createOrderWithStockCheck({ buyer, items: orderItems });
      setOrderId(id);
      clear();
    } catch (e) {
      setError(e.message || "No se pudo generar la orden");
    } finally {
      setLoading(false);
    }
  }

  if (orderId) {
    return (
      <section style={{ padding: 24, color: "#fff", textAlign: "center" }}>
        <h2>¡Gracias por tu compra!</h2>
        <p>ID de orden: <strong>{orderId}</strong></p>
        <p>Te llegará un correo con los detalles.</p>
      </section>
    );
  }

  if (!items.length) {
    return <p style={{ padding: 24, color: "#fff", textAlign: "center" }}>Carrito vacío</p>;
  }

  return (
    <section style={{ padding: 24, color: "#fff" }}>
      <h2 style={{ textAlign: "center", marginBottom: 16 }}>Checkout</h2>
      {loading && <p>Generando orden...</p>}
      {error && <p style={{ color: "tomato" }}>{error}</p>}
      <CheckoutForm onConfirm={handleConfirm} />
    </section>
  );
}
