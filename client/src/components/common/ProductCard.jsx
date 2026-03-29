import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { favoritesService } from '../../services/favoritesService';
import { authService } from '../../services/authService';
import { useScrollReveal } from '../../hooks/useGSAP';
import Modal from './Modal';
import LazyImage from './LazyImage';

const ProductCard = ({ product, onAddToCart }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();
  const cardRef = useScrollReveal({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    duration: 0.6,
  });

  useEffect(() => {
    setIsFavorite(favoritesService.isFavorite(product.id));
  }, [product.id]);

  const handleAddToCart = () => {
    if (!authService.isAuthenticated()) {
      setShowAuthModal(true);
      return;
    }
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    favoritesService.toggleFavorite(product.id);
    setIsFavorite(!isFavorite);
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  return (
    <div ref={cardRef} className="card overflow-hidden group">
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative overflow-hidden bg-gray-100 aspect-square">
          {product.imageUrl ? (
            <LazyImage
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              fallback="🌸"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              🌸
            </div>
          )}

          <button
            onClick={handleToggleFavorite}
            className="absolute top-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-50 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Heart
              size={20}
              className={isFavorite ? 'fill-primary-500 text-primary-500' : 'text-gray-400'}
            />
          </button>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg text-dark-900 hover:text-primary-500 transition-colors mb-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-500">
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            className="btn btn-primary py-2 px-4 flex items-center space-x-2"
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
            Para agregar productos al carrito necesitas iniciar sesión o crear una cuenta.
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

export default ProductCard;
