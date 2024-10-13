import React from 'react';
import Link from 'next/link';
import '../../styles.css';

const NavigationButtons: React.FC = () => {
  return (
    <div className="navigation-buttons">
      <Link href="/dashboard/admin/mesas">
        <button>Mesas</button>
      </Link>
      <Link href="/dashboard/admin/usuarios">
        <button>Usuarios</button>
      </Link>
      <Link href="/dashboard/admin/pedidos">
        <button>Pedidos</button>
      </Link>
      <Link href="/dashboard/admin/cuentas">
        <button>Cuentas</button>
      </Link>
      <Link href="/dashboard/admin/platos">
        <button>Platos</button>
      </Link>
    </div>
  );
};

export default NavigationButtons;
