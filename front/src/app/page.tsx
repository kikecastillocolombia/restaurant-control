// src/app/page.tsx

"use client";
import Link from 'next/link';
import '../styles.css'; // Asegúrate de que la ruta a tu archivo de estilos sea correcta

export default function Home() {
  return (
    <main>
      <header>
        <h1>Control de Caja Restaurante</h1>
      </header>
      
      {/* Contenedor para iniciar sesión */}
      <div className="login-container">
        <Link href="/login" className="card">
          <h2>Iniciar Sesión</h2>
        </Link>
      </div>
      
      {/* Contenedor para crear cuenta */}
      <div className="crear-cuenta-container">
        <Link href="/crear-cuenta" className="card">
          <h2>Crear una Cuenta</h2>
        </Link>
      </div>

      <footer>
        <p>© 2024 Control de Caja - Restaurante</p>
      </footer>
    </main>
  );
}
