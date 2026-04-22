
import React from 'react';

export default function CustomCartItem({ item, onRemove }) {
  //  datos del objeto personalizado
  const { configuracion, detallesExtra, subtotal, ocasion, tamaño } = item;
  
  // Convertimos la configuración en un array para iterar
  const floresYExtras = Object.entries(configuracion);

  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-pink-100/50 flex flex-col gap-6 mb-6 relative overflow-hidden shadow-sm hover:shadow-md transition-all">
      {/* Indicador de Producto Personalizado */}
      <div className="absolute top-0 right-0 z-10">
        <div className="bg-pink-50 text-[#e91e63] px-4 py-1.5 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest border-l border-b border-pink-100/50 shadow-inner">
          Diseño Exclusivo
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 relative z-0">
        {/* Columna Izquierda: Icono de Regalo Sorpresa y Tamaño */}
        <div className="w-full md:w-32 flex flex-col items-center justify-center gap-2 group">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-pink-50 to-orange-50 flex items-center justify-center text-[#e91e63] shadow-inner border border-pink-100/50 group-hover:scale-105 transition-transform duration-500">
             {/* Regalo Sorpresa con estrellas */}
             <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l1.5 1.5m0 0l1.5-1.5m-1.5 1.5V18" />
                {/* Estrellitas decorativas de sorpresa */}
                <path className="animate-pulse" d="M19.5 4.5l.375.375m0 0L20.25 5.25m-.375-.375L20.25 4.5m-.375.375L19.5 5.25" stroke="#FBBF24" strokeWidth="2"/>
                <path className="animate-pulse delay-75" d="M3.75 4.5l.375.375m0 0L4.5 5.25M4.125 4.875L4.5 4.5M4.125 4.875L3.75 5.25" stroke="#FBBF24" strokeWidth="2"/>
             </svg>
          </div>
          <span className="text-[10px] font-black uppercase text-[#e91e63] tracking-tighter bg-white px-2.5 py-1 rounded-md border border-pink-100 shadow-sm">
            TAMAÑO: {tamaño}
          </span>
        </div>

        {/* Columna Central: Desglose de la creación */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-black text-gray-900 tracking-tight">
              Regalo para {ocasion}
            </h3>
            <div className="h-[2px] w-10 bg-pink-100 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 bg-gray-50 p-5 rounded-2xl border border-gray-100">
            {floresYExtras.map(([nombre, datos]) => (
              <div key={nombre} className="flex justify-between items-center py-1.5 border-b border-gray-100/50 group/item last:border-0 last:pb-0">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-700">{nombre}</span>
                  {datos.color && (
                    <span className="text-[10px] text-[#e91e63] font-medium italic">Color: {datos.color}</span>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-400 group-hover/item:text-gray-900 transition-colors">
                  x{datos.cantidad}
                </span>
              </div>
            ))}
          </div>

          {/* Detalles del Mensaje/Dedicatoria (Solo si existen) */}
          {(detallesExtra.remitente || detallesExtra.dedicatoriaFinal) && (
            <div className="mt-6 p-5 bg-[#e91e63]/5 rounded-2xl border border-[#e91e63]/10 relative">
              <svg className="w-6 h-6 text-[#e91e63]/30 absolute top-4 right-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13,14.725c0-0.241,0.15-0.347,0.339-0.236l2.151,1.27c0.189,0.111,0.5,0.111,0.689,0l3.482-2.056 C20.85,13.592,21,13.25,21,12.871v-2.056c0-0.379-0.15-0.721-0.339-0.832l-3.482-2.056c-0.189-0.111-0.5-0.111-0.689,0l-2.151,1.27 C13.15,9.258,13,9.364,13,9.605V14.725z M11,9.605c0-0.241-0.15-0.347-0.339-0.236l-2.151,1.27c-0.189,0.111-0.5,0.111-0.689,0 L4.339,12.693C4.15,12.804,4,13.146,4,13.525v2.056c0,0.379,0.15,0.721,0.339,0.832l3.482,2.056c0.189,0.111,0.5,0.111,0.689,0 l2.151-1.27C10.85,17.086,11,16.98,11,16.739V9.605z M13,20.725c0-0.241,0.15-0.347,0.339-0.236l2.151,1.27 c0.189,0.111,0.5,0.111,0.689,0l3.482-2.056c0.189-0.111,0.339-0.453,0.339-0.832v-2.056c0-0.379-0.15-0.721-0.339-0.832 l-3.482-2.056c-0.189-0.111-0.5-0.111-0.689,0l-2.151,1.27C13.15,15.258,13,15.364,13,15.605V20.725z"/></svg>
              
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                Tarjeta de Dedicatoria
              </p>
              <p className="text-sm text-gray-600 line-clamp-2 italic leading-relaxed">
                "{detallesExtra.dedicatoriaFinal}"
              </p>
              <p className="text-[10px] text-[#e91e63] font-bold mt-3 uppercase bg-white inline-block px-2 py-0.5 rounded border border-pink-100">
                De: {detallesExtra.remitente} • Para: {detallesExtra.destinatario}
              </p>
            </div>
          )}
        </div>

        {/* Columna Derecha: Precio y Acciones */}
        <div className="flex flex-col items-end justify-between md:min-h-[160px]">
          <button 
            onClick={onRemove}
            className="text-gray-300 hover:text-red-500 transition-all p-2 hover:bg-red-50 rounded-xl group/del active:scale-95"
            title="Eliminar diseño exclusivo"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          
          <div className="text-right">
            <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Precio Diseño Único</span>
            <span className="text-4xl font-black text-[#e91e63] leading-none tracking-tighter">${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}