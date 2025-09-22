// src/components/ItemCount.jsx
import { useEffect, useState } from "react";

export default function ItemCount({ stock = 0, initial = 1, onAdd }) {
  const clampInitial = () => {
    if (stock <= 0) return 0;
    return Math.min(Math.max(initial, 1), stock);
  };

  const [qty, setQty] = useState(clampInitial());

  useEffect(() => {
    setQty(clampInitial());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stock]);

  const dec = () => setQty((q) => (q > 1 ? q - 1 : q));
  const inc = () => setQty((q) => (q < stock ? q + 1 : q));
  const handleAdd = () => { if (stock > 0 && qty >= 1) onAdd?.(qty); };

  if (stock === 0) {
    return <p style={{ color: "#fff", textAlign: "center" }}>Producto sin stock</p>;
  }

  return (
    <div className="ic-wrap">
      <button className="pill pill-icon" onClick={dec} disabled={qty <= 1}>−</button>

      <span className="qty-chip">{qty}</span>

      <button className="pill pill-icon" onClick={inc} disabled={qty >= stock}>＋</button>

      <button className="pill pill-action" onClick={handleAdd} disabled={stock === 0}>
        agregar
      </button>

      <small className="stock-chip">(stock: {stock})</small>
    </div>
  );
}
