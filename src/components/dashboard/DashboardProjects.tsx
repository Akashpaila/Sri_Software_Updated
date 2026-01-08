import { useState, useEffect } from 'react';
import { Plus, ExternalLink, Github } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface DashboardProjectsProps {
  studentId: string;
}

export default function DashboardProjects({ studentId }: DashboardProjectsProps) {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [submissionData, setSubmissionData] = useState({
    github_link: '',
    live_link: '',
  });

  useEffect(() => {
    loadProjects();
  }, [studentId]);

  const loadProjects = async () => {
    const { data } = await supabase
      .from('student_projects')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });
    if (data) setProjects(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase
      .from('student_projects')
      .update({
        github_link: submissionData.github_link,
        live_link: submissionData.live_link,
        status: 'submitted',
        end_date: new Date().toISOString(),
      })
      .eq('id', selectedProject.id);
    setSelectedProject(null);
    setSubmissionData({ github_link: '', live_link: '' });
    loadProjects();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Assigned Projects</h2>
        <div className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 rounded-lg text-sm font-medium">
          {projects.length} Project{projects.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
        <p className="text-cyan-400 text-sm">
          Your trainer assigns projects to you. Once assigned, submit your GitHub repository and live demo links here for review.
        </p>
      </div>

      {selectedProject && (
        <form onSubmit={handleSubmit} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30 space-y-4">
          <h3 className="text-lg font-bold text-white">Submit Project: {selectedProject.project_name}</h3>
          <p className="text-gray-400 text-sm">{selectedProject.description}</p>
          <input
            type="url"
            value={submissionData.github_link}
            onChange={(e) => setSubmissionData({...submissionData, github_link: e.target.value})}
            placeholder="GitHub Repository Link"
            required
            className="w-full px-4 py-3 bg-gray-950 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
          <input
            type="url"
            value={submissionData.live_link}
            onChange={(e) => setSubmissionData({...submissionData, live_link: e.target.value})}
            placeholder="Live Demo Link (Optional)"
            className="w-full px-4 py-3 bg-gray-950 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
          <div className="flex space-x-4">
            <button type="submit" className="flex-1 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-semibold shadow-lg shadow-cyan-500/50">
              Submit Project
            </button>
            <button type="button" onClick={() => setSelectedProject(null)} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-cyan-500/30 text-white rounded-lg font-semibold">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-white">{project.project_name}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                project.status === 'submitted' ? 'bg-green-500/20 text-green-400 border border-green-500/50' :
                project.status === 'completed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' :
                'bg-orange-500/20 text-orange-400 border border-orange-500/50'
              }`}>
                {project.status}
              </span>
            </div>
            <p className="text-gray-400 mb-4">{project.description}</p>
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            )}
            {project.github_link || project.live_link ? (
              <div className="flex space-x-3 mb-4">
                {project.github_link && (
                  <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="p-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-400 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {project.live_link && (
                  <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="p-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-400 transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            ) : project.status === 'in_progress' && (
              <button
                onClick={() => {
                  setSelectedProject(project);
                  setSubmissionData({ github_link: '', live_link: '' });
                }}
                className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-semibold shadow-lg shadow-cyan-500/30 transition-all"
              >
                Submit Links
              </button>
            )}
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12 bg-gray-900/50 rounded-xl border border-cyan-500/20">
          <Plus className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No projects assigned yet</p>
          <p className="text-sm text-gray-500 mt-2">Your trainer will assign projects for you to work on</p>
        </div>
      )}
    </div>
  );
}
