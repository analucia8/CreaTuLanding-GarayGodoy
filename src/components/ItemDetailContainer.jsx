// src/components/ItemDetailContainer.jsx
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import products from "../Data/mock.json";

export default function ItemDetailContainer() {
  const { id } = useParams();

  const raw = (Array.isArray(products) ? products : [])
    .find((p) => String(p.id) === String(id));

  if (!raw) {
    return <section style={{ padding: 16 }}><p>Producto no encontrado.</p></section>;
  }

  // Normalizamos nombres de campos (mock -> ItemDetail)
  const img = raw.image ?? raw.imagen ?? null;
  const item = {
    id: raw.id,
    title: raw.title ?? raw.nombre ?? "Sin título",
    nombre: raw.nombre ?? raw.title ?? "Sin título",
    description: raw.description ?? raw.descripcion ?? "",
    descripcion: raw.descripcion ?? raw.description ?? "",
    price: raw.price ?? raw.precio ?? null,
    precio: raw.precio ?? raw.price ?? null,
    image: img,
    imagen: img,
    imageUrl: img, // por si tu ItemDetail espera imageUrl
    category: raw.category ?? raw.categoria ?? null,
    categoria: raw.categoria ?? raw.category ?? null,
  };

  return (
    <section style={{ padding: 16 }}>
      <ItemDetail item={item} />
    </section>
  );
}
