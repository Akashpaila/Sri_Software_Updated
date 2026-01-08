import { X, Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

interface ContactInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactInfoModal({ isOpen, onClose }: ContactInfoModalProps) {
  if (!isOpen) return null;

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919381132232', '_blank');
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-yellow-500/40 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-scale-in">
        <button
          onClick={onClose}
          className="sticky top-2 sm:top-4 right-2 sm:right-4 z-10 ml-auto mr-2 sm:mr-4 mt-2 sm:mt-4 p-2 rounded-full bg-black/50 hover:bg-yellow-500/20 text-yellow-400 transition-all hover:scale-110 hover:rotate-90 flex items-center justify-center"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl mb-4 shadow-lg shadow-yellow-500/50">
              <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3">
              Get In Touch With Us!
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
              Have questions? We're here to help you start your learning journey
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <div className="bg-yellow-500/5 border border-yellow-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:bg-yellow-500/10 transition-all">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-500/50">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-sm sm:text-base mb-1">Call Us Directly</h3>
                  <p className="text-xs sm:text-sm text-gray-400">Available during office hours</p>
                </div>
              </div>
              <div className="space-y-2 pl-0 sm:pl-16">
                <button
                  onClick={() => handleCall('+919381132232')}
                  className="w-full text-left px-4 py-2.5 bg-black/50 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 font-semibold text-sm sm:text-base transition-all hover:scale-[1.02]"
                >
                  +91 93811 32232
                </button>
                <button
                  onClick={() => handleCall('+917842774730')}
                  className="w-full text-left px-4 py-2.5 bg-black/50 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 font-semibold text-sm sm:text-base transition-all hover:scale-[1.02]"
                >
                  +91 78427 74730
                </button>
              </div>
            </div>

            <div className="bg-green-500/5 border border-green-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:bg-green-500/10 transition-all">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/50">
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-sm sm:text-base mb-1">WhatsApp Chat</h3>
                  <p className="text-xs sm:text-sm text-gray-400">Quick response guaranteed</p>
                </div>
              </div>
              <button
                onClick={handleWhatsApp}
                className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-bold text-sm sm:text-base shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all hover:scale-[1.02]"
              >
                Chat on WhatsApp
              </button>
            </div>

            <div className="bg-yellow-500/5 border border-yellow-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:bg-yellow-500/10 transition-all">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-500/50">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-sm sm:text-base mb-1">Email Us</h3>
                  <p className="text-xs sm:text-sm text-gray-400">We'll respond within 24 hours</p>
                </div>
              </div>
              <div className="space-y-2 pl-0 sm:pl-16">
                <button
                  onClick={() => handleEmail('info@srisoftware.com')}
                  className="w-full text-left px-4 py-2.5 bg-black/50 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 font-medium text-xs sm:text-sm transition-all hover:scale-[1.02] break-all"
                >
                  info@srisoftware.com
                </button>
                <button
                  onClick={() => handleEmail('ssstechnocartpvtltd@gmail.com')}
                  className="w-full text-left px-4 py-2.5 bg-black/50 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 font-medium text-xs sm:text-sm transition-all hover:scale-[1.02] break-all"
                >
                  ssstechnocartpvtltd@gmail.com
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-yellow-500/5 border border-yellow-500/30 rounded-xl p-3 sm:p-4">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  </div>
                  <h3 className="font-bold text-white text-xs sm:text-sm">Visit Us</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Siddapura, Whitefield, Bengaluru, Karnataka 560066
                </p>
              </div>

              <div className="bg-yellow-500/5 border border-yellow-500/30 rounded-xl p-3 sm:p-4">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  </div>
                  <h3 className="font-bold text-white text-xs sm:text-sm">Office Hours</h3>
                </div>
                <div className="text-xs sm:text-sm text-gray-400 space-y-1">
                  <p>Mon-Fri: 10 AM - 6 PM</p>
                  <p>Sat: 10 AM - 12 PM</p>
                  <p>Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-4 text-center">
            <p className="text-xs sm:text-sm text-gray-300">
              <span className="text-yellow-400 font-bold">Need immediate assistance?</span>
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>
              Call us now or chat on WhatsApp for instant support!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
