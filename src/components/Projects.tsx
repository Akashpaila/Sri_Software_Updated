import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-featured online shopping platform with payment integration and admin dashboard',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Healthcare Management System',
    description: 'Patient management system with appointment scheduling and medical records',
    tech: ['React', 'Express', 'PostgreSQL', 'Socket.io'],
    image: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for tracking social media metrics and engagement',
    tech: ['Vue.js', 'Python', 'FastAPI', 'Redis'],
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'AI Chatbot Assistant',
    description: 'Intelligent chatbot using natural language processing for customer support',
    tech: ['Python', 'TensorFlow', 'React', 'WebSocket'],
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Task Management App',
    description: 'Collaborative project management tool with real-time updates',
    tech: ['Next.js', 'Supabase', 'Tailwind', 'TypeScript'],
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Fitness Tracking Platform',
    description: 'Mobile-first fitness app with workout plans and progress tracking',
    tech: ['React Native', 'Firebase', 'Redux', 'Chart.js'],
    image: 'https://images.pexels.com/photos/4162483/pexels-photo-4162483.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-16 md:py-20 bg-gray-950 border-t border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 rounded-full text-sm font-bold shadow-lg shadow-yellow-500/30">
            Student Projects
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Real-World Projects
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Our students build production-ready applications using cutting-edge technologies
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-gray-900 rounded-2xl overflow-hidden border border-yellow-500/20 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <button className="p-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg transition-all hover:scale-110 shadow-lg">
                      <ExternalLink className="w-5 h-5 text-black" />
                    </button>
                    <button className="p-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg transition-all hover:scale-110 shadow-lg">
                      <Github className="w-5 h-5 text-black" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
