
export default function CTA() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#282627] opacity-75 z-10 mix-blend-multiply"></div>
        <img 
          src="https://i.pinimg.com/736x/79/a4/4a/79a44a359956ef7cd50735c096c12912.jpg" 
          alt="Flores de fondo" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center text-white reveal-on-scroll opacity-0 translate-y-12 transition-all duration-700 ease-out">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight drop-shadow-md">
          Crea tu arreglo personalizado
        </h2>
        <p className="text-lg md:text-xl text-pink-50 mb-10 max-w-2xl mx-auto font-light">
          Elige tus flores favoritas, colores y agrega un mensaje especial
        </p>
        <button  className="px-8 py-4 font-bold text-[#e91e63] bg-white rounded-lg hover:bg-gray-100 transition-all hover:-translate-y-1 shadow-xl active:translate-y-0 active:scale-95">
          Comenzar a diseñar
        </button>
      </div>
    </section>
  );
}