import { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import { orderService } from '../services/orderService';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {

      const demoOrders = [
        {
          id: '1',
          orderNumber: 'ORD-10001',
          date: '2026-01-25',
          status: 'delivered',
          total: 950.00,
          items: [
            { name: 'Paquete Amor Eterno', quantity: 1, price: 950.00 }
          ]
        },
        {
          id: '2',
          orderNumber: 'ORD-10002',
          date: '2026-01-28',
          status: 'in_transit',
          total: 1850.00,
          items: [
            { name: 'Paquete Celebración Premium', quantity: 1, price: 1850.00 }
          ]
        },
        {
          id: '3',
          orderNumber: 'ORD-10003',
          date: '2026-01-30',
          status: 'preparing',
          total: 780.00,
          items: [
            { name: 'Paquete Romántico Clásico', quantity: 1, price: 780.00 }
          ]
        }
      ];
      setOrders(demoOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status) => {
    const statusMap = {
      pending: { label: 'Pendiente', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
      confirmed: { label: 'Confirmado', icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-100' },
      preparing: { label: 'Preparando', icon: Package, color: 'text-purple-600', bg: 'bg-purple-100' },
      in_transit: { label: 'En camino', icon: Truck, color: 'text-indigo-600', bg: 'bg-indigo-100' },
      delivered: { label: 'Entregado', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
      cancelled: { label: 'Cancelado', icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' }
    };
    return statusMap[status] || statusMap.pending;
  };

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter(order => order.status === filter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="title-elegant mb-4">Mis Pedidos</h1>
          <p className="text-lg text-gray-600">
            Revisa el estado de todos tus pedidos
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
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
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:bg-primary-50'
            }`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setFilter('in_transit')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'in_transit'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:bg-primary-50'
            }`}
          >
            En camino
          </button>
          <button
            onClick={() => setFilter('delivered')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'delivered'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:bg-primary-50'
            }`}
          >
            Entregados
          </button>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-20">
            <Package size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-600 mb-4">
              {filter === 'all'
                ? 'No tienes pedidos aún'
                : `No hay pedidos ${getStatusInfo(filter).label.toLowerCase()}`}
            </p>
            <a href="/packages" className="btn btn-primary">
              Explorar Paquetes
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const StatusIcon = getStatusInfo(order.status).icon;
              return (
                <div key={order.id} className="card p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-dark-900 mb-1">
                        Pedido #{order.orderNumber}
                      </h3>
                      <p className="text-gray-600">
                        Realizado el {new Date(order.date).toLocaleDateString('es-MX', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className={`inline-flex items-center px-4 py-2 rounded-full ${getStatusInfo(order.status).bg} ${getStatusInfo(order.status).color} font-semibold mt-4 md:mt-0`}>
                      <StatusIcon size={20} className="mr-2" />
                      {getStatusInfo(order.status).label}
                    </div>
                  </div>

                  <div className="border-t border-b py-4 my-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2">
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-primary-500">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="text-2xl font-bold text-dark-900 mb-4 md:mb-0">
                      Total: <span className="text-primary-500">${order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn btn-secondary">
                        Ver Detalles
                      </button>
                      {order.status === 'delivered' && (
                        <button className="btn btn-primary">
                          Volver a Ordenar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
