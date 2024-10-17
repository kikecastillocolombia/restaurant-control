// app/admin/layout.tsx
import { ReactNode } from "react";
import { Navbar } from "@/components/navbar-admin"; // Asegúrate de que esta ruta sea correcta

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar /> {/* Navbar que estará presente en todas las vistas del admin */}
      <main className="p-4">{children}</main> {/* Contenido de la vista */}
    </>
  );
}
