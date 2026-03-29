import { useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

const Packages = () => {
  const [packages] = useState([]);

  return (
    <div className="space-y-6 page-enter">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-800">Paquetes</h1>
          <p className="text-zinc-500">Gestiona tus paquetes predefinidos</p>
        </div>
        <button className="admin-button admin-button-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>Crear Paquete</span>
        </button>
      </div>

      <div className="admin-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre del Paquete</th>
                <th>Items Incluidos</th>
                <th>Precio</th>
                <th>Ventas</th>
                <th>Estado</th>
                <th className="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {packages.length > 0 ? (
                packages.map((pkg, index) => (
                  <tr key={pkg.id} className="stagger-item" style={{ animationDelay: `${index * 45}ms` }}>
                    <td className="font-medium text-gray-900">{pkg.name}</td>
                    <td className="text-gray-600">{pkg.items} productos</td>
                    <td className="font-semibold text-gray-900">${pkg.price}</td>
                    <td className="text-gray-600">{pkg.sales} ventas</td>
                    <td>
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-medium shadow-sm
                        ${pkg.status === 'Destacado' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}
                      `}>
                        {pkg.status}
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
                    No hay paquetes cargados todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Packages;
