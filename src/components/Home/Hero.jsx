
import imagenFondo from '../../assets/fondo_principal.png';

export default function Hero() {
  return (
    <section className="relative flex flex-col justify-center px-8 lg:px-24 min-h-[calc(100vh-73px)]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src={imagenFondo} 
          alt="Mujer sosteniendo rosas blancas" 
          className="w-full h-full object-cover animate-fade-in"
        />
      </div>

      <div className="relative z-20 max-w-3xl mt-[-50px]">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 animate-fade-in-up delay-100 leading-tight drop-shadow-lg text-left">
          Florería Elegante
        </h1>
        <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-xl animate-fade-in-up delay-200 drop-shadow-md text-left">
          Flores frescas y arreglos personalizados para cada momento especial
        </p>

        <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
          <button className="px-8 py-3.5 font-bold text-white bg-[#e91e63] rounded-lg hover:bg-pink-700 transition-all hover:-translate-y-0.5 shadow-lg active:translate-y-0 active:scale-95">
            Ver Catálogo
          </button>
          <button className="px-8 py-3.5 font-bold text-white bg-black/20 border border-white/40 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95">
            Personalizar Bouquet
          </button>
        </div>
      </div>

      <a href="#beneficios" className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20 animate-fade-in delay-500 cursor-pointer text-white opacity-80 hover:opacity-100 hover:text-pink-300 transition-all">
        <span className="text-[10px] font-bold tracking-widest uppercase animate-pulse">Descubre más</span>
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <rect x="7" y="3" width="10" height="18" rx="5" strokeLinecap="round" strokeLinejoin="round"/>
          <path className="animate-scroll-drop" d="M12 7v3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        </svg>
      </a>
    </section>
  );
}