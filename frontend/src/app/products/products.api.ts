export async function getProducts() {
    const data = await fetch('http://localhost:3001/api/platos',
        {cache: "no-store"}
    )
    return await data.json()
}

export async function createProduct(productData: unknown) {
  
    const res = await fetch('http://localhost:3001/api/platos', {
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
    const res = await fetch(`http://localhost:3001/api/platos/${id}`, {
        method: "DELETE",
    });
    // Si no hay contenido en la respuesta (status 204 No Content), no intentes parsear JSON
  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return null; // O cualquier valor que desees retornar cuando no haya contenido
  }

  const data = await res.json();
  return data;
}