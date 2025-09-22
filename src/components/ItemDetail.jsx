// src/components/ItemDetail.jsx
import { useState } from "react";
import { Link } from "react-router-dom";        // 👈 NUEVO
import "./ItemDetail.css";
import ItemCount from "./ItemCount";
import { useCart } from "../context/CartContext";

export default function ItemDetail({ item }) {
  const [addedQty, setAddedQty] = useState(0);
  const { addItem } = useCart();

  if (!item) return <p className="detail-loading">Cargando…</p>;

  const title = item.nombre;
  const desc = item.descripcion ?? "";
  const img = item.imagenUrl ?? "";
  const price = item.precio;
  const category = item.slugCategoria ?? "";
  const stock = item.stock ?? 0;

  const onAdd = (qty) => {
    setAddedQty(qty);
    addItem(
      {
        productId: item.id,
        nombre: item.nombre,
        precio: item.precio,
        imagenUrl: item.imagenUrl,
      },
      qty
    );
  };

  return (
    <section className="detail-wrap">
      <div className="detail-image">
        {img && <img src={img} alt={title} />}
      </div>

      <div className="detail-info">
        {category && <span className="detail-category">{category}</span>}
        <h1>{title}</h1>
        {price != null && <div className="detail-price">${price}</div>}
        {desc && <p>{desc}</p>}

        <div style={{ marginTop: 16 }}>
          {stock <= 0 && <p className="detail-out">Producto sin stock</p>}

          {stock > 0 && addedQty === 0 && (
            <ItemCount stock={stock} initial={1} onAdd={onAdd} />
          )}

          {addedQty > 0 && (
            <p className="detail-added">
              ¡Agregado! Cantidad: {addedQty}.{" "}
              {/* 👇 Usar Link, no <a href> */}
              <Link to="/cart" className="btn-primary">Ir al carrito</Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
