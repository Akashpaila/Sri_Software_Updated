import { Code2, Rocket, Award, ArrowRight } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-20 overflow-hidden bg-black">
      <div className="absolute inset-0">
        <ParticleBackground />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-block animate-pulse-yellow">
              <span className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 rounded-full text-sm font-bold shadow-lg shadow-yellow-500/30">
                Welcome to Excellence
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
              Transform Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 animate-gradient">
                Tech Career
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Join India's premier software training institute. Learn from industry experts,
              work on real-world projects, and launch your dream career in technology.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6">
              <button
                onClick={scrollToContact}
                className="group flex items-center justify-center space-x-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/70"
              >
                <span>Enroll Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const element = document.getElementById('content');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 md:px-8 py-3 md:py-4 border-2 border-yellow-500/50 text-yellow-400 rounded-xl font-bold hover:border-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 transition-all"
              >
                Explore Courses
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8">
              <div className="text-center p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg hover:bg-yellow-500/10 transition-all">
                <div className="text-2xl md:text-3xl font-bold text-yellow-400">500+</div>
                <div className="text-xs md:text-sm text-gray-400 mt-1">Students Trained</div>
              </div>
              <div className="text-center p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg hover:bg-yellow-500/10 transition-all">
                <div className="text-2xl md:text-3xl font-bold text-yellow-500">50+</div>
                <div className="text-xs md:text-sm text-gray-400 mt-1">Projects Done</div>
              </div>
              <div className="text-center p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg hover:bg-yellow-500/10 transition-all">
                <div className="text-2xl md:text-3xl font-bold text-yellow-400">95%</div>
                <div className="text-xs md:text-sm text-gray-400 mt-1">Placement Rate</div>
              </div>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="relative z-10 bg-gray-900/80 backdrop-blur-md rounded-3xl shadow-2xl shadow-yellow-500/20 p-6 md:p-8 border border-yellow-500/30">
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl hover:bg-yellow-500/20 transition-all hover:scale-105 cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/50 flex-shrink-0">
                    <Code2 className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Industry-Ready Skills</div>
                    <div className="text-sm text-gray-400">Learn latest technologies</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl hover:bg-yellow-500/20 transition-all hover:scale-105 cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/50 flex-shrink-0">
                    <Rocket className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Live Projects</div>
                    <div className="text-sm text-gray-400">Hands-on experience</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl hover:bg-yellow-500/20 transition-all hover:scale-105 cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/50 flex-shrink-0">
                    <Award className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Certification</div>
                    <div className="text-sm text-gray-400">Industry recognized</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-0 right-0 -z-10 w-64 md:w-96 h-64 md:h-96 bg-yellow-600 rounded-full opacity-20 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 -z-10 w-64 md:w-96 h-64 md:h-96 bg-yellow-500 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
