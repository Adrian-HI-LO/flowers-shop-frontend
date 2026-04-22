
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ isAuthPage = false, cartCount = 0 }) {
  const location = useLocation();
  const isRegisterPage = location.pathname === '/register';
  
  // Estado para controlar el menú desplegable del usuario
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  // Referencia para detectar clics fuera del menú y cerrarlo
  const menuRef = useRef(null);

  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { name: "Catálogo", path: "/catalogo" },
    { name: "Personalizar", path: "/personalizar" },
    { name: "Portafolio", path: "/portafolio" },
    { name: "Promociones", path: "/promociones" },
  ];

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* --- LOGO --- */}
      <Link to="/home" className="flex items-center gap-2 cursor-pointer group">
        <svg className="w-6 h-6 text-[#e91e63] transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
        <span className="text-xl font-bold text-gray-900 tracking-tight">Florería Elegante</span>
      </Link>

      {!isAuthPage ? (
        <>
          {/* Enlaces Centrales */}
          <div className="hidden gap-8 text-sm font-medium text-gray-600 md:flex">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className={`relative group transition-colors py-1 ${isActive ? 'text-[#e91e63] font-bold' : 'hover:text-[#e91e63]'}`}
                >
                  {item.name}
                  <span className={`absolute left-0 bottom-0 h-[2px] bg-[#e91e63] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              );
            })}
          </div>

          {/* Acciones de Usuario */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Botón de Favoritos */}
            <Link 
              to="/favoritos" 
              className={`p-2 rounded-full transition-all ${location.pathname === '/favoritos' ? 'bg-pink-50 text-[#e91e63]' : 'text-gray-600 hover:bg-gray-50'}`}
              title="Mis Favoritos"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>

            {/* Carrito */}
            <Link 
              to="/carrito" 
              className={`relative group p-2 rounded-full transition-all ${
                location.pathname === '/carrito' 
                ? 'bg-pink-50 text-[#e91e63]' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-[#e91e63]'
              }`}
              title="Mi Carrito"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              
              <span className="absolute top-1 right-1 bg-[#e91e63] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border-2 border-white">
                {cartCount}
              </span>
            </Link>

            {/* --- MENÚ DE USUARIO DESPLEGABLE --- */}
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`p-2 rounded-full transition-all focus:outline-none ${
                  isUserMenuOpen || location.pathname === '/perfil' || location.pathname === '/historial'
                  ? 'bg-pink-50 text-[#e91e63]' 
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
                title="Mi Cuenta"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in z-50">
                  <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                    <p className="text-sm font-bold text-gray-900">Hola, Usuario</p>
                    <p className="text-xs text-gray-500 font-medium">Gestiona tu cuenta</p>
                  </div>
                  
                  <div className="p-2 space-y-1">
                    <Link 
                      to="/perfil"
                      onClick={() => setIsUserMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        location.pathname === '/perfil' ? 'bg-pink-50 text-[#e91e63]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      Mi Perfil
                    </Link>
                    
                    <Link 
                      to="/historial"
                      onClick={() => setIsUserMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        location.pathname === '/historial' ? 'bg-pink-50 text-[#e91e63]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Historial de Compras
                    </Link>
                  </div>

                  <div className="p-2 border-t border-gray-50">
                    <button 
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="hidden gap-4 text-sm md:flex items-center ml-2 border-l border-gray-100 pl-6">
              <Link to="/login" className="font-bold text-gray-700 hover:text-[#e91e63] transition-colors">Entrar</Link>
              <Link 
                to="/register" 
                className="px-5 py-2.5 font-bold text-white bg-[#e91e63] rounded-full hover:bg-pink-700 transition-all shadow-md shadow-pink-100 active:scale-95 text-xs"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-4 text-sm">
          <span className="hidden md:inline text-gray-500 font-medium">
            {isRegisterPage ? '¿Ya tienes cuenta?' : '¿Nuevo por aquí?'}
          </span>
          <Link 
            to={isRegisterPage ? "/login" : "/register"} 
            className="px-6 py-2.5 font-bold text-[#e91e63] bg-pink-50 rounded-full hover:bg-pink-100 transition-all active:scale-95"
          >
            {isRegisterPage ? "Iniciar sesión" : "Crear cuenta"}
          </Link>
        </div>
      )}
    </nav>
  );
}