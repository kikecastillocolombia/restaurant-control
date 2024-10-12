// src/pages/pedidos.tsx

import axios from 'axios';
import { useEffect, useState } from 'react';
import api from '../utils/axiosConfig'; // Importa la configuración de Axios
import '../styles.css'; // Asegúrate de que la ruta sea correcta

// Define tipos para tus pedidos
interface Detalle {
  id: number;
  cantidad: number;
}

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: string;
}

interface Mesa {
  id: number;
  numero: number;
}

interface Pedido {
  id: number;
  fecha: string;
  estado: string;
  usuarioId: number;
  detalles: Detalle[];
  usuario: Usuario;
  mesa: Mesa;
}

const PedidosComponent = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Cambia a string | null

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get<Pedido[]>('http://localhost:3001/pedidos');
        setPedidos(response.data);
      } catch (err) {
        // Asegúrate de que err sea del tipo AxiosError
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.message || 'Error al cargar los pedidos'); // Accede a message si existe
        } else {
          setError('Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  if (loading) return <p className="loading">Cargando...</p>;
  if (error) return <p className="error">Error al cargar los pedidos: {error}</p>; // Muestra el error como string

  return (
    <div>
      <h1>Pedidos</h1>
      <ul>
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <li key={pedido.id}>
              <h2>Pedido ID: {pedido.id}</h2>
              <p>Fecha: {new Date(pedido.fecha).toLocaleString()}</p>
              <p>Estado: {pedido.estado}</p>
              <p>Usuario: {pedido.usuario.nombre} ({pedido.usuario.email})</p>
              <p>Mesa: {pedido.mesa.numero}</p>
              <h3>Detalles:</h3>
              <ul>
                {pedido.detalles.length > 0 ? (
                  pedido.detalles.map((detalle) => (
                    <li key={detalle.id}>
                      Cantidad: {detalle.cantidad}
                    </li>
                  ))
                ) : (
                  <li>No hay detalles</li>
                )}
              </ul>
            </li>
          ))
        ) : (
          <li>No hay pedidos disponibles.</li>
        )}
      </ul>
    </div>
  );
};

export default PedidosComponent;