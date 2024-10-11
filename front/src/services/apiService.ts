import api from '../utils/axiosConfig';

// Funciones para manejar diferentes endpoints

export const fetchPedidos = async () => {
  try {
    const response = await api.get('/pedidos');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUsuarios = async () => {
  try {
    const response = await api.get('/usuarios');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMesas = async () => {
  try {
    const response = await api.get('/mesas');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchPlatos = async () => {
  try {
    const response = await api.get('/platos');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCuentas = async () => {
  try {
    const response = await api.get('/cuentas');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Añade otras funciones según sea necesario
