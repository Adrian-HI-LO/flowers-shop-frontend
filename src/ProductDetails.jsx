
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductDetailInfo from './components/Catalogo/ProductDetailInfo';


const ALL_PRODUCTS = [
  { 
    id: 1, 
    name: "Rosas Rojas Premium", 
    price: 89.99, 
    category: "Rosas",
    image: "https://i.pinimg.com/1200x/16/79/7f/16797f142c9305cb0de9b60ad2e6c01c.jpg", 
    description: "Docena de rosas rojas de la más alta calidad con follaje fino.",
    tags: ["Amor", "Romance", "Aniversario"]
  },
  { 
    id: 2, 
    name: "Bouquet Elegante", 
    price: 129.99, 
    category: "Bouquets",
    image: "https://i.pinimg.com/736x/7a/2c/15/7a2c15aec5773eddd21e627ff89845b7.jpg", 
    description: "Arreglo sofisticado con rosas blancas y flores de estación.",
    tags: ["Boda", "Elegancia", "Regalo"]
  },
  { 
    id: 3, 
    name: "Arreglo Romántico", 
    price: 159.99, 
    category: "Premium",
    image: "https://i.pinimg.com/1200x/93/ff/de/93ffde215da5ff7700c54b2c17829ad0.jpg", 
    description: "Combinación perfecta de rosas rosadas y flores delicadas.",
    tags: ["Cena", "Detalle", "Pareja"]
  },
  { 
    id: 4, 
    name: "Orquídeas Exóticas", 
    price: 199.99, 
    category: "Premium",
    image: "https://i.pinimg.com/736x/b3/ea/a6/b3eaa659e8ee0434e0e9654b3d36a08b.jpg", 
    description: "Elegantes orquídeas oscuras con detalles en azul profundo.",
    tags: ["Exótico", "Decoración", "Lujo"]
  },
];

export default function ProductDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  // Buscamos el producto específico
  const product = ALL_PRODUCTS.find(p => p.id === parseInt(id));

  useEffect(() => {
    
    window.scrollTo(0, 0);
  }, [id]);

  // Si el ID no existe en nuestra lista, mostramos un estado de error o redirigimos
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-sans">
        <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
        <button 
          onClick={() => navigate('/catalogo')}
          className="px-6 py-2 bg-[#e91e63] text-white rounded-lg font-bold"
        >
          Volver al Catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 md:py-12">
        
        {/* Botón Volver */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-500 hover:text-[#e91e63] font-bold mb-8 transition-colors group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Columna Izquierda: Imagen */}
          <div className="relative w-full aspect-[4/5] lg:h-[700px] rounded-[2.5rem] overflow-hidden bg-gray-100 shadow-sm">
            <img 
              src={product.image} 
              alt={product.name} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Columna Derecha: Información  */}
          <div className="sticky top-28">
            <ProductDetailInfo product={product} />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}