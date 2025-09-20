import "./ItemDetail.css";

export default function ItemDetail({ item }) {
  console.log("[DBG] ItemDetail item:", item); // Depuración

  const title = item.nombre;
  const desc = item.descripcion ?? "";
  const img = item.imagenUrl ?? ""; // Cambia imagen a imagenUrl
  const price = item.precio;
  const category = item.slugCategoria ?? ""; // Cambia categoria a slugCategoria

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
          <button className="btn-primary">Agregar al carrito</button>
        </div>
      </div>
    </section>
  );
}