import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

// Definimos los tipos de los campos del formulario y los roles
interface Usuario {
  nombre: string;
  email: string;
  password: string;
  rol: 'mesero' | 'administrador';
}

const RegistroUsuario = () => {
  const [formData, setFormData] = useState<Usuario>({
    nombre: '',
    email: '',
    password: '',
    rol: 'mesero', // Valor predeterminado
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Manejar el cambio en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Realiza la petición al backend para registrar un nuevo usuario
      const response = await axios.post('http://localhost:3001/usuarios', formData);
      console.log(response.data); // Maneja la respuesta según sea necesario

      // Redirige a otra página o muestra un mensaje de éxito
      router.push('/login'); // Redirige a la página de inicio de sesión
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError('Error al registrar el usuario. Inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-usuario-container">
      <h1>Registro de Usuario</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6} // Validación de mínimo 6 caracteres
          />
        </div>

        <div>
          <label htmlFor="rol">Rol:</label>
          <select id="rol" name="rol" value={formData.rol} onChange={handleChange} required>
            <option value="mesero">Mesero</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
};

export default RegistroUsuario;
