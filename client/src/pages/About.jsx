import { Heart, Award, Truck, Shield } from 'lucide-react';
import { useFadeInUp, useScrollReveal } from '../hooks/useGSAP';
import RoseScrollAnimation from '../components/animations/RoseScrollAnimation';
import FloatingPetals from '../components/animations/FloatingPetals';

const About = () => {
  const heroRef = useFadeInUp(0.2);
  const missionRef = useScrollReveal({ from: { opacity: 0, x: -50 }, to: { opacity: 1, x: 0 } });
  const valuesRef = useScrollReveal({ from: { opacity: 0, y: 50 }, to: { opacity: 1, y: 0 } });
  const teamRef = useScrollReveal({ from: { opacity: 0, y: 50 }, to: { opacity: 1, y: 0 } });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50">

      <FloatingPetals count={7} />
      <div className="bg-gradient-to-br from-primary-500 to-gold-500 text-white py-20">
        <div ref={heroRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="title-elegant text-white mb-6">Nuestra Historia</h1>
          <p className="text-xl leading-relaxed">
            Desde 2020, FlowerShop ha sido el destino favorito para regalos especiales,
            combinando flores frescas, chocolates premium y detalles únicos para celebrar
            cada momento importante de tu vida.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div ref={missionRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="subtitle-elegant mb-6">Nuestra Misión</h2>
            <p className="text-lg text-gray-700">
              En desarrollo
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary-100 to-gold-100 rounded-2xl p-8 h-64 flex items-center justify-center">
            <span className="text-8xl">🌸</span>
          </div>
        </div>

        <div ref={valuesRef} className="mb-20">
          <h2 className="subtitle-elegant text-center mb-12">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card p-6 text-center bg-pink-50">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={32} className="text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Pasión</h3>
              <p className="text-gray-600 text-sm">
                Amor por lo que hacemos, cuidando cada detalle con dedicación
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Calidad</h3>
              <p className="text-gray-600 text-sm">
                Solo productos premium de proveedores certificados
              </p>
            </div>

            <div className="card p-6 text-center bg-pink-50">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck size={32} className="text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Puntualidad</h3>
              <p className="text-gray-600 text-sm">
                Entregas a tiempo para tus momentos especiales
              </p>
            </div>

            <div className="card p-6 text-center bg-pink-50">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Confianza</h3>
              <p className="text-gray-600 text-sm">
                Seguridad en cada transacción y satisfacción garantizada
              </p>
            </div>
          </div>
        </div>

        <div ref={teamRef} className="text-center">
          <h2 className="subtitle-elegant mb-6">Nuestro Equipo</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
            Desarrollado con pasión y dedicación para crear experiencias memorables.
          </p>

          <div className="flex justify-center">
            <div className="card p-6 max-w-sm">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-4xl">
                👨‍💻
              </div>
              <h3 className="font-bold text-lg mb-1">Adrian Monroy</h3>
              <p className="text-primary-500 text-sm mb-2">Desarrollador</p>
              <p className="text-gray-600 text-sm">
                Creador y desarrollador de FlowerShop
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center bg-gradient-to-r from-primary-500 to-gold-500 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-serif font-bold mb-4">
            ¿Listo para crear momentos especiales?
          </h2>
          <p className="text-xl mb-8">
            Explora nuestros paquetes y encuentra el regalo perfecto
          </p>
          <a href="/packages" className="btn btn-gold text-lg">
            Ver Paquetes
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
