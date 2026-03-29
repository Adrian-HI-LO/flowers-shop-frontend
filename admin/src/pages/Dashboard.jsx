import { 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  DollarSign,
  Users,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const stats = [
    {
      title: 'Ventas Totales',
      value: '—',
      change: null,
      isPositive: true,
      icon: DollarSign,
      color: 'emerald'
    },
    {
      title: 'Pedidos',
      value: '—',
      change: null,
      isPositive: true,
      icon: ShoppingCart,
      color: 'blue'
    },
    {
      title: 'Productos',
      value: '—',
      change: null,
      isPositive: true,
      icon: Package,
      color: 'purple'
    },
    {
      title: 'Clientes',
      value: '—',
      change: null,
      isPositive: false,
      icon: Users,
      color: 'orange'
    }
  ];

  const salesData = [];

  const productSales = [];

  const COLORS = ['#ec4899', '#f59e0b', '#8b5cf6', '#06b6d4'];

  const recentOrders = [];

  return (
    <div className="space-y-10 page-enter">
      <div className="animate-fade-in-up mb-6">
        <h1 className="text-4xl font-bold font-serif gradient-text mb-3">Dashboard</h1>
        <p className="text-zinc-500 text-lg">Bienvenido al panel de administración ✨</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6 lg:gap-8">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            style={{ animationDelay: `${index * 100}ms` }}
            className="admin-card stagger-item p-6 lg:p-8 rounded-3xl group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-fuchsia-100/35 to-violet-100/30 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6 lg:mb-8">
                <div className={`p-4 bg-gradient-to-br ${
                  stat.color === 'emerald' ? 'from-emerald-500 to-emerald-700' :
                  stat.color === 'blue' ? 'from-sky-500 to-blue-700' :
                  stat.color === 'purple' ? 'from-violet-500 to-violet-700' :
                  'from-amber-500 to-orange-600'
                } rounded-2xl shadow-lg transform transition-transform group-hover:scale-105 group-hover:-translate-y-0.5`}>
                  <stat.icon className="text-white" size={28} />
                </div>
                {stat.change ? (
                  <div className={`flex items-center space-x-1.5 text-sm font-semibold px-3.5 py-1.5 rounded-full ${
                    stat.isPositive 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {stat.isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                    <span>{stat.change}</span>
                  </div>
                ) : (
                  <div className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-zinc-100 text-zinc-500">
                    Sin datos
                  </div>
                )}
              </div>
              <h3 className="text-zinc-500 text-xs font-medium mb-3 uppercase tracking-wider">{stat.title}</h3>
              <p className="text-4xl font-bold font-serif gradient-text mt-2">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 lg:gap-8">
        <div className="admin-panel rounded-3xl p-8 lg:p-10 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-fuchsia-100/45 to-transparent rounded-bl-full group-hover:scale-110 transition-transform duration-500" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8 lg:mb-10">
              <h2 className="text-2xl font-bold font-serif text-gray-800">Ventas Mensuales</h2>
              <div className="p-2.5 bg-gradient-to-br from-violet-600 to-fuchsia-700 rounded-xl shadow-md">
                <TrendingUp className="text-white" size={22} />
              </div>
            </div>
            {salesData.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={salesData}>
                  <defs>
                    <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#be185d" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#be185d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #ec4899',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(236, 72, 153, 0.2)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ventas" 
                    stroke="#be185d" 
                    strokeWidth={3}
                    dot={{ fill: '#be185d', r: 6, strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 8, strokeWidth: 2, stroke: '#fff' }}
                    fill="url(#colorVentas)"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[350px] rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50 flex items-center justify-center text-zinc-500">
                Sin información de ventas por el momento.
              </div>
            )}
          </div>
        </div>

        <div className="admin-panel rounded-3xl p-8 lg:p-10 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-bl from-violet-100/35 to-transparent rounded-br-full group-hover:scale-110 transition-transform duration-500" />
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold font-serif text-gray-800 mb-8 lg:mb-10">Distribución de Productos</h2>
            {productSales.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={productSales}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={800}
                  >
                    {productSales.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        className="hover:opacity-80 transition-opacity cursor-pointer"
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #f59e0b',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[350px] rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50 flex items-center justify-center text-zinc-500">
                Sin distribución disponible hasta recibir productos reales.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="admin-panel rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="p-8 lg:p-10 border-b border-zinc-100 bg-gradient-to-r from-zinc-50 to-white">
          <h2 className="text-2xl font-bold font-serif text-gray-800">Pedidos Recientes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Monto</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order, index) => (
                  <tr 
                    key={order.id}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className="stagger-item"
                  >
                    <td className="font-bold text-fuchsia-700">{order.id}</td>
                    <td className="font-medium text-gray-800">{order.customer}</td>
                    <td className="text-gray-600">{order.product}</td>
                    <td className="font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">{order.amount}</td>
                    <td>
                      <span className={`
                        px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1
                        ${order.status === 'Completado' ? 'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 shadow-emerald-200/50' : ''}
                        ${order.status === 'Pendiente' ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 shadow-yellow-200/50' : ''}
                        ${order.status === 'En proceso' ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 shadow-blue-200/50' : ''}
                        shadow-md
                      `}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          order.status === 'Completado' ? 'bg-emerald-600' :
                          order.status === 'Pendiente' ? 'bg-yellow-600' :
                          'bg-blue-600'
                        }`}></span>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-zinc-500 py-10">
                    Aún no hay pedidos para mostrar.
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

export default Dashboard;
