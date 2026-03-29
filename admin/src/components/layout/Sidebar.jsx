import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Gift, 
  FolderTree, 
  ShoppingCart,
  Users,
  Settings,
  Flower2
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { path: '/products', icon: Flower2, label: 'Productos' },
    { path: '/packages', icon: Gift, label: 'Paquetes' },
    { path: '/categories', icon: FolderTree, label: 'Categorías' },
    { path: '/orders', icon: ShoppingCart, label: 'Pedidos' },
    { path: '/customers', icon: Users, label: 'Clientes' },
    { path: '/settings', icon: Settings, label: 'Configuración' },
  ];

  return (
    <aside className="w-72 h-full bg-white/70 backdrop-blur-xl shadow-[14px_0_44px_-34px_rgba(15,23,42,0.55)] border-r border-white/70 relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-zinc-50/40 to-white/60 pointer-events-none" />
      
      <div className="h-28 flex items-center justify-center border-b border-zinc-100 relative z-10 px-8 py-6">
        <div className="flex items-center space-x-4 group">
          <div className="w-14 h-14 bg-gradient-to-br from-fuchsia-700 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-0.5">
            <Flower2 className="text-white" size={26} />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-serif font-bold text-xl leading-tight gradient-text">Flowers Shop</h1>
            <p className="text-xs text-zinc-500 font-medium">Panel Admin</p>
          </div>
        </div>
      </div>

      <nav className="p-6 lg:p-8 space-y-3 relative z-10 flex-1 overflow-y-auto">
        {menuItems.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            style={{ animationDelay: `${index * 50}ms` }}
            className={({ isActive }) =>
              `stagger-item flex items-center space-x-4 px-6 py-4 lg:py-5 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-r from-fuchsia-700 to-violet-600 text-white shadow-lg scale-[1.02]'
                  : 'text-zinc-700 hover:bg-white/90 hover:shadow-md hover:text-fuchsia-700 hover:-translate-y-0.5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`transform transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-12'}`}>
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`font-medium text-base ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
                {isActive && (
                  <div className="absolute right-0 w-1.5 h-full bg-white/45 rounded-l-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="relative p-6 lg:p-8 border-t border-zinc-100 bg-white/30 backdrop-blur-sm z-10 mt-auto">
        <div className="flex items-center space-x-3 group cursor-pointer p-3 rounded-xl hover:bg-white/80 transition-all duration-300">
          <div className="w-11 h-11 bg-gradient-to-br from-fuchsia-700 to-violet-600 rounded-full flex items-center justify-center shadow-md transform transition-transform group-hover:scale-105">
            <span className="text-white font-bold font-serif text-lg">A</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-zinc-800 group-hover:text-fuchsia-700 transition-colors">Admin</p>
            <p className="text-xs text-zinc-500">admin@flowers.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
