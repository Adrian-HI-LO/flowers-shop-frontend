
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PrintableReceipt from './PrintableReceipt'; 

export default function OrderCard({ order }) {
  const [downloadingType, setDownloadingType] = useState(null);
  
  // Generamos un ID único para el DOM para que no se confunda si hay muchas tarjetas
  const domId = `receipt-template-${order.id.replace('#', '')}`;

  const statusStyles = {
    "En Proceso": "bg-blue-50 text-blue-600 border-blue-100",
    "Entregado": "bg-green-50 text-green-600 border-green-100",
    "Cancelado": "bg-gray-50 text-gray-500 border-gray-200"
  };

  const statusIcons = {
    "En Proceso": (
      <svg className="w-4 h-4 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
    ),
    "Entregado": (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
    ),
    "Cancelado": (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
    )
  };

  const handleDownload = async (type) => {
    const receiptElement = document.getElementById(domId);
    setDownloadingType(type);

    try {
      const canvas = await html2canvas(receiptElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');

      if (type === 'img') {
        const imgLink = document.createElement('a');
        imgLink.href = imgData;
        imgLink.download = `Recibo-${order.id}.png`;
        imgLink.click();
      } else if (type === 'pdf') {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Recibo-${order.id}.pdf`);
      }
    } catch (error) {
      console.error("Error en la descarga:", error);
      alert("Hubo un error al generar el recibo.");
    } finally {
      setDownloadingType(null);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all group relative">
      
      {/* insertamos la plantilla oculta fuera de la pantalla */}
      <div className="absolute -left-[9999px] top-0 pointer-events-none">
        <PrintableReceipt order={order} domId={domId} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50 pb-6 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-lg font-black text-gray-900 tracking-tight">Orden {order.id}</h3>
            {order.isCustom && (
              <span className="px-2 py-0.5 rounded-md bg-pink-50 border border-pink-100 text-[#e91e63] text-[9px] font-black uppercase tracking-widest">
                Diseño Exclusivo
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 font-medium">Realizado el {order.date}</p>
        </div>
        
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest w-fit ${statusStyles[order.status]}`}>
          {statusIcons[order.status]}
          {order.status}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-8">
        
        {/* Lista de Productos */}
        <div className="flex-1 space-y-3">
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Artículos del pedido</h4>
          {order.items.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-50 overflow-hidden shrink-0 border border-gray-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-500">Cantidad: {item.qty}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen de Entrega y Acciones */}
        <div className="md:w-64 flex flex-col justify-between bg-gray-50 rounded-2xl p-5 border border-gray-100">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Pagado</p>
            <p className="text-2xl font-black text-[#e91e63] mb-4">${order.total.toFixed(2)}</p>
            
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Destino</p>
            <p className="text-xs font-bold text-gray-800 truncate" title={order.location}>{order.location}</p>
          </div>

          {/* Botones de Descarga */}
          <div className="mt-6 space-y-2">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-center">Descargar Recibo</p>
            <div className="flex gap-2">
              <button 
                onClick={() => handleDownload('img')}
                disabled={downloadingType !== null}
                className="flex-1 bg-white border border-gray-200 text-[#e91e63] py-2.5 rounded-xl text-xs font-bold hover:bg-pink-50 transition-colors shadow-sm active:scale-95 flex justify-center items-center"
                title="Descargar Imagen"
              >
                {downloadingType === 'img' ? '...' : 'IMG'}
              </button>
              <button 
                onClick={() => handleDownload('pdf')}
                disabled={downloadingType !== null}
                className="flex-1 bg-[#1f2937] border border-[#1f2937] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-black transition-colors shadow-sm active:scale-95 flex justify-center items-center"
                title="Descargar PDF"
              >
                {downloadingType === 'pdf' ? '...' : 'PDF'}
              </button>
            </div>

            {order.status === "Entregado" && (
              <Link to="/catalogo" className="flex items-center justify-center w-full bg-white border border-gray-200 text-gray-700 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors shadow-sm active:scale-95 mt-2">
                Volver a Comprar
              </Link>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}