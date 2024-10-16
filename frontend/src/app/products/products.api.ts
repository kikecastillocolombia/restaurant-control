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