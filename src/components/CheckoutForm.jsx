import { useState } from "react";

export default function CheckoutForm({ onConfirm }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onConfirm({ nombre, email, telefono });
      }}
      style={{ display: "grid", gap: 8, maxWidth: 420 }}
    >
      <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
      <button type="submit">Confirmar compra</button>
    </form>
  );
}
