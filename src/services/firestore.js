import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const COL = "Items"; // nombre EXACTO de la colección

export async function fetchAllProducts() {
  const colRef = collection(db, COL);
  const snap = await getDocs(colRef);
  console.log("[DBG] getAll:", colRef.path, "docs:", snap.size);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function fetchProductsByCategory(slug) {
  const q = query(collection(db, COL), where("slugCategoria", "==", slug));
  const snap = await getDocs(q);
  console.log("[DBG] byCategory:", slug, "docs:", snap.size);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getProductById(id) {
  const docRef = doc(db, COL, id);
  const snap = await getDoc(docRef);
  console.log("[DBG] getProductById:", id, "exists:", snap.exists());
  if (snap.exists()) {
    return { id: snap.id, ...snap.data() };
  } else {
    throw new Error("Producto no encontrado");
  }
}