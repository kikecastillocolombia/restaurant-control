import React from 'react';

interface Pedido {
  id: number;
  fecha: string;
  estado: string;
}

interface PedidoListProps {
  pedidos: Pedido[] | undefined; // Permite undefined si no hay pedidos
}

const PedidoList: React.FC<PedidoListProps> = ({ pedidos }) => {
  if (!pedidos || pedidos.length === 0) {
    return <p>No hay pedidos en esta mesa.</p>;
  }

  return (
    <ul>
      {pedidos.map((pedido) => (
        <li key={pedido.id}>
          Pedido {pedido.id}: {pedido.estado} (Fecha: {new Date(pedido.fecha).toLocaleString()})
        </li>
      ))}
    </ul>
  );
};

export default PedidoList;
