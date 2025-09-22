// src/services/firestore.js
import {
    collection,
    getDocs,
    query,
    where,
    doc,
    getDoc,
    writeBatch,
    serverTimestamp,
  } from "firebase/firestore";
  import { db } from "../firebase/config";
  
  const COL = "Items"; 
  
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
  
  export async function fetchProductById(id) {
    const ref = doc(db, COL, id);
    const snap = await getDoc(ref);
    console.log("[DBG] fetchProductById:", id, "exists:", snap.exists());
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };
  }
  
  export async function createOrderWithStockCheck({ buyer, items }) {
    // items: [{ productId, nombre, precio, cantidad }]
    const batch = writeBatch(db);
    let total = 0;
  
    // Verificar stock y updates
    for (const it of items) {
      total += it.precio * it.cantidad;
  
      const pRef = doc(db, COL, it.productId);
      const pSnap = await getDoc(pRef);
      if (!pSnap.exists()) {
        throw new Error("Producto inexistente: " + it.productId);
      }
      const p = pSnap.data();
      const stockActual = typeof p.stock === "number" ? p.stock : 0;
  
      if (stockActual < it.cantidad) {
        throw new Error(`Sin stock para "${p.nombre}" (stock: ${stockActual})`);
      }
  
      batch.update(pRef, { stock: stockActual - it.cantidad });
    }
  
    // Crear la orden
    const ordersRef = collection(db, "orders");
    const orderRef = doc(ordersRef);
    batch.set(orderRef, {
      buyer,
      items: items.map(({ productId, nombre, precio, cantidad }) => ({
        productId,
        nombre,
        precio,
        cantidad,
      })),
      total,
      createdAt: serverTimestamp(),
    });
  
    // Ejecutar todo
    await batch.commit();
    return orderRef.id;
  }
  