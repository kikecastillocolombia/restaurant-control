// src/services/apiService.ts

import api from '../utils/axiosConfig'; // Asegúrate de que esta ruta sea correcta
import { Pedido, DetallePedido, Usuario, Mesa, Plato, Cuenta } from '@/interfaces/pedido'; // Asegúrate de que la ruta de importación sea correcta

// Funciones para manejar diferentes endpoints con tipos

export const fetchPedidos = async (): Promise<Pedido[]> => {
  try {
    const response = await api.get<Pedido[]>('/pedidos');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Crear un nuevo pedido
export const crearPedido = async (pedido: Pedido): Promise<Pedido> => {
  try {
    const response = await api.post<Pedido>('/pedidos', pedido);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Crear un nuevo detalle de pedido
export const crearDetallePedido = async (detalle: DetallePedido): Promise<DetallePedido> => {
  try {
    const response = await api.post<DetallePedido>('/detalles-pedido', detalle);
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

// Obtener platos
export const fetchPlatos = async (): Promise<Plato[]> => {
  try {
    const response = await api.get<Plato[]>('/platos');
    return response.data; // Asegúrate de que el tipo de datos coincida
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
