"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Importar useRouter
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createPedido } from "@/app/dashboard/admin/pedidos/pedidos.api";
import { createDetallePedido } from "@/app/dashboard/admin/pedidos/detallePedidos.api"; 
import { getProducts } from "@/app/dashboard/admin/products/products.api"; 
import { getMesas } from "@/app/dashboard/admin/mesas/mesas.api";

interface DetallePedido {
  cantidad: number;
  productoId: number;
}

interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

interface Mesa {
  id: number;
  numero: number;
}

const CrearPedidoForm = () => {
  const router = useRouter(); // Crear instancia del router

  const [pedido, setPedido] = useState({
    fecha: new Date().toISOString().slice(0, 16),
    estado: "pendiente",
    usuarioId: 1,
    mesaId: 1,
  });

  const [detalles, setDetalles] = useState<DetallePedido[]>([
    { cantidad: 1, productoId: 1 },
  ]);

  const [products, setProducts] = useState<Producto[]>([]);
  const [mesas, setMesas] = useState<Mesa[]>([]);

  useEffect(() => {
    const fetchMesas = async () => {
      const fetchedMesas = await getMesas();
      setMesas(fetchedMesas);
    };

    fetchMesas();
  }, []);

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

    for (const detalle of detalles) {
      await createDetallePedido({ ...detalle, pedidoId: newPedido.id });
    }

    // Redirigir a la vista de pedidos
    router.push("/dashboard/admin/pedidos"); // Cambia la ruta según tu estructura de carpetas

    // Reiniciar el estado del formulario
    setPedido({ fecha: new Date().toISOString().slice(0, 16), estado: "pendiente", usuarioId: 1, mesaId: 1 });
    setDetalles([{ cantidad: 1, productoId: 1 }]);
  };

  const handleChangeDetalle = (index: number, field: keyof DetallePedido, value: number) => {
    const newDetalles = [...detalles];
    newDetalles[index][field] = value;
    setDetalles(newDetalles);
  };

  const addDetalle = () => {
    setDetalles([...detalles, { cantidad: 1, productoId: 1 }]);
  };

  return (
    <form onSubmit={handleSubmitPedido} className="space-y-4">
      <div className="grid w-full items-center gap-4">
        {/* Campo para la fecha del pedido */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="fecha">Fecha</Label>
          <Input
            id="fecha"
            type="datetime-local"
            value={pedido.fecha}
            onChange={(e) => setPedido({ ...pedido, fecha: e.target.value })}
            required
          />
        </div>

        {/* Campo para la Mesa ID */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="mesaId">Mesa</Label>
          <select
            id="mesaId"
            value={pedido.mesaId}
            onChange={(e) => setPedido({ ...pedido, mesaId: Number(e.target.value) })}
            required
            className="border border-gray-300 rounded bg-white px-2 py-1"
          >
            {mesas.map((mesa) => (
              <option key={mesa.id} value={mesa.id}>
                Mesa {mesa.numero}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h2 className="text-xl font-bold">Detalles del Pedido</h2>
      {detalles.map((detalle, index) => (
        <div key={index} className="flex gap-2">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor={`cantidad-${index}`}>Cantidad</Label>
            <Input
              id={`cantidad-${index}`}
              type="number"
              value={detalle.cantidad}
              onChange={(e) => handleChangeDetalle(index, "cantidad", Number(e.target.value))}
              required
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor={`producto-${index}`}>Producto</Label>
            <select
              id={`producto-${index}`}
              value={detalle.productoId}
              onChange={(e) => handleChangeDetalle(index, "productoId", Number(e.target.value))}
              required
              className="border border-gray-300 rounded bg-white px-2 py-1"
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
      <Button type="button" onClick={addDetalle} className="mt-4">
        Agregar Detalle
      </Button>

      <Button type="submit" className="mt-4">
        Crear Pedido
      </Button>
    </form>
  );
};

export default CrearPedidoForm;
