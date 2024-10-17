// components/mesa-card.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mesa } from '@/types'; // Asegúrate de que la ruta sea correcta

interface MesaCardProps {
  mesa: Mesa; // Usa la interfaz aquí
}

export function MesaCard({ mesa }: MesaCardProps) {
  return (
    <Card key={mesa.id}>
      <CardHeader>
        <CardTitle>
          Mesa {mesa.numero}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Puedes agregar más información sobre la mesa aquí */}
      </CardContent>
    </Card>
  );
}
