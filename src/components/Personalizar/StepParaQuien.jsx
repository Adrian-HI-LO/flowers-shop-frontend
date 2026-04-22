
export default function StepParaQuien({ onSelect, selected }) {
  const opciones = [
    { 
      id: 'Pareja / Familia', 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ), 
      desc: 'Para momentos íntimos' 
    },
    { 
      id: 'Empresa', 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .414-.336.75-.75.75H4.5a.75.75 0 01-.75-.75v-4.25m16.5 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 14.15m17.25 0a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 14.15m14.25-5.328V5.25A2.25 2.25 0 0015 3h-6a2.25 2.25 0 00-2.25 2.25v3.572m10.5 0h-10.5" />
        </svg>
      ), 
      desc: 'Regalos corporativos' 
    }
  ];

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
        ¿Para quién es tu regalo?
        <div className="h-[2px] w-12 bg-pink-100"></div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opciones.map((opc) => (
          <button 
            key={opc.id}
            onClick={() => onSelect(opc.id)}
            className={`flex flex-col items-center p-8 bg-white border-2 rounded-3xl transition-all group text-center outline-none ${
              selected === opc.id 
                ? 'border-[#e91e63] shadow-lg scale-[1.02]' 
                : 'border-gray-100 hover:border-pink-200 hover:shadow-md'
            }`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
              selected === opc.id 
                ? 'bg-[#e91e63] text-white' 
                : 'bg-pink-50 text-[#e91e63] group-hover:scale-110 group-hover:bg-pink-100'
            }`}>
              {opc.icon}
            </div>
            <h3 className={`text-xl font-bold mb-2 transition-colors ${
              selected === opc.id ? 'text-[#e91e63]' : 'text-gray-900'
            }`}>
              {opc.id}
            </h3>
            <p className="text-sm text-gray-400 font-medium">{opc.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}