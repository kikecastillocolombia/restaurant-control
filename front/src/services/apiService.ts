import api from '../utils/axiosConfig';

// Definir las interfaces correspondientes a los datos que manejas
export interface Pedido {
  id: number;
  // Añade los demás campos de la entidad Pedido según tu backend
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
  // Añade los demás campos de la entidad Plato
}

export interface Cuenta {
  id: number;
  // Añade los demás campos de la entidad Cuenta
}

// Funciones para manejar diferentes endpoints con tipos

export const fetchPedidos = async (): Promise<Pedido[]> => {
  try {
    const response = await api.get<Pedido[]>('/pedidos');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUsuarios = async (): Promise<Usuario[]> => {
  try {
    const response = await api.get<Usuario[]>('/usuarios');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMesas = async (): Promise<Mesa[]> => {
  try {
    const response = await api.get<Mesa[]>('/mesas');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchPlatos = async (): Promise<Plato[]> => {
  try {
    const response = await api.get<Plato[]>('/platos');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCuentas = async (): Promise<Cuenta[]> => {
  try {
    const response = await api.get<Cuenta[]>('/cuentas');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Añade otras funciones según sea necesario
