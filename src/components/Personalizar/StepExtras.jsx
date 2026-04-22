
import ExtraCard from './ExtraCard';

export default function StepExtras({ ocasion, modo, carrito, onUpdate }) {
  
  const todosLosExtras = {
    sentimentales: [
      { name: "Globo Metalizado", price: "$6", image: "https://i.pinimg.com/1200x/93/98/d1/9398d140ca0f64f93952cbbb9d2b5ccb.jpg" },
      { name: "Caja Personalizada", price: "$12", image: "https://i.pinimg.com/736x/ad/48/59/ad4859fee7cd3509a906a484d21a6f48.jpg" },
      { name: "Tarjeta de Dedicatoria", price: "$2", image: "https://i.pinimg.com/1200x/6e/0d/1b/6e0d1b643a13723321975e543666f24d.jpg" },
      { name: "Papel Decorativo", price: "$3", image: "https://i.pinimg.com/1200x/78/d0/0d/78d00d122113c3e144377fca26a71c50.jpg" },
      { name: "Listón con Mensaje", price: "$5", image: "https://i.pinimg.com/1200x/ff/42/da/ff42dab0dd6f85d279d5a9489b2e4bd8.jpg" },
    ],
    corporativos: [
      { name: "Termo Personalizado", price: "$20", image: "https://i.pinimg.com/736x/f4/68/91/f46891a1a6f7bce9fa0905d71bf77a0f.jpg" },
      { name: "Agenda de Piel", price: "$18", image: "https://i.pinimg.com/736x/91/fd/f3/91fdf34775f0cdc9eaa2a50bb29b4a79.jpg" },
      { name: "Pluma Grabada", price: "$15", image: "https://i.pinimg.com/736x/f8/a8/6c/f8a86c7ee6ddf0dcecc820d562e432ab.jpg" },
      { name: "Bolsa Ecológica", price: "$5", image: "https://i.pinimg.com/1200x/d7/14/a5/d714a538a0a91b5d4c9913ccc15472fa.jpg" },
      { name: "Caja Personalizada", price: "$12", image: "https://i.pinimg.com/736x/ad/48/59/ad4859fee7cd3509a906a484d21a6f48.jpg" }, 
      { name: "Tarjeta de Dedicatoria", price: "$2", image: "https://i.pinimg.com/736x/53/20/e5/5320e5d9a9ce83fa7fe3956aa6aa56c7.jpg" },
    ]
  };

  const esEmpresa = ocasion?.toLowerCase().includes('empresa');
  let extrasAMostrar = [];

  // LÓGICA DE FILTRADO
  if (esEmpresa) {
    // Para empresa mostramos corporativos 
    extrasAMostrar = todosLosExtras.corporativos;
  } else {
    // Para Pareja / Familia
    if (modo === 'arreglos') {
      // REGLA: Solo Caja, Globo y Tarjeta para Arreglos
      extrasAMostrar = todosLosExtras.sentimentales.filter(item => 
        ["Globo Metalizado", "Caja Personalizada", "Tarjeta de Dedicatoria"].includes(item.name)
      );
    } else {
      // Para Ramos: Se permite todo excepto la Caja
      extrasAMostrar = todosLosExtras.sentimentales.filter(item => item.name !== "Caja Personalizada");
    }
  }

  const handleToggle = (name, price) => {
    const yaExiste = carrito[name]?.cantidad > 0;
    onUpdate(name, price, yaExiste ? -1 : 1);
  };

  return (
    <div className="animate-fade-in space-y-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
          Complementos para tu {modo === 'arreglos' ? 'Arreglo' : 'Ramo'}
          <div className="h-[2px] w-12 bg-pink-100"></div>
        </h2>
        <p className="text-gray-400 text-sm font-medium">
          Selecciona los extras que deseas añadir para personalizar tu regalo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {extrasAMostrar.map((extra, index) => (
          <ExtraCard 
            key={index} 
            {...extra} 
            seleccionado={carrito[extra.name]?.cantidad > 0}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}