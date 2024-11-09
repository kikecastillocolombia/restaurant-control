import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mesa } from '@/types'; 
import Link from 'next/link';
import { buttonVariants } from "@/components/ui/button"; // Asegúrate de importar los estilos de botón
import { deleteMesa } from '@/app/dashboard/admin/mesas/mesas.api'; // Importar la función de eliminación

interface MesaCardProps {
  mesa: Mesa; 
  onDelete: (id: string) => void; // Callback para manejar la eliminación
}

export function MesaCard({ mesa, onDelete }: MesaCardProps) {
  const handleDelete = async () => {
    const confirmed = confirm(`¿Estás seguro de que deseas eliminar la Mesa ${mesa.numero}?`);
    if (confirmed) {
      await deleteMesa(mesa.id);
      onDelete(mesa.id); // Notificar al padre que se eliminó
    }
  };

  return (
    <Card key={mesa.id}>
      <CardHeader>
        <CardTitle>
          Mesa {mesa.numero}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <Link href={`/dashboard/admin/mesas/${mesa.id}/edit`} className={buttonVariants()}>
            Editar
          </Link>
          <button 
            onClick={handleDelete} 
            className={`${buttonVariants()} ml-4`} // Añadir un margen a la izquierda
            style={{ backgroundColor: 'red' }}
          >
            Eliminar
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
