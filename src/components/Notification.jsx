
import React, { useEffect, useState } from 'react';

export default function Notification({ 
  type = 'brand', 
  title, 
  message, 
  onClose, 
  duration = 5000 // 5 segundos 
}) {
  const [isClosing, setIsClosing] = useState(false);

  // Auto-cierre
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => handleClose(), duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsClosing(true);
    // Esperamos a que termine la animación de salida antes de desmontar
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  // Diccionario de estilos según el tipo de notificación
  const styles = {
    brand: {
      iconBg: 'bg-pink-50',
      iconColor: 'text-[#e91e63]',
      progressBar: 'bg-[#e91e63]',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    success: {
      iconBg: 'bg-green-50',
      iconColor: 'text-green-500',
      progressBar: 'bg-green-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    error: {
      iconBg: 'bg-red-50',
      iconColor: 'text-red-500',
      progressBar: 'bg-red-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
    }
  };

  const currentStyle = styles[type] || styles.brand;

  return (
    <div 
      className={`relative w-full max-w-sm bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden transition-all duration-300 flex flex-col pointer-events-auto ${
        isClosing ? 'opacity-0 translate-x-8 scale-95' : 'opacity-100 translate-x-0 scale-100'
      }`}
    >
      <div className="p-4 flex items-start gap-4">
        
        {/* Icono */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${currentStyle.iconBg} ${currentStyle.iconColor}`}>
          {currentStyle.icon}
        </div>

        {/* Contenido */}
        <div className="flex-1 pt-0.5">
          <h4 className="text-sm font-black text-gray-900 tracking-tight">{title}</h4>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{message}</p>
        </div>

        {/* Botón Cerrar */}
        <button 
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Barra de progreso animada */}
      {duration > 0 && (
        <div className="h-1 w-full bg-gray-50 absolute bottom-0 left-0">
          <div 
            className={`h-full ${currentStyle.progressBar}`} 
            style={{ 
              animation: `shrink ${duration}ms linear forwards` 
            }}
          />
        </div>
      )}

      {/* Estilos inyectados para la animación de la barra */}
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}