
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OrderCard from './components/Historial/OrderCard';

export default function Historial() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  const orderHistory = [
    {
      id: "#FL-99283",
      date: "17 de Abril, 2026",
      status: "En Proceso",
      total: 145.50,
      location: "Parque Las Peñas, Jilotepec",
      isCustom: true,
      
      cliente: "Jesus Martinez",
      palabraClave: "TULIPAN-8890",
      metodoPago: "MasterCard •••• 8812",
      items: [
        { name: "Tulipanes (Rosa)", qty: 12, price: 6.00, image: "https://www.floresyplantas.net/wp-content/uploads/flores-de-tulipanes-en-el-campo.webp" },
        { name: "Globo Metalizado (Amor)", qty: 1, price: 12.00, image: "https://i.pinimg.com/1200x/93/98/d1/9398d140ca0f64f93952cbbb9d2b5ccb.jpg" }
      ]
    },
    {
      id: "#FL-88102",
      date: "14 de Febrero, 2026",
      status: "Entregado",
      total: 359.96,
      location: "Tecnológico (TESJI)",
      isCustom: false,
      
      cliente: "Jesus Martinez",
      palabraClave: "ROSAS-1402",
      metodoPago: "Visa •••• 4242",
      items: [
        { name: "Rosas Rojas Premium", qty: 4, price: 89.99, image: "https://i.pinimg.com/1200x/16/79/7f/16797f142c9305cb0de9b60ad2e6c01c.jpg" }
      ]
    },
    {
      id: "#FL-77045",
      date: "10 de Mayo, 2025",
      status: "Entregado",
      total: 89.99,
      location: "Jardín Central, Jilotepec",
      isCustom: false,
     
      cliente: "Jesus Martinez",
      palabraClave: "MAMA-2025",
      metodoPago: "Efectivo (OXXO)",
      items: [
        { name: "Orquídea Blanca Elegance", qty: 1, price: 89.99, image: "https://m.media-amazon.com/images/I/71L6lBws5YL._AC_UF894,1000_QL80_.jpg" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-gray-900 flex flex-col">
      <Navbar isAuthPage={false} />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12">
        
        {/* Cabecera de la Página */}
        <div className="mb-10 animate-fade-in-up">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-[#e91e63] shadow-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Mis Compras</h1>
          </div>
          <p className="text-sm text-gray-400 font-medium ml-16">
            Aquí puedes consultar el estado de tus pedidos recientes y descargar tus recibos.
          </p>
        </div>

        {/* Lista de Pedidos */}
        {orderHistory.length > 0 ? (
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {orderHistory.map((order, index) => (
              <OrderCard key={index} order={order} />
            ))}
          </div>
        ) : (
          /* Estado Vacío (Por si el usuario es nuevo) */
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200 animate-fade-in">
            <div className="inline-flex p-5 rounded-full bg-gray-50 text-gray-300 mb-6">
               <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
               </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Aún no tienes compras</h2>
            <p className="text-gray-400 mb-8 max-w-xs mx-auto">Parece que aún no has realizado ningún pedido en nuestra boutique.</p>
            <Link 
              to="/catalogo" 
              className="bg-[#e91e63] text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-pink-700 transition-all shadow-lg shadow-pink-100 active:scale-95 inline-block"
            >
              Explorar Catálogo
            </Link>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}