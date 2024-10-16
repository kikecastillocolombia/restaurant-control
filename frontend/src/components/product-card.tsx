"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"; // Asegúrate de que CardContent esté importado
import { Button } from "@/components/ui/button";
import { deleteProduct } from '@/app/products/products.api';
import { useRouter } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProductCard({ product }: any) {
    const router = useRouter();

    async function handleRemoveProduct(id: string) {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (confirmDelete) {
            console.log(id);
            await deleteProduct(id);
            router.refresh();
        }
    }

    return (
        <Card key={product.id}> {/* Asegúrate de que 'id' es la propiedad única del producto */}
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
                    <img src={product.imageUrl} alt={product.nombre} className="w-1/3 h-auto mb-4 object-contain" />
                )}
                <p>{product.descripcion}</p> {/* Puedes mostrar más propiedades según lo que necesites */}
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button className="mt-5">
                    Editar
                </Button>
                <Button className="mt-5" variant="destructive" onClick={() => handleRemoveProduct(product.id)}>
                    Eliminar
                </Button>
            </CardFooter>
        </Card>
    );
}
