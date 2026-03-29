import { useState } from 'react';
import { Search, Eye, Download } from 'lucide-react';

const Orders = () => {
  const [orders] = useState([]);

  return (
    <div className="space-y-6 page-enter">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-800">Pedidos</h1>
          <p className="text-zinc-500">Gestiona todos los pedidos de clientes</p>
        </div>
        <button className="admin-button admin-button-primary flex items-center space-x-2">
          <Download size={20} />
          <span>Exportar</span>
        </button>
      </div>

      <div className="admin-panel p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar pedidos..."
              className="admin-input pl-10"
            />
          </div>
          <select className="admin-input w-48">
            <option>Todos los estados</option>
            <option>Pendiente</option>
            <option>En proceso</option>
            <option>Enviado</option>
            <option>Completado</option>
            <option>Cancelado</option>
          </select>
        </div>
      </div>

      <div className="admin-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Items</th>
                <th>Total</th>
                <th>Estado</th>
                <th className="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={order.id} className="stagger-item" style={{ animationDelay: `${index * 45}ms` }}>
                    <td className="font-medium">{order.id}</td>
                    <td>{order.customer}</td>
                    <td className="text-gray-600">{order.date}</td>
                    <td className="text-gray-600">{order.items} items</td>
                    <td className="font-semibold text-emerald-600">${order.total}</td>
                    <td>
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-medium
                        ${order.status === 'Completado' ? 'bg-emerald-100 text-emerald-700' : ''}
                        ${order.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-700' : ''}
                        ${order.status === 'En proceso' ? 'bg-blue-100 text-blue-700' : ''}
                        ${order.status === 'Enviado' ? 'bg-purple-100 text-purple-700' : ''}
                        ${order.status === 'Cancelado' ? 'bg-red-100 text-red-700' : ''}
                      `}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-end">
                        <button className="p-2 hover:bg-zinc-100 rounded-lg transition-all duration-200 hover:-translate-y-0.5">
                          <Eye size={16} className="text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-zinc-500 py-10">
                    No hay pedidos disponibles todavía.
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

export default Orders;
