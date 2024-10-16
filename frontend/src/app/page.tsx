import Link from "next/link";
import { buttonVariants, Button } from "@/components/ui/button";
import { getProducts } from './products/products.api'; // Asegúrate de que esta ruta es correcta
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Asegúrate de que CardContent esté importado

export const dynamic = "force-dynamic"

export default async function Home() {
  const products = await getProducts();
  console.log(products);

  return (
    <div className="flex flex-col items-center"> {/* Cambia a flex-col para apilar elementos */}
      <h1 className="text-4xl font-bold mb-4"> {/* Añade margen inferior para separación */}
        NextNestApp
      </h1>

      <Link href="/products/new" className={buttonVariants()}>
        Crear Producto
      </Link>

      {/* Mapa de productos */}
      <div className="grid grid-cols-3 gap-4 mt-4"> {/* Usa grid para mostrar productos */}
        {products.map(product => (
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
              <p>{product.descripcion}</p> {/* Puedes mostrar más propiedades según lo que necesites */}
            <Button className="mt-5">
              Eliminar
            </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
