import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-yellow-500/30 text-white pt-12 md:pt-16 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/50 animate-glow">
                <span className="text-black font-bold text-xl">S</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight text-yellow-400">
                  Sri Software
                </span>
                <span className="text-xs text-yellow-500/80">
                  & Techno Cart Pvt. Ltd.
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Empowering students with cutting-edge technology education and career opportunities.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="w-10 h-10 bg-yellow-500/10 border border-yellow-500/30 hover:bg-yellow-400 hover:border-yellow-400 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:text-black">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-yellow-500/10 border border-yellow-500/30 hover:bg-yellow-400 hover:border-yellow-400 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:text-black">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-yellow-500/10 border border-yellow-500/30 hover:bg-yellow-400 hover:border-yellow-400 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:text-black">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-yellow-500/10 border border-yellow-500/30 hover:bg-yellow-400 hover:border-yellow-400 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:text-black">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-yellow-500/10 border border-yellow-500/30 hover:bg-yellow-400 hover:border-yellow-400 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:text-black">
                <Youtube className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-yellow-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium">
                  About Us
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium">
                  Courses
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium">
                  Admissions
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium">
                  Placements
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium">
                  Careers
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-yellow-400">Courses</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium">
                  Full Stack Development
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium">
                  Data Science
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium">
                  Cloud Computing
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium">
                  Mobile Development
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium">
                  UI/UX Design
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-yellow-400">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  Siddapura, Whitefield, Bengaluru, Karnataka District, 560066 India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+91 93811 32232</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@srisoftware.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-yellow-500/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              {currentYear} Sri Software Solution & Techno Cart Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium">
                Privacy Policy
              </button>
              <button className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium">
                Terms of Service
              </button>
              <button className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
