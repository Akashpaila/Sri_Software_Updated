import { Mail, MapPin, Phone, UserPlus } from 'lucide-react';

interface ContactProps {
  onRegisterClick: () => void;
}

export default function Contact({ onRegisterClick }: ContactProps) {
  return (
    <section id="contact" className="py-16 md:py-20 bg-gray-950 border-t border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 rounded-full text-sm font-bold shadow-lg shadow-yellow-500/30">
            Get In Touch
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Contact Us
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to start your journey? Get in touch with us today
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
          <div className="space-y-6 md:space-y-8">
            <div className="flex items-start space-x-4 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl hover:bg-yellow-500/10 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-500/50">
                <MapPin className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Our Location</h3>
                <p className="text-gray-400">
                  Siddapura, Whitefield, Bengaluru,<br />
                  Karnataka District, 560066 India
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl hover:bg-yellow-500/10 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-500/50">
                <Phone className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Phone Number</h3>
                <p className="text-gray-400">
                  +91 93811 32232<br />
                  +91 78427 74730
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl hover:bg-yellow-500/10 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-500/50">
                <Mail className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Email Address</h3>
                <p className="text-gray-400">
                  info@srisoftware.com<br />
                  ssstechnocartpvtltd@gmail.com
                </p>
              </div>
            </div>

            <div className="pt-6 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
              <h3 className="font-bold text-white mb-4">Office Hours</h3>
              <div className="space-y-2 text-gray-400">
                <p>Monday - Friday: 10:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 12:00 AM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 md:p-8 border border-yellow-500/30 shadow-2xl shadow-yellow-500/20">
            <h3 className="text-2xl font-bold text-white mb-6">
              Send us a message
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-black border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white transition-all placeholder-gray-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-black border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white transition-all placeholder-gray-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-black border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white transition-all resize-none placeholder-gray-500"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black rounded-lg font-bold transition-all shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/70"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onRegisterClick}
            className="group inline-flex items-center justify-center space-x-3 px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black rounded-2xl font-bold text-base md:text-lg transition-all transform hover:scale-105 shadow-2xl shadow-yellow-500/50 hover:shadow-yellow-500/70 animate-glow"
          >
            <UserPlus className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform" />
            <span>Register Now</span>
          </button>
          <p className="mt-4 text-sm text-gray-400">
            Click to choose your preferred registration method
          </p>
        </div>
      </div>
    </section>
  );
}
