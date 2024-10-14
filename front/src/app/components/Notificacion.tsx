// Notificacion.tsx
import React from 'react';

interface NotificacionProps {
  mensaje: string;
  tipo: 'exito' | 'error'; // Puede ser 'exito' o 'error'
  onCerrar: () => void; // Función para cerrar la notificación
}

const Notificacion: React.FC<NotificacionProps> = ({ mensaje, tipo, onCerrar }) => {
  return (
    <div className={`notificacion ${tipo}`}>
      <p>{mensaje}</p>
      <button onClick={onCerrar}>Cerrar</button>
    </div>
  );
};

export default Notificacion;
