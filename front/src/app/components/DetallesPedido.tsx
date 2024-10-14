// DetallesPedido.tsx
import React from 'react';

interface Detalle {
  platoId: number;
  cantidad: number;
}

interface Pedido {
  id: number;
  fecha: string;
  estado: string;
  detalles: Detalle[];
  usuario: string;
  mesa: string | null;
}

interface DetallesPedidoProps {
  pedido: Pedido | null; // Puede ser nulo si no hay pedido seleccionado
  onCerrar: () => void; // Función para cerrar el detalle
}

const DetallesPedido: React.FC<DetallesPedidoProps> = ({ pedido, onCerrar }) => {
  if (!pedido) {
    return <p>No hay pedido seleccionado.</p>;
  }

  return (
    <div>
      <h3>Detalles del Pedido ID: {pedido.id}</h3>
      <p>Fecha: {new Date(pedido.fecha).toLocaleString()}</p>
      <p>Estado: {pedido.estado}</p>
      <p>Usuario: {pedido.usuario}</p>
      <p>Mesa: {pedido.mesa ? pedido.mesa : 'No asignada'}</p>
      <h4>Detalles:</h4>
      <ul>
        {pedido.detalles.map((detalle, index) => (
          <li key={index}>
            Plato ID: {detalle.platoId}, Cantidad: {detalle.cantidad}
          </li>
        ))}
      </ul>
      <button onClick={onCerrar}>Cerrar</button>
    </div>
  );
};

export default DetallesPedido;
