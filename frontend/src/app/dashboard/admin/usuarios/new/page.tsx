"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CrearUsuarioForm from "@/components/ui/CrearUsuarioForm";
import { createUser } from "../usuarios.api";
import { useRouter } from 'next/navigation'; // Importa useRouter

export default function CreateUserPage() {
  const router = useRouter(); // Inicializa useRouter

  const handleCreateUser = async (userData: { nombre: string; password: string; rol: string }) => {
    try {
      const newUser = await createUser(userData);
      console.log("Usuario creado:", newUser);
      // Redirigir a la lista de usuarios después de crear el usuario
      router.push("/dashboard/admin/usuarios"); // Cambia esta ruta según sea necesario
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Crear Usuario</CardTitle>
          <CardDescription>
            Complete los datos para agregar un nuevo usuario
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CrearUsuarioForm onSubmit={handleCreateUser} />
        </CardContent>
      </Card>
    </div>
  );
}
