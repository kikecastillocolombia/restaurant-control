"use client"; // Asegúrate de que esta línea sea la primera

import React from 'react';
import NavigationButtons from '../../components/NavigationButtons'; // Asegúrate de importar el componente de navegación
import '../../styles.css'
const AdminDashboard: React.FC = () => {
  return (
    <main>
      <header>
        <h1>Dashboard - Administrador</h1>
      </header>
      <nav>
        <NavigationButtons /> {/* Incluye el componente de navegación aquí */}
      </nav>
      <footer>
        <p>© 2024 Control de Caja - Restaurante</p>
      </footer>
    </main>
  );
};

export default AdminDashboard;
