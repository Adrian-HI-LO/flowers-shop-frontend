
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import StepProgress from './components/Personalizar/StepProgress';
import StepParaQuien from './components/Personalizar/StepParaQuien';
import StepFlores from './components/Personalizar/StepFlores';
import StepColores from './components/Personalizar/StepColores';
import StepExtras from './components/Personalizar/StepExtras';
import StepDetallesFinales from './components/Personalizar/StepDetallesFinales';
import SummaryCart from './components/Personalizar/SummaryCart';

export default function Personalizar() {
  // === ESTADOS ===
  const [currentStep, setCurrentStep] = useState(0);
  const [ocasion, setOcasion] = useState(null);
  const [modo, setModo] = useState('ramos');
  const [carrito, setCarrito] = useState({});

  
  const [detallesExtra, setDetallesExtra] = useState({
    nombreEmpresa: "",     
    esloganEmpresa: "",
    logoEmpresa: null,
    textoListon: "",
    colorPapel: "",
    mensajeCaja: "",
    estiloGlobo: "",       
    ocasionGlobo: "",      
    remitente: "",         
    destinatario: "",      
    dedicatoriaFinal: ""
  });

  // === CONFIGURACIÓN DE REQUISITOS ===
  const floresQueNecesitanColor = ["Rosas", "Tulipanes", "Orquídeas"];
  const nombresFlores = ["Rosas", "Tulipanes", "Girasoles", "Orquídeas"];

  // === EFECTO PARA ANIMACIONES ===
  useEffect(() => {
    // Scroll al top cuando cambia de paso para mejor UX en móviles
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-12');
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [currentStep]);

  // === LÓGICA DEL CARRITO Y DETALLES ===
  const updateCantidad = (nombre, precio, cambio) => {
    setCarrito((prev) => {
      const cantidadActual = prev[nombre]?.cantidad || 0;
      const nuevaCantidad = cantidadActual + cambio;

      if (nuevaCantidad <= 0) {
        const nuevoCarrito = { ...prev };
        delete nuevoCarrito[nombre];
        return nuevoCarrito;
      }

      return {
        ...prev,
        [nombre]: { 
          cantidad: nuevaCantidad, 
          precio: precio, 
          color: prev[nombre]?.color || null 
        },
      };
    });
  };

  const updateColor = (nombre, color) => {
    setCarrito(prev => ({
      ...prev,
      [nombre]: { ...prev[nombre], color: color }
    }));
  };

  const updateDetalle = (campo, valor) => {
    setDetallesExtra(prev => ({ ...prev, [campo]: valor }));
  };

  // === CÁLCULOS DINÁMICOS ===
  const total = Object.values(carrito).reduce((acc, item) => acc + item.cantidad * item.precio, 0);

  const totalFlores = Object.entries(carrito).reduce((acc, [nombre, datos]) => {
    return nombresFlores.includes(nombre) ? acc + datos.cantidad : acc;
  }, 0);

  let tamañoCalculado = "";
  if (totalFlores > 0 && totalFlores <= 10) tamañoCalculado = "Chico";
  else if (totalFlores > 10 && totalFlores <= 24) tamañoCalculado = "Mediano";
  else if (totalFlores > 24) tamañoCalculado = "Grande";

  // === VALIDACIÓN ===
  const validarColores = () => {
    const floresSinColor = Object.keys(carrito).filter(nombre => 
      floresQueNecesitanColor.includes(nombre) && !carrito[nombre].color
    );
    return floresSinColor.length === 0;
  };

  const isNextDisabled = 
    (currentStep === 0 && !ocasion) || 
    (currentStep === 1 && totalFlores === 0) ||
    (currentStep === 2 && !validarColores());

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep((prev) => prev + 1);
    else if (currentStep === 4) {
      console.log("Pedido Finalizado:", { carrito, detallesExtra, total });
      alert("¡Gracias por tu compra! Tu pedido ha sido registrado.");
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const getButtonText = () => {
    if (currentStep === 0 && !ocasion) return 'Selecciona una opción';
    if (currentStep === 1 && totalFlores === 0) return 'Elige al menos una flor';
    if (currentStep === 2 && !validarColores()) return 'Elige los colores';
    if (currentStep === 4) return 'Confirmar Pedido';
    return 'Siguiente';
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      <Navbar />
      
      {/* Contenedor principal flex-1 empuja el footer hacia abajo si el contenido es corto */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <div className="text-center mb-8 reveal-on-scroll opacity-0 translate-y-12 transition-all duration-700">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Personaliza tu <span className="text-[#e91e63]">Regalo</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
            Sigue los pasos para crear un detalle inolvidable diseñado por ti.
          </p>
        </div>

        <div className="reveal-on-scroll opacity-0 translate-y-12 transition-all duration-700 delay-100">
          <StepProgress currentStep={currentStep} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-20">
          
          <div className="lg:col-span-8 reveal-on-scroll opacity-0 translate-y-12 transition-all duration-700 delay-200">
            
            {currentStep === 0 && (
              <StepParaQuien onSelect={(val) => setOcasion(val)} selected={ocasion} />
            )}

            {currentStep === 1 && (
              <StepFlores carrito={carrito} onUpdate={updateCantidad} modo={modo} setModo={setModo} />
            )}

            {currentStep === 2 && (
              <StepColores carrito={carrito} onUpdateColor={updateColor} />
            )}

            {currentStep === 3 && (
              <StepExtras ocasion={ocasion} modo={modo} carrito={carrito} onUpdate={updateCantidad} />
            )}

            {currentStep === 4 && (
              <StepDetallesFinales 
                carrito={carrito} 
                ocasion={ocasion}
                detalles={detallesExtra}
                onUpdate={updateDetalle}
              />
            )}

            <div className="mt-16 flex justify-between items-center border-t border-gray-50 pt-8">
              {currentStep > 0 ? (
                <button 
                  onClick={prevStep} 
                  className="text-gray-400 font-bold hover:text-[#e91e63] transition-all flex items-center gap-2 group"
                >
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> 
                  Anterior
                </button>
              ) : <div />}
              
              <button 
                onClick={nextStep}
                disabled={isNextDisabled}
                className={`px-10 py-4 font-bold rounded-full shadow-lg transition-all flex items-center gap-3 active:scale-95 group ${
                  isNextDisabled 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none border border-gray-200' 
                    : 'bg-[#e91e63] text-white hover:bg-pink-700 shadow-pink-100'
                }`}
              >
                {getButtonText()}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 reveal-on-scroll opacity-0 translate-y-12 transition-all duration-700 delay-300">
            <SummaryCart 
              ocasion={ocasion} 
              carrito={carrito} 
              total={total} 
              tamaño={tamañoCalculado} 
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}