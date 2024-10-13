"use client"; // Asegúrate de que este cliente está habilitado

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Pedido {
  id: number;
  fecha: string;
  estado: string;
  usuarioId: number;
}

interface Mesa {
  id: number;
  numero: number;
  pedidos: Pedido[];
}

const DetallesMesa: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el ID de la mesa desde los parámetros de la URL
  const [mesa, setMesa] = useState<Mesa | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [nuevoPedido, setNuevoPedido] = useState<string>(''); // Estado para el nuevo pedido

  useEffect(() => {
    const fetchMesa = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/mesas/${id}`);
        setMesa(response.data);
      } catch (error) {
        console.error('Error al cargar la mesa:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMesa();
  }, [id]);

  const agregarPedido = async () => {
    if (!nuevoPedido) return;

    const nuevoPedidoData = {
      id: Math.floor(Math.random() * 1000), // Generar un ID único (puedes cambiar esto a algo más robusto)
      fecha: new Date().toISOString(),
      estado: 'Pendiente',
      usuarioId: 1, // Cambia esto según la lógica de tu aplicación
    };

    try {
      await axios.post(`http://localhost:3001/mesas/${id}/pedidos`, nuevoPedidoData); // Asegúrate de que esta ruta esté definida en tu backend
      setMesa((prevMesa) => prevMesa ? { ...prevMesa, pedidos: [...prevMesa.pedidos, nuevoPedidoData] } : null);
      setNuevoPedido('');
    } catch (error) {
      console.error('Error al agregar el pedido:', error);
    }
  };

  const eliminarPedido = async (pedidoId: number) => {
    try {
      await axios.delete(`http://localhost:3001/pedidos/${pedidoId}`); // Asegúrate de que esta ruta esté definida en tu backend
      if (mesa) {
        setMesa({ ...mesa, pedidos: mesa.pedidos.filter(pedido => pedido.id !== pedidoId) });
      }
    } catch (error) {
      console.error('Error al eliminar el pedido:', error);
    }
  };

  if (loading) return <div>Cargando...</div>;

  if (!mesa) return <div>No se encontró la mesa.</div>;

  return (
    <div>
      <h2>Detalles de la Mesa {mesa.numero}</h2>
      <h3>Pedidos:</h3>
      <input
        type="text"
        value={nuevoPedido}
        onChange={(e) => setNuevoPedido(e.target.value)}
        placeholder="Nuevo pedido"
      />
      <button onClick={agregarPedido}>Agregar Pedido</button>
      {mesa.pedidos.length > 0 ? (
        <ul>
          {mesa.pedidos.map((pedido) => (
            <li key={pedido.id}>
              <strong>ID:</strong> {pedido.id} |{' '}
              <strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleString()} |{' '}
              <strong>Estado:</strong> {pedido.estado} |{' '}
              <button onClick={() => eliminarPedido(pedido.id)}>Eliminar Pedido</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay pedidos para esta mesa.</p>
      )}
    </div>
  );
};

export default DetallesMesa;
