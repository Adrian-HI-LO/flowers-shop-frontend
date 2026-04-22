
import React from 'react';

export default function ProfileForm({ userData, onUpdate }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate(name, value);
  };

  return (
    <div className="space-y-6 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Información Personal</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombre */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nombre Completo</label>
          <input 
            name="nombre"
            value={userData.nombre}
            onChange={handleChange}
            className="w-full py-3 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-pink-100 focus:border-[#e91e63] outline-none transition-all"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Correo Electrónico</label>
          <input 
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full py-3 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-pink-100 focus:border-[#e91e63] outline-none transition-all"
          />
        </div>

        {/* Teléfono */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Teléfono</label>
          <input 
            name="telefono"
            value={userData.telefono}
            onChange={handleChange}
            className="w-full py-3 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-pink-100 focus:border-[#e91e63] outline-none transition-all"
          />
        </div>

             </div>

      <div className="pt-6 border-t border-gray-50 flex justify-end">
        <button className="px-8 py-3 bg-[#e91e63] text-white font-bold rounded-xl hover:bg-pink-700 transition-all shadow-lg shadow-pink-100 active:scale-95">
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}