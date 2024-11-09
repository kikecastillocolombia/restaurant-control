export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export async function getMesas() {
    const data = await fetch(`${BACKEND_URL}/api/mesas`, {
        cache: "no-store"
    });
    return await data.json();
}

export async function getMesa(id: string) {
    const data = await fetch(`${BACKEND_URL}/api/mesas/${id}`, {
        cache: "no-store"
    });
    return await data.json();
}

export async function createMesa(mesaData: { numero: number }) {
    const res = await fetch(`${BACKEND_URL}/api/mesas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mesaData), // Convierte mesaData a JSON
    });
    
    // Verifica si la respuesta no es un éxito (2xx)
    if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(`Error ${res.status}: ${errorMessage}`);
    }

    return await res.json();
}


export async function deleteMesa(id: string) {
    const res = await fetch(`${BACKEND_URL}/api/mesas/${id}`, {
        method: "DELETE",
    });
    if (res.status === 204 || res.headers.get('content-length') === '0') {
        return null;
    }
    return await res.json();
}

export async function updateMesa(id: string, newMesa: unknown) {
    const res = await fetch(`${BACKEND_URL}/api/mesas/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMesa),
        cache: "no-store"
    });
    return await res.json();
}
