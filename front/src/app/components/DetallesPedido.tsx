import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Plato {
  id: number;
  nombre: string;
  precio: string;
  descripcion: string;
}

interface Pedido {
  id: number;
  fecha: string;
  estado: string;
  usuarioId: number;
}

interface DetallePedido {
  id: number;
  cantidad: number;
  plato: Plato;
  pedido: Pedido;
}

interface DetallesPedidoProps {
  id: number; // Prop para el ID del detalle del pedido
}

const DetallesPedido: React.FC<DetallesPedidoProps> = ({ id }) => {
  const [detalle, setDetalle] = useState<DetallePedido | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/detalles-pedido/${id}`);
        setDetalle(response.data);
      } catch  {
        setError('Error al cargar los detalles del pedido.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetalle();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!detalle) {
    return <div>No se encontraron detalles para el pedido.</div>;
  }

  return (
    <div>
      <h2>Detalles del Pedido</h2>
      <h3>Plato: {detalle.plato.nombre}</h3>
      <p>Cantidad: {detalle.cantidad}</p>
      <p>Precio: ${detalle.plato.precio}</p>
      <p>Descripción: {detalle.plato.descripcion}</p>
      <p>Estado del Pedido: {detalle.pedido.estado}</p>
      <p>Fecha: {new Date(detalle.pedido.fecha).toLocaleString()}</p>
    </div>
  );
};

export default DetallesPedido;
