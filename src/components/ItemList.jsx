// src/components/ItemList.jsx
import { Link } from "react-router-dom";

export default function ItemList({ items = [] }) {
  return (
    <div
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      }}
    >
      {items.map((p) => (
        <article
          key={String(p.id)}
          style={{
            background: "rgba(255,255,255,0.45)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.35)",
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
            {p.imagenUrl && (
              <img
                src={p.imagenUrl}
                alt={p.nombre}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            )}
          </div>

          <div style={{ textAlign: "center", minHeight: 40 }}>
            <strong>{p.nombre}</strong>
          </div>

          <div style={{ marginTop: "auto", width: "100%" }}>
            <Link
              to={`/item/${p.id}`}
              style={{
                display: "block",
                textAlign: "center",
                padding: "8px 12px",
                background: "#fff",
                color: "black",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Ver más detalles
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
