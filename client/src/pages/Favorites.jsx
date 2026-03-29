import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { favoritesService } from '../services/favoritesService';
import { cartService } from '../services/cartService';
import { productService } from '../services/productService';
import Modal from '../components/common/Modal';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({ type: 'success', title: '', message: '' });

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const favoriteIds = favoritesService.getFavorites();

      const allProducts = await productService.getAll();
      const favoriteProducts = allProducts.data.filter(p => favoriteIds.includes(p.id));

      setFavorites(favoriteIds);
      setProducts(favoriteProducts);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = (productId) => {
    favoritesService.removeFavorite(productId);
    window.dispatchEvent(new Event('favoritesUpdated'));
    loadFavorites();
  };

  const handleAddToCart = (product) => {
    cartService.addItem({
      id: product.id,
      type: 'product',
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
    window.dispatchEvent(new Event('cartUpdated'));
    setModalConfig({
      type: 'success',
      title: '¡Agregado al Carrito!',
      message: `${product.name} ha sido agregado a tu carrito`
    });
    setShowModal(true);
  };

  const handleClearAll = () => {
    favoritesService.clearFavorites();
    window.dispatchEvent(new Event('favoritesUpdated'));
    loadFavorites();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando favoritos...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-primary-50 flex items-center justify-center">
        <div className="text-center py-12">
          <Heart size={80} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-3xl font-serif font-bold text-gray-700 mb-4">
            No tienes favoritos aún
          </h2>
          <p className="text-gray-600 mb-8">
            Guarda tus productos favoritos para encontrarlos fácilmente
          </p>
          <Link to="/categories" className="btn btn-primary text-lg">
            Explorar Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="title-elegant">Mis Favoritos</h1>
            <p className="text-gray-600 mt-2">
              {products.length} {products.length === 1 ? 'producto' : 'productos'} guardado{products.length !== 1 ? 's' : ''}
            </p>
          </div>
          {products.length > 0 && (
            <button
              onClick={handleClearAll}
              className="btn btn-outline inline-flex items-center"
            >
              <Trash2 size={18} className="mr-2" />
              Limpiar Todo
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card overflow-hidden group">
              <div className="relative overflow-hidden bg-gray-100 aspect-square">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    🌸
                  </div>
                )}

                <button
                  onClick={() => handleRemoveFavorite(product.id)}
                  className="absolute top-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                >
                  <Heart size={20} className="fill-primary-500 text-primary-500" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg text-dark-900 mb-2">
                  {product.name}
                </h3>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary-500">
                    ${product.price.toFixed(2)}
                  </span>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="btn btn-primary py-2 px-4 flex items-center space-x-2"
                  >
                    <ShoppingCart size={18} />
                    <span>Agregar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalConfig.title}
        type={modalConfig.type}
      >
        <p className="text-gray-700">{modalConfig.message}</p>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => setShowModal(false)}
            className="btn btn-secondary"
          >
            Continuar Comprando
          </button>
          <button
            onClick={() => {
              setShowModal(false);
              window.location.href = '/cart';
            }}
            className="btn btn-primary"
          >
            Ir al Carrito
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Favorites;
