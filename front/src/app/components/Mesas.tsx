"use client"; // Asegúrate de que este cliente está habilitado

import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

const Mesas: React.FC = () => {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const response = await axios.get('http://localhost:3001/mesas');
        console.log('Datos recibidos:', response.data);

        // Verificar que los datos tienen la estructura correcta
        if (Array.isArray(response.data)) {
          setMesas(response.data);
        } else {
          throw new Error('Los datos no tienen el formato esperado');
        }
      } catch (error) {
        console.error('Error al cargar las mesas:', error);
        setError('Error al cargar las mesas');
      } finally {
        setLoading(false);
      }
    };

    fetchMesas();
  }, []);

  // Este efecto se ejecutará cada vez que se actualice el estado de mesas
  useEffect(() => {
    console.log('Mesas actualizadas en el estado:', mesas);
  }, [mesas]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  console.log('Mesas a renderizar:', mesas);

  return (
    <div>
      <h2>Mesas</h2>
      {mesas.length === 0 ? (
        <p>No hay mesas disponibles.</p>
      ) : (
        mesas.map((mesa) => (
          <div key={mesa.id}>
            <h3>Mesa {mesa.numero}</h3>
            <h4>Pedidos:</h4>
            {mesa.pedidos.length > 0 ? (
              <ul>
                {mesa.pedidos.map((pedido) => (
                  <li key={pedido.id}>
                    <strong>ID:</strong> {pedido.id} | <strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleString()} | <strong>Estado:</strong> {pedido.estado}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay pedidos para esta mesa.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Mesas;
