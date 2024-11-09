/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getProducts } from "./products.api";
import { ProductCard } from '@/components/product-card';
export const dynamic = "force-dynamic"

export default async function Home() {
  const products = await getProducts();
  
  return (
    <div className="flex flex-col items-center"> {/* Cambia a flex-col para apilar elementos */}
      <h1 className="text-4xl font-bold mb-4"> {/* Añade margen inferior para separación */}
        NextNestApp
      </h1>

      <Link href="/dashboard/admin/products/new" className={buttonVariants()}>
        Crear Producto
      </Link>

      {/* Mapa de productos */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4"> {/* Usa grid para mostrar productos */}
        {products.map((product:any) => (
          <ProductCard product={product} key={product.id}/>
        ))}
      </div>
    </div>
  );
}
