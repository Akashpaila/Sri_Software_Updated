import { X, Phone, MessageSquare, UserPlus, Code, Database, Cloud, Smartphone, Globe, Award } from 'lucide-react';

interface RequestCallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
}

export default function RequestCallbackModal({ isOpen, onClose, onRegisterClick }: RequestCallbackModalProps) {
  if (!isOpen) return null;

  const handleWhatsApp = () => {
    window.open('https://wa.me/919381132232', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+919381132232';
  };

  const skills = [
    { icon: Code, label: 'Full Stack Development', color: 'from-blue-400 to-blue-600' },
    { icon: Database, label: 'Data Science & AI', color: 'from-purple-400 to-purple-600' },
    { icon: Cloud, label: 'Cloud Computing', color: 'from-orange-400 to-orange-600' },
    { icon: Smartphone, label: 'Mobile Development', color: 'from-green-400 to-green-600' },
    { icon: Globe, label: 'UI/UX Design', color: 'from-pink-400 to-pink-600' },
    { icon: Award, label: 'Cybersecurity', color: 'from-red-400 to-red-600' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-5xl bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl shadow-yellow-500/30 border-2 border-yellow-500/40 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-scale-in">
        <button
          onClick={onClose}
          className="sticky top-2 sm:top-4 right-2 sm:right-4 z-10 ml-auto mr-2 sm:mr-4 mt-2 sm:mt-4 p-2 rounded-full bg-black/50 hover:bg-yellow-500/20 text-yellow-400 transition-all hover:scale-110 hover:rotate-90 flex items-center justify-center"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 sm:p-8 md:p-10 border-b md:border-b-0 md:border-r border-yellow-500/20">
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/50 flex-shrink-0">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    Master In-Demand Skills
                  </h2>
                  <p className="text-yellow-400 text-xs sm:text-sm">Sri Software Solution</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Transform your career with industry-leading training programs designed by experts. Learn cutting-edge technologies and get placement support.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-bold text-yellow-400 mb-3 sm:mb-4">Our Technical Programs:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg sm:rounded-xl hover:border-yellow-500/40 transition-all hover:scale-105"
                    >
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${skill.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-300 font-medium leading-tight">{skill.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                <h4 className="text-white font-bold text-sm sm:text-base">Why Choose Us?</h4>
              </div>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Industry-expert trainers with 10+ years experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Hands-on projects and real-world applications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>95% placement assistance with top companies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Flexible batch timings and online/offline options</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-black via-gray-900 to-black p-6 sm:p-8 md:p-10 flex flex-col justify-center">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
                Get Started Today!
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Connect with us now to discuss your career goals and find the perfect course for you. Our team is ready to guide you on your learning journey.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg sm:rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all hover:scale-105"
              >
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span>WhatsApp: +91 93811 32232</span>
              </button>

              <button
                onClick={handleCall}
                className="w-full flex items-center justify-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black rounded-lg sm:rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 transition-all hover:scale-105"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span>Call: +91 93811 32232</span>
              </button>

              <div className="relative my-4 sm:my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-yellow-500/30"></div>
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="px-3 sm:px-4 bg-black text-gray-400">Or register online</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onRegisterClick();
                }}
                className="w-full flex items-center justify-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg sm:rounded-xl font-bold text-sm sm:text-base border-2 border-yellow-500/30 hover:border-yellow-500/50 shadow-lg hover:shadow-yellow-500/20 transition-all hover:scale-105"
              >
                <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span>Online Registration</span>
              </button>
            </div>

            <div className="mt-4 sm:mt-8 p-3 sm:p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg sm:rounded-xl">
              <p className="text-center text-xs sm:text-sm text-gray-300">
                <span className="text-yellow-400 font-bold">Limited Seats Available!</span>
                <br />
                Enroll now and get exclusive early bird discounts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
