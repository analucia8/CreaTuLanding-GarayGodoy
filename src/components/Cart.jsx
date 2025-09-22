// src/components/Cart.jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, totalPrice, removeItem, clear } = useCart();

  if (!items.length) {
    return (
      <section style={{ padding: 24 }}>
        <h2 style={{ color: "#fff", textAlign: "center" }}>Carrito</h2>
        <p style={{ color: "#fff", textAlign: "center" }}>Carrito vacío</p>
        <p style={{ textAlign: "center" }}>
          <Link to="/" className="btn btn--outline">
            ← Volver al catálogo
          </Link>
        </p>
      </section>
    );
  }

  return (
    <section style={{ padding: 24 }}>
      <h2 style={{ color: "#fff", textAlign: "center", marginBottom: 16 }}>Carrito</h2>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((it) => (
          <li
            key={it.productId}
            style={{
              display: "grid",
              gridTemplateColumns: "72px 1fr auto",
              gap: 12,
              alignItems: "center",
              background: "rgba(255,255,255,0.45)",
              border: "1px solid rgba(255,255,255,0.35)",
              borderRadius: 12,
              padding: 12,
              marginBottom: 12,
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <img
              src={it.imagenUrl}
              alt=""
              width={72}
              height={54}
              style={{ objectFit: "cover", borderRadius: 8 }}
            />
            <div>
              <div style={{ fontWeight: 700 }}>{it.nombre}</div>
              <div style={{ fontSize: 14 }}>
                Cantidad: {it.cantidad} · Unitario: ${it.precio} · Subtotal: $
                {it.cantidad * it.precio}
              </div>
            </div>
            <button
              className="btn btn--outline"
              onClick={() => removeItem(it.productId)}
            >
              Quitar
            </button>
          </li>
        ))}
      </ul>

      <div
        style={{
          marginTop: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <strong style={{ fontSize: 18 }}>Total: ${totalPrice}</strong>

        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn--outline" onClick={clear}>
            Vaciar carrito
          </button>

          <Link to="/checkout" className="btn btn--primary">
            Finalizar compra
          </Link>
        </div>
      </div>
    </section>
  );
}
