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

  const handleAdd = () => {
    if (stock > 0 && qty >= 1) onAdd?.(qty);
  };

  if (stock === 0) {
    return <p style={{ color: "#fff", textAlign: "center" }}>Producto sin stock</p>;
  }

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <button onClick={dec} disabled={qty <= 1}>−</button>
      <span style={{ minWidth: 28, textAlign: "center", color: "#19A6BF" }}>{qty}</span>
      <button onClick={inc} disabled={qty >= stock}>＋</button>
      <button onClick={handleAdd} disabled={stock === 0}>
        Agregar
      </button>
      <small style={{ color: "#19A6BF", fontWeight: 600 }}>
        (stock: {stock})
      </small>
    </div>
  );
}

