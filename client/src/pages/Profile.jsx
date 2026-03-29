import { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, X } from 'lucide-react';
import { authService } from '../services/authService';
import Modal from '../components/common/Modal';

const Profile = () => {
  const user = authService.getCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {

      const updatedUser = { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setShowModal(true);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error al actualizar el perfil');
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="title-elegant mb-4">Mi Perfil</h1>
          <p className="text-lg text-gray-600">
            Administra tu información personal
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="card p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={48} className="text-white" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-dark-900 mb-2">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-600 mb-4">{user?.email}</p>
              <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                {user?.role === 'admin' ? 'Administrador' : 'Cliente'}
              </div>
            </div>

            <div className="card p-6 mt-6">
              <h3 className="font-semibold text-lg mb-4">Estadísticas</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pedidos totales</span>
                  <span className="font-bold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total gastado</span>
                  <span className="font-bold">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Miembro desde</span>
                  <span className="font-bold">2026</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-dark-900">
                  Información Personal
                </h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-secondary inline-flex items-center"
                  >
                    <Edit2 size={18} className="mr-2" />
                    Editar
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="btn btn-primary inline-flex items-center"
                    >
                      <Save size={18} className="mr-2" />
                      Guardar
                    </button>
                    <button
                      onClick={handleCancel}
                      className="btn btn-outline inline-flex items-center"
                    >
                      <X size={18} className="mr-2" />
                      Cancelar
                    </button>
                  </div>
                )}
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="input"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Apellido
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="input"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    <Mail size={16} className="inline mr-2" />
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    <Phone size={16} className="inline mr-2" />
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="input"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </form>
            </div>

            <div className="card p-6 mt-6">
              <h2 className="text-2xl font-serif font-bold text-dark-900 mb-6">
                Direcciones de Entrega
              </h2>
              <div className="text-center py-8 text-gray-500">
                <MapPin size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No tienes direcciones guardadas</p>
                <button className="btn btn-primary mt-4">
                  Agregar Dirección
                </button>
              </div>
            </div>

            <div className="card p-6 mt-6">
              <h2 className="text-2xl font-serif font-bold text-dark-900 mb-6">
                Seguridad
              </h2>
              <button className="btn btn-secondary">
                Cambiar Contraseña
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="¡Perfil Actualizado!"
        type="success"
      >
        <p className="text-gray-700 text-center">
          Tu información de perfil ha sido actualizada exitosamente.
        </p>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowModal(false)}
            className="btn btn-primary"
          >
            Aceptar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
