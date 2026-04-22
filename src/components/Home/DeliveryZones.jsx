
import React, { useState } from 'react';

const locations = [
  { 
    id: 1, 
    name: "Jardín Central", 
    desc: "El corazón de Jilotepec, ideal para sorpresas en el centro.",
    
    mapUrl: "https://maps.google.com/maps?q=Jardin+Central+Jilotepec+Estado+de+Mexico&t=&z=16&ie=UTF8&iwloc=&output=embed"
  },
  { 
    id: 2, 
    name: "La Campana", 
    desc: "Ubicación histórica emblemática de nuestra cabecera.",
    mapUrl: "https://maps.google.com/maps?q=La+Campana+Jilotepec+Estado+de+Mexico&t=&z=16&ie=UTF8&iwloc=&output=embed"
  },
  { 
    id: 3, 
    name: "Virgen de la Piedrita", 
    desc: "Entregas con significado en el santuario de Canalejas.",
    mapUrl: "https://maps.google.com/maps?q=Santuario+Virgen+de+la+Piedrita+Canalejas+Jilotepec&t=&z=16&ie=UTF8&iwloc=&output=embed"
  },
  { 
    id: 4, 
    name: "Parque Las Peñas", 
    desc: "Llevamos tus flores a este hermoso entorno natural.",
    mapUrl: "https://maps.google.com/maps?q=Parque+Las+Peñas+Jilotepec+Estado+de+Mexico&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  { 
    id: 5, 
    name: "Presa Danxhó", 
    desc: "Entregas especiales en las zonas de mayor tranquilidad.",
    mapUrl: "https://maps.google.com/maps?q=Presa+Danxho+Jilotepec+Estado+de+Mexico&t=&z=14&ie=UTF8&iwloc=&output=embed"
  },
  { 
    id: 6, 
    name: "Tecnológico (TESJI)", 
    desc: "Punto estratégico para entregas a la comunidad estudiantil.",
    mapUrl: "https://maps.google.com/maps?q=Tecnologico+de+Estudios+Superiores+de+Jilotepec&t=&z=16&ie=UTF8&iwloc=&output=embed"
  }
];

export default function DeliveryZones() {
  const [activeMap, setActiveMap] = useState(locations[0].mapUrl);
  const [activeId, setActiveId] = useState(1);

  const handleLocationClick = (loc) => {
    setActiveMap(loc.mapUrl);
    setActiveId(loc.id);
  };

  return (
    <section className="py-24 bg-white relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-16 reveal-on-scroll">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Nuestras zonas de entrega en <span className="text-[#e91e63]">Jilotepec</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto italic font-medium">
            Selecciona un punto para ver nuestra ubicación de entrega exacta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Tarjetas de Lugares */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {locations.map((loc) => (
              <button 
                key={loc.id} 
                onClick={() => handleLocationClick(loc)}
                className={`text-left p-5 rounded-3xl border-2 transition-all duration-500 group relative overflow-hidden flex flex-col justify-center ${
                  activeId === loc.id 
                  ? 'bg-white border-[#e91e63] shadow-[0_20px_40px_-15px_rgba(233,30,99,0.2)] scale-[1.03]' 
                  : 'bg-gray-50 border-transparent hover:border-pink-200 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    activeId === loc.id ? 'bg-[#e91e63] text-white rotate-12' : 'bg-pink-100 text-[#e91e63]'
                  }`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={`font-black text-sm uppercase tracking-tight ${activeId === loc.id ? 'text-[#e91e63]' : 'text-gray-900'}`}>{loc.name}</h3>
                    <p className="text-[11px] text-gray-500 font-medium leading-tight">{loc.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Mapa con Marcador de la Florería */}
          <div className="relative w-full h-[550px] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-gray-50 bg-gray-100">
            
            {/* Marcador Representativo de Flores  */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[120%] z-30 pointer-events-none drop-shadow-2xl">
              <div className="flex flex-col items-center">
                <div className="bg-white p-1 rounded-full shadow-2xl border-2 border-[#e91e63] animate-pulse">
                   <div className="bg-[#e91e63] text-white p-3 rounded-full">
                     <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,22c4.97,0,9-4.03,9-9c0-0.34-0.02-0.67-0.06-1C20,11.38,19,10,19,10c0-3.31-2.69-6-6-6c-1.2,0-2.31,0.35-3.24,0.96 C8.83,4.35,7.5,4,6,4C3.79,4,2,5.79,2,8c0,1.5,0.83,2.82,2.06,3.5c0.04,1.48,0.59,2.83,1.5,3.92c-0.36,0.61-0.56,1.31-0.56,2.08 c0,2.21,1.79,4,4,4c1.1,0,2.1-0.45,2.83-1.17C12.57,24.81,13.78,25.17,15.06,25.17z"/>
                     </svg>
                   </div>
                </div>
                <div className="w-1.5 h-6 bg-[#e91e63] -mt-1"></div>
                <div className="w-4 h-4 bg-black/30 blur-md rounded-full -mt-2"></div>
              </div>
            </div>

            {/* Google Maps Iframe  */}
            <iframe 
              key={activeMap}
              title="Mapa de Cobertura"
              src={activeMap}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              className="grayscale-[40%] hover:grayscale-0 transition-all duration-1000 brightness-110"
            ></iframe>

            {/* Etiqueta de Destino */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[80%] bg-white/80 backdrop-blur-xl p-4 rounded-3xl border border-white shadow-2xl z-20 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-black text-[#e91e63] tracking-widest mb-1">Zona de Entrega</p>
                <p className="text-gray-900 font-bold text-lg leading-none">{locations.find(l => l.id === activeId).name}</p>
              </div>
              <div className="bg-[#e91e63] text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-tighter shadow-lg shadow-pink-200">
                Punto Verificado
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}