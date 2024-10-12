"use client"; // Asegúrate de que esta línea esté al principio del archivo

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define la interfaz para un pedido y sus detalles
interface DetallePedido {
  id: number;
  cantidad: number;
}

interface Usuario {
  nombre: string;
  rol: string;
}

interface Mesa {
  numero: number;
}

interface Pedido {
  id: number;
  fecha: string;
  estado: string;
  detalles: DetallePedido[];
  usuario: Usuario;
  mesa: Mesa;
}

const PedidoDetalles: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params; // Obtenemos el id directamente de los parámetros
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPedido = async () => {
      if (id) {
        try {
          const response = await axios.get<Pedido>(`http://localhost:3001/pedidos/${id}`);
          setPedido(response.data);
        } catch {
          setError('Error al obtener los detalles del pedido.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPedido();
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!pedido) {
    return <p>No se encontraron detalles para este pedido.</p>;
  }

  return (
    <div>
      <h2>Detalles del Pedido ID: {pedido.id}</h2>
      <p>Fecha: {new Date(pedido.fecha).toLocaleString()}</p>
      <p>Estado: {pedido.estado}</p>
      <h4>Detalles:</h4>
      <ul>
        {pedido.detalles.map((detalle) => (
          <li key={detalle.id}>
            Plato ID: {detalle.id}, Cantidad: {detalle.cantidad}
          </li>
        ))}
      </ul>
      <p>Usuario: {pedido.usuario.nombre} (Rol: {pedido.usuario.rol})</p>
      <p>Mesa: {pedido.mesa.numero}</p>
    </div>
  );
};

export default PedidoDetalles;
