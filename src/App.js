import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main style={{ padding: "1rem" }}>
        <Routes>
          {/* Catálogo completo */}
          <Route path="/" element={<ItemListContainer saludo="¡Catálogo completo!" />} />

          {/* Categorías dinámicas (amigurumis, materias-primas, patrones, etc.) */}
          <Route path="/categoria/:slug" element={<ItemListContainer saludo="Catálogo" />} />

          {/* Detalle */}
          <Route path="/item/:id" element={<ItemDetailContainer />} />

          {/* 404 (recomendado) */}
          <Route path="*" element={<h2 style={{ padding: 16 }}>404 - Página no encontrada</h2>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
