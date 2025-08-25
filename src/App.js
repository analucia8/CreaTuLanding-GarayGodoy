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
          {/* catálogo completo */}
          <Route
            path="/"
            element={
              <ItemListContainer
                saludo="¡Nuestro catálogo completo!"
                filterSlug="todos"
              />
            }
          />

          {/* categorías */}
          <Route
            path="/categoria/amigurumis"
            element={
              <ItemListContainer saludo="Amigurumis" filterSlug="amigurumis" />
            }
          />
          <Route
            path="/categoria/materias-primas"
            element={
              <ItemListContainer
                saludo="Materias primas"
                filterSlug="materias-primas"
              />
            }
          />
          <Route
            path="/categoria/patrones"
            element={
              <ItemListContainer saludo="Patrones" filterSlug="patrones" />
            }
          />

          {/* detalle (si lo estás usando ahora o más adelante) */}
          <Route path="/item/:id" element={<ItemDetailContainer />} />

          {/* 404 */}
          <Route
            path="*"
            element={<h2 style={{ padding: 16 }}>404 - Página no encontrada</h2>}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
