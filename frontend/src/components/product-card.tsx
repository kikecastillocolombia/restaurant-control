"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"; // Asegúrate de que CardContent esté importado
import { Button } from "@/components/ui/button";
import { deleteProduct } from '@/app/dashboard/admin/products/products.api';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Importa el componente Image de Next.js

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProductCard({ product }: any) {
    const router = useRouter();

    async function handleRemoveProduct(id: string) {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (confirmDelete) {
            await deleteProduct(id);
            router.refresh();
        }
    }

    return (
        <Card key={product.id} onClick={() => {
            router.push(`/dashboard/admin/products/${product.id}`)
        }}> {/* Asegúrate de que 'id' es la propiedad única del producto */}
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <p>{product.nombre}</p> {/* Usa la propiedad correcta del producto */}
                    <span className="text-sm font-bold text-gray-500">
                        <p>${product.precio}</p> {/* Puedes mostrar más propiedades según lo que necesites */}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {product.imageUrl && ( // Renderiza la imagen solo si existe una URL
                    <div className="relative w-full h-64 mb-4"> {/* Contenedor relativo con altura definida */}
                        <Image
                            src={product.imageUrl} // URL de la imagen
                            alt={product.nombre} // Texto alternativo
                            layout="fill" // La imagen llenará el contenedor
                            objectFit="contain" // Ajusta la imagen manteniendo la proporción
                        />
                    </div>
                )}
                <p>{product.descripcion}</p> {/* Puedes mostrar más propiedades según lo que necesites */}
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button className="mt-5"
                onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/dashboard/admin/products/${product.id}/edit`);
                }}>
                    Editar
                </Button>
                <Button className="mt-5" variant="destructive" onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveProduct(product.id);
                }}>
                    Eliminar
                </Button>
            </CardFooter>
        </Card>
    );
}
