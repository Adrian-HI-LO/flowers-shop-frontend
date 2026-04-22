
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PaymentForm from './components/Checkout/PaymentForm';
import DeliveryDatePicker from './components/Checkout/DeliveryDatePicker'; 

export default function Checkout() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

 
    const handleFinalizePurchase = () => {
    setIsProcessing(true);
    
    
    setTimeout(() => {
        setIsProcessing(false);
        
        navigate('/success'); 
    }, 2500);
    };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-gray-900 flex flex-col">
      <Navbar isAuthPage={false} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Lado Izquierdo: Formularios de Proceso */}
          <div className="lg:w-2/3 space-y-8">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest mb-4 hover:text-[#e91e63] transition-colors group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span> 
              Volver al carrito
            </button>
            
            <h1 className="text-4xl font-black text-gray-900 mb-10 tracking-tight">
              Finalizar <span className="text-[#e91e63]">Compra</span>
            </h1>

            
            <PaymentForm />

           
            <DeliveryDatePicker />
          </div>

          {/* Lado Derecho: Resumen y Botón Final sticky */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl sticky top-28">
              <h2 className="text-xl font-black text-gray-900 mb-6">Tu Pedido</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="font-bold">$359.96</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Envío (Jilotepec)</span>
                  <span className="text-green-500 font-bold uppercase text-[10px] tracking-widest">Gratis</span>
                </div>
                <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900">Total a pagar</span>
                  <span className="text-3xl font-black text-[#e91e63] tracking-tighter">$359.96</span>
                </div>
              </div>

              <button 
                onClick={handleFinalizePurchase}
                disabled={isProcessing}
                className={`w-full py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all shadow-lg flex items-center justify-center gap-3 ${
                  isProcessing 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#e91e63] text-white hover:bg-pink-700 shadow-pink-100 active:scale-95'
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </>
                ) : "Confirmar y Pagar"}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-[10px] font-bold uppercase tracking-widest">Pago 100% Seguro</span>
              </div>

              <p className="text-[9px] text-gray-400 text-center mt-4 leading-relaxed px-2">
                Al finalizar, aceptas nuestros <span className="underline cursor-pointer">Términos</span>. 
                Tu información está protegida por seguridad SSL.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}