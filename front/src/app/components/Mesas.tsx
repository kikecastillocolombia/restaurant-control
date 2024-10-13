"use client"; // Asegúrate de que este cliente está habilitado

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado

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
  const [nuevoNumero, setNuevoNumero] = useState<number | ''>(''); // Estado para el nuevo número de mesa

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const response = await axios.get('http://localhost:3001/mesas');
        console.log('Datos recibidos:', response.data);

        if (Array.isArray(response.data)) {
          setMesas(response.data);
        } else {
          throw new Error('Los datos no tienen el formato esperado');
        }
      } catch (err: unknown) {
        console.error('Error al cargar las mesas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMesas();
  }, []);

  const agregarMesa = async () => {
    if (nuevoNumero === '') return;

    const numeroMesaExistente = mesas.find(mesa => mesa.numero === Number(nuevoNumero));
    if (numeroMesaExistente) {
      setError('El número de mesa ya existe. Por favor, elige otro número.');
      return;
    }

    const nuevaMesa = { numero: Number(nuevoNumero), pedidos: [] };
    try {
      const response = await axios.post('http://localhost:3001/mesas', nuevaMesa);
      const mesaCreada: Mesa = response.data;
      setMesas([...mesas, mesaCreada]);
      setNuevoNumero('');
      setError(null);
    } catch (error) {
      console.error('Error al agregar la mesa:', error);
      setError('Error al agregar la mesa');
    }
  };

  const eliminarMesa = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/mesas/${id}`);
      setMesas(mesas.filter((mesa) => mesa.id !== id));
    } catch (error) {
      console.error('Error al eliminar la mesa:', error);
      setError('Error al eliminar la mesa');
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Mesas</h2>
      <input
        type="number"
        value={nuevoNumero}
        onChange={(e) => setNuevoNumero(e.target.value ? Number(e.target.value) : '')}
        placeholder="Número de nueva mesa"
      />
      <button onClick={agregarMesa}>Agregar Mesa</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {mesas.length === 0 ? (
        <p>No hay mesas disponibles.</p>
      ) : (
        mesas.map((mesa) => (
          <div key={mesa.id} className="mesa-item">
            <h3>Mesa {mesa.numero}</h3>
            <Link to={`/mesas/${mesa.id}`}>Ver Detalles</Link> {/* Enlace a detalles de la mesa */}
            <button onClick={() => eliminarMesa(mesa.id)}>Eliminar Mesa</button>
            <h4>Pedidos:</h4>
            {mesa.pedidos.length > 0 ? (
              <ul>
                {mesa.pedidos.map((pedido) => (
                  <li key={pedido.id}>
                    <strong>ID:</strong> {pedido.id} |{' '}
                    <strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleString()} |{' '}
                    <strong>Estado:</strong> {pedido.estado}
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
