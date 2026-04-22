
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductCard from './components/Catalogo/ProductCard';

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  // Función para leer los favoritos desde el LocalStorage
  const cargarFavoritos = () => {
    const saved = localStorage.getItem('favoritos');
    if (saved) {
      setFavoritos(JSON.parse(saved));
    } else {
      setFavoritos([]);
    }
  };

  useEffect(() => {
    // Al entrar a la página, subimos al inicio y cargamos los datos
    window.scrollTo(0, 0);
    cargarFavoritos();

    
    window.addEventListener('favoritosUpdated', cargarFavoritos);
    
    // Limpiamos el event listener al desmontar el componente
    return () => {
      window.removeEventListener('favoritosUpdated', cargarFavoritos);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-gray-900 flex flex-col">
      {/* Navbar con isAuthPage en false para que muestre el menú completo */}
      <Navbar isAuthPage={false} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-16">
        
        {/* Cabecera de la página */}
        <div className="mb-16 text-center max-w-3xl mx-auto space-y-4 animate-fade-in-up">
          <div className="inline-flex p-4 rounded-full bg-pink-50 mb-4 text-[#e91e63]">
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-tight">
            Mis <span className="text-[#e91e63]">Favoritos</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl font-medium">
            Tus arreglos florales preferidos, guardados para el momento perfecto.
          </p>
        </div>

        {/* Rejilla de productos o Estado Vacío */}
        {favoritos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 animate-fade-in-up delay-200">
            {favoritos.map(product => (
             
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200 animate-fade-in-up delay-200">
            <div className="inline-flex p-4 rounded-full bg-gray-50 mb-4 text-gray-300">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <p className="text-gray-500 font-bold text-xl">Aún no tienes arreglos favoritos.</p>
            <p className="text-gray-400 mt-2">Explora nuestro catálogo y presiona el corazón en los que más te gusten.</p>
            <Link 
              to="/catalogo"
              className="inline-block mt-8 px-8 py-3.5 bg-[#e91e63] text-white font-black rounded-xl hover:bg-pink-700 transition-all shadow-md active:scale-95"
            >
              Ir al Catálogo
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}