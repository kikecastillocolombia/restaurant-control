import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CrearProductoForm from "@/components/ui/CrearProductoForm"

export default function CreatePlatoPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Crear Producto</CardTitle>
          <CardDescription>Complete los datos para agregar un nuevo producto.</CardDescription>
        </CardHeader>
        <CardContent>
          <CrearProductoForm />
        </CardContent>
      </Card>
    </div>
  )
}
