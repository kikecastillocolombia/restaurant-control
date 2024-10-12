// src/app/components/Dashboard.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Dashboard: React.FC = () => {
  const [mesas, setMesas] = useState<any[]>([]); // Cambia el tipo según tu entidad Mesa
  const [nuevoPedido, setNuevoPedido] = useState({ mesaId: '', platos: [] });
  const [historialPedidos, setHistorialPedidos] = useState<any[]>([]); // Cambia el tipo según tu historial de pedidos
  const router = useRouter();

  useEffect(() => {
    // Obtener mesas disponibles
    const fetchMesas = async () => {
      try {
        const response = await axios.get('http://localhost:3001/mesas'); // Ajusta la URL según tu API
        setMesas(response.data);
      } catch (error) {
        console.error('Error al obtener mesas', error);
      }
    };

    fetchMesas();
  }, []);

  const agregarPedido = async () => {
    try {
      const response = await axios.post('http://localhost:3001/pedidos', nuevoPedido); // Ajusta la URL según tu API
      console.log('Pedido creado:', response.data);
      // Actualiza el historial de pedidos si es necesario
    } catch (error) {
      console.error('Error al crear el pedido', error);
    }
  };

  const cerrarSesion = () => {
    // Manejar el cierre de sesión
    router.push('/'); // Redirigir a la pantalla de inicio
  };

  return (
    <div>
      <h1>Dashboard del Mesero</h1>
      <button onClick={cerrarSesion}>Cerrar Sesión</button>
      <h2>Mesas Disponibles</h2>
      <ul>
        {mesas.map((mesa) => (
          <li key={mesa.id}>{mesa.nombre} - Estado: {mesa.estado}</li>
        ))}
      </ul>

      <h2>Agregar Nuevo Pedido</h2>
      <div>
        <label htmlFor="mesa">Seleccionar Mesa:</label>
        <select
          id="mesa"
          value={nuevoPedido.mesaId}
          onChange={(e) => setNuevoPedido({ ...nuevoPedido, mesaId: e.target.value })}
        >
          <option value="">Seleccione una mesa</option>
          {mesas.map((mesa) => (
            <option key={mesa.id} value={mesa.id}>{mesa.nombre}</option>
          ))}
        </select>

        {/* Aquí puedes agregar un componente para seleccionar platos */}
        <button onClick={agregarPedido}>Confirmar Pedido</button>
      </div>

      {/* Aquí puedes agregar una sección para ver el historial de pedidos */}
      <h2>Historial de Pedidos</h2>
      <ul>
        {historialPedidos.map((pedido) => (
          <li key={pedido.id}>{pedido.descripcion}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
