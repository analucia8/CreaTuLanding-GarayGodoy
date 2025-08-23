// src/components/ItemListContainer.jsx
import products from "../Data/mock.json";
import { Link } from "react-router-dom";

// Normaliza "Materias Primas" -> "materias-primas" (y quita acentos)
const normalize = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

export default function ItemListContainer({
  saludo = "Catálogo",
  filterSlug = "todos",
}) {
  const data = Array.isArray(products) ? products : [];

  const filtro = normalize(filterSlug);
  const lista =
    filtro === "todos"
      ? data
      : data.filter((p) => normalize(p.categoria) === filtro);

  if (lista.length === 0) {
    return (
      <section style={{ padding: 24, background: "transparent"}}>
        <h2 >{saludo}</h2>
        <p>No hay productos.</p>
      </section>
    );
  }

  return (
    <section style={{ padding: 24, background: "transparent" }}>
      <h2 style={{ color: "#fff", margin: "0 0 16px 0", textAlign:"center" }}>{saludo}</h2>

      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        }}
      >
        {lista.map((p) => (
          <article
          key={String(p.id)}
          style={{
            background: "rgba(255,255,255,0.45)",
            borderRadius: 12,
            padding: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
        
            <div
              style={{
                width: "100%",
                aspectRatio: "4 / 3",
                borderRadius: 12,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {p.imagen && (
                <img
                  src={p.imagen} // ej: "/img/jirafa.jpg" (en public/img)
                  alt={p.nombre}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",     // o "cover"
                    display: "block",
                    borderRadius: 12,
                    clipPath: "inset(0 round 12px)",  // recorte forzado
                  }}
                />
              )}
            </div>

            <div style={{ textAlign: "center", minHeight: 40 }}>
              <strong>{p.nombre}</strong>
            </div>

            {/* Botón "Ver más detalles" */}
            <div style={{ marginTop: "auto", width: "100%" }}>
              <Link
                to={`/item/${p.id}`}
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "8px 12px",
                  background: "#757575",
                  color: "#fff",
                  borderRadius: 8,
                  textDecoration: "none",
                }}
              >
                Ver más detalles
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
