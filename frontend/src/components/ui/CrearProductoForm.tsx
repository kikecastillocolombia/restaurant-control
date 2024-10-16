"use client";

import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import { createProduct } from '@/app/products/products.api';
import { useRouter } from 'next/navigation';

// Define la interfaz de los datos del formulario
interface FormData {
  nombre: string;
  precio: string;
  descripcion: string;
  imageUrl?: string; // Campo opcional para la URL de la imagen
}

function CrearProductoForm() {
  // Tipar el formulario usando la interfaz FormData
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    // Convierte el precio de string a número
    const formattedData = {
      ...data,
      precio: parseInt(data.precio.replace(/\./g, ''), 10) // Convierte el precio a número
    };
    
    try {
      // Aquí llamas a la función createProduct con los datos formateados
      await createProduct(formattedData);
      console.log('Producto creado:', formattedData);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="grid w-full items-center gap-4">
        {/* Campo para el nombre del plato */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="nombre">Nombre del Producto</Label>
          <Input id="nombre" placeholder="Ej: Ensalada César" {...register('nombre')} />
        </div>

        {/* Campo para el precio del plato */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="precio">Precio</Label>
          <Input id="precio" type="text" placeholder="Ej: 10.99" {...register('precio')} />
        </div>

        {/* Campo para la descripción del plato */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="descripcion">Descripción</Label>
          <Input id="descripcion" placeholder="Ej: Deliciosa ensalada con pollo y aderezo César" {...register('descripcion')} />
        </div>

        {/* Campo para la URL de la imagen (opcional) */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="imageUrl">URL de la Imagen (opcional)</Label>
          <Input id="imageUrl" placeholder="Ej: https://ejemplo.com/imagen.jpg" {...register('imageUrl')} />
        </div>
      </div>

      {/* Footer con botones */}
      <div className="flex justify-between mt-4">
        <Button type="button" variant="outline">Cancelar</Button>
        <Button type="submit">Crear Plato</Button>
      </div>
    </form>
  );
}

export default CrearProductoForm;
