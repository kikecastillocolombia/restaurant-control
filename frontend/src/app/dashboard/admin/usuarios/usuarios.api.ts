// usuarios.api.ts
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Obtener todos los usuarios
export async function getUsers() {
    const response = await fetch(`${BACKEND_URL}/api/usuarios`, {
        cache: "no-store",
    });
    return await response.json();
}

// Obtener un usuario por ID
export async function getUser(id: string) {
    const response = await fetch(`${BACKEND_URL}/api/usuarios/${id}`, {
        cache: "no-store",
    });
    return await response.json();
}

// Crear un nuevo usuario
export async function createUser(userData: { nombre: string; password: string; rol: string }) {
    const response = await fetch(`${BACKEND_URL}/api/usuarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return await response.json();
}

// Eliminar un usuario
export async function deleteUser(id: string) {
    const response = await fetch(`${BACKEND_URL}/api/usuarios/${id}`, {
        method: "DELETE",
    });
    
    if (response.status === 204 || response.headers.get('content-length') === '0') {
        return null; // Sin contenido
    }

    return await response.json();
}

// Actualizar un usuario
export async function updateUser(id: string, updatedUser: { nombre: string; password?: string; rol: string }) {
    const response = await fetch(`${BACKEND_URL}/api/usuarios/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
        cache: "no-store",
    });
    return await response.json();
}
