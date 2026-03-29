import { Save } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6 page-enter">
      <div>
        <h1 className="text-2xl font-bold text-zinc-800">Configuración</h1>
        <p className="text-zinc-500">Ajusta la configuración de tu tienda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="admin-card">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Información General</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Tienda</label>
              <input type="text" placeholder="Nombre de la tienda" className="admin-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email de Contacto</label>
              <input type="email" placeholder="correo@tudominio.com" className="admin-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
              <input type="tel" placeholder="Teléfono" className="admin-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
              <textarea rows="3" placeholder="Dirección" className="admin-input"></textarea>
            </div>
          </div>
        </div>

        <div className="admin-card" style={{ animationDelay: '60ms' }}>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Horarios de Atención</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lunes a Viernes</label>
              <input type="text" placeholder="Horario" className="admin-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sábados</label>
              <input type="text" placeholder="Horario" className="admin-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Domingos</label>
              <input type="text" placeholder="Horario" className="admin-input" />
            </div>
          </div>
        </div>

        <div className="admin-card" style={{ animationDelay: '90ms' }}>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">WhatsApp Business</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Número de WhatsApp</label>
              <input type="tel" placeholder="Número de WhatsApp" className="admin-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje Predeterminado</label>
              <textarea rows="4" placeholder="Mensaje automático" className="admin-input"></textarea>
            </div>
          </div>
        </div>

        <div className="admin-card" style={{ animationDelay: '120ms' }}>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Envíos</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Costo de Envío Estándar</label>
              <input type="number" placeholder="0" className="admin-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Envío Gratis desde</label>
              <input type="number" placeholder="0" className="admin-input" />
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-500" />
                <span className="text-sm text-gray-700">Envío el mismo día disponible</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="admin-button admin-button-primary flex items-center space-x-2">
          <Save size={20} />
          <span>Guardar Cambios</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;
