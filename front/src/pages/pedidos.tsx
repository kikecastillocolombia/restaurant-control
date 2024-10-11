import axios from 'axios';
import { useEffect, useState } from 'react';

// Define un tipo para tus pedidos (opcional)
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
  const [error, setError] = useState<Error | null>(null); // Cambiar el tipo de error

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get<Pedido[]>('http://localhost:3001/pedidos');
        setPedidos(response.data); // Asegúrate de que esta línea está correcta.
      } catch (err) {
        // Asegúrate de que err sea del tipo Error
        if (axios.isAxiosError(err) && err.response) {
          setError(new Error(err.response.data.message || 'Error al cargar los pedidos'));
        } else {
          setError(new Error('Error desconocido'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los pedidos: {error.message}</p>; // Aquí no habrá error

  return (
    <div>
      <h1>Pedidos</h1>
      <ul>
        {pedidos.map(pedido => (
          <li key={pedido.id}>
            <h2>Pedido ID: {pedido.id}</h2>
            <p>Fecha: {new Date(pedido.fecha).toLocaleString()}</p>
            <p>Estado: {pedido.estado}</p>
            <p>Usuario: {pedido.usuario.nombre} ({pedido.usuario.email})</p>
            <p>Mesa: {pedido.mesa.numero}</p>
            <h3>Detalles:</h3>
            <ul>
              {pedido.detalles.length > 0 ? (
                pedido.detalles.map(detalle => (
                  <li key={detalle.id}>
                    Cantidad: {detalle.cantidad}
                  </li>
                ))
              ) : (
                <li>No hay detalles</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PedidosComponent;
