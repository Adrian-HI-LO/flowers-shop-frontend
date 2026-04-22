
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProfileForm from './components/Perfil/ProfileForm';


const AVATARS = [
  { id: 1, name: "Digital Flora", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Aneka" },
  { id: 2, name: "Cyber Petal", url: "https://api.dicebear.com/9.x/adventurer/svg?hair=long03" },
  { id: 3, name: "Neon Root", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Jude" },
  { id: 4, name: "Zen Coder", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sara" },
  { id: 5, name: "Astro Bloom", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Brian" },
  { id: 6, name: "Quantum Leaf", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Leo" },
  { id: 7, name: "Stellar Rose", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Aidan" },
  { id: 8, name: "Urban Seed", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Wyatt" },
  { id: 9, name: "Meta Garden", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Alexander" },
  { id: 10, name: "Pixel Orchid", url: "https://api.dicebear.com/9.x/adventurer/svg?seed=Jack" }
];

export default function Perfil() {
  const [userData, setUserData] = useState({
    nombre: "Jesús Martínez",
    email: "jesus.martinez@novacode.com",
    telefono: "+52 55 9876 5432",
    ciudad: "Ciudad de México, MX",
    avatar: AVATARS[0].url, 
    avatarName: AVATARS[0].name
  });

  const [showAvatarSelector, setShowAvatarSelector] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUpdate = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const selectAvatar = (av) => {
    setUserData(prev => ({ ...prev, avatar: av.url, avatarName: av.name }));
    setShowAvatarSelector(false);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-gray-900 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12">
        
        {/* --- BANNER DE BIENVENIDA --- */}
        <div className="relative mb-12 bg-white rounded-[3rem] p-10 md:p-16 shadow-xl shadow-pink-50/50 border border-gray-100 overflow-hidden text-center md:text-left animate-fade-in">
         
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-pink-100/40 to-blue-100/30 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            
            {/* Avatar Principal */}
            <div className="relative group cursor-pointer" onClick={() => setShowAvatarSelector(true)}>
              <div className="w-44 h-44 rounded-full p-2 bg-white border-4 border-[#e91e63] shadow-xl transition-transform duration-500 group-hover:scale-105">
                <img 
                  src={userData.avatar} 
                  alt={userData.avatarName} 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              
              {/* Etiqueta del nombre del avatar con color resaltado */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#e91e63] px-4 py-1.5 rounded-full shadow-lg border-2 border-white whitespace-nowrap">
                <span className="text-[10px] font-black uppercase tracking-widest text-white">
                  {userData.avatarName}
                </span>
              </div>
              
              {/* Botón de edición flotante */}
              <div className="absolute top-2 right-2 bg-white p-2.5 rounded-full shadow-lg text-[#e91e63] border border-gray-100 transition-all hover:scale-110">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            </div>

            {/* Texto de Bienvenida con colores resaltados */}
            <div className="space-y-4 mt-4 md:mt-0">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900">
                ¡Hola, <span className="text-[#e91e63]">{userData.nombre.split(' ')[0]}!</span>
              </h1>
              <p className="text-gray-500 text-lg font-medium max-w-md leading-relaxed">
                Personaliza tu perfil y selecciona el <span className="text-[#e91e63] font-bold">avatar</span> que mejor te represente hoy en <span className="italic">Florería Elegante</span>.
              </p>
            </div>
          </div>
        </div>

        {/* --- SELECTOR DE AVATARS (MODAL) --- */}
        {showAvatarSelector && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-fade-in">
            <div className="bg-white rounded-[3.5rem] w-full max-w-4xl p-8 md:p-12 shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-10 px-4">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">Elige tu Avatar</h2>
                  <p className="text-gray-500 font-medium">Selecciona el estilo que mejor te represente hoy</p>
                </div>
                <button onClick={() => setShowAvatarSelector(false)} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-6">
                {AVATARS.map((av) => (
                  <button 
                    key={av.id} 
                    onClick={() => selectAvatar(av)}
                    className="flex flex-col items-center group relative"
                  >
                    <div className={`w-28 h-28 rounded-full border-4 bg-white p-1 transition-all duration-300 relative z-10 ${userData.avatar === av.url ? 'border-[#e91e63] shadow-lg scale-110' : 'border-transparent hover:border-gray-200'}`}>
                      <img src={av.url} alt={av.name} className="w-full h-full rounded-full object-cover" />
                    </div>
                    
                    <span className={`mt-4 text-[10px] font-black uppercase tracking-widest text-center leading-tight transition-colors ${userData.avatar === av.url ? 'text-[#e91e63]' : 'text-gray-400 group-hover:text-gray-900'}`}>
                      {av.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="animate-fade-in-up">
          <ProfileForm userData={userData} onUpdate={handleUpdate} />
        </div>

        <div className="mt-16 flex justify-center border-t border-gray-100 pt-10">
          <button className="flex items-center gap-3 px-10 py-4 text-gray-400 font-black tracking-widest text-xs hover:text-red-500 transition-all active:scale-95 group">
            <div className="p-2 rounded-xl group-hover:bg-red-50 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            CERRAR SESIÓN
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}