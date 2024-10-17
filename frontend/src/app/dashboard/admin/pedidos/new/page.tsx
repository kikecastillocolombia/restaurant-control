import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CrearPedidoForm from "@/components/ui/CrearPedidoForm";

const CrearPedidoPage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Crear Nuevo Pedido</CardTitle>
          <CardDescription>
            Complete los datos para agregar un nuevo pedido.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CrearPedidoForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default CrearPedidoPage;
