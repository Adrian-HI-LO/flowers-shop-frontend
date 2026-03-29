import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

const WhatsAppButton = ({ phoneNumber = '525512345678', message = '¡Hola! Me gustaría obtener más información sobre sus productos.' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />

        <div className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap shadow-lg transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          ¿Necesitas ayuda? ¡Escríbenos!
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-8 border-transparent border-l-gray-900"></div>
        </div>
      </button>

      <div className="fixed bottom-6 right-6 z-30 pointer-events-none">
        <div className="w-16 h-16 sm:w-18 sm:h-18 bg-green-500 rounded-full animate-ping opacity-20"></div>
      </div>
    </>
  );
};

export default WhatsAppButton;
