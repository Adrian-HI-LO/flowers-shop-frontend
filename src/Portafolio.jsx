
import React, { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx'; 
import ProjectCard from './components/Portafolio/ProjectCard.jsx';

export default function Portafolio() {
  const proyectos = [
    {
      title: "Lanzamiento de Producto",
      category: "Eventos",
      type: "eventos",
      image: "https://i.pinimg.com/736x/50/0d/d8/500dd84e898a54a41f2e61ddcb48b784.jpg"
      
    },
    {
      title: "Decoración de Oficina",
      category: "Corporativo",
      type: "corporativo",
      image: "https://i.pinimg.com/736x/5f/a9/7b/5fa97b0174bbbff1a8473fa2720c8ccd.jpg"
    },
    {
      title: "Conferencia Empresarial",
      category: "Eventos",
      type: "eventos",
      image: "https://i.pinimg.com/736x/0f/fb/63/0ffb63cd5e2532d7eb43aba910ef75e1.jpg"
    },
    {
      title: "Recepción Corporativa",
      category: "Premium",
      type: "premium",
      image: "https://i.pinimg.com/736x/b3/ea/a6/b3eaa659e8ee0434e0e9654b3d36a08b.jpg"
    }
  ];

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // 2. Agregamos 'flex flex-col' al contenedor principal
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      {/* Navbar con el estado activo */}
      <Navbar activePage="branding" />

      {/* 3. Agregamos 'flex-1' al main para empujar el Footer hacia abajo */}
      <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-8 pt-10 md:pt-16 pb-24 w-full">
        {/* Títulos */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Portafolio
          </h1>
          <p className="text-gray-500 text-base md:text-lg font-medium">
            Proyectos recientes de Florería Elegante
          </p>
        </div>

        {/* Cuadrícula de Proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {proyectos.map((proyecto, index) => (
            <ProjectCard key={index} {...proyecto} />
          ))}
        </div>
      </main>

      
      <Footer />
    </div>
  );
}