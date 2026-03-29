import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';

const Products = () => {
  const [products] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 page-enter">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-800">Productos</h1>
          <p className="text-zinc-500">Gestiona tu inventario de productos</p>
        </div>
        <button className="admin-button admin-button-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>Agregar Producto</span>
        </button>
      </div>

      <div className="admin-panel p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-input pl-10"
            />
          </div>
          <select className="admin-input w-48">
            <option>Todas las categorías</option>
          </select>
          <select className="admin-input w-32">
            <option>Todos</option>
            <option>Activo</option>
            <option>Agotado</option>
          </select>
        </div>
      </div>

      <div className="admin-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
                <th className="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr key={product.id} className="stagger-item" style={{ animationDelay: `${index * 45}ms` }}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 hover:scale-105">
                          {product.image}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500">ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-gray-600">{product.category}</td>
                    <td className="font-semibold text-gray-900">${product.price}</td>
                    <td>
                      <span className={`
                        px-2 py-1 rounded text-xs font-medium
                        ${product.stock > 20 ? 'bg-emerald-100 text-emerald-700' : 
                          product.stock > 10 ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-red-100 text-red-700'}
                      `}>
                        {product.stock} unidades
                      </span>
                    </td>
                    <td>
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-medium
                        ${product.status === 'Activo' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}
                      `}>
                        {product.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 hover:bg-zinc-100 rounded-lg transition-all duration-200 hover:-translate-y-0.5">
                          <Eye size={16} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:-translate-y-0.5">
                          <Edit size={16} className="text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-all duration-200 hover:-translate-y-0.5">
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-zinc-500 py-10">
                    No hay productos cargados todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-zinc-100 flex items-center justify-between bg-zinc-50/40">
          <p className="text-sm text-gray-600">
            Mostrando <span className="font-medium">{filteredProducts.length}</span> de <span className="font-medium">{products.length}</span> productos
          </p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-zinc-300 rounded hover:bg-zinc-50 transition-colors">
              Anterior
            </button>
            <button className="px-3 py-1 bg-gradient-to-r from-fuchsia-700 to-violet-600 text-white rounded">
              1
            </button>
            <button className="px-3 py-1 border border-zinc-300 rounded hover:bg-zinc-50 transition-colors">
              2
            </button>
            <button className="px-3 py-1 border border-zinc-300 rounded hover:bg-zinc-50 transition-colors">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
