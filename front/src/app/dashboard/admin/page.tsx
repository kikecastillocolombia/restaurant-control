"use client"; // Asegúrate de que esta línea sea la primera

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface Mesa {
  id: number;
  numero: number;
  estado: string; // Asegúrate de que el estado esté definido en tu API
}

const AdminDashboard: React.FC = () => {
  const [numero, setNumero] = useState(0);
  const [mesas, setMesas] = useState<Mesa[]>([]); // Define el tipo de estado
  const [platoNombre, setPlatoNombre] = useState('');
  const [platoPrecio, setPlatoPrecio] = useState(0);
  const [platoDescripcion, setPlatoDescripcion] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMesas();
  }, []);

  const fetchMesas = async () => {
    try {
      const response = await axios.get('http://localhost:3001/mesas');
      setMesas(response.data);
    } catch {
      setError('Error al obtener mesas.');
    }
  };

  const handleCreateMesa = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:3001/mesas', { numero });
      fetchMesas(); // Refrescar la lista de mesas después de crear una nueva
      setNumero(0); // Limpiar el campo
    } catch {
      setError('Error al crear la mesa.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlato = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:3001/platos', {
        nombre: platoNombre,
        precio: platoPrecio,
        descripcion: platoDescripcion,
      });
      // Limpiar los campos del formulario
      setPlatoNombre('');
      setPlatoPrecio(0);
      setPlatoDescripcion('');
      // Aquí puedes agregar una función para actualizar la lista de platos si es necesario
    } catch {
      setError('Error al crear el plato.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMesa = async (id: number) => {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta mesa?');
    if (confirmDelete) {
      setLoading(true);
      setError('');

      try {
        await axios.delete(`http://localhost:3001/mesas/${id}`);
        fetchMesas(); // Refrescar la lista de mesas después de eliminar
      } catch {
        setError('Error al eliminar la mesa.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <main>
      <header>
        <h1>Dashboard - Administrador</h1>
      </header>
      <div className="dashboard-container">
        <nav>
          <ul>
            <li><Link href="/dashboard/admin/usuarios">Usuarios</Link></li>
            <li><Link href="/dashboard/admin/reportes">Reportes</Link></li>
          </ul>
        </nav>
        <section>
          <h2>Bienvenido al Dashboard del Administrador</h2>
          <p>Aquí podrás gestionar diferentes aspectos de la aplicación.</p>

          {/* Formulario para crear una nueva mesa */}
          <form onSubmit={handleCreateMesa}>
            <input
              type="number"
              placeholder="Número de Mesa"
              value={numero}
              onChange={(e) => setNumero(Number(e.target.value))}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Creando...' : 'Crear Mesa'}
            </button>
            {error && <p className="error">{error}</p>}
          </form>

          {/* Formulario para crear un nuevo plato */}
          <form onSubmit={handleCreatePlato}>
            <h2>Crear Nuevo Plato</h2>
            <input
              type="text"
              placeholder="Nombre del Plato"
              value={platoNombre}
              onChange={(e) => setPlatoNombre(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Precio"
              value={platoPrecio}
              onChange={(e) => setPlatoPrecio(Number(e.target.value))}
              required
            />
            <textarea
              placeholder="Descripción"
              value={platoDescripcion}
              onChange={(e) => setPlatoDescripcion(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Creando...' : 'Crear Plato'}
            </button>
            {error && <p className="error">{error}</p>}
          </form>

          <h2>Mesas Creadas</h2>
          <ul>
            {mesas.map((mesa) => (
              <li key={mesa.id}>
                Mesa {mesa.numero} - Estado: {mesa.estado}
                <Link href={`/dashboard/admin/pedidos/${mesa.id}`}>
                  <button>Ver Pedidos</button>
                </Link>
                <button onClick={() => handleDeleteMesa(mesa.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <footer>
        <p>© 2024 Control de Caja - Restaurante</p>
      </footer>
    </main>
  );
};

export default AdminDashboard;
