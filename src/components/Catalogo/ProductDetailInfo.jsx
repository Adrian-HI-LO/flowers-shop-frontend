
import React, { useState } from 'react';

export default function ProductDetailInfo({ product }) {
  const [cantidad, setCantidad] = useState(1);
  const [showMore, setShowMore] = useState(false);
  
  
  const [nota, setNota] = useState('');

  // 1. Verificamos si el producto ya está en favoritos al cargar el componente
  const [isFavorite, setIsFavorite] = useState(() => {
    const saved = localStorage.getItem('favoritos');
    if (saved) {
      const array = JSON.parse(saved);
      return array.some(item => item.id === product.id);
    }
    return false;
  });

  const decrementar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const incrementar = () => {
    setCantidad(cantidad + 1);
  };

  // 2. Función para agregar/quitar de favoritos
  const toggleFavorite = () => {
    const saved = localStorage.getItem('favoritos');
    let favoritosActuales = saved ? JSON.parse(saved) : [];

    if (isFavorite) {
      // Si ya es favorito, lo quitamos
      favoritosActuales = favoritosActuales.filter(item => item.id !== product.id);
    } else {
      // Si no es favorito, guardamos el objeto completo
      favoritosActuales.push(product);
    }

    // Actualizamos el LocalStorage y el estado
    localStorage.setItem('favoritos', JSON.stringify(favoritosActuales));
    setIsFavorite(!isFavorite);
    
    // 3. Avisamos a la app que los favoritos cambiaron
    window.dispatchEvent(new Event('favoritosUpdated'));
  };

  return (
    <div className="flex flex-col h-full animate-fade-in-up delay-200">
      
      {/* Etiqueta de Categoría */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-pink-50 text-[#e91e63] text-xs font-black uppercase tracking-widest rounded-md">
          {product.category || product.occasion}
        </span>
      </div>

      {/* Título y Descripción */}
      <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight">
        {product.name}
      </h1>
      <p className="text-gray-500 text-lg mb-6">
        {product.description}
      </p>

      {/* Precio */}
      <div className="text-4xl font-black text-[#e91e63] mb-8">
        ${product.price}
      </div>

      {/* Selector de Cantidad */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-gray-900 mb-2">Cantidad</label>
        <div className="flex items-center gap-4">
          <button 
            onClick={decrementar}
            className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg text-gray-600 hover:border-[#e91e63] hover:text-[#e91e63] transition-colors"
          >
            -
          </button>
          <span className="w-8 text-center font-bold text-lg">{cantidad}</span>
          <button 
            onClick={incrementar}
            className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg text-gray-600 hover:border-[#e91e63] hover:text-[#e91e63] transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Apartado para la Nota Personalizada */}
      <div className="mb-8">
        <label className="flex items-center justify-between text-sm font-bold text-gray-900 mb-2">
          <span>Mensaje para la tarjeta</span>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Opcional</span>
        </label>
        <div className="relative group">
          <textarea 
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            placeholder="Escribe algo bonito para esa persona especial..." 
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-pink-100 focus:bg-white focus:border-pink-200 outline-none transition-all h-24 resize-none"
            maxLength="200"
          />
          {/* Contador de caracteres integrado en la esquina inferior derecha */}
          <div className={`absolute bottom-3 right-4 text-[10px] font-bold transition-colors ${nota.length === 200 ? 'text-[#e91e63]' : 'text-gray-400'}`}>
            {nota.length}/200
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex gap-4 mb-10">
        <button 
          onClick={() => {
            
            console.log("Añadido al carrito con nota:", nota);
          }}
          className="flex-1 bg-[#e91e63] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-pink-700 transition-all active:scale-95 shadow-lg shadow-pink-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Agregar al carrito
        </button>
        
        {/* 4. Ejecutamos toggleFavorite al hacer clic */}
        <button 
          onClick={toggleFavorite}
          className={`w-14 h-14 flex items-center justify-center border rounded-xl transition-all active:scale-95 ${isFavorite ? 'border-[#e91e63] bg-pink-50 text-[#e91e63]' : 'border-gray-200 text-gray-400 hover:border-pink-200 hover:text-[#e91e63]'}`}
        >
          <svg className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Lista de Beneficios (Puntos verdes) */}
      <div className="bg-[#f9f9f9] rounded-2xl p-6 space-y-4 border border-gray-100">
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></div>
            Flores frescas garantizadas
          </li>
          <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></div>
            Entrega el mismo día disponible
          </li>
          <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></div>
            Incluye tarjeta personalizada
          </li>
        </ul>
      </div>

      {/* Acordeón de Detalles y Ocasiones (Hashtags) */}
      <div className="mt-6 border border-gray-100 rounded-2xl overflow-hidden">
        <button 
          onClick={() => setShowMore(!showMore)}
          className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 transition-colors"
        >
          <span className="font-bold text-gray-900">Categorías y Ocasiones</span>
          <svg className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <div className={`transition-all duration-300 ease-in-out bg-white ${showMore ? 'max-h-40 p-5 pt-0 opacity-100' : 'max-h-0 px-5 opacity-0 overflow-hidden'}`}>
          <p className="text-sm text-gray-500 mb-3">Perfecto para celebrar en:</p>
          <div className="flex flex-wrap gap-2">
            {product.tags?.map((tag, index) => (
              <span 
                key={index} 
                className="text-xs font-black text-gray-400 hover:text-[#e91e63] cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}