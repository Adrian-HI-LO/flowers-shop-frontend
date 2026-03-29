import { useEffect, useState } from 'react';
import { packageService } from '../services/packageService';
import { cartService } from '../services/cartService';
import PackageCard from '../components/common/PackageCard';
import FilterPanel from '../components/common/FilterPanel';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { useFadeInUp } from '../hooks/useGSAP';
import RoseScrollAnimation from '../components/animations/RoseScrollAnimation';
import FloatingPetals from '../components/animations/FloatingPetals';
import { useToast } from '../contexts/ToastContext';
import { GridSkeleton } from '../components/common/LoadingSkeleton';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const toast = useToast();

  const headerRef = useFadeInUp(0.2);

  useEffect(() => {
    loadPackages();
  }, [filter]);

  const loadPackages = async () => {
    try {
      setLoading(true);
      const response = filter === 'featured'
        ? await packageService.getFeatured()
        : await packageService.getAll();
      setPackages(response.data);
      setFilteredPackages(response.data);
    } catch (error) {
      console.error('Error loading packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filters) => {
    let filtered = [...packages];

    if (filters.priceRange) {
      filtered = filtered.filter(
        pkg => pkg.price >= filters.priceRange.min && pkg.price <= filters.priceRange.max
      );
    }

    if (filters.selectedCategories && filters.selectedCategories.length > 0) {
      filtered = filtered.filter(pkg =>
        pkg.categories && pkg.categories.some(cat => filters.selectedCategories.includes(cat.id))
      );
    }

    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
    }

    setFilteredPackages(filtered);
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
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50">

      <FloatingPetals count={8} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="title-elegant mb-4">Nuestros Paquetes</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Combinaciones perfectas de flores, chocolates, peluches y más,
            cuidadosamente seleccionadas para cada ocasión especial
          </p>
        </div>

        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilterPanel(true)}
              className="lg:hidden btn btn-secondary flex items-center space-x-2"
            >
              <SlidersHorizontal size={18} />
              <span>Filtros</span>
            </button>

            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-primary-50'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilter('featured')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'featured'
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-primary-50'
                }`}
              >
                Destacados
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            {filteredPackages.length} paquete{filteredPackages.length !== 1 ? 's' : ''} encontrado{filteredPackages.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterPanel
              isOpen={showFilterPanel}
              onClose={() => setShowFilterPanel(false)}
              onFilterChange={handleFilterChange}
              categories={[]}
            />
          </div>

          <div className="lg:col-span-3">
            {loading ? (
              <GridSkeleton count={6} type="package" />
            ) : filteredPackages.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600">No hay paquetes que coincidan con los filtros</p>
                <button
                  onClick={() => handleFilterChange({ priceRange: { min: 0, max: 1000 }, selectedCategories: [], sortBy: 'newest' })}
                  className="btn btn-primary mt-4"
                >
                  Limpiar Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPackages.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    package={pkg}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
