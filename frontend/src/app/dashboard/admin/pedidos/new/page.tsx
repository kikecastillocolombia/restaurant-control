// src/app/dashboard/admin/pedidos/new/page.tsx

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPedido } from '../pedidos.api';

// Definición de la interfaz para el nuevo pedido
interface NuevoPedido {
  fecha: string;
  estado: string;
  usuarioId: number;
  mesaId: number;
}

const CrearPedidoPage: React.FC = () => {
  const [fecha, setFecha] = useState('');
  const [estado, setEstado] = useState('');
  const [usuarioId, setUsuarioId] = useState<number>(0);
  const [mesaId, setMesaId] = useState<number>(0);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Crear un nuevo pedido
    const nuevoPedido: NuevoPedido = {
      fecha,
      estado,
      usuarioId,
      mesaId,
    };

    await createPedido(nuevoPedido);
    router.push('/dashboard/admin/pedidos');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Crear Nuevo Pedido</h2>
      <label>
        Fecha:
        <input
          type="datetime-local"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
      </label>
      <label>
        Estado:
        <input
          type="text"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          required
        />
      </label>
      <label>
        Usuario ID:
        <input
          type="number"
          value={usuarioId}
          onChange={(e) => setUsuarioId(Number(e.target.value))}
          required
        />
      </label>
      <label>
        Mesa ID:
        <input
          type="number"
          value={mesaId}
          onChange={(e) => setMesaId(Number(e.target.value))}
          required
        />
      </label>
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Crear Pedido
      </button>
    </form>
  );
};

export default CrearPedidoPage;
