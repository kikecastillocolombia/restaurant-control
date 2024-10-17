"use client"
import React, { useEffect, useState } from "react";
import { getMesas, createMesa } from "./mesas.api"; // Asegúrate de importar createMesa
import { MesaCard } from "@/components/mesa-card"; 
import CrearMesaForm from "@/components/ui/CrearMesaForm";
import { Mesa, MesaWithoutId } from "@/types"; // Importa la interfaz

const MesaPage: React.FC = () => {
  const [mesas, setMesas] = useState<Mesa[]>([]); // Define el tipo aquí

  useEffect(() => {
    const fetchMesas = async () => {
      const data = await getMesas();
      setMesas(data);
    };

    fetchMesas();
  }, []); // Solo se ejecuta al montar el componente

  const handleNewMesa = async (mesaData: MesaWithoutId) => { // Cambiado a MesaWithoutId
    const newMesa = await createMesa(mesaData); // Se guarda el nuevo objeto creado
    setMesas([...mesas, newMesa]); // Agrega la nueva mesa a la lista
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">Lista de Mesas</h1>
      <CrearMesaForm onNewMesa={handleNewMesa} />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
        {mesas.map((mesa) => (
          <MesaCard mesa={mesa} key={mesa.id} />
        ))}
      </div>
    </div>
  );
};

export default MesaPage;
