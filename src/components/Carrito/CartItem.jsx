
import React from 'react';

export default function CartItem({ item, onRemove }) {
  
  const { name, quantity, image, unitPrice, nota } = item;

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 flex flex-col gap-4 mb-4 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
      
      {/* Contenido Principal */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-sm">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-400 font-bold mt-1">Cantidad: {quantity}</p>
        </div>

        <div className="text-right flex flex-col items-end justify-between h-24">
          <button 
            onClick={onRemove}
            className="text-gray-300 hover:text-red-500 transition-colors p-2"
            title="Eliminar producto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <div>
            <span className="text-xl font-black text-[#e91e63] block leading-none">
              ${(unitPrice * quantity).toFixed(2)}
            </span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              ${unitPrice} c/u
            </span>
          </div>
        </div>
      </div>

      {/* Bloque de Nota Personalizada Condicional */}
      {nota && (
        <div className="mt-2 p-4 bg-pink-50/50 rounded-2xl border border-pink-100/50 flex gap-3 items-start">
          <div className="mt-0.5">
            <svg className="w-4 h-4 text-[#e91e63]/60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM12 14h-2v-2h2v2zm0-4h-2V6h2v4z"/>
            </svg>
          </div>
          <div>
            <p className="text-[9px] font-black text-[#e91e63] uppercase tracking-widest mb-1">
              Mensaje en tarjeta
            </p>
            <p className="text-xs text-gray-600 font-medium italic leading-relaxed">
              "{nota}"
            </p>
          </div>
        </div>
      )}

    </div>
  );
}