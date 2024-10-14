"use client"; // Asegúrate de que esta línea esté al principio del archivo

import React, { useEffect, useState } from 'react';
import { crearPedido, crearDetallePedido, fetchPlatos } from '@/services/apiService';
import { Pedido } from '@/interfaces/pedido'; // Asegúrate de importar la interfaz

// Define las interfaces necesarias
interface DetallePedido {
  id?: number;
  cantidad: number;
  platoId: number;
}

interface Plato {
  id: number;
  nombre: string;
  precio: string;
}

interface CrearPedidoConDetallesProps {
  agregarPedido: (nuevoPedido: Pedido) => void; // Asegúrate de definir la propiedad
}

const CrearPedidoConDetalles: React.FC<CrearPedidoConDetallesProps> = ({ agregarPedido }) => {
  const [platos, setPlatos] = useState<Plato[]>([]);
  const [detalles, setDetalles] = useState<DetallePedido[]>([]);
  const [mesaId, setMesaId] = useState<number | null>(null);
  const [usuarioId, setUsuarioId] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlatosData = async () => {
      try {
        const response = await fetchPlatos();
        setPlatos(response);
      } catch {
        setError('Error al cargar los platos.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlatosData();
  }, []);

  const agregarDetalle = () => {
    setDetalles([...detalles, { cantidad: 1, platoId: 0 }]);
  };

  const handleCantidadChange = (index: number, value: number) => {
    const nuevosDetalles = [...detalles];
    nuevosDetalles[index].cantidad = value;
    setDetalles(nuevosDetalles);
  };

  const handlePlatoChange = (index: number, value: number) => {
    const nuevosDetalles = [...detalles];
    nuevosDetalles[index].platoId = value;
    setDetalles(nuevosDetalles);
  };

  const handleCrearPedido = async () => {
    if (mesaId === null) {
      alert('Por favor, selecciona una mesa.');
      return;
    }

    try {
      const nuevoPedido = {
        fecha: new Date().toISOString(),
        estado: 'pendiente',
        usuarioId: usuarioId,
        mesaId: mesaId,
      };

      const pedidoCreado = await crearPedido(nuevoPedido);
      
      // Crear detalles del pedido
      for (const detalle of detalles) {
        const nuevoDetalle = { ...detalle, pedidoId: pedidoCreado.id! };
        await crearDetallePedido(nuevoDetalle);
      }

      agregarPedido({ ...nuevoPedido, id: pedidoCreado.id! }); // Llama a agregarPedido aquí

      alert('Pedido y detalles creados exitosamente.');
      setDetalles([]);
    } catch {
      setError('Error al crear el pedido.');
    }
  };

  if (loading) {
    return <p>Cargando platos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Crear Pedido</h2>
      
      <div>
        <label>Mesa:</label>
        <input
          type="number"
          value={mesaId || ''}
          onChange={(e) => setMesaId(Number(e.target.value))}
          placeholder="ID de mesa"
        />
      </div>

      {detalles.map((detalle, index) => (
        <div key={index}>
          <h4>Detalle {index + 1}</h4>
          <select
            value={detalle.platoId}
            onChange={(e) => handlePlatoChange(index, Number(e.target.value))}
          >
            <option value={0} disabled>Selecciona un plato</option>
            {platos.map((plato) => (
              <option key={plato.id} value={plato.id}>
                {plato.nombre} - ${plato.precio}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={detalle.cantidad}
            onChange={(e) => handleCantidadChange(index, Number(e.target.value))}
            placeholder="Cantidad"
            min={1}
          />
        </div>
      ))}

      <button onClick={agregarDetalle}>Agregar Detalle</button>
      <button onClick={handleCrearPedido}>Crear Pedido</button>
    </div>
  );
};

export default CrearPedidoConDetalles;
