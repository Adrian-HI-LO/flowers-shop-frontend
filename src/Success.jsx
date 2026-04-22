
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Success() {
  
  const [downloadingType, setDownloadingType] = useState(null); 
  const [codigoRastreo, setCodigoRastreo] = useState('');

  // Generar el código de seguimiento aleatorio
  useEffect(() => {
    window.scrollTo(0, 0);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCodigoRastreo(`${code.substring(0, 3)}-${code.substring(3, 7)}`);
  }, []);

  const pedido = {
    fechaCompra: "17 de Abril, 2026",
    fechaEntrega: "22 de Abril, 2026",
    lugarEntrega: "Jardín Central, Jilotepec",
    cliente: "Jesus Martinez",
    total: 359.96,
    metodoPago: "Visa •••• 4242",
    palabraClave: "ORQUIDEA-2026",
    productos: [{ name: "Rosas Rojas Premium", qty: 4, price: 89.99 }]
  };

  // Función unificada que recibe el tipo de descarga
  const handleDownload = async (type) => {
    const receiptElement = document.getElementById('receipt-content');
    const actionsElement = document.getElementById('receipt-actions');
    
    setDownloadingType(type);
    
    // Ocultamos los botones momentáneamente para la captura
    if (actionsElement) actionsElement.style.display = 'none';

    try {
      // 1. Capturamos la pantalla
      const canvas = await html2canvas(receiptElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');

      if (type === 'img') {
        // --- DESCARGA DE IMAGEN ---
        const imgLink = document.createElement('a');
        imgLink.href = imgData;
        imgLink.download = `Recibo-Floreria-${codigoRastreo}.png`;
        imgLink.click();
      } else if (type === 'pdf') {
        // --- DESCARGA DE PDF ---
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Recibo-Floreria-${codigoRastreo}.pdf`);
      }

    } catch (error) {
      console.error("Error en la descarga:", error);
      alert("Hubo un error al generar el archivo. Por favor, toma una captura de pantalla.");
    } finally {
      if (actionsElement) actionsElement.style.display = 'flex';
      setDownloadingType(null); // Reiniciamos el estado
    }
  };

  return (
    <div className="min-h-screen font-sans flex flex-col" style={{ backgroundColor: '#fafafa', color: '#111827' }}>
      <Navbar isAuthPage={false} />

      <main className="flex-1 flex items-center justify-center p-6 my-10">
        
        {/* Contenedor Exterior */}
        <div className="max-w-2xl w-full rounded-[3rem] shadow-2xl animate-fade-in-up">
          
          {/* Contenedor Interior */}
          <div 
            id="receipt-content" 
            className="w-full overflow-hidden"
            style={{ backgroundColor: '#ffffff', borderRadius: '3rem' }}
          >
            
            {/* Header */}
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
              <div className="rounded-[2rem] p-6 text-center" style={{ backgroundColor: '#fff5f7', border: '2px dashed #ffccd5' }}>
                <p className="text-[10px] font-black uppercase mb-2" style={{ color: '#e91e63', letterSpacing: '0.2em' }}>Seguridad para Entrega</p>
                <span className="text-4xl font-black" style={{ color: '#111827', letterSpacing: '0.1em' }}>{pedido.palabraClave}</span>
                <p className="text-[10px] mt-2 font-medium" style={{ color: '#6b7280' }}>Proporciona esta clave a nuestro repartidor al momento de recibir el pedido.</p>
              </div>

              {/* Detalles Logísticos */}
              <div className="grid grid-cols-2 gap-8 text-sm pb-8" style={{ borderBottom: '1px solid #f3f4f6' }}>
                <div className="flex flex-col gap-4">
                  <div>
                    <h4 className="text-[10px] font-black uppercase mb-1" style={{ color: '#9ca3af', letterSpacing: '0.1em' }}>Cliente:</h4>
                    <p className="font-bold text-lg" style={{ color: '#1f2937' }}>{pedido.cliente}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase mb-1" style={{ color: '#9ca3af', letterSpacing: '0.1em' }}>Punto de Entrega:</h4>
                    <p className="font-bold" style={{ color: '#1f2937' }}>{pedido.lugarEntrega}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 text-right">
                  <div>
                    <h4 className="text-[10px] font-black uppercase mb-1" style={{ color: '#9ca3af', letterSpacing: '0.1em' }}>Fecha de Compra:</h4>
                    <p className="font-bold" style={{ color: '#1f2937' }}>{pedido.fechaCompra}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase mb-1" style={{ color: '#9ca3af', letterSpacing: '0.1em' }}>Fecha Programada:</h4>
                    <p className="font-bold" style={{ color: '#1f2937' }}>{pedido.fechaEntrega}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase mb-1" style={{ color: '#9ca3af', letterSpacing: '0.1em' }}>Método de Pago:</h4>
                    <p className="font-bold" style={{ color: '#1f2937' }}>{pedido.metodoPago}</p>
                  </div>
                </div>
              </div>

              {/* Desglose de Productos */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: '#f9fafb' }}>
                <h4 className="text-[10px] font-black uppercase pb-2 mb-4" style={{ color: '#9ca3af', letterSpacing: '0.1em', borderBottom: '1px solid #e5e7eb' }}>Resumen de Productos</h4>
                
                <div className="flex flex-col gap-4">
                  {pedido.productos.map((prod, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <div className="flex flex-col">
                        <span className="font-bold" style={{ color: '#1f2937' }}>{prod.name}</span>
                        <span className="text-xs" style={{ color: '#6b7280' }}>Cantidad: {prod.qty} x ${prod.price}</span>
                      </div>
                      <span className="font-black" style={{ color: '#111827' }}>${(prod.qty * prod.price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4 pt-4" style={{ borderTop: '1px solid #e5e7eb' }}>
                  <span className="text-sm font-black uppercase" style={{ color: '#9ca3af', letterSpacing: '0.1em' }}>Total Pagado</span>
                  <span className="text-3xl font-black" style={{ color: '#e91e63' }}>${pedido.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Opciones de Descarga y Navegación */}
              <div id="receipt-actions" className="flex flex-col gap-4 pt-4">
                
                {/* Botones de Descarga */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Botón de Imagen */}
                  <button 
                    onClick={() => handleDownload('img')}
                    disabled={downloadingType !== null}
                    className="flex-1 py-4 rounded-2xl font-bold flex items-center justify-center transition-all shadow-md active:scale-95"
                    style={{ 
                      backgroundColor: downloadingType === 'img' ? '#f3f4f6' : '#e91e63', 
                      color: downloadingType === 'img' ? '#9ca3af' : '#ffffff' 
                    }}
                  >
                    {downloadingType === 'img' ? "Generando Imagen..." : "Descargar Imagen"}
                  </button>
                  
                  {/* Botón de PDF */}
                  <button 
                    onClick={() => handleDownload('pdf')}
                    disabled={downloadingType !== null}
                    className="flex-1 py-4 rounded-2xl font-bold flex items-center justify-center transition-all shadow-md active:scale-95"
                    style={{ 
                      backgroundColor: downloadingType === 'pdf' ? '#f3f4f6' : '#1f2937', 
                      color: downloadingType === 'pdf' ? '#9ca3af' : '#ffffff' 
                    }}
                  >
                    {downloadingType === 'pdf' ? "Generando PDF..." : "Descargar PDF"}
                  </button>
                </div>

                {/* Botón de Volver al Inicio */}
                <Link 
                  to="/home" 
                  className="w-full py-4 rounded-2xl font-bold text-center transition-all hover:bg-gray-200"
                  style={{ backgroundColor: '#f3f4f6', color: '#4b5563' }}
                >
                  Volver al Inicio
                </Link>
              </div>
              
              {/* Pie de Recibo */}
              <p className="text-center text-[9px] uppercase mt-2" style={{ color: '#9ca3af', letterSpacing: '0.1em' }}>
                Florería Elegante • Jilotepec • Gracias por su preferencia
              </p>

            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}