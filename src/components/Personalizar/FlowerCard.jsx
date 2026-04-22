
export default function FlowerCard({ name, price, image, cantidad, onUpdate }) {
  
  
  const precioNumerico = parseFloat(price.replace('$', ''));

  return (
    <div className={`flex items-center justify-between p-4 bg-white border rounded-2xl transition-all group ${
      cantidad > 0 ? 'border-[#e91e63] shadow-md ring-1 ring-[#e91e63]/10' : 'border-gray-100 hover:border-pink-100'
    }`}>
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
        </div>
        <div>
          <h3 className="font-bold text-gray-800">{name}</h3>
          <p className="text-[#e91e63] font-bold text-sm">{price} c/u</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Botón de restar */}
        <button 
          onClick={() => onUpdate(name, precioNumerico, -1)}
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-[#e91e63] transition-colors disabled:opacity-30"
          disabled={cantidad === 0}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" />
          </svg>
        </button>

        {/* Contador */}
        <span className="font-bold text-gray-800 w-5 text-center text-lg">
          {cantidad}
        </span>

        {/* Botón de sumar */}
        <button 
          onClick={() => onUpdate(name, precioNumerico, 1)}
          className="w-8 h-8 rounded-lg bg-[#e91e63] flex items-center justify-center text-white hover:bg-pink-700 transition-all shadow-sm active:scale-90"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
}