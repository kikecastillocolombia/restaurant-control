import React from 'react';
import { Pedido } from '@/interfaces/pedido'; // Importa la interfaz desde el mismo archivo

interface TablaPedidosProps {
  pedidos: Pedido[]; // Asegúrate de que la propiedad coincida con la definición de la interfaz
  eliminarPedido: (id: number) => void;
  seleccionarPedido: (pedido: Pedido) => void;
}

const TablaPedidos: React.FC<TablaPedidosProps> = ({ pedidos, eliminarPedido, seleccionarPedido }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Fecha</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {pedidos.map((pedido) => (
          <tr key={pedido.id}>
            <td>{pedido.id}</td>
            <td>{pedido.fecha}</td>
            <td>{pedido.estado}</td>
            <td>
              <button onClick={() => seleccionarPedido(pedido)}>Editar</button>
              <button onClick={() => eliminarPedido(pedido.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaPedidos;
