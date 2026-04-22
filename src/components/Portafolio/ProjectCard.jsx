
import React, { useState } from 'react';

export default function ProjectCard({ title, category, image, type }) {
  // Estado para saber si la imagen falló al cargar
  const [imgError, setImgError] = useState(false);

  
  const badgeColors = {
    eventos: "bg-[#e91e63]",
    corporativo: "bg-purple-600",
    premium: "bg-black"
  };

  // Color por defecto si no encuentra el tipo
  const colorClass = badgeColors[type?.toLowerCase()] || "bg-[#e91e63]";

  return (
    <div className="group relative overflow-hidden rounded-[2.5rem] cursor-pointer shadow-sm transition-all duration-500 bg-gray-900">
      
      {/* Contenedor de la Imagen */}
      <div className="aspect-[16/10] w-full">
        {!imgError && (
          <img 
            src={image} 
            alt={title} 
            onError={() => setImgError(true)} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
          />
        )}
      </div>

      {/* Degradado oscuro para que el texto SIEMPRE se lea */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-colors duration-500 group-hover:from-black/95" />

      {/* Contenido (Textos) */}
      <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
        <span className={`${colorClass} text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block mb-3 shadow-md`}>
          {category}
        </span>
        <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight drop-shadow-lg">
          {title}
        </h3>
      </div>
    </div>
  );
}