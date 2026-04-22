
import React from 'react';

export default function PromoCard({ image, discount, title, currentPrice, originalPrice, timeLeft }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col group">
      
      {/* Contenedor de la Imagen  */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        {/* Etiqueta de Descuento */}
        <div className="absolute top-4 right-4 bg-[#e60000] text-white text-[11px] font-black px-3 py-1.5 rounded-full tracking-wider shadow-md">
          {discount} OFF
        </div>
      </div>

      {/* Cuerpo de la Tarjeta */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
        
        {/* Precios */}
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-2xl font-black text-[#e91e63]">{currentPrice}</span>
          <span className="text-sm font-medium text-gray-400 line-through">{originalPrice}</span>
        </div>

        {/* Temporizador */}
        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-6 mt-auto">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Termina en {timeLeft}
        </div>

        {/* Botón */}
        <button className="w-full bg-[#e91e63] hover:bg-pink-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}