import { Code, Database, Cloud, Smartphone, Globe, Brain } from 'lucide-react';

const courses = [
  {
    icon: Code,
    title: 'Full Stack Development',
    description: 'Master React, Node.js, and modern web technologies',
    duration: '6 Months',
    level: 'Beginner to Advanced',
    iconColor: 'from-blue-400 to-blue-600',
    iconBg: 'bg-blue-500/10',
    iconBorder: 'border-blue-500/30',
  },
  {
    icon: Database,
    title: 'Data Science & AI',
    description: 'Learn Python, Machine Learning, and Deep Learning',
    duration: '8 Months',
    level: 'Intermediate',
    iconColor: 'from-purple-400 to-purple-600',
    iconBg: 'bg-purple-500/10',
    iconBorder: 'border-purple-500/30',
  },
  {
    icon: Cloud,
    title: 'Cloud Computing',
    description: 'AWS, Azure, and DevOps fundamentals',
    duration: '4 Months',
    level: 'Intermediate',
    iconColor: 'from-orange-400 to-orange-600',
    iconBg: 'bg-orange-500/10',
    iconBorder: 'border-orange-500/30',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Build apps with React Native and Flutter',
    duration: '5 Months',
    level: 'Beginner to Advanced',
    iconColor: 'from-green-400 to-green-600',
    iconBg: 'bg-green-500/10',
    iconBorder: 'border-green-500/30',
  },
  {
    icon: Globe,
    title: 'UI/UX Design',
    description: 'Master Figma, design principles, and prototyping',
    duration: '3 Months',
    level: 'Beginner',
    iconColor: 'from-pink-400 to-pink-600',
    iconBg: 'bg-pink-500/10',
    iconBorder: 'border-pink-500/30',
  },
  {
    icon: Brain,
    title: 'Cybersecurity',
    description: 'Ethical hacking, network security, and more',
    duration: '6 Months',
    level: 'Advanced',
    iconColor: 'from-red-400 to-red-600',
    iconBg: 'bg-red-500/10',
    iconBorder: 'border-red-500/30',
  },
];

export default function Content() {
  return (
    <section id="content" className="py-16 md:py-20 bg-black border-t border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 rounded-full text-sm font-bold shadow-lg shadow-yellow-500/30">
            Our Courses
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Choose Your Learning Path
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Industry-aligned curriculum designed by experts to make you job-ready
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-yellow-500/20 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${course.iconColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg`}>
                <course.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                {course.title}
              </h3>

              <p className="text-gray-400 mb-6 leading-relaxed">
                {course.description}
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-semibold text-yellow-400">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Level:</span>
                  <span className="font-semibold text-yellow-400">{course.level}</span>
                </div>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-500/50 transition-all transform hover:scale-105">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
