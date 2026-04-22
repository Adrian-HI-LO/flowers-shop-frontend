
import React, { useState } from 'react';

export default function CuponCard({ image, badge, title, description, code, validity }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    
    navigator.clipboard.writeText(code);
    setCopied(true);
    // Regresamos el texto a "Copiar" después de 2 segundos
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-[2rem] overflow-hidden group shadow-lg h-full min-h-[280px] flex flex-col transition-transform duration-500 hover:-translate-y-1">
      {/* Imagen de Fondo */}
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
      </div>
      
      {/* Overlay Oscuro para que el texto siempre resalte */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30" />

      {/* Contenido Principal */}
      <div className="relative z-10 p-8 flex flex-col h-full text-white">
        
        {/* Etiqueta (Badge) */}
        <div className="mb-4">
          <span className="bg-[#e91e63] text-white text-[10px] font-black px-3 py-1.5 rounded-full tracking-widest uppercase shadow-md">
            {badge}
          </span>
        </div>

        {/* Textos */}
        <h3 className="text-2xl font-bold mb-2 tracking-tight drop-shadow-md">{title}</h3>
        <p className="text-gray-300 text-sm mb-6 max-w-[85%] font-medium leading-relaxed">{description}</p>

        {/* Caja de Código con Glassmorphism */}
        <div className="mt-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 pl-5 flex items-center justify-between mb-4 shadow-xl">
          <div>
            <p className="text-[10px] text-gray-300 uppercase tracking-widest mb-0.5 font-bold">Código:</p>
            <p className="text-lg font-black tracking-widest">{code}</p>
          </div>
          <button
            onClick={handleCopy}
            className="bg-white text-[#e91e63] font-bold px-6 py-2.5 rounded-xl hover:bg-gray-100 transition-colors active:scale-95 shadow-sm w-[110px] text-center text-sm"
          >
            {copied ? '¡Copiado!' : 'Copiar'}
          </button>
        </div>

        {/* Validez */}
        <div className="flex items-center gap-2 text-gray-300 text-xs font-medium">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {validity}
        </div>
      </div>
    </div>
  );
}