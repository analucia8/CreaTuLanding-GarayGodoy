import './NavBar.css'
import CartWidget from './CartWidget';
import icono from '../assets/icono.png';   

function NavBar() {
    // 1 · Lista de categorías (puedes moverla a otro archivo o a props más adelante)
    const categories = ['Amigurumis', 'Materia prima', 'Patrones', 'Sobre nosotros'];
  
    return (
      <nav className="navbar">
        {/* 2 · Logo o título */}
        <img
        src={icono}               // ← usa la variable importada
        alt="Carrito"
        width={24}
        height={24}
      />
        <h2 className="logo">AMIGULOVE</h2>
        <img
        src={icono}               // ← usa la variable importada
        alt="Carrito"
        width={24}
        height={24}
      />
  
        {/* 3 · Lista de links */}
        <ul className="nav-links">
          {categories.map(cat => (
            <li key={cat}>
              <a href={`#${cat.toLowerCase()}`}>{cat}</a>
            </li>
          ))}
        </ul>
  
        {/* 4 · Carrito (lo crearemos en CartWidget.js) */}
        {<CartWidget />}
      </nav>
    );
  }
  export default NavBar;