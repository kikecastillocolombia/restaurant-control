"use client"; // Asegúrate de que esta línea esté al principio del archivo

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const PedidoDetalles: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Cambia 'mesaId' por 'id'
  const [pedido, setPedido] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/pedidos/${id}`);
        setPedido(response.data);
      } catch (error) {
        setError('Error al obtener los detalles del pedido.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPedido();
    }
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Detalles del Pedido ID: {pedido.id}</h2>
      <p>Fecha: {new Date(pedido.fecha).toLocaleString()}</p>
      <p>Estado: {pedido.estado}</p>
      <h4>Detalles:</h4>
      <ul>
        {pedido.detalles.map((detalle: any) => (
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
