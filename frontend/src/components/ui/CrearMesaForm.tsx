"use client"
import React, { useState } from "react";
import { createMesa } from "@/app/mesas/mesas.api"; 
import { MesaWithoutId } from "@/types"; 
import { buttonVariants } from "./button";
import { Input } from "./input";
interface CrearMesaFormProps {
  onNewMesa: (mesaData: MesaWithoutId) => void;
}

export default function CrearMesaForm({ onNewMesa }: CrearMesaFormProps) {
  const [numero, setNumero] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const numeroParsed = parseInt(numero, 10);
    if (isNaN(numeroParsed)) {
      alert("Por favor, ingresa un número válido para la mesa.");
      return;
    }
    const newMesa = await createMesa({ numero: numeroParsed });
    console.log(newMesa);
    
    setNumero('');
    onNewMesa({ numero: numeroParsed });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div>
        <label htmlFor="numero">Número de Mesa</label>
        <Input
          id="numero"
          type="number"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
          className="border-2 border-gray-300 rounded-md p-2"
        />
      </div>
      <button className={buttonVariants()} type="submit">
        Crear Mesa
      </button>
    </form>
  );
}
