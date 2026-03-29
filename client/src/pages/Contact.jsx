import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Modal from '../components/common/Modal';
import FloatingPetals from '../components/animations/FloatingPetals';
import ContactScrollAnimation from '../components/animations/ContactScrollAnimation';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es requerido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    setShowModal(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setErrors({});
  };

  return (
    <>
      <ContactScrollAnimation />

      <div className="min-h-screen bg-linear-to-b from-white to-primary-50">
        <FloatingPetals count={8} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="title-elegant mb-4">Contáctanos</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o necesitas ayuda? Estamos aquí para ti
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="card p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-gold-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Dirección</h3>
                  <p className="text-gray-600">
                    Jilotepec de Molina Enriquez
                  </p>
                  <a
                    href="https://www.google.com/maps/place/Jilotepec+de+Molina+Enriquez,+M%C3%A9x./@19.9615425,-99.5457215,14z/data=!3m1!4b1!4m6!3m5!1s0x85d1f7a5a5a5a5a5:0x5a5a5a5a5a5a5a5a!8m2!3d19.9615425!4d-99.5457215!16s%2Fg%2F11c5j5j5j5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:text-primary-600 text-sm mt-2 inline-block"
                  >
                    Ver en el mapa
                  </a>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-gold-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Teléfono</h3>
                  <p className="text-gray-600">
                    En desarrollo
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-gold-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:gmendozamonroy058@gmail.com" className="hover:text-primary-500 transition-colors">
                      gmendozamonroy058@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-gold-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Horario</h3>
                  <p className="text-gray-600">
                    En desarrollo
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="card p-8">
              <h2 className="text-2xl font-serif font-bold mb-6">Envíanos un Mensaje</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      className={`input ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Juan Pérez"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      className={`input ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Teléfono (Opcional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="input"
                    placeholder="+52 (55) 1234-5678"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Asunto *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    className={`input ${errors.subject ? 'border-red-500' : ''}`}
                    placeholder="¿En qué podemos ayudarte?"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    name="message"
                    rows="6"
                    className={`input ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Escribe tu mensaje aquí..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full text-lg inline-flex items-center justify-center"
                >
                  <Send size={20} className="mr-2" />
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="card overflow-hidden">
            <h2 className="text-2xl font-serif font-bold mb-6 p-8 pb-0">Nuestra Ubicación</h2>
            <div className="w-full h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30089.51894577289!2d-99.54572145!3d19.96154249999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f7e8a5a5a5a5%3A0x5a5a5a5a5a5a5a5a!2sJilotepec%20de%20Molina%20Enriquez%2C%20M%C3%A9x.!5e0!3m2!1ses!2smx!4v1620000000000!5m2!1ses!2smx"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de ubicación - Jilotepec de Molina Enriquez"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="¡Mensaje Enviado!"
        type="success"
      >
        <div className="text-center">
          <p className="text-gray-700 mb-4">
            Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos
            lo más pronto posible.
          </p>
          <p className="text-sm text-gray-600">
            Normalmente respondemos en menos de 24 horas.
          </p>
        </div>
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
    </>
  );
};

export default Contact;
