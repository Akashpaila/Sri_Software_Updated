import { Award, Briefcase, Target, Users } from 'lucide-react';

const leaders = [
  {
    name: 'K Sri',
    role: 'Chief Executive Officer',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Visionary leader who founded Sri Software Solution with a mission to transform lives through quality technology education. K Sri\'s strategic approach focuses on bridging the gap between academic learning and industry requirements. His dedication to student success has established the institute as a trusted name in professional training, creating countless opportunities for aspiring tech professionals.',
    achievements: [
      'Founded Sri Software Solution & Techno Cart Pvt. Ltd.',
      'Successfully placed 500+ students in top IT companies',
      'Built strategic partnerships with leading technology firms',
      'Pioneered industry-aligned curriculum development',
    ],
  },
  {
    name: 'N Venkat',
    role: 'Managing Director',
    image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Dynamic business leader who drives operational excellence and ensures world-class training delivery. N Venkat\'s commitment to quality education and student success has been instrumental in achieving exceptional placement outcomes. His leadership in building strong industry relationships and maintaining high training standards continues to elevate the institute\'s reputation and impact.',
    achievements: [
      'Achieved 95% placement rate through strategic operations',
      'Established robust industry-academia collaboration frameworks',
      'Implemented comprehensive quality assurance systems',
      'Expanded training programs to meet evolving industry needs',
    ],
  },
];

export default function Leadership() {
  return (
    <section id="leadership" className="py-16 md:py-20 bg-gray-950 border-t border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 rounded-full text-sm font-bold shadow-lg shadow-yellow-500/30">
            Our Leadership
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Meet Our Leaders
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Guided by visionary leaders committed to excellence in technology education
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="group bg-gray-900 rounded-3xl overflow-hidden border-2 border-yellow-500/30 hover:border-yellow-500/60 hover:shadow-2xl hover:shadow-yellow-500/30 transition-all duration-300"
            >
              <div className="relative overflow-hidden h-80">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center space-x-3 mb-2">
                    {index === 0 ? (
                      <Award className="w-8 h-8 text-yellow-400" />
                    ) : (
                      <Briefcase className="w-8 h-8 text-yellow-400" />
                    )}
                    <div>
                      <h3 className="text-3xl font-bold text-white">{leader.name}</h3>
                      <p className="text-yellow-400 text-lg font-semibold">{leader.role}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <p className="text-gray-300 leading-relaxed mb-6 text-base">
                  {leader.description}
                </p>

                <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-yellow-400" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-3">
                    {leader.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start space-x-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-400 text-sm leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex items-center justify-center space-x-2 text-yellow-400">
                  <Users className="w-5 h-5" />
                  <span className="text-sm font-semibold">Leading {index === 0 ? '500+' : '200+'} Team Members</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-8 max-w-3xl">
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-gray-300 leading-relaxed">
              Under the guidance of our exceptional leadership, Sri Software Solution & Techno Cart Pvt. Ltd.
              continues to empower the next generation of technology professionals. Our commitment is to provide
              world-class training, foster innovation, and create opportunities that transform careers and lives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
