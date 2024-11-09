"use client";

import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import { createProduct, updateProduct } from '@/app/dashboard/admin/products/products.api';
import { useParams, useRouter } from 'next/navigation';

// Define la interfaz de los datos del formulario
interface FormData {
  nombre: string;
  precio: string;
  descripcion: string;
  imageUrl?: string; // Campo opcional para la URL de la imagen
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CrearProductoForm({ product }: any) {
  const [imagePreview, setImagePreview] = useState<string | undefined>(product?.imageUrl); // Para la vista previa de la imagen

  // Tipar el formulario usando la interfaz FormData
  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      nombre: product?.nombre,
      descripcion: product?.descripcion,
      precio: product?.precio ? product.precio.toString() : '',
      imageUrl: product?.imageUrl,
    }
  });

  const router = useRouter();
  const params = useParams<{ id: string }>();

  // Actualiza la vista previa de la imagen cuando cambia la URL de la imagen
  useEffect(() => {
    setImagePreview(product?.imageUrl);
  }, [product]);

  const onSubmit = handleSubmit(async (data) => {
    const formattedData = {
      ...data,
      precio: parseFloat(data.precio.replace(/\./g, '').replace(',', '.')) // Convierte el precio a número
    };

    try {
      if (params?.id) {
        await updateProduct(params.id, formattedData);
        console.log('Producto actualizado:', formattedData);
      } else {
        await createProduct(formattedData);
        console.log('Producto creado:', formattedData);
      }
      router.push('/dashboard/admin/products');
      router.refresh();
    } catch (error) {
      console.error('Error al crear/actualizar el producto:', error);
    }
  });

  const handleCancel = () => {
    router.push('/'); // Cambia esto a la ruta que desees para el botón de cancelar
  };

  // Actualiza la vista previa de la imagen cuando se introduce una nueva URL
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImagePreview(url); // Actualiza la vista previa
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid w-full items-center gap-4">
        {/* Campo para el nombre del producto */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="nombre">Nombre del Producto</Label>
          <Input id="nombre" placeholder="Ej: Ensalada César" {...register('nombre', { required: 'Este campo es obligatorio' })} />
        </div>

        {/* Campo para el precio del producto */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="precio">Precio</Label>
          <Input id="precio" type="text" placeholder="Ej: 10.99" {...register('precio', { required: 'Este campo es obligatorio' })} />
        </div>

        {/* Campo para la descripción del producto */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="descripcion">Descripción</Label>
          <Input id="descripcion" placeholder="Ej: Deliciosa ensalada con pollo y aderezo César" {...register('descripcion', { required: 'Este campo es obligatorio' })} />
        </div>

        {/* Campo para la URL de la imagen (opcional) */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="imageUrl">URL de la Imagen (opcional)</Label>
          <Input id="imageUrl" placeholder="Ej: https://ejemplo.com/imagen.jpg" {...register('imageUrl')} onChange={handleImageUrlChange} />
          {imagePreview && (
            <div className="mt-2">
              <Label>Vista previa de la imagen:</Label>
              <img src={imagePreview} alt="Vista previa" className="w-32 h-32 object-cover mt-2" />
            </div>
          )}
        </div>
      </div>

      {/* Footer con botones */}
      <div className="flex justify-between mt-4">
        <Button type="button" variant="outline" onClick={handleCancel}>Cancelar</Button>
        <Button type="submit">
          {params.id ? 'Editar' : 'Crear'}
        </Button>
      </div>
    </form>
  );
}

export default CrearProductoForm;
