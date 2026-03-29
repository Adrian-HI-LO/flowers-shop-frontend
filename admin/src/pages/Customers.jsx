import { useState } from 'react';
import { Search, Filter, UserX, UserCheck, Eye, Mail, Phone, MapPin, Calendar, ShoppingBag } from 'lucide-react';

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalType, setModalType] = useState(null);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSuspendAccount = (customer) => {
    setSelectedCustomer(customer);
    setModalType('suspend');
  };

  const handleActivateAccount = (customer) => {
    setSelectedCustomer(customer);
    setModalType('activate');
  };

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setModalType('details');
  };

  const confirmSuspend = () => {
    setCustomers(customers.map(c => 
      c.id === selectedCustomer.id ? { ...c, status: 'suspended' } : c
    ));
    closeModal();
  };

  const confirmActivate = () => {
    setCustomers(customers.map(c => 
      c.id === selectedCustomer.id ? { ...c, status: 'active' } : c
    ));
    closeModal();
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedCustomer(null);
  };

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    suspended: customers.filter(c => c.status === 'suspended').length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0)
  };

  return (
    <div className="space-y-6 page-enter">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-800">Clientes</h1>
          <p className="text-zinc-500">Monitorea y gestiona tus clientes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="admin-card p-6 stagger-item" style={{ animationDelay: '40ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Clientes</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="admin-card p-6 stagger-item" style={{ animationDelay: '90ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Clientes Activos</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.active}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="admin-card p-6 stagger-item" style={{ animationDelay: '140ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Suspendidos</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{stats.suspended}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <UserX className="text-red-600" size={24} />
            </div>
          </div>
        </div>

        <div className="admin-card p-6 stagger-item" style={{ animationDelay: '180ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ingresos Totales</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <span className="text-amber-600 text-xl">💰</span>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-panel p-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por nombre, email o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-input pl-10 w-full"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={18} className="text-gray-400" />
            <select 
              className="admin-input w-full sm:w-48"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="suspended">Suspendidos</option>
            </select>
          </div>
        </div>
      </div>

      <div className="admin-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pedidos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Gastado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-zinc-200">
              {filteredCustomers.map((customer, index) => (
                <tr key={customer.id} className="hover:bg-zinc-50 transition-colors stagger-item" style={{ animationDelay: `${index * 35}ms` }}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-amber-400 flex items-center justify-center text-white font-semibold mr-3">
                        {customer.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          <MapPin size={12} className="mr-1" />
                          {customer.address}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Mail size={14} className="mr-2 text-gray-400" />
                      {customer.email}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center mt-1">
                      <Phone size={12} className="mr-2 text-gray-400" />
                      {customer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Calendar size={14} className="mr-2 text-gray-400" />
                      {new Date(customer.registeredDate).toLocaleDateString('es-MX')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="font-semibold">{customer.totalOrders}</span> pedidos
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    ${customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      customer.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {customer.status === 'active' ? 'Activo' : 'Suspendido'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewDetails(customer)}
                        className="text-blue-600 hover:text-blue-800 transition-colors p-1 hover:bg-blue-50 rounded"
                        title="Ver detalles"
                      >
                        <Eye size={18} />
                      </button>
                      {customer.status === 'active' ? (
                        <button
                          onClick={() => handleSuspendAccount(customer)}
                          className="text-red-600 hover:text-red-800 transition-colors p-1 hover:bg-red-50 rounded"
                          title="Suspender cuenta"
                        >
                          <UserX size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivateAccount(customer)}
                          className="text-green-600 hover:text-green-800 transition-colors p-1 hover:bg-green-50 rounded"
                          title="Activar cuenta"
                        >
                          <UserCheck size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No se encontraron clientes</p>
            </div>
          )}
        </div>
      </div>

      {modalType === 'suspend' && selectedCustomer && (
        <div className="fixed inset-0 bg-zinc-900/35 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 soft-fade">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-fade-in-up">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <UserX className="text-red-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Suspender Cuenta
            </h3>
            <p className="text-gray-600 text-center mb-6">
              ¿Estás seguro de que deseas suspender la cuenta de <span className="font-semibold">{selectedCustomer.name}</span>?
              El cliente no podrá realizar pedidos mientras esté suspendido.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {selectedCustomer.email}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Total de pedidos:</strong> {selectedCustomer.totalOrders}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={confirmSuspend}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Suspender
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === 'activate' && selectedCustomer && (
        <div className="fixed inset-0 bg-zinc-900/35 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 soft-fade">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-fade-in-up">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mx-auto mb-4">
              <UserCheck className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Activar Cuenta
            </h3>
            <p className="text-gray-600 text-center mb-6">
              ¿Deseas reactivar la cuenta de <span className="font-semibold">{selectedCustomer.name}</span>?
              El cliente podrá volver a realizar pedidos.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {selectedCustomer.email}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Total de pedidos:</strong> {selectedCustomer.totalOrders}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={confirmActivate}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Activar
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === 'details' && selectedCustomer && (
        <div className="fixed inset-0 bg-zinc-900/35 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 soft-fade">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-amber-400 flex items-center justify-center text-white font-bold text-xl mr-4">
                  {selectedCustomer.avatar}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedCustomer.name}</h3>
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full mt-2 ${
                    selectedCustomer.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedCustomer.status === 'active' ? 'Activo' : 'Suspendido'}
                  </span>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Información de Contacto</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Mail size={16} className="mr-2 text-gray-400" />
                    <span className="text-gray-600">{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone size={16} className="mr-2 text-gray-400" />
                    <span className="text-gray-600">{selectedCustomer.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin size={16} className="mr-2 text-gray-400" />
                    <span className="text-gray-600">{selectedCustomer.address}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Información de Cuenta</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Calendar size={16} className="mr-2 text-gray-400" />
                    <span className="text-gray-600">
                      Registro: {new Date(selectedCustomer.registeredDate).toLocaleDateString('es-MX')}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <ShoppingBag size={16} className="mr-2 text-gray-400" />
                    <span className="text-gray-600">
                      Total de pedidos: {selectedCustomer.totalOrders}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="mr-2 text-gray-400">💰</span>
                    <span className="text-gray-600">
                      Total gastado: ${selectedCustomer.totalSpent.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Pedidos Recientes</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 text-center py-4">
                  Los pedidos se cargarán desde el backend
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
