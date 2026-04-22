
import React from 'react';

export default function PrintableReceipt({ order, domId }) {
  // Aseguramos valores por defecto si no vienen en la orden
  const cliente = order.cliente || "Cliente Florería Elegante";
  const palabraClave = order.palabraClave || "NO-DISPONIBLE";
  const metodoPago = order.metodoPago || "Tarjeta •••• ****";
  
  // Generamos un código de rastreo aleatorio simulado si no lo tiene
  const codigoRastreo = order.id.replace('#', '').substring(0, 8).toUpperCase();

  return (
    <div 
      id={domId}
      className="w-[700px] overflow-hidden" 
      style={{ backgroundColor: '#ffffff', borderRadius: '3rem', color: '#111827' }}
    >
      {/* Header  */}
      <div className="p-10 text-center relative" style={{ backgroundColor: '#e91e63', color: '#ffffff' }}>
        <div className="flex flex-col items-center justify-center">
          {/* Logo de la Empresa */}
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: '#ffffff' }}>
            <svg className="w-8 h-8" style={{ color: '#e91e63' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22C12 22 4 16.14 4 10.5C4 7.46 6.46 5 9.5 5C11.11 5 12 5.8 12 5.8C12 5.8 12.89 5 14.5 5C17.54 5 20 7.46 20 10.5C20 16.14 12 22 12 22Z" />
            </svg>
          </div>
          {/* Nombre de la Empresa */}
          <h1 className="text-3xl font-black uppercase mb-1" style={{ letterSpacing: '0.15em' }}>Florería Elegante</h1>
          <p className="text-xs uppercase font-bold" style={{ color: 'rgba(255,255,255,0.8)', letterSpacing: '0.1em' }}>Boutique Floral & Branding</p>
        </div>
      </div>

      <div className="p-8 md:p-12" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        {/* Bloque de Identificación (Código Aleatorio) */}
        <div className="flex flex-col items-center justify-center pb-8" style={{ borderBottom: '1px solid #f3f4f6' }}>
          <p className="text-[10px] font-black uppercase mb-2" style={{ color: '#9ca3af', letterSpacing: '0.1em' }}>Código de Seguimiento</p>
          <div className="flex items-center gap-4">
            {/* Código de Barras Simulado */}
            <svg className="h-10" style={{ color: '#1f2937' }} viewBox="0 0 100 40" preserveAspectRatio="none">
              <rect x="0" y="0" width="4" height="40" fill="currentColor"/>
              <rect x="8" y="0" width="2" height="40" fill="currentColor"/>
              <rect x="14" y="0" width="8" height="40" fill="currentColor"/>
              <rect x="26" y="0" width="2" height="40" fill="currentColor"/>
              <rect x="32" y="0" width="6" height="40" fill="currentColor"/>
              <rect x="42" y="0" width="2" height="40" fill="currentColor"/>
              <rect x="48" y="0" width="4" height="40" fill="currentColor"/>
              <rect x="56" y="0" width="8" height="40" fill="currentColor"/>
              <rect x="68" y="0" width="2" height="40" fill="currentColor"/>
              <rect x="74" y="0" width="6" height="40" fill="currentColor"/>
              <rect x="84" y="0" width="4" height="40" fill="currentColor"/>
              <rect x="92" y="0" width="8" height="40" fill="currentColor"/>
            </svg>
            <span className="text-2xl font-mono font-bold" style={{ color: '#1f2937', letterSpacing: '0.1em' }}>{codigoRastreo}</span>
          </div>
        </div>

        {/* Palabra Clave */}
        {order.status !== "Cancelado" && (
          <div className="rounded-[2rem] p-6 text-center" style={{ backgroundColor: '#fff5f7', border: '2px dashed #ffccd5' }}>
            <p className="text-[10px] font-black uppercase mb-2" style={{ color: '#e91e63', letterSpacing: '0.2em' }}>Seguridad para Entrega</p>
            <span className="text-4xl font-black" style={{ color: '#111827', letterSpacing: '0.1em' }}>{palabraClave}</span>
            <p className="text-[10px] mt-2 font-medium" style={{ color: '#6b7280' }}>Proporciona esta clave a nuestro repartidor al momento de recibir el pedido.</p>
          </div>
        )}

        {/* Detalles Logísticos */}
        <div className="grid grid-cols-2 gap-8 text-sm pb-8" style={{ borderBottom: '1px solid #f3f4f6' }}>
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="text-[10px] font-black uppercase mb-1" style={{ color: '#9ca3af', letterSpacing: '0.1em' }}>Cliente:</h4>
              <p className="font-bold text-lg" style={{ color: '#1f2937' }}>{cliente}</p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase mb-1" style={{ color: '#9ca3af', letterSpacing: '0.1em' }}>Punto de Entrega:</h4>
              <p className="font-bold" style={{ color: '#1f2937' }}>{order.location}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 text-right">
            <div>
              <h4 className="text-[10px] font-black uppercase mb-1" style={{ color: '#9ca3af', letterSpacing: '0.1em' }}>Orden N°:</h4>
              <p className="font-bold" style={{ color: '#1f2937' }}>{order.id}</p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase mb-1" style={{ color: '#9ca3af', letterSpacing: '0.1em' }}>Fecha de Registro:</h4>
              <p className="font-bold" style={{ color: '#1f2937' }}>{order.date}</p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase mb-1" style={{ color: '#9ca3af', letterSpacing: '0.1em' }}>Método de Pago:</h4>
              <p className="font-bold" style={{ color: '#1f2937' }}>{metodoPago}</p>
            </div>
          </div>
        </div>

        {/* Desglose de Productos */}
        <div className="rounded-2xl p-6" style={{ backgroundColor: '#f9fafb', border: order.isCustom ? '1px solid #ffccd5' : 'none' }}>
          
          {order.isCustom && (
            <div className="mb-4 inline-block px-3 py-1 rounded-full" style={{ backgroundColor: '#fff5f7', border: '1px solid #ffccd5' }}>
              <p className="text-[10px] font-black uppercase" style={{ color: '#e91e63', letterSpacing: '0.1em' }}>✨ Diseño Exclusivo</p>
            </div>
          )}

          <h4 className="text-[10px] font-black uppercase pb-2 mb-4" style={{ color: '#9ca3af', letterSpacing: '0.1em', borderBottom: '1px solid #e5e7eb' }}>
            Resumen de Productos
          </h4>
          
          <div className="flex flex-col gap-4">
            {order.items.map((prod, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <div className="flex flex-col">
                  <span className="font-bold" style={{ color: '#1f2937' }}>{prod.name}</span>
                  <span className="text-xs" style={{ color: '#6b7280' }}>Cantidad: {prod.qty}</span>
                </div>
                <span className="font-black" style={{ color: '#111827' }}>
                  {/* Si no hay precio por item simulado. */}
                  {prod.price ? `$${(prod.qty * prod.price).toFixed(2)}` : '---'}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4 pt-4" style={{ borderTop: '1px solid #e5e7eb' }}>
            <span className="text-sm font-black uppercase" style={{ color: '#9ca3af', letterSpacing: '0.1em' }}>Total Pagado</span>
            <span className="text-3xl font-black" style={{ color: '#e91e63' }}>${order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Pie de Recibo */}
        <p className="text-center text-[9px] uppercase mt-2" style={{ color: '#9ca3af', letterSpacing: '0.1em' }}>
          Florería Elegante • Jilotepec • Estado: {order.status}
        </p>

      </div>
    </div>
  );
}