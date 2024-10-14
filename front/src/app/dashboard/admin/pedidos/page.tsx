"use client"; // Asegúrate de que esta línea esté al principio del archivo

import React, { useState } from 'react';
import CrearPedidoConDetalles from '@/app/components/CrearPedidoConDetalles';
import TablaPedidos from '@/app/components/TablaPedidos';
import DetallesPedido from '@/app/components/DetallesPedido';
import { Pedido } from '@/interfaces/pedido'; // Asegúrate de importar la interfaz aquí
import '../../../styles.css';

const Pedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState<Pedido | null>(null);

  const agregarPedido = (nuevoPedido: Pedido) => {
    setPedidos([...pedidos, nuevoPedido]);
  };

  const eliminarPedido = (id: number) => {
    setPedidos(pedidos.filter(pedido => pedido.id !== id));
  };

  const seleccionarPedido = (pedido: Pedido) => {
    setPedidoSeleccionado(pedido);
  };

  const editarPedido = (pedidoEditado: Pedido) => {
    setPedidos(pedidos.map(pedido => (pedido.id === pedidoEditado.id ? pedidoEditado : pedido)));
    setPedidoSeleccionado(null); // Reinicia la selección de pedido
  };

  return (
    <div>
      <h2>Gestión de Pedidos</h2>
      <CrearPedidoConDetalles agregarPedido={agregarPedido} />
      
      <TablaPedidos 
        pedidos={pedidos}
        eliminarPedido={eliminarPedido}
        seleccionarPedido={seleccionarPedido}
      />
      
      {pedidoSeleccionado && (
        <DetallesPedido 
          pedido={pedidoSeleccionado}
          onEdit={editarPedido}
          onClose={() => setPedidoSeleccionado(null)}
        />
      )}
    </div>
  );
};

export default Pedidos;
