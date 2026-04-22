
import React from 'react';

const locations = [
  { id: 1, name: "Jardín Central" },
  { id: 2, name: "La Campana" },
  { id: 3, name: "Virgen de la Piedrita" },
  { id: 4, name: "Parque Las Peñas" },
  { id: 5, name: "Presa Danxhó" },
  { id: 6, name: "Tecnológico (TESJI)" }
];

export default function PaymentForm() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* SECCIÓN 1: ENVÍO */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
          <span className="w-9 h-9 bg-pink-50 text-[#e91e63] rounded-full flex items-center justify-center text-sm font-bold border border-pink-100">1</span>
          Detalles de Entrega en Jilotepec
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Nombre completo */}
          <div className="relative group md:col-span-2">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-[#e91e63] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </span>
            <input 
              type="text" 
              placeholder="Nombre completo de quien recibe" 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-pink-100 focus:bg-white focus:border-pink-200 outline-none transition-all" 
            />
          </div>

          {/* Teléfono */}
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-[#e91e63] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </span>
            <input 
              type="tel" 
              placeholder="Teléfono de contacto" 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-pink-100 focus:bg-white focus:border-pink-200 outline-none transition-all" 
            />
          </div>

          {/* Selector de Ubicación (Punto de Entrega) */}
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-[#e91e63] transition-colors z-10 pointer-events-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </span>
            <select 
              className="w-full pl-12 pr-10 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-pink-100 focus:bg-white focus:border-pink-200 outline-none appearance-none cursor-pointer text-gray-700 transition-all relative z-0"
              defaultValue=""
            >
              <option value="" disabled>Selecciona punto de entrega...</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
            {/* Flecha del select */}
            <div className="absolute right-4 inset-y-0 flex items-center pointer-events-none text-gray-400 z-10">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>

          {/* Indicaciones adicionales */}
          <div className="relative group md:col-span-2">
            <span className="absolute top-4 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-[#e91e63] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </span>
            <textarea 
              placeholder="Indicaciones adicionales (Ej: Cerca de la entrada principal, color de casa...)" 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-pink-100 focus:bg-white focus:border-pink-200 outline-none transition-all h-24 resize-none" 
            />
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: PAGO */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
          <span className="w-9 h-9 bg-pink-50 text-[#e91e63] rounded-full flex items-center justify-center text-sm font-bold border border-pink-100">2</span>
          Método de Pago Seguro
        </h3>
        <div className="space-y-5">
          {/* Opción Tarjeta Seleccionada */}
          <div className="p-5 border-2 border-[#e91e63] bg-pink-50/30 rounded-2xl flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-[9px] text-white font-black uppercase tracking-widest shadow-md">Card</div>
              <span className="text-base font-bold text-gray-900">Tarjeta de Crédito / Débito</span>
            </div>
            <div className="w-6 h-6 rounded-full border-4 border-[#e91e63] bg-white flex items-center justify-center shadow">
               <div className="w-2 h-2 rounded-full bg-[#e91e63]"></div>
            </div>
          </div>
          
          {/* Campos de la tarjeta */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-3 border-t border-gray-50">
            {/* Número de tarjeta */}
            <div className="relative group md:col-span-3">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-[#e91e63] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              </span>
              <input 
                type="text" 
                placeholder="0000 0000 0000 0000" 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-pink-100 focus:bg-white focus:border-pink-200 outline-none transition-all font-mono tracking-widest" 
              />
            </div>

            {/* Fecha Expiración */}
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-[#e91e63] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </span>
              <input 
                type="text" 
                placeholder="MM / YY" 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-pink-100 focus:bg-white focus:border-pink-200 outline-none transition-all text-center" 
              />
            </div>

            {/* CVC */}
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-[#e91e63] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </span>
              <input 
                type="text" 
                placeholder="CVC" 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-pink-100 focus:bg-white focus:border-pink-200 outline-none transition-all text-center" 
              />
            </div>
            
            {/* Espacio extra para CVV Info */}
            <div className="flex items-center text-xs text-gray-400 gap-2 pl-2">
                <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                3 o 4 dígitos al reverso
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}