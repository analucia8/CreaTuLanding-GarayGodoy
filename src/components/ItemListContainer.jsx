// src/components/ItemListContainer.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAllProducts, fetchProductsByCategory } from "../services/firestore";
import ItemList from "./ItemList";

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

    return () => {
      alive = false;
    };
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

      {/* Presentación delegada */}
      <ItemList items={lista} />
    </section>
  );
}
