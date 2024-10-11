import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Cambia esto según tu configuración
  headers: {
    'Content-Type': 'application/json',
    // Otros headers que necesites
  },
});

// Manejo de errores global
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Axios error:', error);
    return Promise.reject(error);
  }
);

export default api;
