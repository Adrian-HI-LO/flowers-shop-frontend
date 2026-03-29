import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import Modal from '../components/common/Modal';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(formData.email, formData.password);
      setShowModal(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setError('Credenciales inválidas. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-gold-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="card p-8">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-gold-500 rounded-full flex items-center justify-center">
                <span className="text-white font-serif text-2xl">🌸</span>
              </div>
              <span className="font-serif text-3xl font-bold bg-gradient-to-r from-primary-500 to-gold-500 bg-clip-text text-transparent">
                FlowerShop
              </span>
            </Link>
            <h2 className="text-2xl font-serif font-bold text-dark-900 mb-2">
              Bienvenido de vuelta
            </h2>
            <p className="text-gray-600">
              Ingresa a tu cuenta para continuar
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark-700 mb-2">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark-700 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-gray-700">Recordarme</span>
              </label>
              <Link to="/forgot-password" className="text-primary-500 hover:text-primary-600">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full flex items-center justify-center space-x-2"
            >
              <LogIn size={20} />
              <span>{loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}</span>
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">o</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="text-center">
            <p className="text-gray-700">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="text-primary-500 hover:text-primary-600 font-semibold">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="¡Bienvenido!"
        type="success"
      >
        <p className="text-gray-700 text-center">
          Has iniciado sesión exitosamente. Redirigiendo...
        </p>
      </Modal>
    </div>
  );
};

export default Login;
