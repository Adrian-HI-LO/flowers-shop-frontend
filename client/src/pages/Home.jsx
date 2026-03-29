import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Gift, Truck, Star } from 'lucide-react';
import PackageCard from '../components/common/PackageCard';
import { packageService } from '../services/packageService';
import { cartService } from '../services/cartService';
import { useFadeInUp, useStaggerFadeIn, useFloatAnimation } from '../hooks/useGSAP';
import { useParallax } from '../hooks/useGSAPEffects';
import FloatingPetals from '../components/animations/FloatingPetals';
import HeroScrollAnimation from '../components/animations/HeroScrollAnimation';
import { useToast } from '../contexts/ToastContext';
import { GridSkeleton } from '../components/common/LoadingSkeleton';

const Home = () => {
  const [featuredPackages, setFeaturedPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const heroTextRef = useFadeInUp(0.2);
  const heroImageRef = useFloatAnimation(4);
  const featuresRef = useStaggerFadeIn(0.15);
  const parallaxRef = useParallax(-0.3);

  useEffect(() => {
    loadFeaturedPackages();
  }, []);

  const loadFeaturedPackages = async () => {
    try {
      const response = await packageService.getFeatured();
      setFeaturedPackages(response.data);
    } catch (error) {
      console.error('Error loading featured packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (pkg) => {
    cartService.addItem({
      id: pkg.id,
      type: 'package',
      name: pkg.name,
      price: pkg.price,
      imageUrl: pkg.imageUrl,
      quantity: 1,
    });
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success(`${pkg.name} agregado al carrito`);
  };

  return (
    <div>
      <FloatingPetals count={10} />

      <HeroScrollAnimation />

      <section className="relative bg-linear-to-br from-primary-50 via-white to-gold-50 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div ref={heroTextRef}>
              <h1 className="title-elegant mb-4 sm:mb-6 text-4xl sm:text-5xl lg:text-6xl">
                Momentos Especiales
                <span className="block text-primary-500">Regalos Únicos</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                Descubre nuestros arreglos florales y paquetes personalizados.
                Hacemos que cada entrega sea una experiencia inolvidable.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/packages" className="btn btn-primary text-base sm:text-lg justify-center">
                  Ver Paquetes
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link to="/custom" className="btn btn-gold text-base sm:text-lg justify-center">
                  Personalizar Regalo
                </Link>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div ref={parallaxRef} className="absolute -inset-4 sm:-inset-8 bg-gradient-to-br from-primary-200/30 to-gold-200/30 rounded-full blur-3xl"></div>
              <div ref={heroImageRef} className="aspect-square rounded-2xl bg-gradient-to-br from-primary-100 to-gold-100 flex items-center justify-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl shadow-elegant-lg relative z-10">
                🌹
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center p-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Heart className="text-primary-500" size={24} />
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">Flores Frescas</h3>
              <p className="text-gray-600 text-sm">Calidad premium garantizada</p>
            </div>

            <div className="text-center p-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Gift className="text-gold-600" size={24} />
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">Personalización</h3>
              <p className="text-gray-600 text-sm">Mensajes y fotos personalizadas</p>
            </div>

            <div className="text-center p-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Truck className="text-primary-500" size={24} />
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">Envío Rápido</h3>
              <p className="text-gray-600 text-sm">Entregas el mismo día</p>
            </div>

            <div className="text-center p-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Star className="text-gold-600" size={24} />
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">Calidad Premium</h3>
              <p className="text-gray-600 text-sm">Los mejores productos</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="subtitle-elegant mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl">Paquetes Destacados</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Nuestras combinaciones más populares, listas para sorprender
            </p>
          </div>

          {loading ? (
            <GridSkeleton count={3} type="package" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  package={pkg}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-8 sm:mt-12">
            <Link to="/packages" className="btn btn-primary text-base sm:text-lg inline-flex items-center">
              Ver Todos los Paquetes
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary-500 to-gold-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            ¿Quieres Algo Único?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto">
            Crea tu propio paquete personalizado eligiendo tus productos favoritos
          </p>
          <Link to="/custom" className="btn bg-white text-primary-500 hover:bg-gray-100 text-base sm:text-lg inline-flex items-center">
            Crear Paquete Personalizado
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
