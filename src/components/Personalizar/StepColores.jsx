
import React from 'react';

export default function StepColores({ carrito, onUpdateColor }) {
  // Configuración de colores disponibles por tipo de flor
  const configuracionColores = {
    "Rosas": ["#E11D48", "#E91E63", "#9333EA", "#FFFFFF", "#FACC15", "#FB923C"], // Rojo, Rosa, Púrpura, Blanco, Amarillo, Naranja
    "Tulipanes": ["#E91E63", "#FACC15", "#FFFFFF"],
    "Orquídeas": ["#9333EA", "#FFFFFF", "#E91E63"],
    "Girasoles": [] // No tienen selección de color
  };

  const nombresColores = {
    "#E11D48": "Rojo",
    "#E91E63": "Rosa",
    "#9333EA": "Púrpura",
    "#FFFFFF": "Blanco",
    "#FACC15": "Amarillo",
    "#FB923C": "Naranja"
  };

  const floresParaColorear = Object.keys(carrito).filter(
    nombre => configuracionColores[nombre] && configuracionColores[nombre].length > 0
  );

  return (
    <div className="animate-fade-in space-y-10">
      <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
        Elige el Color de tus Flores
        <div className="h-[2px] w-12 bg-pink-100"></div>
      </h2>

      {floresParaColorear.length === 0 ? (
        <div className="bg-gray-50 p-10 rounded-3xl text-center border-2 border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">Las flores seleccionadas no requieren elección de color.</p>
        </div>
      ) : (
        floresParaColorear.map((nombre) => (
          <div key={nombre} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              Color para: <span className="text-[#e91e63]">{nombre}</span>
            </h3>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {configuracionColores[nombre].map((hex) => (
                <div key={hex} className="flex flex-col items-center gap-3">
                  <button
                    onClick={() => onUpdateColor(nombre, nombresColores[hex])}
                    className={`w-16 h-20 md:w-24 md:h-28 rounded-2xl transition-all duration-300 relative flex items-center justify-center shadow-sm
                      ${carrito[nombre].color === nombresColores[hex] 
                        ? 'ring-4 ring-[#e91e63] ring-offset-2 scale-105 shadow-lg' 
                        : 'hover:scale-105 border border-gray-100'}`}
                    style={{ backgroundColor: hex }}
                  >
                    {carrito[nombre].color === nombresColores[hex] && (
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                  <span className={`text-[11px] font-bold uppercase tracking-tighter ${carrito[nombre].color === nombresColores[hex] ? 'text-[#e91e63]' : 'text-gray-400'}`}>
                    {nombresColores[hex]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}