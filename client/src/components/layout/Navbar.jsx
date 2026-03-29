import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { authService } from '../../services/authService';
import { cartService } from '../../services/cartService';
import { favoritesService } from '../../services/favoritesService';
import SearchModal from '../common/SearchModal';
import { useFadeInUp } from '../../hooks/useGSAP';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();
  const [cartCount, setCartCount] = useState(cartService.getItemCount());
  const [favoritesCount, setFavoritesCount] = useState(favoritesService.getCount());

  const navRef = useFadeInUp(0.1);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  useState(() => {
    const updateCartCount = () => {
      setCartCount(cartService.getItemCount());
    };

    const updateFavoritesCount = () => {
      setFavoritesCount(favoritesService.getCount());
    };

    window.addEventListener('cartUpdated', updateCartCount);
    window.addEventListener('favoritesUpdated', updateFavoritesCount);
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('favoritesUpdated', updateFavoritesCount);
    };
  });

  return (
    <nav ref={navRef} className="bg-white shadow-elegant sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-full flex items-center justify-center animate-pulse-slow" style={{ background: 'linear-gradient(135deg, #FF69B4, #FFD700)' }}>
              <span className="text-white font-serif text-xl">🌸</span>
            </div>
            <span className="font-serif text-2xl font-bold logo-gradient">
              FlowerShop
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/packages" className={`nav-link ${location.pathname === '/packages' ? 'active' : ''}`}>
              Paquetes
            </Link>
            <Link to="/custom" className={`nav-link ${location.pathname === '/custom' ? 'active' : ''}`}>
              Personalizar
            </Link>
            <Link to="/categories" className={`nav-link ${location.pathname === '/categories' ? 'active' : ''}`}>
              Categorías
            </Link>
            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
              Nosotros
            </Link>
            <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
              Contacto
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-dark-700 hover:text-primary-500 transition-colors"
            >
              <Search size={20} />
            </button>

            <Link to="/favorites" className="p-2 text-dark-700 hover:text-primary-500 transition-colors relative">
              <Heart size={20} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="p-2 text-dark-700 hover:text-primary-500 transition-colors relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-2 text-dark-700 hover:text-primary-500 transition-colors flex items-center space-x-2"
                >
                  <User size={20} />
                  <span className="text-sm">{user?.firstName}</span>
                </button>
                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsUserMenuOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-dark-700 hover:bg-primary-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Mi Perfil
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-dark-700 hover:bg-primary-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Mis Pedidos
                      </Link>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          handleLogout();
                        }}
                        className="block w-full text-left px-4 py-2 text-dark-700 hover:bg-primary-50"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="btn btn-secondary py-2 px-4">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="btn btn-primary py-2 px-4">
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 text-dark-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                to="/packages"
                className={`text-dark-700 hover:text-primary-500 font-medium ${location.pathname === '/packages' ? 'text-primary-500' : ''}`}
              >
                Paquetes
              </Link>
              <Link
                to="/custom"
                className={`text-dark-700 hover:text-primary-500 font-medium ${location.pathname === '/custom' ? 'text-primary-500' : ''}`}
              >
                Personalizar
              </Link>
              <Link
                to="/categories"
                className={`text-dark-700 hover:text-primary-500 font-medium ${location.pathname === '/categories' ? 'text-primary-500' : ''}`}
              >
                Categorías
              </Link>
              <Link
                to="/about"
                className={`text-dark-700 hover:text-primary-500 font-medium ${location.pathname === '/about' ? 'text-primary-500' : ''}`}
              >
                Nosotros
              </Link>
              <Link
                to="/contact"
                className={`text-dark-700 hover:text-primary-500 font-medium ${location.pathname === '/contact' ? 'text-primary-500' : ''}`}
              >
                Contacto
              </Link>

              <div className="border-t pt-4 flex flex-col space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="btn btn-secondary">
                      Mi Perfil
                    </Link>
                    <Link to="/orders" className="btn btn-secondary">
                      Mis Pedidos
                    </Link>
                    <button onClick={handleLogout} className="btn btn-outline">
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-secondary">
                      Iniciar Sesión
                    </Link>
                    <Link to="/register" className="btn btn-primary">
                      Registrarse
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
};

export default Navbar;
