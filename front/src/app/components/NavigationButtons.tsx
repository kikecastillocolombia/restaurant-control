import React from 'react';
import Link from 'next/link';
import '../../styles.css';

const NavigationButtons: React.FC = () => {
  return (
    <div className="navigation-buttons">
      <Link href="/dashboard/admin/mesas">
        <button>Todas las Mesas</button>
      </Link>
      <Link href="/dashboard/admin/usuarios">
        <button>Todos los Usuarios</button>
      </Link>
      <Link href="/dashboard/admin/pedidos">
        <button>Todos los Pedidos</button>
      </Link>
      <Link href="/dashboard/admin/cuentas">
        <button>Todas las Cuentas</button>
      </Link>
      <Link href="/dashboard/admin/platos">
        <button>Todos los Platos</button>
      </Link>
    </div>
  );
};

export default NavigationButtons;
