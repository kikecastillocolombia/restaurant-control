"use client"; // Asegúrate de que esto esté al principio del archivo

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Cambia a useParams
import axios from 'axios';
import PedidoList from './PedidoList'; // Asegúrate de que la ruta sea correcta
import Loading from './Loading'; // Componente de carga
import Error from './Error'; // Componente de error

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

const MesaDetail: React.FC = () => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [mesa, setMesa] = useState<Mesa | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMesa = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:3001/mesas/${id}`);
          setMesa(response.data);
        } catch {
          setError('Error al cargar los detalles de la mesa.');
        } finally {
          setLoading(false);
        }
      } else {
        setError('ID de mesa no proporcionado.');
        setLoading(false);
      }
    };

    fetchMesa();
  }, [id]);

  if (loading) {
    return <Loading />; // Componente de carga
  }

  if (error) {
    return <Error message={error} />; // Componente de error
  }

  return (
    <main>
      <header>
        <h1>Detalle de Mesa {mesa?.numero}</h1>
      </header>
      <div className="mesa-detalle-container">
        <section>
          <h2>Pedidos en esta mesa</h2>
          <PedidoList pedidos={mesa?.pedidos} /> {/* Componente de lista de pedidos */}
        </section>
      </div>
      <footer>
        <p>© 2024 Control de Caja - Restaurante</p>
      </footer>
    </main>
  );
};

export default MesaDetail;
