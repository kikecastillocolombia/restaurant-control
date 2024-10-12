"use client"; // Asegúrate de que esta línea esté al principio del archivo

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define la interfaz para un pedido
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
  fecha: string; // Suponiendo que `fecha` es un string en formato ISO
  estado: string;
  detalles: DetallePedido[];
  usuario: Usuario;
  mesa: Mesa;
}

const Pedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get<Pedido[]>('http://localhost:3001/pedidos');
        setPedidos(response.data);
      } catch {
        setError('Error al obtener los pedidos.');
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Lista de Pedidos</h2>
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.id}>
            <h3>Pedido ID: {pedido.id}</h3>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pedidos;
