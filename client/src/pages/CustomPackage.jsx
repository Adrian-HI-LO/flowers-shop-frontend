import { useState, useEffect } from 'react';
import { Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import { categoryService } from '../services/categoryService';
import { productService } from '../services/productService';
import { cartService } from '../services/cartService';
import FloatingPetals from '../components/animations/FloatingPetals';
import LazyImage from '../components/common/LazyImage';
import { GridSkeleton } from '../components/common/LoadingSkeleton';
import { useToast } from '../contexts/ToastContext';

const CustomPackage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [customMessage, setCustomMessage] = useState('');
  const [customImage, setCustomImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoryService.getAll();
      const categoriesWithProducts = await Promise.all(
        response.data.map(async (category) => {
          const productsRes = await productService.getAll({ categoryId: category.id });
          return { ...category, products: productsRes.data };
        })
      );
      setCategories(categoriesWithProducts);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = (product) => {
    const existing = selectedProducts.find(p => p.id === product.id);
    if (existing) {
      setSelectedProducts(selectedProducts.map(p =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      ));
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveProduct(productId);
    } else {
      setSelectedProducts(selectedProducts.map(p =>
        p.id === productId ? { ...p, quantity: newQuantity } : p
      ));
    }
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, p) => total + (p.price * p.quantity), 0);
  };

  const handleAddToCart = () => {
    if (selectedProducts.length === 0) {
      toast.warning('Por favor selecciona al menos un producto');
      return;
    }


    cartService.addItem({
      id: `custom_${Date.now()}`,
      type: 'custom_package',
      name: 'Paquete Personalizado',
      price: calculateTotal(),
      imageUrl: null,
      quantity: 1,
      customProducts: selectedProducts,
      customMessage,
      customImage
    });

    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Paquete personalizado agregado al carrito');

    setSelectedProducts([]);
    setCustomMessage('');
    setCustomImage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="title-elegant mb-4">Crea tu Paquete Personalizado</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Selecciona tus productos favoritos de cada categoría y crea un regalo único
            </p>
          </div>
          <GridSkeleton count={6} type="product" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50">
      <FloatingPetals count={9} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="title-elegant mb-4">Crea tu Paquete Personalizado</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Selecciona tus productos favoritos de cada categoría y crea un regalo único
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {categories.map((category) => (
              <div key={category.id} className="card p-6">
                <h2 className="text-2xl font-serif font-bold text-dark-900 mb-4">
                  {category.name}
                </h2>
                <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {category.products?.filter(p => p.categoryId === category.id).map((product) => (
                      <div key={product.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                        <div className="aspect-square bg-gradient-to-br from-primary-50 to-gold-50 rounded-lg mb-2 overflow-hidden">
                          <LazyImage
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            fallback="🌸"
                          />
                        </div>
                        <h3 className="font-semibold text-sm mb-1 line-clamp-1">{product.name}</h3>
                        <p className="text-primary-500 font-bold text-lg mb-2">${product.price.toFixed(2)}</p>
                        <button
                          onClick={() => handleAddProduct(product)}
                          className="btn btn-primary w-full py-1 text-sm"
                        >
                          <Plus size={14} className="inline mr-1" />
                          Agregar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="card p-6">
              <h2 className="text-2xl font-serif font-bold text-dark-900 mb-4">
                Personalización
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Mensaje personalizado
                  </label>
                  <textarea
                    className="input"
                    rows="3"
                    placeholder="Escribe un mensaje especial..."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Imagen personalizada (próximamente)
                  </label>
                  <input
                    type="file"
                    className="input"
                    accept="image/*"
                    disabled
                  />
                  <p className="text-sm text-gray-500 mt-1">Funcionalidad en desarrollo</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-2xl font-serif font-bold mb-4">Tu Paquete</h2>

              {selectedProducts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Aún no has seleccionado productos
                </p>
              ) : (
                <>
                  <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                    {selectedProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between border-b pb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{product.name}</h4>
                          <p className="text-primary-500 font-bold">${product.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleUpdateQuantity(product.id, product.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-gray-100 hover:bg-primary-100 flex items-center justify-center"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center font-semibold">{product.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(product.id, product.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-gray-100 hover:bg-primary-100 flex items-center justify-center"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-primary-500">${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="btn btn-primary w-full inline-flex items-center justify-center"
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Agregar al Carrito
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPackage;
