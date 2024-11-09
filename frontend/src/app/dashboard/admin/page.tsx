/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Contenedor principal centrado vertical y horizontalmente */}

      <h1 className="text-4xl font-bold mb-6">
        {/* Título principal con margen inferior */}
        Dashboard de Administrador
      </h1>

      <Link href="/dashboard/admin/products" className={buttonVariants()}>
        {/* Botón que redirige al CRUD de productos */}
        Gestionar Productos
      </Link>
      <br/>

      <Link href="/dashboard/admin/mesas" className={buttonVariants()}>
        Gestionar Mesas
      </Link>

    </div>
  );
}
