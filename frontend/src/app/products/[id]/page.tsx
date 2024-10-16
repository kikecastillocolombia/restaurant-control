import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {getProduct} from '../products.api'
import Link from 'next/link';
import {buttonVariants} from '@/components/ui/button';

interface Props {
  params: {
    id: string
  }
}

async function ProductDetailPage({params}: Props) {
    console.log(params);
    const product = await getProduct(params.id)
    console.log(product);
    
    
  return (
    <div
    className='flex justify-center items-center h-screen'>
      <Card>
        <CardHeader>
          <CardTitle className='flex justify-between'>
            Detalles: <br/>
            {product.nombre}
            <Link 
            className={buttonVariants()}
            href="/">
            Volver
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{product.descripcion}</p>
          <p>{product.precio}</p>
          <img src={product.imageUrl} alt="Imagen de producto" 
          className='w-full h-64 object-cover'/>
        </CardContent>
      </Card>
     
    </div>
  )
}

export default ProductDetailPage