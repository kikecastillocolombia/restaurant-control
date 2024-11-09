import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CrearProductoForm from "@/components/ui/CrearProductoForm"
import { getProduct } from "../products.api"

interface Props {
  params: {
    id : string
  }
}

export default async function CreateProductoPage({params}:Props) {

  const product =await getProduct(params.id)

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>
            {params.id ? "Editar Producto" : "Crear Producto"}
          </CardTitle>
          <CardDescription>
            {params.id ? "Complete los datos para editar este producto" : "Complete los datos para agregar un nuevo producto"} 
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CrearProductoForm product={product}/>
        </CardContent>
      </Card>
    </div>
  )
}
