"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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

const MeseroDashboard: React.FC = () => {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/mesas');
        setMesas(response.data);
      } catch {
        setError('Error al cargar las mesas.');
      } finally {
        setLoading(false);
      }
    };

    fetchMesas();
  }, []);

  if (loading) {
    return <p>Cargando mesas...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <header>
        <h1>Dashboard - Mesero</h1>
      </header>
      <div className="dashboard-container">
        <nav>
          <ul>
            <li><Link href="/dashboard/mesero/pedidos">Mis Pedidos</Link></li>
            <li><Link href="/dashboard/mesero/cuentas">Cuentas</Link></li>
            <li><Link href="/dashboard/mesero/reportes">Reportes</Link></li>
          </ul>
        </nav>
        <section>
          <h2>Bienvenido al Dashboard del Mesero</h2>
          <p>Aquí podrás gestionar tus pedidos y cuentas.</p>

          {/* Listado de Mesas */}
          <h3>Mesas Disponibles</h3>
          {mesas.length > 0 ? (
            <ul>
              {mesas.map((mesa) => (
                <li key={mesa.id}>
                  Mesa {mesa.numero} - Estado: {mesa.pedidos.length > 0 ? 'Ocupada' : 'Disponible'}{' '}
                  <Link href={`/dashboard/mesero/mesa/${mesa.id}`}>Ver Detalles</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay mesas disponibles.</p>
          )}
        </section>
      </div>
      <footer>
        <p>© 2024 Control de Caja - Restaurante</p>
      </footer>
    </main>
  );
};

export default MeseroDashboard;
