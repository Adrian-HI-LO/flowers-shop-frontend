import { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';

const FilterPanel = ({ onFilterChange, categories = [], isOpen, onClose }) => {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('newest');

  const handlePriceChange = (field, value) => {
    const newRange = { ...priceRange, [field]: Number(value) };
    setPriceRange(newRange);
    applyFilters({ priceRange: newRange, selectedCategories, sortBy });
  };

  const handleCategoryToggle = (categoryId) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(newCategories);
    applyFilters({ priceRange, selectedCategories: newCategories, sortBy });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    applyFilters({ priceRange, selectedCategories, sortBy: value });
  };

  const applyFilters = (filters) => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };

  const clearFilters = () => {
    setPriceRange({ min: 0, max: 1000 });
    setSelectedCategories([]);
    setSortBy('newest');
    applyFilters({ priceRange: { min: 0, max: 1000 }, selectedCategories: [], sortBy: 'newest' });
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div className={`
        fixed lg:sticky top-0 left-0 h-screen lg:h-auto
        w-80 lg:w-full
        bg-white rounded-lg shadow-lg lg:shadow-none
        overflow-y-auto
        transition-transform duration-300 ease-in-out
        z-50 lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-4 border-b lg:border-none">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal size={20} className="text-primary-500" />
            <h3 className="font-semibold text-lg">Filtros</h3>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <h4 className="font-semibold text-sm text-gray-700 mb-3">Ordenar Por</h4>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="newest">Más Recientes</option>
              <option value="price-low">Precio: Menor a Mayor</option>
              <option value="price-high">Precio: Mayor a Menor</option>
              <option value="popular">Más Populares</option>
            </select>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-gray-700 mb-3">Rango de Precio</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <label className="text-xs text-gray-600">Mínimo</label>
                  <input
                    type="number"
                    min="0"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="$0"
                  />
                </div>
                <span className="text-gray-400 mt-5">-</span>
                <div className="flex-1">
                  <label className="text-xs text-gray-600">Máximo</label>
                  <input
                    type="number"
                    min="0"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="$1000"
                  />
                </div>
              </div>

              <div className="pt-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>${priceRange.min}</span>
                  <span>${priceRange.max}</span>
                </div>
              </div>
            </div>
          </div>

          {categories.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-3">Categorías</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                      className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{category.name}</span>
                    {category.count && (
                      <span className="text-xs text-gray-400">({category.count})</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={clearFilters}
            className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;
