
export default function ExtraCard({ name, price, image, seleccionado, onToggle }) {
  const precioNumerico = parseFloat(price.replace('$', ''));

  return (
    <button 
      onClick={() => onToggle(name, precioNumerico)}
      className={`flex items-center justify-between p-4 bg-white border rounded-2xl transition-all group w-full text-left ${
        seleccionado 
          ? 'border-[#e91e63] shadow-md ring-1 ring-[#e91e63]/10' 
          : 'border-gray-100 hover:border-pink-200'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 relative">
          <img src={image} alt={name} className="w-full h-full object-cover" />
          {seleccionado && (
            <div className="absolute inset-0 bg-[#e91e63]/20 flex items-center justify-center">
               <div className="bg-white rounded-full p-1 shadow-sm">
                 <svg className="w-4 h-4 text-[#e91e63]" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
               </div>
            </div>
          )}
        </div>
        <div>
          <h3 className={`font-bold transition-colors ${seleccionado ? 'text-[#e91e63]' : 'text-gray-800'}`}>
            {name}
          </h3>
          <p className="text-gray-400 font-bold text-xs">{price}</p>
        </div>
      </div>
      
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
        seleccionado ? 'bg-[#e91e63] border-[#e91e63]' : 'border-gray-200'
      }`}>
        {seleccionado && (
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </button>
  );
}