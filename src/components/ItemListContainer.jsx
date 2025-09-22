// src/components/ItemListContainer.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchAllProducts, fetchProductsByCategory } from "../services/firestore";

export default function ItemListContainer({ saludo = "Catálogo" }) {
  const { slug } = useParams();
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    (async () => {
      try {
        const data = slug
          ? await fetchProductsByCategory(slug)
          : await fetchAllProducts();

        if (alive) setLista(data);
      } catch (e) {
        console.error("Error cargando productos:", e);
        if (alive) setLista([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => { alive = false; };
  }, [slug]);

  if (loading) {
    return (
      <section style={{ padding: 24, background: "transparent" }}>
        <h2 style={{ color: "#fff", textAlign: "center" }}>{saludo}</h2>
        <p style={{ color: "#fff", textAlign: "center" }}>Cargando productos…</p>
      </section>
    );
  }

  if (lista.length === 0) {
    return (
      <section style={{ padding: 24, background: "transparent" }}>
        <h2 style={{ color: "#fff", textAlign: "center" }}>{saludo}</h2>
        <p style={{ color: "#fff", textAlign: "center" }}>No hay productos.</p>
      </section>
    );
  }

  return (
    <section style={{ padding: 24, background: "transparent" }}>
      <h2
        style={{
          fontSize: "2rem",
          color: "#fff",
          margin: "0 0 16px 0",
          textAlign: "center",
        }}
      >
        {saludo}
      </h2>

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
