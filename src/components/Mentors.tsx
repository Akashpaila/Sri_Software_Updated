import { Linkedin, Twitter, Github } from 'lucide-react';

const mentors = [
  {
    name: 'Dr. Rajesh Kumar',
    role: 'Lead Instructor - Full Stack',
    experience: '12+ years',
    expertise: 'Full Stack Development, System Design, Microservices',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Leading expert in full stack development with extensive experience in building scalable enterprise applications',
  },
  {
    name: 'Priya Sharma',
    role: 'Senior Mentor - Data Science',
    experience: '10+ years',
    expertise: 'Machine Learning, Python, Data Analytics, AI',
    image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Data science expert specializing in machine learning and artificial intelligence solutions',
  },
  {
    name: 'Amit Patel',
    role: 'Cloud Solutions Architect',
    experience: '9+ years',
    expertise: 'AWS, Azure, DevOps, Cloud Infrastructure',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Cloud architecture specialist with deep expertise in designing and implementing scalable cloud solutions',
  },
  {
    name: 'Sneha Reddy',
    role: 'Mobile Development Lead',
    experience: '8+ years',
    expertise: 'React Native, Flutter, iOS, Android',
    image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Mobile app development expert with a track record of delivering high-performance cross-platform applications',
  },
  {
    name: 'Vikram Singh',
    role: 'UI/UX Design Expert',
    experience: '7+ years',
    expertise: 'User Research, Design Systems, Figma, Adobe XD',
    image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Award-winning designer focused on creating intuitive and engaging user experiences',
  },
  {
    name: 'Neha Gupta',
    role: 'Cybersecurity Specialist',
    experience: '9+ years',
    expertise: 'Penetration Testing, Security Audits, OWASP, Ethical Hacking',
    image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Cybersecurity expert dedicated to teaching secure coding practices and threat mitigation',
  },
  {
    name: 'Madhu Kumar',
    role: 'Trainer - Full Stack Development',
    experience: '8+ years',
    expertise: 'React, Node.js, JavaScript, MongoDB',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Experienced full stack developer and passionate trainer, dedicated to helping students master modern web technologies',
  },
  {
    name: 'Sai Teja',
    role: 'Freelancer & Technical Mentor',
    experience: '2+ years',
    expertise: 'Web Development, UI/UX, Project Management',
    image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Freelance developer with hands-on experience in real-world projects, bringing practical industry knowledge to training',
  },
  {
    name: 'P Teja Sri',
    role: 'Support Trainer',
    experience: '2+ years',
    expertise: 'Student Mentoring, Technical Support',
    image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Dedicated to providing exceptional support and guidance to students throughout their learning journey',
  },
];

export default function Mentors() {
  return (
    <section id="mentors" className="py-16 md:py-20 bg-black border-t border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 rounded-full text-sm font-bold shadow-lg shadow-yellow-500/30">
            Expert Mentors
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Learn From The Best
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Industry veterans and passionate trainers dedicated to your success
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {mentors.map((mentor, index) => (
            <div
              key={index}
              className="group bg-gray-900 rounded-2xl overflow-hidden border border-yellow-500/20 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{mentor.name}</h3>
                  <p className="text-yellow-400 text-sm font-semibold">{mentor.role}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">Experience:</span>
                    <span className="font-bold text-yellow-400">{mentor.experience}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentor.expertise.split(', ').map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {mentor.description}
                </p>

                <div className="flex space-x-3 pt-4 border-t border-yellow-500/20">
                  <button className="p-2 hover:bg-yellow-500/20 rounded-lg transition-all hover:scale-110">
                    <Linkedin className="w-5 h-5 text-yellow-400" />
                  </button>
                  <button className="p-2 hover:bg-yellow-500/20 rounded-lg transition-all hover:scale-110">
                    <Twitter className="w-5 h-5 text-yellow-400" />
                  </button>
                  <button className="p-2 hover:bg-yellow-500/20 rounded-lg transition-all hover:scale-110">
                    <Github className="w-5 h-5 text-yellow-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
