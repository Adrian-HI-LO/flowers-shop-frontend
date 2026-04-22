
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Home/Hero';
import Features from './components/Home/Features';
import CTA from './components/Home/CTA';
import DeliveryZones from './components/Home/DeliveryZones';

const products = [
  {
    id: 1,
    name: 'Rosas Rojas Premium',
    price: '$89.99',
    image: 'https://i.pinimg.com/1200x/16/79/7f/16797f142c9305cb0de9b60ad2e6c01c.jpg',
  },
  {
    id: 2,
    name: 'Bouquet Elegante',
    price: '$129.99',
    image: 'https://i.pinimg.com/736x/7a/2c/15/7a2c15aec5773eddd21e627ff89845b7.jpg',
  },
  {
    id: 3,
    name: 'Arreglo Romántico',
    price: '$159.99',
    image: 'https://i.pinimg.com/1200x/93/ff/de/93ffde215da5ff7700c54b2c17829ad0.jpg',
  }
];

export default function Home() {
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-12');
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white overflow-hidden">
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scrollDrop { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(8px); opacity: 0; } }
        .animate-fade-in-down { animation: fadeInDown 0.8s ease-out forwards; opacity: 0; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
        .animate-fade-in { animation: fadeIn 1.5s ease-out forwards; opacity: 0; }
        .animate-scroll-drop { animation: scrollDrop 1.5s infinite; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-500 { animation-delay: 500ms; }
      `}</style>

      <Navbar />

      <main className="flex-1">
        <Hero />
        <Features />

        {/* Sección de Productos */}
        <section className="py-24 bg-gray-50 border-t border-gray-100 relative z-10 overflow-hidden text-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-16 reveal-on-scroll opacity-0 translate-y-12 transition-all duration-700 ease-out">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                Productos destacados
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Nuestras creaciones más populares
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map((product, index) => (
                <div 
                  key={product.id} 
                  className="group cursor-pointer reveal-on-scroll opacity-0 translate-y-12 transition-all duration-700 ease-out text-left"
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="overflow-hidden rounded-3xl mb-5 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2 relative aspect-[4/5] bg-gray-200">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button className="bg-white text-gray-900 font-bold py-2 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        Ver detalles
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors">{product.name}</h3>
                  <p className="text-xl font-bold text-[#e91e63]">{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <DeliveryZones />

        <CTA />
      </main>

      <Footer />
    </div>
  );
}