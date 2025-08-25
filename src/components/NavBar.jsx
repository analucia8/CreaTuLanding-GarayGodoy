import "./NavBar.css";
import CartWidget from "./CartWidget";
import icono from "../assets/icono.png";
import { NavLink } from "react-router-dom";

function NavBar() {
  const categories = [
    "Todos los productos",
    "Amigurumis",
    "Materias primas",
    "Patrones",
  ];

  const paths = {
    "Todos los productos": "/",
    "Amigurumis": "/categoria/amigurumis",
    "Materias primas": "/categoria/materias-primas",
    "Patrones": "/categoria/patrones",
  };

  return (
    <nav className="navbar">
      <img className="navbar-icon" src={icono} alt="Logo" />
      <h2 className="logo">AMIGULOVE</h2>
      <img className="navbar-icon" src={icono} alt="Logo" />

      <ul className="nav-links">
        {categories.map((cat) => (
          <li key={cat}>
            <NavLink
              to={paths[cat]}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {cat}
            </NavLink>
          </li>
        ))}
      </ul>

      <CartWidget />
    </nav>
  );
}

export default NavBar;
