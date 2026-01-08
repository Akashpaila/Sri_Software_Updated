import { useState } from 'react';
import { X, MessageCircle, FileText } from 'lucide-react';
import RegistrationForm from './RegistrationForm';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [showForm, setShowForm] = useState(false);

  if (!isOpen) return null;

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      'Hello! I would like to register for a course at Sri Software Solution & Techno Cart Pvt. Ltd.'
    );
    window.open(`https://wa.me/919381132232?text=${message}`, '_blank');
    onClose();
  };

  const handleFormRegistration = () => {
    setShowForm(true);
  };

  const handleBackToOptions = () => {
    setShowForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl">
        <button
          onClick={onClose}
          className="sticky top-2 sm:top-4 right-2 sm:right-4 z-10 ml-auto mr-2 sm:mr-4 mt-2 sm:mt-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors flex items-center justify-center"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {!showForm ? (
          <div className="p-4 sm:p-6 md:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                Choose Registration Method
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Select your preferred way to register for our courses
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <button
                onClick={handleWhatsApp}
                className="group relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2">WhatsApp</h3>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                    Quick registration via WhatsApp. Chat with our team instantly.
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button
                onClick={handleFormRegistration}
                className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2">Online Form</h3>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                    Fill out our detailed registration form online.
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </div>
        ) : (
          <RegistrationForm onBack={handleBackToOptions} onClose={onClose} />
        )}
      </div>
    </div>
  );
}
