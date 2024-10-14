// src/interfaces/pedido.ts

export interface Pedido {
    id?: number; // Puede ser opcional al crear
    fecha: string;
    estado: string;
    usuarioId: number;
    mesaId: number; // Añadido el campo mesaId
  }
  
  export interface DetallePedido {
    id?: number; // Puede ser opcional al crear
    cantidad: number;
    platoId: number;
    pedidoId: number;
  }
  
  export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    password: string;
    rol: 'mesero' | 'administrador'; // Utilizamos el enum directamente en el tipo
  }
  
  export interface Mesa {
    id: number;
    // Añade los demás campos de la entidad Mesa
  }
  
  export interface Plato {
    id: number;
    nombre: string; // Asegúrate de añadir todos los campos necesarios
    precio: number; // Ejemplo de campo adicional
  }
  
  export interface Cuenta {
    id: number;
    // Añade los demás campos de la entidad Cuenta
  }
  