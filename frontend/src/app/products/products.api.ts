export async function getProducts() {
    const data = await fetch('http://localhost:3001/api/productos',
        {cache: "no-store"}
    )
    return await data.json()
}

export async function getProduct(id: string) {
    const data = await fetch(`http://localhost:3001/api/productos/${id}`, {
        cache: "no-store"
    },
    )
    return await data.json()
}

export async function createProduct(productData: unknown) {
  
    const res = await fetch('http://localhost:3001/api/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),

    })
    const data = await res.json()
    console.log(data);
    
}

export async function deleteProduct(id: string) {
    const res = await fetch(`http://localhost:3001/api/productos/${id}`, {
        method: "DELETE",
    });
    // Si no hay contenido en la respuesta (status 204 No Content), no intentes parsear JSON
  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return null; // O cualquier valor que desees retornar cuando no haya contenido
  }

  const data = await res.json();
  return data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateProduct(id: string, newProduct: any) {
    const res = await fetch(`http://localhost:3001/api/productos/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct),
        cache: "no-store"

    });
    return await res.json()
}