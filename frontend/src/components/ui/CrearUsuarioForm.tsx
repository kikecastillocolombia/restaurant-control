"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"; // Importación consolidada

interface CrearUsuarioFormProps {
  onSubmit: (userData: { nombre: string; password: string; rol: string }) => void;
}

const CrearUsuarioForm: React.FC<CrearUsuarioFormProps> = ({ onSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("mesero"); // Valor por defecto

  // Estados para manejar errores
  const [errorNombre, setErrorNombre] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRol, setErrorRol] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Limpiar mensajes de error previos
    setErrorNombre("");
    setErrorPassword("");
    setErrorRol("");

    // Validar la longitud de la contraseña
    if (password.length < 6) {
      setErrorPassword("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Validar el nombre
    if (nombre.trim() === "") {
      setErrorNombre("El nombre es obligatorio");
      return;
    }

    // Validar el rol
    if (!["mesero", "administrador"].includes(rol)) {
      setErrorRol("Rol inválido");
      return;
    }

    // Si todas las validaciones pasan, se llama a onSubmit
    onSubmit({ nombre, password, rol });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <Input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        {errorNombre && <p className="text-red-500 text-sm">{errorNombre}</p>} {/* Mensaje de error para nombre */}
      </div>
      <div>
        <label className="block text-sm font-medium">Contraseña</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorPassword && <p className="text-red-500 text-sm">{errorPassword}</p>} {/* Mensaje de error para contraseña */}
      </div>
      <div>
        <label className="block text-sm font-medium">Rol</label>
        <Select value={rol} onValueChange={setRol}>
          <SelectTrigger>
            <span>{rol}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mesero">Mesero</SelectItem>
            <SelectItem value="administrador">Administrador</SelectItem>
          </SelectContent>
        </Select>
        {errorRol && <p className="text-red-500 text-sm">{errorRol}</p>} {/* Mensaje de error para rol */}
      </div>
      <Button type="submit">Crear Usuario</Button>
    </form>
  );
};

export default CrearUsuarioForm; // No olvides exportar el componente
