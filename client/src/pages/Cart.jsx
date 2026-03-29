import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cartService } from '../services/cartService';
import Modal from '../components/common/Modal';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

const Cart = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({ type: 'success', title: '', message: '' });
  const [confirmAction, setConfirmAction] = useState(null);
  const navigate = useNavigate();

  const loadCart = () => {
    const currentCart = cartService.getCart();
    setCart(currentCart);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    cartService.updateQuantity(itemId, newQuantity);
    loadCart();
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleRemoveItem = (itemId) => {
    setModalConfig({
      type: 'warning',
      title: '¿Eliminar producto?',
      message: '¿Estás seguro de que quieres eliminar este producto del carrito?'
    });
    setConfirmAction(() => () => {
      cartService.removeItem(itemId);
      loadCart();
      window.dispatchEvent(new Event('cartUpdated'));
      setShowModal(false);
    });
    setShowModal(true);
  };

  const handleClearCart = () => {
    setModalConfig({
      type: 'warning',
      title: '¿Vaciar carrito?',
      message: '¿Estás seguro de que quieres vaciar todo el carrito? Esta acción no se puede deshacer.'
    });
    setConfirmAction(() => () => {
      cartService.clearCart();
      loadCart();
      window.dispatchEvent(new Event('cartUpdated'));
      setShowModal(false);
    });
    setShowModal(true);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-primary-50 flex items-center justify-center">
        <div className="text-center py-12">
          <ShoppingBag size={80} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-3xl font-serif font-bold text-gray-700 mb-4">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-8">
            ¡Agrega productos maravillosos a tu carrito!
          </p>
          <Link to="/packages" className="btn btn-primary text-lg">
            Explorar Paquetes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-primary-500 mb-4 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Continuar Comprando
          </Link>
          <h1 className="title-elegant">Tu Carrito</h1>
          <p className="text-gray-600 mt-2">
            {cart.items.length} {cart.items.length === 1 ? 'artículo' : 'artículos'} en tu carrito
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="card p-6">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-primary-50 to-gold-50 rounded-lg overflow-hidden">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">
                        {item.type === 'package' ? '🎁' : '🌸'}
                      </div>
                    )}
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg text-dark-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.type === 'package' ? 'Paquete predefinido' : 'Producto individual'}
                    </p>
                    <p className="text-xl font-bold text-primary-500">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-primary-100 flex items-center justify-center transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-primary-100 flex items-center justify-center transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <p className="text-lg font-semibold text-dark-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={handleClearCart}
              className="text-red-500 hover:text-red-600 font-medium flex items-center space-x-2"
            >
              <Trash2 size={18} />
              <span>Vaciar Carrito</span>
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-2xl font-serif font-bold mb-6">Resumen</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Envío</span>
                  <span className="text-green-600">GRATIS</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary-500">${cart.total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="btn btn-primary w-full text-lg mb-3"
              >
                Proceder al Pago
              </button>

              <Link
                to="/packages"
                className="btn btn-secondary w-full text-center"
              >
                Seguir Comprando
              </Link>

              <div className="mt-6 pt-6 border-t space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Pago seguro con Stripe</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Envío el mismo día</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Garantía de frescura</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalConfig.title}
        type={modalConfig.type}
      >
        <p className="text-gray-700 mb-6">{modalConfig.message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowModal(false)}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
          {confirmAction && (
            <button
              onClick={confirmAction}
              className="btn btn-primary"
            >
              Confirmar
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
