import { useState, useEffect } from 'react';
import { FolderKanban, Plus, Send } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function ProjectsManagement() {
  const [students, setStudents] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    student_id: '',
    project_name: '',
    description: '',
    technologies: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
    status: 'in_progress'
  });

  useEffect(() => {
    loadStudents();
    loadProjects();
  }, []);

  const loadStudents = async () => {
    const { data } = await supabase
      .from('student_registrations')
      .select('student_id, full_name')
      .eq('is_trainee', true)
      .order('full_name');
    if (data) setStudents(data);
  };

  const loadProjects = async () => {
    const { data } = await supabase
      .from('student_projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setProjects(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const technologies = formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech);

    const { error } = await supabase
      .from('student_projects')
      .insert([{
        ...formData,
        technologies: technologies
      }]);

    if (!error) {
      alert('Project assigned successfully!');
      setFormData({
        student_id: '',
        project_name: '',
        description: '',
        technologies: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: '',
        status: 'in_progress'
      });
      setShowForm(false);
      loadProjects();
    } else {
      alert('Error assigning project: ' + error.message);
    }
  };

  const assignBulkProject = async () => {
    if (!formData.project_name || !formData.description) {
      alert('Please fill in project name and description first');
      return;
    }

    if (!confirm('Assign this project to all active students?')) return;

    const technologies = formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech);

    const records = students.map(student => ({
      student_id: student.student_id,
      project_name: formData.project_name,
      description: formData.description,
      technologies: technologies,
      start_date: formData.start_date,
      end_date: formData.end_date,
      status: formData.status
    }));

    const { error } = await supabase
      .from('student_projects')
      .insert(records);

    if (!error) {
      alert('Project assigned to all students!');
      setFormData({
        student_id: '',
        project_name: '',
        description: '',
        technologies: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: '',
        status: 'in_progress'
      });
      setShowForm(false);
      loadProjects();
    } else {
      alert('Error assigning bulk project: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Projects Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black rounded-lg font-semibold shadow-lg shadow-yellow-500/30"
        >
          <Plus className="w-5 h-5" />
          <span>Assign Project</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
          <p className="text-orange-400 font-semibold text-sm mb-1">In Progress</p>
          <p className="text-3xl font-bold text-white">{projects.filter(p => p.status === 'in_progress').length}</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
          <p className="text-green-400 font-semibold text-sm mb-1">Completed</p>
          <p className="text-3xl font-bold text-white">{projects.filter(p => p.status === 'completed').length}</p>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Assign Project to Student</h3>
            <button
              type="button"
              onClick={assignBulkProject}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold"
            >
              <Send className="w-4 h-4" />
              <span>Assign to All Students</span>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Student (or leave empty for bulk assign)</label>
            <select
              value={formData.student_id}
              onChange={(e) => setFormData({...formData, student_id: e.target.value})}
              className="w-full px-4 py-3 bg-gray-950 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            >
              <option value="">Select Student (or assign to all)</option>
              {students.map(student => (
                <option key={student.student_id} value={student.student_id}>
                  {student.full_name} ({student.student_id})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Project Name</label>
            <input
              type="text"
              value={formData.project_name}
              onChange={(e) => setFormData({...formData, project_name: e.target.value})}
              required
              placeholder="Project name..."
              className="w-full px-4 py-3 bg-gray-950 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
              placeholder="Project description and requirements..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-950 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Technologies (comma separated)</label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) => setFormData({...formData, technologies: e.target.value})}
              placeholder="e.g., React, Node.js, MongoDB"
              className="w-full px-4 py-3 bg-gray-950 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
              <input
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                className="w-full px-4 py-3 bg-gray-950 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">End Date (Optional)</label>
              <input
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                className="w-full px-4 py-3 bg-gray-950 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full px-4 py-3 bg-gray-950 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            >
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={!formData.student_id}
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg font-semibold shadow-lg shadow-purple-500/30 disabled:cursor-not-allowed"
            >
              Assign to Selected Student
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-purple-500/30 text-white rounded-lg font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div>
        <h3 className="text-xl font-bold text-white mb-4">All Projects</h3>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-bold text-white">{project.project_name}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'in_progress'
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50'
                        : 'bg-green-500/20 text-green-400 border border-green-500/50'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-3">{project.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Student: {project.student_id}</span>
                    {project.start_date && <span>Started: {new Date(project.start_date).toLocaleDateString()}</span>}
                  </div>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.technologies.map((tech: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 text-purple-400 rounded-full text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {(project.github_link || project.live_link) && (
                    <div className="mt-3 space-y-1">
                      {project.github_link && (
                        <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:text-cyan-300 underline block">
                          GitHub: {project.github_link}
                        </a>
                      )}
                      {project.live_link && (
                        <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:text-cyan-300 underline block">
                          Live: {project.live_link}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {projects.length === 0 && (
          <div className="text-center py-12 bg-gray-900/50 rounded-xl border border-purple-500/20">
            <FolderKanban className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No projects assigned yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
