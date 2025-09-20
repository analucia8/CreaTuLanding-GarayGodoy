// src/App.js
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function CategoryRoute() {
  const { slug } = useParams();
  const labels = {
    "amigurumis": "Amigurumis",
    "materias-primas": "Materias primas",
    "patrones": "Patrones",
  };
  const saludo = labels[slug] ?? slug.replace(/-/g, " ");
  return <ItemListContainer saludo={saludo} filterSlug={slug} />;
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <main style={{ padding: "1rem" }}>
          <Routes>
            {/* Catálogo completo */}
            <Route
              path="/"
              element={
                <ItemListContainer
                  saludo="Este es nuestro catálogo completo"
                  filterSlug="todos"
                />
              }
            />

            {/* Categorías dinámicas */}
            <Route path="/categoria/:slug" element={<CategoryRoute />} />

            {/* Detalle */}
            <Route path="/item/:id" element={<ItemDetailContainer />} />

            {/* Carrito */}
            <Route path="/cart" element={<Cart />} />

            <Route path="/checkout" element={<Checkout />} />

            {/* 404 */}
            <Route
              path="*"
              element={<h2 style={{ padding: 16 }}>404 - Página no encontrada</h2>}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  );
}
