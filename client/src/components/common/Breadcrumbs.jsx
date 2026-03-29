import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const routeNames = {
    'packages': 'Paquetes',
    'categories': 'Categorías',
    'custom': 'Personalizar',
    'cart': 'Carrito',
    'login': 'Iniciar Sesión',
    'register': 'Registrarse',
    'profile': 'Perfil',
    'orders': 'Mis Pedidos',
    'favorites': 'Favoritos',
    'about': 'Nosotros',
    'contact': 'Contacto',
    'checkout': 'Pagar',
  };

  if (pathnames.length === 0) return null;

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              to="/"
              className="flex items-center text-gray-500 hover:text-primary-500 transition-colors"
            >
              <Home className="w-4 h-4" />
            </Link>
          </li>

          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const displayName = routeNames[name] || decodeURIComponent(name).replace(/-/g, ' ');

            return (
              <li key={routeTo} className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                {isLast ? (
                  <span className="text-gray-900 font-medium capitalize">
                    {displayName}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-gray-500 hover:text-primary-500 transition-colors capitalize"
                  >
                    {displayName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
