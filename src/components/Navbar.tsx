import { useState } from 'react';
import { Menu, X, Phone, LogIn } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCall = () => {
    window.location.href = 'tel:+919381132232';
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-yellow-500/30 transition-colors shadow-lg shadow-yellow-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/50 animate-glow">
              <span className="text-black font-bold text-2xl">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold text-yellow-400 leading-tight">
                Sri Software Solution
              </span>
              <span className="text-xs text-yellow-500/80">
                & Techno Cart Pvt. Ltd.
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-300 hover:text-yellow-400 transition-all font-semibold hover:scale-105"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('content')}
              className="text-gray-300 hover:text-yellow-400 transition-all font-semibold hover:scale-105"
            >
              Courses
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-gray-300 hover:text-yellow-400 transition-all font-semibold hover:scale-105"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('leadership')}
              className="text-gray-300 hover:text-yellow-400 transition-all font-semibold hover:scale-105"
            >
              Leadership
            </button>
            <button
              onClick={() => scrollToSection('mentors')}
              className="text-gray-300 hover:text-yellow-400 transition-all font-semibold hover:scale-105"
            >
              Mentors
            </button>
            <button
              onClick={() => scrollToSection('hr-portal')}
              className="text-gray-300 hover:text-yellow-400 transition-all font-semibold hover:scale-105"
            >
              HR Portal
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleCall}
                className="p-2 rounded-full hover:bg-yellow-500/20 transition-all text-yellow-400 hover:scale-110"
                aria-label="Call us"
              >
                <Phone className="w-5 h-5" />
              </button>

              <button
                onClick={() => scrollToSection('login')}
                className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold rounded-lg transition-all shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/70 hover:scale-105"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            </div>
          </div>

          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={handleCall}
              className="p-2 rounded-full hover:bg-yellow-500/20 transition-colors text-yellow-400"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-yellow-400"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-black border-t border-yellow-500/30 animate-fade-in">
          <div className="px-4 py-6 space-y-3">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-yellow-500/20 hover:text-yellow-400 rounded-lg transition-all font-semibold"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('content')}
              className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-yellow-500/20 hover:text-yellow-400 rounded-lg transition-all font-semibold"
            >
              Courses
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-yellow-500/20 hover:text-yellow-400 rounded-lg transition-all font-semibold"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('leadership')}
              className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-yellow-500/20 hover:text-yellow-400 rounded-lg transition-all font-semibold"
            >
              Leadership
            </button>
            <button
              onClick={() => scrollToSection('mentors')}
              className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-yellow-500/20 hover:text-yellow-400 rounded-lg transition-all font-semibold"
            >
              Mentors
            </button>
            <button
              onClick={() => scrollToSection('hr-portal')}
              className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-yellow-500/20 hover:text-yellow-400 rounded-lg transition-all font-semibold"
            >
              HR Portal
            </button>
            <button
              onClick={() => scrollToSection('login')}
              className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold rounded-lg transition-all shadow-lg shadow-yellow-500/50"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
