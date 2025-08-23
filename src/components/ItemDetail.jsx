// src/components/ItemDetail.jsx
import "./ItemDetail.css";

export default function ItemDetail({ item }) {
  const title = item.title ?? item.nombre ?? "Sin título";
  const desc = item.description ?? item.descripcion ?? "";
  const img  = item.image ?? item.imagen ?? item.imageUrl ?? "";
  const price = item.price ?? item.precio ?? "";
  const category = item.category ?? item.categoria ?? "";

  return (
    <section className="detail-wrap">
      <div className="detail-image">
        {img && <img src={img} alt={title}  />}
      </div>

      <div className="detail-info">
        {category && <span className="detail-category">{category}</span>}
        <h1>{title}</h1>
        {price !== "" && <div className="detail-price">${price}</div>}
        {desc && <p>{desc}</p>}

        <div style={{ marginTop: 16 }}>
          <button className="btn-primary">Agregar al carrito</button>
        </div>
      </div>
    </section>
  );
}
