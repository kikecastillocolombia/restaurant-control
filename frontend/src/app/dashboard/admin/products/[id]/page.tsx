import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProduct } from '../products.api';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image'; // Importar el componente Image

interface Props {
  params: {
    id: string;
  };
}

async function ProductDetailPage({ params }: Props) {
  const product = await getProduct(params.id);

  return (
    <div className='flex justify-center items-center h-screen'>
      <Card>
        <CardHeader>
          <CardTitle className='flex justify-between'>
            Detalles: <br />
            {product.nombre}
            <Link className={buttonVariants()} href='/products'>
              Volver
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{product.descripcion}</p>
          <p>{product.precio}</p>
          {/* Usando el componente Image correctamente */}
          <div className="relative w-full h-64"> {/* Contenedor relativo con altura y anchura definidas */}
            <Image
              src={product.imageUrl} // URL de la imagen
              alt="Imagen de producto"
              layout="fill" // La imagen llenará el contenedor
              objectFit="cover" // La imagen mantendrá su relación de aspecto
              className="rounded" // Ejemplo de clase para bordes redondeados, puedes personalizarlo
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductDetailPage;
