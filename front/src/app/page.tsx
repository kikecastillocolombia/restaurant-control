// src/app/page.tsx

"use client";
import Link from 'next/link';
import '../styles.css'; // Asegúrate de que la ruta a tu archivo de estilos sea correcta

export default function Home() {
  return (
    <main>
      <header>
        <h1>Bienvenido al Control de Caja</h1>
      </header>
      <div className="container">
        <p><Link href="/login">Iniciar Sesión</Link></p>
        <p><Link href="/crear-cuenta">Crear una cuenta</Link></p>
      </div>
      <footer>
        <p>© 2024 Control de Caja - Restaurante</p>
      </footer>
    </main>
  );
}
