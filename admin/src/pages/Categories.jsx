import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

const Categories = () => {
  const [categories] = useState([]);

  return (
    <div className="space-y-6 page-enter">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-800">Categorías</h1>
          <p className="text-zinc-500">Organiza tus productos por categorías</p>
        </div>
        <button className="admin-button admin-button-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>Nueva Categoría</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <div key={category.id} className="admin-card stagger-item p-6" style={{ animationDelay: `${index * 60}ms` }}>
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  {category.icon}
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:-translate-y-0.5">
                    <Edit size={16} className="text-blue-600" />
                  </button>
                  <button className="p-2 hover:bg-red-50 rounded-lg transition-all duration-200 hover:-translate-y-0.5">
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
              <p className="text-gray-600">{category.products} productos</p>
            </div>
          ))
        ) : (
          <div className="admin-card col-span-full text-center py-12 text-zinc-500">
            Aún no hay categorías registradas.
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
