// src/app/mesas/[id]/edit/page.tsx

"use client"; // Asegúrate de agregar esta línea

import { useEffect, useState } from "react";
import { getMesa, updateMesa } from "@/app/mesas/mesas.api"; // Asegúrate de tener estas funciones
import { useRouter, useParams } from "next/navigation"; // Cambia esto para usar useParams
import { MesaWithoutId } from "@/types";
import CrearMesaForm from "@/components/ui/CrearMesaForm";

const EditMesaPage = () => {
  const { id } = useParams(); // Obtiene el id de la mesa directamente desde useParams
  const [mesa, setMesa] = useState<MesaWithoutId | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMesa = async () => {
      if (id) {
        try {
          const mesaData = await getMesa(id as string);
          setMesa(mesaData);
        } catch (error) {
          console.error("Error al obtener la mesa:", error);
          // Aquí puedes manejar el error de forma más visual, como redirigir o mostrar un mensaje
        }
      }
    };
    fetchMesa();
  }, [id]);

  const handleUpdateMesa = async (mesaData: MesaWithoutId) => {
    if (id) {
      try {
        await updateMesa(id as string, mesaData); // Actualiza la mesa
        router.push("/mesas"); // Redirige a la lista de mesas
      } catch (error) {
        console.error("Error al actualizar la mesa:", error);
        // Manejo de error adicional si es necesario
      }
    }
  };

  if (!mesa) return <p className="text-center">Cargando...</p>;

  return (
    <div className="flex flex-col items-center p-4"> {/* Flexbox para centrar y agregar padding */}
      <h1 className="text-4xl font-bold mb-4">Editar Mesa {mesa.numero}</h1> {/* Título estilizado */}
      <CrearMesaForm onNewMesa={handleUpdateMesa} initialData={mesa} /> {/* Formulario para editar la mesa */}
    </div>
  );
};

export default EditMesaPage;
