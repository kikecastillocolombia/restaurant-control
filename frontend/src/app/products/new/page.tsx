import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CrearPlatoForm from "@/components/ui/CrearPlatoForm"

export default function CreatePlatoPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Crear Plato</CardTitle>
          <CardDescription>Complete los datos para agregar un nuevo plato.</CardDescription>
        </CardHeader>
        <CardContent>
          <CrearPlatoForm />
        </CardContent>
      </Card>
    </div>
  )
}
