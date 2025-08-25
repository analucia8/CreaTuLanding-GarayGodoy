import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import { getProductById } from "../services/products";

export default function ItemDetailContainer() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((prod) => setItem(prod))
      .finally(() => setLoading(false));
  }, [id]); 

  if (loading) {
    return (
      <section style={{ padding: 16 }}>
        <p>Cargando detalles del producto…</p>
      </section>
    );
  }

  if (!item) {
    return (
      <section style={{ padding: 16 }}>
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
