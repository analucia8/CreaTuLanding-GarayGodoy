import './NavBar.css'
import CartWidget from './CartWidget';
import icono from '../assets/icono.png';   

function NavBar() {
    const categories = ['Amigurumis', 'Materia prima', 'Patrones', 'Sobre nosotros'];
  
    return (
      <nav className="navbar">
        <img
        src={icono}               
        alt="Carrito"
        width={24}
        height={24}
      />
        <h2 className="logo">AMIGULOVE</h2>
        <img
        src={icono}               
        alt="Carrito"
        width={24}
        height={24}
      />
        <ul className="nav-links">
          {categories.map(cat => (
            <li key={cat}>
              <a href={`#${cat.toLowerCase()}`}>{cat}</a>
            </li>
          ))}
        </ul>
        {<CartWidget />}
      </nav>
    );
  }
  export default NavBar;