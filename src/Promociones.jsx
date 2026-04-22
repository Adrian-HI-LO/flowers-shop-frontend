
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import PromoCard from './components/Promociones/PromoCard';
import CuponCard from './components/Promociones/CuponCard';

export default function Promociones() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ofertas = [
    {
      id: 1,
      title: "Tulipanes Coloridos",
      discount: "25%",
      currentPrice: "$59.99",
      originalPrice: "$79.99",
      timeLeft: "2h 30m",
      image: "https://i.pinimg.com/736x/7a/aa/ab/7aaaabc71e0b4b122720e265abb0b9c7.jpg"
    },
    {
      id: 2,
      title: "Arreglo Premium Rojo",
      discount: "26%",
      currentPrice: "$139.99",
      originalPrice: "$189.99",
      timeLeft: "4h 15m",
      image: "https://i.pinimg.com/736x/28/1e/0c/281e0c80aef42c70712ff91f260e979f.jpg"
    },
    {
      id: 3,
      title: "Mix de Dahlias",
      discount: "29%",
      currentPrice: "$99.99",
      originalPrice: "$139.99",
      timeLeft: "6h 45m",
      image: "https://i.pinimg.com/1200x/3c/65/e9/3c65e9963735d253dd32e7db99d67fb2.jpg"
    }
  ];
  const cupones = [
    {
      id: 1,
      badge: "20%",
      title: "20% OFF en Rosas",
      description: "Descuento especial en todos nuestros arreglos de rosas premium",
      code: "ROSAS20",
      validity: "Válido por 3 días",
      image: "https://i.pinimg.com/736x/1c/4b/4a/1c4b4a2420532e2119935ed822e77512.jpg"
    },
    {
      id: 2,
      badge: "10%",
      title: "Cupón de Bienvenida", 
      description: "¡Qué gusto tenerte aquí! Obtén un 10% de descuento en tu primer pedido con nosotros.",
      code: "HOLAFLORALUX",
      validity: "Válido para tu primera compra",
      image: "https://i.pinimg.com/736x/ab/a8/f1/aba8f15db361ce298f21e268d36e0cdd.jpg"
    },
    {
      id: 3,
      badge: "15%",
      title: "Combo Especial",
      description: "Lleva 2 arreglos y obtén 15% de descuento",
      code: "COMBO15",
      validity: "Válido por 5 días",
      image: "https://i.pinimg.com/736x/ec/36/75/ec367581b0a696d61c85114db21df285.jpg"
    },
    {
      id: 4,
      badge: "Envío Gratis",
      title: "Envío Gratis",
      description: "En compras superiores a $150",
      code: "ENVIO0",
      validity: "Válido por 10 días",
      image: "https://i.pinimg.com/1200x/c6/4a/8f/c64a8f4c028679290f5384a4d4738735.jpg"
    }
  ];

  return (
    // 2. Añadimos 'flex flex-col' al div padre
    <div className="min-h-screen bg-[#fafafa] font-sans text-gray-900 flex flex-col">
      <Navbar />

      {/* 3. Añadimos 'flex-1' y 'w-full' al main para empujar el footer hacia abajo */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-24">
        
        {/* Sección: Ofertas Relámpago */}
        <div className="mb-14">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight">
            Promociones Especiales
          </h1>
          <p className="text-gray-500 text-lg font-medium">
            Aprovecha nuestras ofertas exclusivas en flores frescas
          </p>
        </div>

        <div className="mb-8 flex items-center gap-2">
          <svg className="w-7 h-7 text-[#e91e63]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900">Ofertas Relámpago</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ofertas.map((oferta) => (
            <div key={oferta.id} className="transition-transform duration-500 hover:-translate-y-2">
              <PromoCard {...oferta} />
            </div>
          ))}
        </div>

        {/* Sección: Cupones de Descuento */}
        <div className="mt-24 mb-8 flex items-center gap-3">
          <span className="text-[#e91e63] font-black text-3xl">%</span>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Cupones de Descuento</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cupones.map((cupon) => (
            <div key={cupon.id} className="transition-transform duration-500">
              <CuponCard {...cupon} />
            </div>
          ))}
        </div>
        
      </main>

      
      <Footer />
    </div>
  );
}