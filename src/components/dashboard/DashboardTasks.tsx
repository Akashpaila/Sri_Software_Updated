import { useState, useEffect } from 'react';
import { CheckCircle, Clock, FileText } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface DashboardTasksProps {
  studentId: string;
}

export default function DashboardTasks({ studentId }: DashboardTasksProps) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [submissionData, setSubmissionData] = useState({ submission_link: '', submission_notes: '' });

  useEffect(() => {
    loadTasks();
  }, [studentId]);

  const loadTasks = async () => {
    const { data } = await supabase
      .from('student_tasks')
      .select('*')
      .eq('student_id', studentId)
      .order('due_date', { ascending: true });
    if (data) setTasks(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase
      .from('student_tasks')
      .update({
        ...submissionData,
        status: 'submitted',
        submitted_at: new Date().toISOString(),
      })
      .eq('id', selectedTask.id);
    setSelectedTask(null);
    setSubmissionData({ submission_link: '', submission_notes: '' });
    loadTasks();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Assigned Tasks</h2>
        <div className="flex space-x-3">
          <div className="px-4 py-2 bg-orange-500/20 border border-orange-500/50 text-orange-400 rounded-lg text-sm font-medium">
            {tasks.filter(t => t.status === 'pending').length} Pending
          </div>
          <div className="px-4 py-2 bg-green-500/20 border border-green-500/50 text-green-400 rounded-lg text-sm font-medium">
            {tasks.filter(t => t.status === 'completed').length} Completed
          </div>
        </div>
      </div>

      {selectedTask && (
        <form onSubmit={handleSubmit} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30 space-y-4">
          <h3 className="text-lg font-bold text-white">Submit: {selectedTask.title}</h3>
          <p className="text-gray-400 text-sm">{selectedTask.description}</p>
          <input
            type="url"
            value={submissionData.submission_link}
            onChange={(e) => setSubmissionData({...submissionData, submission_link: e.target.value})}
            placeholder="Submission Link (GitHub, Google Drive, etc.)"
            required
            className="w-full px-4 py-3 bg-gray-950 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
          <textarea
            value={submissionData.submission_notes}
            onChange={(e) => setSubmissionData({...submissionData, submission_notes: e.target.value})}
            placeholder="Submission Notes (Optional)"
            rows={4}
            className="w-full px-4 py-3 bg-gray-950 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
          />
          <div className="flex space-x-4">
            <button type="submit" className="flex-1 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-semibold shadow-lg shadow-cyan-500/50">
              Submit Task
            </button>
            <button type="button" onClick={() => setSelectedTask(null)} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-cyan-500/30 text-white rounded-lg font-semibold">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-bold text-white">{task.title}</h3>
                  <span className={`flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    task.status === 'pending' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50' :
                    task.status === 'submitted' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' :
                    'bg-green-500/20 text-green-400 border border-green-500/50'
                  }`}>
                    {task.status === 'pending' ? <Clock className="w-3 h-3 mr-1" /> : <CheckCircle className="w-3 h-3 mr-1" />}
                    {task.status}
                  </span>
                </div>
                <p className="text-gray-400 mb-3">{task.description}</p>
                <div className="flex items-center space-x-4 text-sm">
                  {task.due_date && (
                    <span className="text-gray-500 flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </span>
                  )}
                  {task.grade > 0 && (
                    <span className="text-green-400 font-semibold">
                      Grade: {task.grade}/100
                    </span>
                  )}
                </div>
              </div>
              {task.status === 'pending' && (
                <button
                  onClick={() => setSelectedTask(task)}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg text-sm font-semibold shadow-lg shadow-cyan-500/30"
                >
                  Submit
                </button>
              )}
            </div>
            {task.feedback && (
              <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-1">Trainer Feedback:</p>
                <p className="text-sm text-gray-300">{task.feedback}</p>
              </div>
            )}
            {task.submission_link && (
              <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-2">Your Submission:</p>
                <a href={task.submission_link} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:text-cyan-300 underline break-all">
                  {task.submission_link}
                </a>
                {task.submission_notes && (
                  <p className="text-sm text-gray-400 mt-2">{task.submission_notes}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-12 bg-gray-900/50 rounded-xl border border-cyan-500/20">
          <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No tasks assigned yet</p>
          <p className="text-sm text-gray-500 mt-2">Your trainer will assign tasks for you to complete</p>
        </div>
      )}
    </div>
  );
}
