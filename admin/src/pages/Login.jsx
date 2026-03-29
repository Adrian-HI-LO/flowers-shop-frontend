import { LogIn, Package } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen app-shell-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="admin-panel p-8 animate-fade-in-up">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-700 to-violet-600 rounded-full flex items-center justify-center shadow-lg animate-float-slow">
                <Package className="text-white" size={32} />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-zinc-800">Flowers Shop</h1>
            <p className="text-zinc-500 mt-2">Panel de Administración</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="admin@flowers.com"
                className="admin-input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="admin-input"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-primary-500 rounded" />
                <span className="ml-2 text-sm text-gray-600">Recordarme</span>
              </label>
              <a href="#" className="text-sm text-fuchsia-700 hover:text-violet-700 transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="admin-button admin-button-primary w-full flex items-center justify-center space-x-2"
            >
              <LogIn size={20} />
              <span>Iniciar Sesión</span>
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-zinc-500 mt-6">
          © 2026 Flowers Shop. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default Login;
