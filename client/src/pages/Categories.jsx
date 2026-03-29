import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { categoryService } from '../services/categoryService';
import { ArrowRight } from 'lucide-react';
import FloatingPetals from '../components/animations/FloatingPetals';
import LazyImage from '../components/common/LazyImage';
import { GridSkeleton } from '../components/common/LoadingSkeleton';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoryService.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gold-50">
      <FloatingPetals count={10} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="title-elegant mb-4">Explora por Categorías</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra amplia selección de productos organizados por categorías.
            Encuentra el regalo perfecto para cada ocasión.
          </p>
        </div>

        {loading ? (
          <GridSkeleton count={6} type="category" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.slug}`}
                className="card overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-gold-50 aspect-[4/3]">
                  {category.imageUrl ? (
                    <LazyImage
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      fallback={getCategoryEmoji(category.slug)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-7xl">
                      {getCategoryEmoji(category.slug)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-dark-900 mb-2 group-hover:text-primary-500 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center text-primary-500 font-medium group-hover:translate-x-2 transition-transform">
                    <span>Ver productos</span>
                    <ArrowRight className="ml-2" size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const getCategoryEmoji = (slug) => {
  const emojis = {
    flores: '🌹',
    peluches: '🧸',
    chocolates: '🍫',
    vinos: '🍷',
    globos: '🎈',
  };
  return emojis[slug] || '🎁';
};

export default Categories;
