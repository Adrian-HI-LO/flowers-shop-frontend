
import React, { useState } from 'react';

export default function StepDetallesFinales({ carrito, ocasion, detalles, onUpdate }) {
  const [preview, setPreview] = useState(null);

  // Verificamos qué extras existen en el carrito
  const tiene = (nombre) => carrito[nombre]?.cantidad > 0;
  const esEmpresa = ocasion?.toLowerCase().includes('empresa');

  // Lógica para el Logo
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpdate('logoEmpresa', file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Verificamos si hay algún extra seleccionado
  const tieneCualquierExtra = Object.keys(carrito).some(nombre => 
    ["Globo Metalizado", "Listón con Mensaje", "Caja Personalizada", "Papel Decorativo", "Tarjeta de Dedicatoria"].includes(nombre)
  );

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
          Detalles de Personalización
          <div className="h-[2px] w-12 bg-pink-100"></div>
        </h2>
        <p className="text-gray-500 text-sm font-medium">
          Personaliza los elementos que has añadido a tu regalo.
        </p>
      </div>

      {/* --- BLOQUE CORPORATIVO --- */}
      {esEmpresa && (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 animate-fade-in-up">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <svg className="w-6 h-6 text-[#e91e63]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="font-bold text-gray-800 uppercase text-xs tracking-widest">Identidad de Marca</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Nombre de la Empresa</label>
                <input 
                  type="text" 
                  value={detalles.nombreEmpresa || ""}
                  onChange={(e) => onUpdate('nombreEmpresa', e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-200 outline-none text-sm transition-all"
                  placeholder="Ej. NovaCode"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Eslogan</label>
                <input 
                  type="text" 
                  value={detalles.esloganEmpresa || ""}
                  onChange={(e) => onUpdate('esloganEmpresa', e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-200 outline-none text-sm transition-all"
                  placeholder="Tu frase..."
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl p-4 min-h-[160px] hover:border-pink-200 transition-colors">
              {preview ? (
                <div className="relative group">
                  <img src={preview} alt="Logo" className="h-28 w-28 object-contain" />
                  <button onClick={() => {setPreview(null); onUpdate('logoEmpresa', null)}} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:scale-110 transition-transform">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer text-center group">
                  <div className="bg-pink-50 p-3 rounded-full mb-2 inline-block group-hover:bg-pink-100 transition-colors">
                    <svg className="w-6 h-6 text-[#e91e63]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Subir Logo</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleLogoChange} />
                </label>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- RENDERIZADO ESTRICTAMENTE CONDICIONAL --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Globo */}
        {tiene("Globo Metalizado") && (
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm animate-fade-in-up">
            <h3 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#e91e63]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Globo
            </h3>
            <input 
              type="text" 
              placeholder="Ej: Mickey Mouse, Azul..."
              value={detalles.estiloGlobo || ""}
              onChange={(e) => onUpdate('estiloGlobo', e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-200 outline-none text-sm mb-3"
            />
            <select 
              value={detalles.ocasionGlobo || ""}
              onChange={(e) => onUpdate('ocasionGlobo', e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200"
            >
              <option value="">Ocasión del globo...</option>
              <option value="Cumpleaños">Cumpleaños</option>
              <option value="Amor">Amor</option>
            </select>
          </div>
        )}

        {/* Listón */}
        {tiene("Listón con Mensaje") && (
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm animate-fade-in-up">
            <h3 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#e91e63]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              Listón
            </h3>
            <input 
              type="text" 
              placeholder="Mensaje corto..."
              value={detalles.textoListon || ""}
              onChange={(e) => onUpdate('textoListon', e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-200 outline-none text-sm"
            />
          </div>
        )}

        {/* Papel */}
        {tiene("Papel Decorativo") && (
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm animate-fade-in-up">
            <h3 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#e91e63]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Color de Papel
            </h3>
            <select 
              value={detalles.colorPapel || ""}
              onChange={(e) => onUpdate('colorPapel', e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200"
            >
              <option value="">Selecciona un color...</option>
              <option value="Blanco">Blanco</option>
              <option value="Rosa">Rosa</option>
              <option value="Kraft">Kraft</option>
            </select>
          </div>
        )}

        {/* Caja */}
        {tiene("Caja Personalizada") && (
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm animate-fade-in-up md:col-span-2">
            <h3 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#e91e63]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              Mensaje en Caja
            </h3>
            <textarea 
              placeholder="Texto grabado en la tapa..."
              value={detalles.mensajeCaja || ""}
              onChange={(e) => onUpdate('mensajeCaja', e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-200 outline-none text-sm h-20 resize-none transition-all"
            />
          </div>
        )}

        {/* --- TARJETA DE DEDICATORIA --- */}
        {tiene("Tarjeta de Dedicatoria") && (
          <div className="md:col-span-2 bg-[#e91e63]/5 p-8 rounded-3xl border border-[#e91e63]/20 animate-fade-in-up">
            <h3 className="font-bold text-[#e91e63] text-sm mb-6 flex items-center gap-2 uppercase tracking-widest">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Dedicatoria de la Tarjeta
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input 
                type="text" 
                placeholder="De: (Remitente)"
                value={detalles.remitente || ""}
                onChange={(e) => onUpdate('remitente', e.target.value)}
                className="p-3 rounded-xl border-white outline-none text-sm shadow-sm focus:ring-2 focus:ring-pink-200 transition-all"
              />
              <input 
                type="text" 
                placeholder="Para: (Destinatario)"
                value={detalles.destinatario || ""}
                onChange={(e) => onUpdate('destinatario', e.target.value)}
                className="p-3 rounded-xl border-white outline-none text-sm shadow-sm focus:ring-2 focus:ring-pink-200 transition-all"
              />
            </div>
            <textarea 
              placeholder="Escribe el mensaje especial..."
              value={detalles.dedicatoriaFinal || ""}
              onChange={(e) => onUpdate('dedicatoriaFinal', e.target.value)}
              className="w-full p-4 rounded-xl border-white outline-none text-sm h-32 resize-none shadow-sm focus:ring-2 focus:ring-pink-200 transition-all"
            />
          </div>
        )}

        {/* Mensaje de estado vacío */}
        {!tieneCualquierExtra && !esEmpresa && (
          <div className="md:col-span-2 py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100 animate-pulse">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-400 font-medium italic">
              No seleccionaste extras que requieran datos adicionales. <br/>
              ¡Puedes continuar para finalizar tu pedido!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}