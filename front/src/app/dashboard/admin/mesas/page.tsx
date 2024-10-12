// src/app/dashboard/admin/mesas/page.tsx

import Mesas from '@/app/components/Mesas';
import React from 'react';

const MesasPage: React.FC = () => {
  return (
    <main>
      <header>
        <h1>Gestión de Mesas</h1>
      </header>
      <Mesas /> {/* Asegúrate de que este componente se está renderizando */}
      <footer>
        <p>© 2024 Control de Caja - Restaurante</p>
      </footer>
    </main>
  );
};

export default MesasPage;
