"use client";

import { useEffect, useState } from 'react';
import { getPedidos, deletePedido } from './pedidos.api';
import { useRouter } from 'next/navigation';

// Definir la interfaz para un producto
interface Producto {
  id: string;
  nombre: string;
}

// Definir la interfaz para los detalles del pedido
interface DetallePedido {
  id: string;
  cantidad: number;
  producto: Producto | null; // Permitir que producto sea null
}

// Definir la interfaz para el pedido
interface Pedido {
  id: string;
  fecha: string;
  estado: string;
  mesa: { id: string; numero: number } | null; // Cambiar nombre a numero
  detalles: DetallePedido[]; // Incluir detalles de pedido
}

const PedidosPage: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]); // Definir el estado con el tipo Pedido[]
  const router = useRouter();

  useEffect(() => {
    const fetchPedidos = async () => {
      const data = await getPedidos();
      setPedidos(data);
    };

    fetchPedidos();
  }, []);

  const handleDelete = async (id: string) => {
    await deletePedido(id);
    setPedidos(pedidos.filter((pedido) => pedido.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista de Pedidos</h1>
      <button 
        className="bg-green-500 text-white p-2 mb-4 rounded" 
        onClick={() => router.push('/dashboard/admin/pedidos/new')}
      >
        Crear Pedido
      </button>
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Mesa</th> {/* Mostrar mesa */}
            <th>Detalles</th> {/* Mostrar detalles */}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{new Date(pedido.fecha).toLocaleString()}</td>
              <td>{pedido.estado}</td>
              <td>{pedido.mesa ? pedido.mesa.numero : 'Mesa no disponible'}</td> {/* Mostrar número de la mesa */}
              <td>
                <ul>
                  {pedido.detalles.map(detalle => (
                    <li key={detalle.id}>
                      {detalle.cantidad} x {detalle.producto?.nombre || 'Producto no disponible'}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <button 
                  className="bg-yellow-500 text-white p-1 rounded mr-2" 
                  onClick={() => router.push(`/dashboard/admin/pedidos/${pedido.id}/edit`)}
                >
                  Editar
                </button>
                <button 
                  className="bg-red-500 text-white p-1 rounded" 
                  onClick={() => handleDelete(pedido.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PedidosPage;
