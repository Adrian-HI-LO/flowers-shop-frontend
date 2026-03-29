import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categoryService } from '../services/categoryService';
import { productService } from '../services/productService';
import { cartService } from '../services/cartService';
import ProductCard from '../components/common/ProductCard';
import Modal from '../components/common/Modal';
import { ArrowLeft } from 'lucide-react';

const CategoryDetail = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({ type: 'success', title: '', message: '' });

  useEffect(() => {
    loadCategoryData();
  }, [slug]);

  const loadCategoryData = async () => {
    try {
      setLoading(true);
      const categoryRes = await categoryService.getBySlug(slug);

      if (!categoryRes.data) {
        setLoading(false);
        return;
      }

      setCategory(categoryRes.data);

      const productsRes = await productService.getAll();
      const filteredProducts = productsRes.data.filter(p => p.categoryId === categoryRes.data.id);
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error loading category data:', error);
    } finally {
      setLoading(false);
    }
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
      title: '¡Producto Agregado!',
      message: `${product.name} ha sido agregado a tu carrito`
    });
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Categoría no encontrada</p>
          <Link to="/categories" className="btn btn-primary mt-4">
            Volver a Categorías
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/categories"
          className="inline-flex items-center text-gray-600 hover:text-primary-500 mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Volver a Categorías
        </Link>

        <div className="mb-12 text-center">
          <h1 className="title-elegant mb-4">{category.name}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">
              No hay productos disponibles en esta categoría
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
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

export default CategoryDetail;
