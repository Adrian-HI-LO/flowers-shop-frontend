
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartItem from './components/Carrito/CartItem';
import CustomCartItem from './components/Carrito/CustomCartItem';
import CartSummary from './components/Carrito/CartSummary';

export default function Carrito() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Rosas Rojas Premium",
      unitPrice: 89.99,
      quantity: 1,
      image: "https://i.pinimg.com/1200x/16/79/7f/16797f142c9305cb0de9b60ad2e6c01c.jpg",
      isCustom: false,
      
      nota: "Feliz aniversario mi amor, gracias por estos meses juntos. ¡Te amo!" 
    },
    {
      id: 1713380000,
      ocasion: "Pareja / Familia",
      tamaño: "Mediano",
      subtotal: 145.50,
      isCustom: true,
      configuracion: {
        "Rosas": { cantidad: 12, precio: 5, color: "Rojo" },
        "Tulipanes": { cantidad: 6, precio: 4, color: "Rosa" },
        "Globo Metalizado": { cantidad: 1, precio: 6 }
      },
      detallesExtra: {
        remitente: "Luis Martínez",
        destinatario: "Ana García",
        dedicatoriaFinal: "Gracias por estar siempre a mi lado. ¡Te amo!"
      }
    }
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotalGeneral = cartItems.reduce((acc, item) => {
    return acc + (item.isCustom ? item.subtotal : item.unitPrice * item.quantity);
  }, 0);

  const totalItems = cartItems.length;

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-gray-900 flex flex-col">
      <Navbar cartCount={totalItems} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Carrito de Compras</h1>
          <p className="text-sm text-gray-400 font-medium">
            {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'} en tu carrito
          </p>
        </div>

        {totalItems > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            <div className="lg:col-span-2">
              {cartItems.map(item => (
                item.isCustom ? (
                  <CustomCartItem 
                    key={item.id} 
                    item={item} 
                    onRemove={() => removeItem(item.id)} 
                  />
                ) : (
                  <CartItem 
                    key={item.id} 
                    item={item} 
                    onRemove={() => removeItem(item.id)} 
                  />
                )
              ))}
            </div>

            <div className="lg:col-span-1">
              <CartSummary subtotal={subtotalGeneral} />
            </div>

          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200 animate-fade-in">
            <div className="inline-flex p-5 rounded-full bg-gray-50 text-gray-300 mb-6">
               <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
               </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-400 mb-8 max-w-xs mx-auto">Parece que aún no has elegido el detalle ideal para esa persona especial.</p>
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