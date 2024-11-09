export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Obtener todos los pedidos
export async function getPedidos() {
    const response = await fetch(`${BACKEND_URL}/api/pedidos`, {
        cache: "no-store",
    });
    return await response.json();
}

// Obtener un pedido por ID
export async function getPedido(id: string) {
    const response = await fetch(`${BACKEND_URL}/api/pedidos/${id}`, {
        cache: "no-store",
    });
    return await response.json();
}

// Crear un nuevo pedido
export async function createPedido(pedidoData: { fecha: string, estado: string, usuarioId: number, mesaId: number }) {
    const response = await fetch(`${BACKEND_URL}/api/pedidos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData),
    });
    return await response.json();
}

// Eliminar un pedido
export async function deletePedido(id: string) {
    const response = await fetch(`${BACKEND_URL}/api/pedidos/${id}`, {
        method: "DELETE",
    });
    
    if (response.status === 204 || response.headers.get('content-length') === '0') {
        return null; // Sin contenido
    }

    return await response.json();
}

// Actualizar un pedido
export async function updatePedido(id: string, updatedPedido: { fecha?: string, estado?: string, usuarioId?: number, mesaId?: number }) {
    const response = await fetch(`${BACKEND_URL}/api/pedidos/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPedido),
        cache: "no-store",
    });
    return await response.json();
}
