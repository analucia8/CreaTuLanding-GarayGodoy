import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import { fetchProductById as getProductById } from "../services/firestore";

export default function ItemDetailContainer() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const prod = await getProductById(id);
        if (alive) setItem(prod);
      } catch (e) {
        console.error("Error cargando producto:", e);
        if (alive) setError("Error al cargar el producto. Verifica el ID o intenta de nuevo.");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => { alive = false; };
  }, [id]);

  if (loading) {
    return (
      <section style={{ padding: 16, color: "#fff", textAlign: "center" }}>
        <p>Cargando detalles del producto…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section style={{ padding: 16, color: "#fff", textAlign: "center" }}>
        <p>{error}</p>
      </section>
    );
  }

  if (!item) {
    return (
      <section style={{ padding: 16, color: "#fff", textAlign: "center" }}>
        <p>Producto no encontrado.</p>
      </section>
    );
  }

  return (
    <section style={{ padding: 16 }}>
      <ItemDetail item={item} />
    </section>
  );
}