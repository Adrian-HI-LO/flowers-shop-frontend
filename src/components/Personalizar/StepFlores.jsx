
import FlowerCard from './FlowerCard';

export default function StepFlores({ carrito, onUpdate, modo, setModo }) {
  const flores = [
    { name: "Rosas", price: "$5", image: "https://media.admagazine.com/photos/65ca727d564155b0f3dcdae4/16:9/w_2560%2Cc_limit/Rosas%252014%2520febrero.jpg" },
    { name: "Tulipanes", price: "$4", image: "https://www.floresyplantas.net/wp-content/uploads/flores-de-tulipanes-en-el-campo.webp" },
    { name: "Girasoles", price: "$4.5", image: "https://www.compo.de/dam/jcr:fdbba870-e002-430c-8b2e-c635fcc8074e/sunflower-bee_sonneblume-biene.jpg?x=50&y=50" },
    { name: "Orquídeas", price: "$8", image: "https://m.media-amazon.com/images/I/71L6lBws5YL._AC_UF894,1000_QL80_.jpg" }
  ];

  const chocolates = [
    { name: "Ferrero Rocher", price: "$12", image: "https://cdn.floresdemexico.com/wp-content/uploads/2017/08/Ferrero-Rocher-16-pzas-3-Ferrero-Rocher-16-pzas-3-850x850.jpg" },
    { name: "Caja de Trufas", price: "$15", image: "https://thumbs.dreamstime.com/b/caja-de-diferentes-trufas-gourmet-chocolate-para-las-vacaciones-navidad-con-revestimientos-variados-en-una-regalo-400612168.jpg" },
  ];

  const vinos = [
    { name: "Vino Tinto Reserva", price: "$25", image: "https://lacaretalicores.com/cdn/shop/products/VINOTINTORESERVADOCARMENERE.jpg?v=1623275013&width=1090" },
    { name: "Champagne Brut", price: "$45", image: "https://www.thecellarhand.co.uk/cdn/shop/files/chateau-de-l_auche-blanc-de-noirs-brut-champagne.jpg?v=1765801871" },
  ];

  return (
    <div className="animate-fade-in space-y-12">
      {/* --- INTERRUPTOR (TOGGLE) --- */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-full flex gap-1 border border-gray-200 shadow-inner">
          <button 
            onClick={() => setModo('ramos')}
            className={`px-8 py-2 rounded-full font-bold text-sm transition-all ${modo === 'ramos' ? 'bg-[#e91e63] text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Ramos
          </button>
          <button 
            onClick={() => setModo('arreglos')}
            className={`px-8 py-2 rounded-full font-bold text-sm transition-all ${modo === 'arreglos' ? 'bg-[#e91e63] text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Arreglos
          </button>
        </div>
      </div>

      {/* Sección Flores (Siempre visible) */}
      <section>
        <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
          Selecciona tus Flores
          <div className="h-[2px] w-12 bg-pink-100"></div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {flores.map((f, i) => <FlowerCard key={i} {...f} cantidad={carrito[f.name]?.cantidad || 0} onUpdate={onUpdate} />)}
        </div>
      </section>

      {/* Secciones Extra (Solo en modo Arreglos) */}
      {modo === 'arreglos' && (
        <>
          <section className="animate-fade-in-up">
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
              Chocolates
              <div className="h-[2px] w-12 bg-pink-100"></div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chocolates.map((c, i) => <FlowerCard key={i} {...c} cantidad={carrito[c.name]?.cantidad || 0} onUpdate={onUpdate} />)}
            </div>
          </section>

          <section className="animate-fade-in-up">
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
              Vinos & Licores
              <div className="h-[2px] w-12 bg-pink-100"></div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vinos.map((v, i) => <FlowerCard key={i} {...v} cantidad={carrito[v.name]?.cantidad || 0} onUpdate={onUpdate} />)}
            </div>
          </section>
        </>
      )}
    </div>
  );
}