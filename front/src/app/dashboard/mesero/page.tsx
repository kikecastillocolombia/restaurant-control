// src/app/dashboard/mesero/page.tsx

import React from 'react';
import Link from 'next/link';

const MeseroDashboard: React.FC = () => {
  return (
    <main>
      <header>
        <h1>Dashboard - Mesero</h1>
      </header>
      <div className="dashboard-container">
        <nav>
          <ul>
            <li><Link href="/dashboard/mesero/pedidos">Mis Pedidos</Link></li>
            <li><Link href="/dashboard/mesero/cuentas">Cuentas</Link></li>
            <li><Link href="/dashboard/mesero/reportes">Reportes</Link></li>
            {/* Agrega más enlaces según sea necesario */}
          </ul>
        </nav>
        <section>
          <h2>Bienvenido al Dashboard del Mesero</h2>
          <p>Aquí podrás gestionar tus pedidos y cuentas.</p>
          {/* Agrega contenido relevante para el mesero aquí */}
        </section>
      </div>
      <footer>
        <p>© 2024 Control de Caja - Restaurante</p>
      </footer>
    </main>
  );
};

export default MeseroDashboard;
