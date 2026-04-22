import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  
  const [isFavorite, setIsFavorite] = useState(() => {
    const saved = localStorage.getItem('favoritos');
    if (saved) {
      const array = JSON.parse(saved);
      return array.some(item => item.id === product.id);
    }
    return false;
  });

  const toggleFavorite = (e) => {
    e.preventDefault(); 
    e.stopPropagation();

    const saved = localStorage.getItem('favoritos');
    let favoritosActuales = saved ? JSON.parse(saved) : [];

    if (isFavorite) {
      // Quitar de favoritos
      favoritosActuales = favoritosActuales.filter(item => item.id !== product.id);
    } else {
      // Agregar a favoritos (Guardamos el objeto completo)
      favoritosActuales.push(product);
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritosActuales));
    setIsFavorite(!isFavorite);
    
    
    window.dispatchEvent(new Event('favoritosUpdated'));
  };

  return (
    <div className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <Link to={`/producto/${product.id}`} className="block w-full h-full">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        
        {/* Botón Favoritos actualizado */}
        <button 
          onClick={toggleFavorite}
          className="absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md bg-white/70 shadow-sm transition-all active:scale-90 hover:bg-white z-10"
        >
          <svg 
            className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-[#e91e63] text-[#e91e63]' : 'text-gray-400'}`} 
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <Link to={`/producto/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#e91e63] transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="text-2xl font-black text-[#e91e63]">${product.price}</span>
          <button className="bg-[#e91e63] text-white p-3 rounded-xl hover:bg-pink-700 transition-all shadow-md shadow-pink-100 active:scale-95">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}