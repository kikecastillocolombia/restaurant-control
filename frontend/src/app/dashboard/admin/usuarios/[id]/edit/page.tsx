"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // Importa useRouter
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { getUser, updateUser } from "../../usuarios.api";

// Define el tipo para los parámetros de la página
interface Params {
  id: string; // Define el tipo del ID
}

export default function EditUserPage({ params }: { params: Params }) { // Especifica el tipo para params
  const router = useRouter();
  const [user, setUser] = useState({ id: 0, nombre: "", password: "", rol: "mesero" });
  const [loading, setLoading] = useState(true);

  const { id } = params; // Obtén el ID del usuario desde los parámetros de la URL

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser(id);
      setUser(fetchedUser);
      setLoading(false);
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(id, { // Ahora se pasa el ID y el objeto actualizado
        nombre: user.nombre,
        password: user.password,
        rol: user.rol,
      });
      console.log("Usuario actualizado:", user);
      router.push("/dashboard/admin/usuarios"); // Redirige a la lista de usuarios
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtiene el usuario
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="space-y-4 w-[400px]">
        <h1 className="text-3xl font-bold">Editar Usuario</h1>
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <Input
            type="text"
            value={user.nombre}
            onChange={(e) => setUser({ ...user, nombre: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Contraseña</label>
          <Input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Rol</label>
          <Select value={user.rol} onValueChange={(value) => setUser({ ...user, rol: value })}>
            <SelectTrigger>
              <span>{user.rol}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mesero">Mesero</SelectItem>
              <SelectItem value="administrador">Administrador</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Actualizar Usuario</Button>
      </form>
    </div>
  );
}
