import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductCard from './components/Catalogo/ProductCard';
import FilterBar from './components/Catalogo/FilterBar';

const ALL_PRODUCTS = [
  { id: 1, name: "Rosas Rojas Premium", price: 89.99, occasion: "amor y romance", size: "mediano", image: "https://i.pinimg.com/1200x/16/79/7f/16797f142c9305cb0de9b60ad2e6c01c.jpg", description: "Docena de rosas rojas de la más alta calidad con follaje fino." },
  { id: 2, name: "Bouquet Elegante", price: 129.99, occasion: "aniversario", size: "mediano", image: "https://i.pinimg.com/736x/7a/2c/15/7a2c15aec5773eddd21e627ff89845b7.jpg", description: "Arreglo sofisticado con rosas blancas y flores de estación." },
  { id: 3, name: "Arreglo Romántico", price: 159.99, occasion: "amor y romance", size: "grande", image: "https://i.pinimg.com/1200x/93/ff/de/93ffde215da5ff7700c54b2c17829ad0.jpg", description: "Combinación perfecta de rosas rosadas y flores delicadas." },
  { id: 4, name: "Orquídeas Exóticas", price: 199.99, occasion: "cumpleaños", size: "chico", image: "https://i.pinimg.com/736x/b3/ea/a6/b3eaa659e8ee0434e0e9654b3d36a08b.jpg", description: "Elegantes orquídeas oscuras con detalles en azul profundo." },
];

export default function Catalogo() {
  const [filters, setFilters] = useState({
    search: '',
    priceRange: 'all',
    size: 'all',
    occasion: 'all'
  });

  const [filteredProducts, setFilteredProducts] = useState(ALL_PRODUCTS);

  useEffect(() => {
    let result = ALL_PRODUCTS.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchOccasion = filters.occasion === 'all' || p.occasion === filters.occasion;
      const matchSize = filters.size === 'all' || p.size === filters.size;
      
      let matchPrice = true;
      if(filters.priceRange === '0-100') matchPrice = p.price <= 100;
      else if(filters.priceRange === '100-200') matchPrice = p.price > 100 && p.price <= 200;
      else if(filters.priceRange === '200+') matchPrice = p.price > 200;

      return matchSearch && matchOccasion && matchSize && matchPrice;
    });
    setFilteredProducts(result);
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-gray-900 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-16">
        
        {/* Cabecera Centrada */}
        <div className="mb-16 text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-tight">
            Nuestro <span className="text-[#e91e63]">Catálogo</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl font-medium">
            Descubre nuestra colección de arreglos florales exclusivos, diseñados para cautivar en cada ocasión.
          </p>
        </div>

        {/* Barra de Filtros Refinada */}
        <FilterBar filters={filters} setFilters={setFilters} />

        {/* Resultados de Productos */}
        <div className="mt-12">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
              <div className="inline-flex p-4 rounded-full bg-gray-50 mb-4 text-gray-300">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <p className="text-gray-500 font-bold text-xl">No hay coincidencias para tu búsqueda.</p>
              <button 
                onClick={() => setFilters({search: '', priceRange: 'all', size: 'all', occasion: 'all'})}
                className="mt-6 px-8 py-3 bg-pink-50 text-[#e91e63] font-black rounded-xl hover:bg-pink-100 transition-all"
              >
                Ver todos los productos
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}