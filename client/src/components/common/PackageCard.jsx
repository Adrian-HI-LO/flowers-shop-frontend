import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import { authService } from '../../services/authService';
import Modal from './Modal';
import LazyImage from './LazyImage';

const PackageCard = ({ package: pkg, onAddToCart }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!authService.isAuthenticated()) {
      setShowAuthModal(true);
      return;
    }
    if (onAddToCart) {
      onAddToCart(pkg);
    }
  };

  return (
    <div className="card overflow-hidden group relative">
      {pkg.isFeatured && (
        <div className="absolute top-4 right-4 z-10 bg-gold-500 text-dark-900 px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
          <Star size={14} fill="currentColor" />
          <span>Destacado</span>
        </div>
      )}

      <Link to={`/packages/${pkg.slug}`} className="block">
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-gold-50 aspect-[4/3]">
          {pkg.imageUrl ? (
            <LazyImage
              src={pkg.imageUrl}
              alt={pkg.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              fallback="🎁"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              🎁
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <Link to={`/packages/${pkg.slug}`}>
          <h3 className="font-serif text-2xl font-bold text-dark-900 hover:text-primary-500 transition-colors mb-2">
            {pkg.name}
          </h3>
        </Link>

        <p className="text-gray-600 mb-4">
          {pkg.description}
        </p>

        {pkg.items && pkg.items.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-dark-700 mb-2">Incluye:</p>
            <ul className="space-y-1">
              {pkg.items.map((item, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  <span>{item.product.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 pt-4 border-t space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Precio total</p>
            <span className="text-3xl font-bold text-primary-500">
              ${pkg.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="btn btn-primary w-full flex items-center justify-center space-x-2"
          >
            <ShoppingCart size={18} />
            <span>Agregar</span>
          </button>
        </div>
      </div>

      <Modal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="Inicia Sesión"
        type="warning"
      >
        <div className="text-center">
          <p className="text-gray-700 mb-6">
            Para agregar paquetes al carrito necesitas iniciar sesión o crear una cuenta.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                setShowAuthModal(false);
                navigate('/login', { state: { from: window.location.pathname } });
              }}
              className="btn btn-primary"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => {
                setShowAuthModal(false);
                navigate('/register', { state: { from: window.location.pathname } });
              }}
              className="btn btn-gold"
            >
              Crear Cuenta
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PackageCard;
