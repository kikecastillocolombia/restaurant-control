// src/components/ui/CrearMesaForm.tsx

import { useEffect, useState } from "react";
import { MesaWithoutId } from "@/types"; // Asegúrate de que esta ruta sea correcta
import { Input } from "@/components/ui/input"; // Asegúrate de que la ruta de Input sea correcta
import { Label } from "@/components/ui/label"; // Asegúrate de que la ruta de Label sea correcta
import { Button } from "@/components/ui/button"; // Asegúrate de que la ruta de Button sea correcta

interface CrearMesaFormProps {
  onNewMesa: (mesaData: MesaWithoutId) => void;
  initialData?: MesaWithoutId; // Agregar la propiedad initialData
}

export default function CrearMesaForm({ onNewMesa, initialData }: CrearMesaFormProps) {
  const [numero, setNumero] = useState<number | string>(''); // Permitir que sea un string para el input

  // Efecto para establecer el valor inicial
  useEffect(() => {
    if (initialData) {
      setNumero(initialData.numero); // Asigna el número directamente
    }
  }, [initialData]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const numeroParsed = typeof numero === 'number' ? numero : parseInt(numero as string, 10);
    if (isNaN(numeroParsed)) {
      alert("Por favor, ingresa un número válido para la mesa.");
      return;
    }

    onNewMesa({ numero: numeroParsed }); // Llama al callback
    setNumero(''); // Limpiar el campo después de la creación
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="numero">Número de Mesa</Label>
        <Input
          id="numero"
          type="number"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
        />
      </div>
      <Button type="submit">
        {initialData ? "Actualizar Mesa" : "Crear Mesa"}
      </Button>
    </form>
  );
}
