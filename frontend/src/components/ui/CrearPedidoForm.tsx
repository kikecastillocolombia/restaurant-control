/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { createPedido } from '@/app/dashboard/admin/pedidos/pedidos.api'; // Asegúrate de implementar este método
import { createDetallePedido } from '@/app/dashboard/admin/pedidos/detallePedidos.api'; // Asegúrate de implementar este método
import { getProducts } from '@/app/dashboard/admin/products/products.api'; // Para obtener productos

// Define la interfaz para el detalle del pedido
interface DetallePedido {
  cantidad: number;
  productoId: number;
}

const CrearPedidoForm = () => {
  const [pedido, setPedido] = useState({ fecha: '', estado: 'pendiente', usuarioId: 1, mesaId: 1 });
  const [detalles, setDetalles] = useState<DetallePedido[]>([{ cantidad: 1, productoId: 1 }]); // Usa la interfaz aquí
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  const handleSubmitPedido = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPedido = await createPedido(pedido);

    // Crear detalles después de crear el pedido
    for (const detalle of detalles) {
      await createDetallePedido({ ...detalle, pedidoId: newPedido.id });
    }

    // Resetear formulario
    setPedido({ fecha: '', estado: 'pendiente', usuarioId: 1, mesaId: 1 });
    setDetalles([{ cantidad: 1, productoId: 1 }]);
  };

  const handleChangeDetalle = (index: number, field: keyof DetallePedido, value: number) => {
    const newDetalles = [...detalles];
    newDetalles[index][field] = value; // TypeScript ahora reconoce el tipo
    setDetalles(newDetalles);
  };

  const addDetalle = () => {
    setDetalles([...detalles, { cantidad: 1, productoId: 1 }]);
  };

  return (
    <form onSubmit={handleSubmitPedido} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Crear Pedido</h2>
      <label>
        Fecha:
        <input type="datetime-local" value={pedido.fecha} onChange={(e) => setPedido({ ...pedido, fecha: e.target.value })} required />
      </label>
      <label>
        Usuario ID:
        <input type="number" value={pedido.usuarioId} onChange={(e) => setPedido({ ...pedido, usuarioId: Number(e.target.value) })} required />
      </label>
      <label>
        Mesa ID:
        <input type="number" value={pedido.mesaId} onChange={(e) => setPedido({ ...pedido, mesaId: Number(e.target.value) })} required />
      </label>

      <h2 className="text-xl font-bold">Detalles del Pedido</h2>
      {detalles.map((detalle, index) => (
        <div key={index} className="flex gap-2">
          <label>
            Cantidad:
            <input
              type="number"
              value={detalle.cantidad}
              onChange={(e) => handleChangeDetalle(index, 'cantidad', Number(e.target.value))}
              required
            />
          </label>
          <label>
            Producto:
            <select
              value={detalle.productoId}
              onChange={(e) => handleChangeDetalle(index, 'productoId', Number(e.target.value))}
              required
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>{product.nombre}</option>
              ))}
            </select>
          </label>
        </div>
      ))}
      <button type="button" onClick={addDetalle} className={buttonVariants()}>Agregar Detalle</button>

      <button type="submit" className={buttonVariants()}>Crear Pedido</button>
    </form>
  );
};

export default CrearPedidoForm;
