
import products from "../Data/mock.json"; 
import { Link } from "react-router-dom";

export default function MapExample() {
  if (!Array.isArray(products)) return <p>mock.json no es un array.</p>;

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }} border={1}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Desc</th>
          <th>Precio</th>
          <th>Imagen</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((elem) => (
          <tr key={elem.id ?? elem.nombre}>
            <td>{elem.nombre ?? elem.title}</td>
            <td>{elem.desc ?? elem.description}</td>
            <td>${elem.precio ?? elem.price}</td>
            <td>
              <img
                src={elem.imagen ?? elem.image}
                alt={elem.nombre ?? elem.title}
                width={80}
                style={{ display: "block" }}
              />
            </td>
            <td>
              {elem.id && <Link to={`/item/${elem.id}`}>Ver detalle</Link>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
