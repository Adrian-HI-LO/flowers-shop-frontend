import React from 'react';

export default function FilterBar({ filters, setFilters }) {
  
  const ocasiones = [
    "Aniversario", "Cumpleaños", "Amor y Romance", "Nacimiento", 
    "Condolencias", "Graduación", "Agradecimiento", "Mejora pronto", 
    "Boda", "Día de la Madre", "San Valentín", "Solo porque sí"
  ];

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 mb-16">
      {/* Buscador Estilizado */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#e91e63] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          type="text"
          name="search"
          placeholder="Busca por nombre de flor o arreglo..."
          className="w-full py-5 pl-14 pr-6 bg-white border border-gray-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-pink-50 focus:border-[#e91e63] shadow-sm hover:shadow-md transition-all text-lg"
          onChange={(e) => setFilters(prev => ({...prev, search: e.target.value}))}
        />
      </div>

      {/* Selectores Premium */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Filtro Ocasión */}
        <div className="relative">
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-4">Momento Especial</label>
          <select 
            name="occasion"
            value={filters.occasion}
            onChange={handleSelectChange}
            className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-pink-100 focus:border-[#e91e63] appearance-none cursor-pointer shadow-sm hover:bg-gray-50 transition-all"
          >
            <option value="all">Todos </option>
            {ocasiones.map(o => <option key={o} value={o.toLowerCase()}>{o}</option>)}
          </select>
          <div className="absolute bottom-4 right-4 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>

        {/* Filtro Precio */}
        <div className="relative">
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-4">Inversión</label>
          <select 
            name="priceRange"
            value={filters.priceRange}
            onChange={handleSelectChange}
            className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-pink-100 focus:border-[#e91e63] appearance-none cursor-pointer shadow-sm hover:bg-gray-50 transition-all"
          >
            <option value="all">Cualquier precio</option>
            <option value="0-100">$0 - $100</option>
            <option value="100-200">$100 - $200</option>
            <option value="200+">Más de $200</option>
          </select>
          <div className="absolute bottom-4 right-4 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>

        {/* Filtro Tamaño */}
        <div className="relative">
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-4">Tamaño del Arreglo</label>
          <select 
            name="size"
            value={filters.size}
            onChange={handleSelectChange}
            className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-pink-100 focus:border-[#e91e63] appearance-none cursor-pointer shadow-sm hover:bg-gray-50 transition-all"
          >
            <option value="all">Todos los tamaños</option>
            <option value="chico">Chico (Personal)</option>
            <option value="mediano">Mediano (Estándar)</option>
            <option value="grande">Grande (Premium)</option>
          </select>
          <div className="absolute bottom-4 right-4 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>

      </div>
    </div>
  );
}