
import React, { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar'; 

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault(); 
    navigate('/home');
  };

  const handleGoogleLogin = () => {
    console.log("Iniciando sesión con Google...");
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white overflow-hidden">
      
      <style>{`
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes imageReveal { from { opacity: 0; transform: scale(1.05); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in-down { animation: fadeInDown 0.8s ease-out forwards; opacity: 0; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
        .animate-image-reveal { animation: imageReveal 1.2s ease-out forwards; opacity: 0; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
      `}</style>

    
      <Navbar isAuthPage={true} />

      <main className="flex flex-1 relative z-0">
        
        {/* Columna Izquierda: Formulario de Login */}
        <div className="flex flex-col items-center justify-center w-full p-8 lg:w-1/2">
          <div className="w-full max-w-md">
            
            <div className="animate-fade-in-up delay-100 mb-8 text-center lg:text-left">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Bienvenido de nuevo</h1>
              <p className="text-gray-500 mt-2 font-medium">Ingresa a tu cuenta para continuar</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5 animate-fade-in-up delay-200">
              
              {/* Input Correo */}
              <div>
                <label className="block mb-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Correo electrónico
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#e91e63] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input 
                    type="email" 
                    required
                    className="w-full py-3 pl-11 pr-4 text-sm text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition-all hover:bg-white" 
                    placeholder="tu@email.com" 
                  />
                </div>
              </div>

              {/* Input Contraseña*/}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Contraseña
                  </label>
                  <Link to="#" className="text-xs font-bold text-[#e91e63] hover:text-pink-700 transition-colors">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#e91e63] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    className="w-full py-3 pl-11 pr-12 text-sm text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition-all hover:bg-white" 
                    placeholder="••••••••" 
                  />
                  {/* Botón ver contraseña */}
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-[#e91e63] transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Botón Principal */}
              <button 
                type="submit" 
                className="w-full py-3.5 mt-2 font-bold text-white bg-[#e91e63] rounded-xl shadow-lg shadow-pink-100 hover:bg-pink-700 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
              >
                Iniciar sesión
              </button>

              {/* Divisor Visual */}
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-xs font-medium text-gray-400 uppercase tracking-widest">O continúa con</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* Botón de Google */}
              <button 
                type="button" 
                onClick={handleGoogleLogin}
                className="w-full py-3.5 font-bold text-gray-700 bg-white border-2 border-gray-100 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
            </form>

            <div className="animate-fade-in-up delay-300">
              <p className="mt-8 text-sm text-center text-gray-500 font-medium">
                ¿Aún no tienes cuenta? <Link to="/register" className="font-bold text-[#e91e63] hover:text-pink-700 transition-colors">Regístrate aquí</Link>
              </p>
            </div>
            
          </div>
        </div>

        {/* Columna Derecha: Imagen de fondo */}
        <div className="hidden lg:block lg:w-1/2 relative bg-gray-50 overflow-hidden">
          <img 
            src="https://i.pinimg.com/1200x/74/d2/81/74d2816612c404e126d8665f83a4e7be.jpg" 
            alt="Hombre con ramo de rosas" 
            className="absolute inset-0 object-cover w-full h-full opacity-100 animate-image-reveal delay-400"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/20 pointer-events-none"></div>
        </div>

      </main>
    </div>
  );
}