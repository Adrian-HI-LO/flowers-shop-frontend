import { useState, useEffect } from 'react';
import { X, Search as SearchIcon, Clock, TrendingUp } from 'lucide-react';
import { searchService } from '../../services/searchService';
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';
import { ListSkeleton } from './LoadingSkeleton';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);

    if (searchQuery.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await searchService.search(searchQuery);
      setResults(response.data);

      if (response.data.length > 0) {
        const updated = [
          searchQuery,
          ...recentSearches.filter(s => s !== searchQuery)
        ].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recent_searches', JSON.stringify(updated));
      }
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setQuery('');
    setResults([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      <div className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-auto overflow-hidden animate-fade-in">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <SearchIcon size={24} className="text-gray-400" />
            <input
              type="text"
              className="flex-1 text-lg outline-none"
              placeholder="Buscar productos..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              autoFocus
            />
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <ListSkeleton count={3} />
          ) : query.trim().length < 2 ? (
            <div className="p-8">
              {recentSearches.length > 0 ? (
                <div>
                  <div className="flex items-center space-x-2 mb-4 text-gray-600">
                    <Clock size={18} />
                    <h3 className="font-semibold text-sm">Búsquedas Recientes</h3>
                  </div>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <SearchIcon size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="font-medium">Busca productos y paquetes</p>
                  <p className="text-sm mt-2">Escribe al menos 2 caracteres para buscar</p>
                </div>
              )}
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg font-medium">No se encontraron resultados para "{query}"</p>
              <p className="text-sm mt-2">Intenta con otros términos de búsqueda</p>
            </div>
          ) : (
            <div className="divide-y">
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.slug}`}
                  onClick={handleClose}
                  className="flex items-center p-4 hover:bg-primary-50 transition-colors group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-50 to-gold-50 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                    {product.imageUrl ? (
                      <LazyImage
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        fallback="🌸"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">
                        🌸
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-dark-900 group-hover:text-primary-500 transition-colors truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
                  </div>
                  <div className="text-primary-500 font-bold text-lg ml-4 flex-shrink-0">
                    ${product.price.toFixed(2)}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {results.length > 0 && (
          <div className="p-4 bg-gray-50 text-center text-sm text-gray-600">
            {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
