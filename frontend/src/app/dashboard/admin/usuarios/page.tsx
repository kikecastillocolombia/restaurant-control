"use client";
// UsersPage.tsx
import Link from 'next/link';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from 'react';
import { getUsers, deleteUser } from './usuarios.api';

// Define el tipo de usuario
interface User {
  id: number;
  nombre: string;
  rol: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  // Obtener usuarios al cargar el componente
  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para manejar la eliminación de un usuario
  const handleDeleteUser = async (id: number) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");

    if (confirmed) {
      await deleteUser(id.toString());
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <div className="flex justify-between w-full max-w-4xl items-center">
        <h1 className="text-3xl font-bold">Usuarios</h1>
        <Link href="/dashboard/admin/usuarios/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Crear Usuario
          </Button>
        </Link>
      </div>

      <Table className="w-full max-w-4xl">
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.nombre}</TableCell>
              <TableCell>{user.rol}</TableCell>
              <TableCell className="text-right">
                <Link href={`/dashboard/admin/usuarios/${user.id}/edit`}>
                  <Button variant="ghost" size="sm" className="mr-2">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Editar</span>
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleDeleteUser(user.id)} 
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Eliminar</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
