
export default function SummaryCart({ ocasion, carrito = {}, total = 0, tamaño }) {
  // Convertimos el objeto de carrito en un array para poder usar .map()
  const itemsSeleccionados = Object.entries(carrito);

  return (
    <div className="bg-pink-50/30 p-8 rounded-3xl border border-pink-100/50 h-fit sticky top-8">
      {/* Encabezado con Icono */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-white p-2 rounded-lg shadow-sm">
          <svg 
            className="w-5 h-5 text-[#e91e63]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            strokeWidth="2.5"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" 
            />
          </svg>
        </div>
        <h2 className="text-xl font-extrabold text-gray-800 tracking-tight">Resumen</h2>
      </div>
      
      {/* Cuerpo del Resumen */}
      <div className="space-y-5 border-b border-pink-100 pb-8 min-h-[120px]">
        {/* Estado Vacío */}
        {!ocasion && itemsSeleccionados.length === 0 && (
          <div className="flex flex-col items-center justify-center py-6">
            <p className="text-gray-400 text-sm italic text-center">
              Tu selección aparecerá aquí...
            </p>
          </div>
        )}

        {/* Sección: Ocasión */}
        {ocasion && (
          <div className="flex justify-between items-center text-gray-600 animate-fade-in">
            <span className="text-sm font-medium">Ocasión:</span>
            <span className="px-3 py-1 bg-white rounded-full text-[11px] font-bold text-[#e91e63] border border-pink-100 uppercase tracking-wider shadow-sm">
              {ocasion}
            </span>
          </div>
        )}

        {/*  Sección Tamaño (Se muestra solo si hay un tamaño calculado) */}
        {tamaño && (
          <div className="flex justify-between items-center text-gray-600 animate-fade-in pt-2">
            <span className="text-sm font-medium">Tamaño:</span>
            <span className="px-3 py-1 bg-[#e91e63] rounded-full text-[10px] font-black text-white uppercase tracking-widest shadow-md">
              {tamaño}
            </span>
          </div>
        )}

        {/* Sección: Flores y Detalles Seleccionados */}
        {itemsSeleccionados.length > 0 && (
          <div className="space-y-4 pt-2 border-t border-pink-100/50 mt-4">
            {itemsSeleccionados.map(([nombre, datos]) => (
              <div key={nombre} className="flex flex-col border-b border-pink-50 pb-3 last:border-0 last:pb-0 animate-fade-in-up">
                <div className="flex justify-between items-center text-gray-600">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-800">{nombre}</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wide">Cant: {datos.cantidad}</span>
                  </div>
                  <span className="font-bold text-[#e91e63]">
                    ${(datos.cantidad * datos.precio).toFixed(2)}
                  </span>
                </div>

                {/* Mostrar Color si está seleccionado */}
                {datos.color && (
                  <div className="flex justify-between items-center mt-1 bg-white/50 px-2 py-0.5 rounded-md">
                    <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">Color:</span>
                    <span className="text-[10px] font-black text-[#e91e63] uppercase tracking-tighter">
                      {datos.color}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pie del Resumen: Total */}
      <div className="flex justify-between items-center mt-8">
        <span className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">Total Estimado:</span>
        <div className="flex flex-col items-end">
          <span className="text-4xl font-black text-[#e91e63]">
            ${total > 0 ? total.toFixed(2) : (ocasion ? '0.00' : '--')}
          </span>
        </div>
      </div>
    </div>
  );
}