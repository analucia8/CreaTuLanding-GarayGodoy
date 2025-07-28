import { FaShoppingCart } from 'react-icons/fa';   

const CartWidget = () => (
  <div style={{  marginLeft: 'auto'}}>
    {/* Ícono del carrito */}
    <FaShoppingCart size={22} />
    <p>Mi carrito</p>
    </div>
);

export default CartWidget;