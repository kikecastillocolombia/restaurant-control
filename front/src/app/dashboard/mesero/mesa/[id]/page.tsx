"use client"; // Asegúrate de que esto esté al principio del archivo

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Asegúrate de usar useParams
import axios from 'axios';
import DetallesPedido from '@/app/components/DetallesPedido'; // Asegúrate de importar el componente

interface Pedido {
  id: number;
  fecha: string;
  estado: string;
  usuarioId: number;
  mesaId: number; // Asegúrate de que esto esté aquí
}

interface Mesa {
  id: number;
  numero: number;
  pedidos: Pedido[];
}

interface Plato {
  id: number;
  nombre: string;
  precio: number;
}

const DetalleMesa: React.FC = () => {
  const params = useParams(); // Obtiene los parámetros de la ruta
  const id = params?.id; // Obtiene el id como string o undefined
  const [mesa, setMesa] = useState<Mesa | null>(null);
  const [platos, setPlatos] = useState<Plato[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cantidad, setCantidad] = useState<number>(1); // Cantidad de platos a agregar
  const [platoId, setPlatoId] = useState<number | null>(null); // Plato seleccionado
  const [pedidoError, setPedidoError] = useState<string | null>(null); // Error al agregar pedido

  useEffect(() => {
    const fetchMesa = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:3001/mesas/${id}`);
          setMesa(response.data);
        } catch {
          setError('Error al cargar los detalles de la mesa.'); // Manejo de errores
        } finally {
          setLoading(false);
        }
      } else {
        setError('ID de mesa no proporcionado.'); // Manejo de error si no hay ID
        setLoading(false);
      }
    };

    const fetchPlatos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/platos');
        setPlatos(response.data);
      } catch {
        setError('Error al cargar los platos.'); // Manejo de errores al cargar platos
      }
    };

    fetchMesa();
    fetchPlatos();
  }, [id]); // Cambia `searchParams` por `id`

  const handleAgregarPedido = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario

    if (platoId) {
      try {
        const nuevoPedido = {
          fecha: new Date().toISOString(),
          estado: 'pendiente',
          usuarioId: 1, // Cambia esto según el usuario que esté logueado
          mesaId: mesa?.id,
        };

        const response = await axios.post('http://localhost:3001/pedidos', nuevoPedido);
        const nuevoDetallePedido = {
          cantidad,
          platoId,
          pedidoId: response.data.id, // Usa el ID del nuevo pedido creado
        };

        await axios.post('http://localhost:3001/detalles-pedido', nuevoDetallePedido);
        setMesa((prevMesa) => (prevMesa ? { ...prevMesa, pedidos: [...prevMesa.pedidos, response.data] } : null)); // Actualiza la mesa con el nuevo pedido
        setCantidad(1); // Resetea la cantidad
        setPlatoId(null); // Resetea el plato seleccionado
        setPedidoError(null); // Resetea el error
      } catch {
        setPedidoError('Error al agregar el pedido.'); // Manejo de errores al agregar el pedido
      }
    } else {
      setPedidoError('Debes seleccionar un plato.'); // Mensaje de error si no hay plato seleccionado
    }
  };

  if (loading) {
    return <p>Cargando detalles de la mesa...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <header>
        <h1>Detalle de Mesa {mesa?.numero}</h1>
      </header>
      <div className="mesa-detalle-container">
        
        
        {/* Formulario para agregar un nuevo pedido */}
        <section>
          <h2>Agregar Pedido</h2>
          <form onSubmit={handleAgregarPedido}>
            <label htmlFor="plato">Selecciona un plato:</label>
            <select
              id="plato"
              value={platoId || ''}
              onChange={(e) => setPlatoId(Number(e.target.value))}
            >
              <option value="">-- Selecciona un plato --</option>
              {platos.map((plato) => (
                <option key={plato.id} value={plato.id}>
                  {plato.nombre} - ${plato.precio}
                </option>
              ))}
            </select>

            <label htmlFor="cantidad">Cantidad:</label>
            <input
              type="number"
              id="cantidad"
              value={cantidad}
              min="1"
              onChange={(e) => setCantidad(Number(e.target.value))}
            />

            <button type="submit">Agregar Pedido</button>
            {pedidoError && <p className="error">{pedidoError}</p>} {/* Muestra errores de agregar pedido */}
          </form>
        </section>

        {/* Muestra los detalles de cada pedido */}
        <section>
          <h2>Detalles de los Pedidos</h2>
          {mesa && mesa.pedidos.length > 0 ? (
            mesa.pedidos.map((pedido) => (
              <DetallesPedido key={pedido.id} id={pedido.id} />
            ))
          ) : (
            <p>No hay detalles de pedidos para mostrar.</p>
          )}
        </section>
      </div>
      <footer>
        <p>© 2024 Control de Caja - Restaurante</p>
      </footer>
    </main>
  );
};

export default DetalleMesa;
