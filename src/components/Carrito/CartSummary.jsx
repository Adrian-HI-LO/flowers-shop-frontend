
import React from 'react';
import { Link } from 'react-router-dom';

export default function CartSummary({ subtotal }) {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm sticky top-28">
      <h2 className="text-2xl font-black text-gray-900 mb-8">Resumen</h2>
      
      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-sm font-medium text-gray-500">
          <span>Subtotal</span>
          {/* Mostramos el subtotal dinámico con 2 decimales */}
          <span className="text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm font-medium">
          <span className="text-gray-500">Envío</span>
          <span className="text-green-500 font-bold uppercase tracking-widest text-[10px]">Gratis</span>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100 mb-10 flex justify-between items-center">
        <span className="text-lg font-bold text-gray-900">Total</span>
        {/* El total refleja el subtotal  */}
        <span className="text-4xl font-black text-[#e91e63] tracking-tighter">
          ${subtotal.toFixed(2)}
        </span>
      </div>

      {/* Botones de Acción */}
    <div className="space-y-3 mb-10">
    
    <Link to="/checkout" className="block w-full">
        <button className="w-full bg-[#e91e63] text-white py-4 rounded-xl font-bold hover:bg-pink-700 transition-all shadow-lg shadow-pink-100 active:scale-95">
        Proceder al Checkout
        </button>
    </Link>

    {/* Link para navegar al catálogo */}
    <Link 
        to="/catalogo" 
        className="w-full bg-white border border-gray-200 text-gray-500 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all flex justify-center items-center active:scale-95"
    >
        Continuar comprando
    </Link>
    </div>

      {/* Código de Promoción */}
      <div>
        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">
          Código de promoción
        </label>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Ingresa tu código" 
            className="flex-1 bg-gray-50 border-none rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-pink-100 transition-all"
          />
          <button className="bg-[#1a1a1a] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase hover:bg-black transition-colors">
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
}