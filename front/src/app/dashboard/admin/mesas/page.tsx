// Mesas.tsx
"use client"; // Asegúrate de que este cliente está habilitado

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'; // Importa Router y Link

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
        if (err instanceof Error) {
          console.error('Error al cargar las mesas:', err.message);
          setError(err.message);
        } else {
          console.error('Error desconocido:', err);
          setError('Error al cargar las mesas');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMesas();
  }, []);

  const agregarMesa = async () => {
    if (nuevoNumero === '') {
      setError('Por favor, ingrese un número de mesa válido.'); // Manejo de error
      return; // No hacer nada si no hay número
    }

    const nuevaMesa: Mesa = { id: Math.random(), numero: Number(nuevoNumero), pedidos: [] }; // Generar ID aleatorio
    try {
      const response = await axios.post('http://localhost:3001/mesas', nuevaMesa);
      console.log('Mesa agregada:', response.data);
      setMesas([...mesas, response.data]); // Usar los datos devueltos del servidor
      setNuevoNumero(''); // Limpiar el input después de agregar
      setError(null); // Limpiar el error
    } catch (error) {
      console.error('Error al agregar la mesa:', error);
      setError('Error al agregar la mesa');
    }
  };

  const eliminarMesa = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/mesas/${id}`);
      setMesas(mesas.filter((mesa) => mesa.id !== id)); // Actualizar el estado eliminando la mesa
    } catch (error) {
      console.error('Error al eliminar la mesa:', error);
      setError('Error al eliminar la mesa');
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Router>
      <div>
        <h2>Mesas</h2>
        <input
          type="number"
          value={nuevoNumero}
          onChange={(e) => setNuevoNumero(e.target.value ? Number(e.target.value) : '')} // Asegúrate de que se convierte a número o se deja vacío
          placeholder="Número de nueva mesa"
        />
        <button onClick={agregarMesa}>Agregar Mesa</button>
        {mesas.length === 0 ? (
          <p>No hay mesas disponibles.</p>
        ) : (
          mesas.map((mesa) => (
            <div key={mesa.id} className="mesa-item">
              <h3>
                <Link to={`/mesa/${mesa.id}`}>Mesa {mesa.numero}</Link> {/* Link a la página de detalles de la mesa */}
              </h3>
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
        <Routes>
          {/* Asegúrate de tener un componente para ver los detalles de la mesa */}
          <Route path="/mesa/:id" element={<MesaDetalle />} />
        </Routes>
      </div>
    </Router>
  );
};

// Componente para mostrar los detalles de la mesa
const MesaDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el ID de la mesa de la URL

  // Aquí puedes hacer la lógica para cargar los detalles de la mesa usando el ID

  return <div>Detalles de la Mesa {id}</div>;
};

export default Mesas;
