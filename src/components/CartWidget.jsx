import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function CartWidget() {
  const { totalQty } = useCart(); // ← total de unidades en el carrito

  return (
    <Link
      to="/cart"
      style={{
        marginLeft: "auto",                // se va a la derecha si el contenedor padre es display:flex
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        textDecoration: "none",
        color: "inherit",
      }}
      aria-label={`Abrir carrito (${totalQty})`}
      title={`Carrito (${totalQty})`}
    >
      <FaShoppingCart size={22} />
      <span>Mi carrito</span>
      <span
        style={{
          minWidth: 18,
          height: 18,
          lineHeight: "18px",
          padding: "0 6px",
          fontSize: 12,
          fontWeight: 700,
          textAlign: "center",
          borderRadius: 9,
          background: "#757575",
          color: "#fff",
        }}
      >
        {totalQty}
      </span>
    </Link>
  );
}
