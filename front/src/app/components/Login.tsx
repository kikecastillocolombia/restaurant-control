// src/app/components/Login.tsx

"use client"; // Asegúrate de que esto esté al inicio del archivo

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Asegúrate de que sea esta ruta
import Link from 'next/link';
import '../styles.css'; // Asegúrate de que la ruta a tu archivo de estilos sea correcta

const Login: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Esto debe funcionar ahora

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/usuarios/login', { 
        nombre: usuario, 
        password: contrasena 
      });

      if (response.status === 201) { // Cambia a 201 según la respuesta de tu backend
        const rol = response.data.rol; // Asumiendo que la respuesta contiene el rol

        // Redirige a la página del dashboard según el rol
        router.push(rol === 'administrador' ? '/dashboard/admin' : '/dashboard/mesero');
      } else {
        setError('Error al iniciar sesión. Verifica tus credenciales.');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <header>
        <h1>Iniciar Sesión</h1>
      </header>
      <div className="container">
        {error && <p className="error">{error}</p>}
        <form id="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre de Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
        <p>No tienes una cuenta? <Link href="/crear-cuenta">Crear una cuenta</Link></p>
      </div>
      <footer>
        <p>© 2024 Control de Caja - Restaurante</p>
      </footer>
    </main>
  );
};

export default Login;
