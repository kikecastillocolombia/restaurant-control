// src/app/dashboard/admin/page.tsx

import React from 'react';
import Link from 'next/link';

const AdminDashboard: React.FC = () => {
  return (
    <main>
      <header>
        <h1>Dashboard - Administrador</h1>
      </header>
      <div className="dashboard-container">
        <nav>
          <ul>
            <li><Link href="/dashboard/admin/usuarios">Usuarios</Link></li>
            <li><Link href="/dashboard/admin/pedidos">Pedidos</Link></li>
            <li><Link href="/dashboard/admin/reportes">Reportes</Link></li>
            {/* Agrega más enlaces según sea necesario */}
          </ul>
        </nav>
        <section>
          <h2>Bienvenido al Dashboard del Administrador</h2>
          <p>Aquí podrás gestionar diferentes aspectos de la aplicación.</p>
          {/* Agrega contenido relevante para el administrador aquí */}
        </section>
      </div>
      <footer>
        <p>© 2024 Control de Caja - Restaurante</p>
      </footer>
    </main>
  );
};

export default AdminDashboard;
