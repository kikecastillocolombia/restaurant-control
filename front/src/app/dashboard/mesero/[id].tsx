// src/app/dashboard/mesero/[id].tsx
import React from 'react';
import DetallesPedido from '@/app/components/DetallesPedido';

const DetallePedidoPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const pedidoId = parseInt(params.id); // Convertir el ID a número

  return (
    <div>
      <h1>Detalles del Pedido</h1>
      <DetallesPedido id={pedidoId} />
    </div>
  );
};

export default DetallePedidoPage;
