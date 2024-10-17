"use client";
import { useState } from "react";
import { createMesa } from "@/app/mesas/mesas.api"; // Asegúrate de que esto apunta a la ruta correcta
import { MesaWithoutId } from "@/types"; // Asegúrate de que la ruta sea correcta

interface CrearMesaFormProps {
  onNewMesa: (mesaData: MesaWithoutId) => void; // Cambiado a MesaWithoutId
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

    const newMesa = await createMesa({ numero: numeroParsed }); // Guardar el nuevo objeto creado
    console.log(newMesa);
    
    setNumero(''); // Limpiar el campo después de la creación
    onNewMesa({ numero: numeroParsed }); // Llama al callback
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="numero">Número de Mesa</label>
        <input
          id="numero"
          type="number"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
        />
      </div>
      <button type="submit">
        Crear Mesa
      </button>
    </form>
  );
}
