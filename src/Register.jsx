
import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function Register() {
  
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
        
        {/* Columna Izquierda: Imagen */}
        <div className="hidden lg:block lg:w-1/2 relative bg-gray-900 overflow-hidden">
          <img 
            src="https://i.pinimg.com/736x/c8/95/01/c89501ab4cbb069603de4e9aeb2fa509.jpg" 
            alt="Flores rosadas" 
            className="absolute inset-0 object-cover w-full h-full opacity-80 animate-image-reveal delay-300"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#e91e63]/10 pointer-events-none"></div>
        </div>

        {/* Columna Derecha: Registro */}
        <div className="flex flex-col items-center justify-center w-full p-8 lg:w-1/2 bg-white">
          <div className="w-full max-w-md">
            
            <div className="animate-fade-in-up delay-100 text-center lg:text-left mb-8">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Crear cuenta</h1>
              <p className="text-gray-500 mt-2 font-medium">Únete a nuestra comunidad de amantes de las flores</p>
            </div>

            <form className="space-y-4 animate-fade-in-up delay-200">
              
              {/* Nombre */}
              <div>
                <label className="block mb-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest">Nombre completo</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400 group-focus-within:text-[#e91e63]">
                    <svg className="w-5 h-5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input type="text" className="w-full py-3 pl-11 pr-4 text-sm text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition-all" placeholder="Ej. Juan Pérez" />
                </div>
              </div>

              {/* Correo */}
              <div>
                <label className="block mb-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest">Correo electrónico</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400 group-focus-within:text-[#e91e63]">
                    <svg className="w-5 h-5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input type="email" className="w-full py-3 pl-11 pr-4 text-sm text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition-all" placeholder="tu@email.com" />
                </div>
              </div>

              {/* Teléfono */}
              <div>
                <label className="block mb-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest">Número de teléfono</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400 group-focus-within:text-[#e91e63]">
                    <svg className="w-5 h-5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input type="tel" className="w-full py-3 pl-11 pr-4 text-sm text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition-all" placeholder="+52 55 0000 0000" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Contraseña */}
                <div>
                  <label className="block mb-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest">Contraseña</label>
                  <div className="relative group">
                    <input 
                      type={showPass ? "text" : "password"} 
                      className="w-full py-3 px-4 text-sm text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition-all" 
                      placeholder="••••••••" 
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#e91e63]">
                      {showPass ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirmar */}
                <div>
                  <label className="block mb-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest">Confirmar</label>
                  <div className="relative group">
                    <input 
                      type={showConfirm ? "text" : "password"} 
                      className="w-full py-3 px-4 text-sm text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#e91e63] focus:ring-2 focus:ring-pink-100 transition-all" 
                      placeholder="••••••••" 
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#e91e63]">
                      {showConfirm ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full py-3.5 mt-4 font-bold text-white bg-[#e91e63] rounded-xl shadow-lg shadow-pink-100 hover:bg-pink-700 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95">
                Crear mi cuenta
              </button>
            </form>

            <div className="animate-fade-in-up delay-300 text-center">
              <p className="mt-8 text-sm text-gray-500 font-medium">
                ¿Ya tienes una cuenta? <Link to="/login" className="font-bold text-[#e91e63] hover:text-pink-700 transition-colors">Inicia sesión aquí</Link>
              </p>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}