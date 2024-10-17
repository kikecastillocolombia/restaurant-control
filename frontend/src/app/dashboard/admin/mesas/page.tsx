"use client"
import React, { useEffect, useState } from "react";
import { getMesas, createMesa } from "@/app/mesas/mesas.api"; 
import { MesaCard } from "@/components/mesa-card"; 
import CrearMesaForm from "@/components/ui/CrearMesaForm";
import { Mesa, MesaWithoutId } from "@/types"; 

const MesaPage: React.FC = () => {
  const [mesas, setMesas] = useState<Mesa[]>([]); 

  useEffect(() => {
    const fetchMesas = async () => {
      const data = await getMesas();
      setMesas(data);
    };

    fetchMesas();
  }, []); 

  const handleNewMesa = async (mesaData: MesaWithoutId) => { 
    const newMesa = await createMesa(mesaData); 
    setMesas([...mesas, newMesa]); 
  };

  const handleDeleteMesa = (id: string) => {
    setMesas(mesas.filter(mesa => mesa.id !== id)); // Elimina la mesa de la lista
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">Lista de Mesas</h1>
      <CrearMesaForm onNewMesa={handleNewMesa} />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
        {mesas.map((mesa) => (
          <MesaCard mesa={mesa} key={mesa.id} onDelete={handleDeleteMesa} /> // Pasa la función de eliminación
        ))}
      </div>
    </div>
  );
};

export default MesaPage;
