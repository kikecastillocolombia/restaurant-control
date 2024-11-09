export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Obtener todos los detalles de pedido
export async function getDetallesPedido() {
    const response = await fetch(`${BACKEND_URL}/api/detalles-pedido`, {
        cache: "no-store",
    });
    return await response.json();
}

// Obtener un detalle de pedido por ID
export async function getDetallePedido(id: string) {
    const response = await fetch(`${BACKEND_URL}/api/detalles-pedido/${id}`, {
        cache: "no-store",
    });
    return await response.json();
}

// Crear un nuevo detalle de pedido
export async function createDetallePedido(detallePedidoData: { cantidad: number, productoId: number, pedidoId: number }) {
    const response = await fetch(`${BACKEND_URL}/api/detalles-pedido`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(detallePedidoData),
    });
    return await response.json();
}

// Eliminar un detalle de pedido
export async function deleteDetallePedido(id: string) {
    const response = await fetch(`${BACKEND_URL}/api/detalles-pedido/${id}`, {
        method: "DELETE",
    });

    if (response.status === 204 || response.headers.get('content-length') === '0') {
        return null;
    }

    return await response.json();
}

// Actualizar un detalle de pedido
export async function updateDetallePedido(id: string, updatedDetallePedido: { cantidad: number, productoId: number, pedidoId: number }) {
    const response = await fetch(`${BACKEND_URL}/api/detalles-pedido/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDetallePedido),
        cache: "no-store",
    });
    return await response.json();
}
