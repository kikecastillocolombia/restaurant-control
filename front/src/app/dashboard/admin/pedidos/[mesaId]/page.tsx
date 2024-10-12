// src/app/dashboard/admin/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const AdminDashboard: React.FC = () => {
  const [numero, setNumero] = useState(0);
  const [mesas, setMesas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMesas();
  }, []);

  const fetchMesas = async () => {
    try {
      const response = await axios.get('http://localhost:3001/mesas');
      setMesas(response.data);
    } catch (error) {
      setError('Error al obtener mesas.');
    }
  };

  const handleCreateMesa = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/mesas', { numero });
      setMesas((prevMesas) => [...prevMesas, response.data]); // Agregar la nueva mesa directamente
      setNumero(0); // Limpiar el campo
    } catch (error) {
      setError('Error al crear la mesa.');
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
        setMesas((prevMesas) => prevMesas.filter((mesa) => mesa.id !== id)); // Actualizar el estado local
      } catch (error) {
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
            <li><Link href="/dashboard/admin/pedidos">Pedidos</Link></li>
            <li><Link href="/dashboard/admin/reportes">Reportes</Link></li>
          </ul>
        </nav>
        <section>
          <h2>Bienvenido al Dashboard del Administrador</h2>
          <p>Aquí podrás gestionar diferentes aspectos de la aplicación.</p>
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
