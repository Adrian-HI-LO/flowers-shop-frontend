import { Bell, Search, Menu, Flower2 } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-24 glass-surface border-b border-white/60 flex items-center justify-between px-8 lg:px-12 shadow-[0_10px_30px_-28px_rgba(15,23,42,0.8)] relative shrink-0 z-30">
      <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-fuchsia-50/20 pointer-events-none" />
      
      <div className="flex items-center space-x-6 relative z-10">
        <button className="lg:hidden p-2 hover:bg-zinc-100 rounded-xl transition-all duration-300 hover:scale-105">
          <Menu size={20} className="text-zinc-600" />
        </button>
        
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 transition-all duration-300 group-hover:text-fuchsia-600" size={18} />
          <input
            type="text"
            placeholder="Buscar productos, pedidos..."
            className="pl-12 pr-6 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:border-fuchsia-300 focus:shadow-lg focus:shadow-fuchsia-100/60 transition-all duration-300 w-96 bg-white/80 backdrop-blur-sm hover:bg-white text-sm"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6 relative z-10">
        <button className="relative p-3 hover:bg-zinc-100 rounded-xl transition-all duration-300 group hover:-translate-y-0.5">
          <Bell size={22} className="text-zinc-700 group-hover:text-fuchsia-700" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-br from-fuchsia-500 to-violet-500 rounded-full animate-pulse-soft shadow" />
        </button>

        <div className="flex items-center space-x-2.5 bg-white/75 px-5 py-2.5 rounded-xl border border-zinc-200">
          <Flower2 size={16} className="text-fuchsia-600" />
          <span className="text-sm font-medium text-zinc-700">
            {new Date().toLocaleDateString('es-ES', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
