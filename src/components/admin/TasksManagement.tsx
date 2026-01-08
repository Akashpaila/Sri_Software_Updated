import { useState, useEffect } from 'react';
import { Plus, Send, CheckCircle, RefreshCw } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function TasksManagement() {
  const [students, setStudents] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showGradeForm, setShowGradeForm] = useState<any>(null);
  const [showReassignForm, setShowReassignForm] = useState<any>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [reassignStudents, setReassignStudents] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    student_id: '',
    title: '',
    description: '',
    due_date: ''
  });
  const [gradeData, setGradeData] = useState({
    grade: '',
    feedback: '',
    status: 'completed'
  });

  useEffect(() => {
    loadStudents();
    loadTasks();
  }, []);

  const loadStudents = async () => {
    const { data } = await supabase
      .from('student_registrations')
      .select('student_id, full_name')
      .eq('is_trainee', true)
      .order('full_name');
    if (data) setStudents(data);
  };

  const loadTasks = async () => {
    const { data } = await supabase
      .from('student_tasks')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setTasks(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from('student_tasks')
      .insert([formData]);

    if (!error) {
      alert('Task assigned successfully!');
      setFormData({
        student_id: '',
        title: '',
        description: '',
        due_date: ''
      });
      setShowForm(false);
      loadTasks();
    } else {
      alert('Error assigning task: ' + error.message);
    }
  };

  const assignToMultipleStudents = async () => {
    if (selectedStudents.length === 0) {
      alert('Please select at least one student');
      return;
    }

    if (!formData.title || !formData.description) {
      alert('Please fill in title and description');
      return;
    }

    if (!confirm(`Assign this task to ${selectedStudents.length} selected student(s)?`)) return;

    const records = selectedStudents.map(studentId => ({
      student_id: studentId,
      title: formData.title,
      description: formData.description,
      due_date: formData.due_date
    }));

    const { error } = await supabase
      .from('student_tasks')
      .insert(records);

    if (!error) {
      alert(`Task assigned to ${selectedStudents.length} student(s) successfully!`);
      setFormData({
        student_id: '',
        title: '',
        description: '',
        due_date: ''
      });
      setSelectedStudents([]);
      setShowForm(false);
      loadTasks();
    } else {
      alert('Error assigning task: ' + error.message);
    }
  };

  const assignBulkTask = async () => {
    if (!formData.title || !formData.description) {
      alert('Please fill in title and description first');
      return;
    }

    if (!confirm('Assign this task to all active students?')) return;

    const records = students.map(student => ({
      student_id: student.student_id,
      title: formData.title,
      description: formData.description,
      due_date: formData.due_date
    }));

    const { error } = await supabase
      .from('student_tasks')
      .insert(records);

    if (!error) {
      alert('Task assigned to all students!');
      setFormData({
        student_id: '',
        title: '',
        description: '',
        due_date: ''
      });
      setSelectedStudents([]);
      setShowForm(false);
      loadTasks();
    } else {
      alert('Error assigning bulk task: ' + error.message);
    }
  };

  const handleGradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from('student_tasks')
      .update({
        grade: parseFloat(gradeData.grade),
        feedback: gradeData.feedback,
        status: gradeData.status
      })
      .eq('id', showGradeForm.id);

    if (!error) {
      alert('Task graded successfully!');
      setShowGradeForm(null);
      setGradeData({ grade: '', feedback: '', status: 'completed' });
      loadTasks();
    } else {
      alert('Error grading task: ' + error.message);
    }
  };

  const handleReassignTask = async () => {
    if (reassignStudents.length === 0) {
      alert('Please select at least one student');
      return;
    }

    if (!confirm(`Reassign this task to ${reassignStudents.length} student(s)?`)) return;

    const records = reassignStudents.map(studentId => ({
      student_id: studentId,
      title: showReassignForm.title,
      description: showReassignForm.description,
      due_date: showReassignForm.due_date,
      status: 'pending'
    }));

    const { error } = await supabase
      .from('student_tasks')
      .insert(records);

    if (!error) {
      alert(`Task reassigned to ${reassignStudents.length} student(s) successfully!`);
      setShowReassignForm(null);
      setReassignStudents([]);
      loadTasks();
    } else {
      alert('Error reassigning task: ' + error.message);
    }
  };

  const submittedTasks = tasks.filter(t => t.status === 'submitted');
  const allTasks = tasks;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Tasks Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black rounded-lg font-semibold shadow-lg shadow-yellow-500/30"
        >
          <Plus className="w-5 h-5" />
          <span>Assign Task</span>
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
          <p className="text-orange-400 font-semibold text-sm mb-1">Pending Tasks</p>
          <p className="text-3xl font-bold text-white">{tasks.filter(t => t.status === 'pending').length}</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <p className="text-blue-400 font-semibold text-sm mb-1">Submitted Tasks</p>
          <p className="text-3xl font-bold text-white">{submittedTasks.length}</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
          <p className="text-green-400 font-semibold text-sm mb-1">Completed Tasks</p>
          <p className="text-3xl font-bold text-white">{tasks.filter(t => t.status === 'completed').length}</p>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Assign Task to Student(s)</h3>
            <button
              type="button"
              onClick={assignBulkTask}
              className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-semibold"
            >
              <Send className="w-4 h-4" />
              <span>Assign to All Students</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Single Student Assignment</label>
              <select
                value={formData.student_id}
                onChange={(e) => setFormData({...formData, student_id: e.target.value})}
                className="w-full px-4 py-3 bg-gray-950 border border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              >
                <option value="">Select Student</option>
                {students.map(student => (
                  <option key={student.student_id} value={student.student_id}>
                    {student.full_name} ({student.student_id})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Multiple Students Assignment ({selectedStudents.length} selected)
              </label>
              <div className="max-h-[200px] overflow-y-auto bg-gray-950 border border-cyan-500/30 rounded-lg p-3 space-y-2">
                {students.map(student => (
                  <label key={student.student_id} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-800/50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.student_id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedStudents([...selectedStudents, student.student_id]);
                        } else {
                          setSelectedStudents(selectedStudents.filter(id => id !== student.student_id));
                        }
                      }}
                      className="w-4 h-4 text-cyan-600 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 focus:ring-2"
                    />
                    <span className="text-sm text-white">{student.full_name} ({student.student_id})</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Task Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
              placeholder="Task title..."
              className="w-full px-4 py-3 bg-gray-950 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
              placeholder="Task description and requirements..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-950 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
            <input
              type="date"
              value={formData.due_date}
              onChange={(e) => setFormData({...formData, due_date: e.target.value})}
              className="w-full px-4 py-3 bg-gray-950 border border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={!formData.student_id}
              className="flex-1 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg font-semibold shadow-lg shadow-cyan-500/30 disabled:cursor-not-allowed"
            >
              Assign to Single Student
            </button>
            <button
              type="button"
              onClick={assignToMultipleStudents}
              disabled={selectedStudents.length === 0}
              className="flex-1 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg font-semibold shadow-lg shadow-yellow-500/30 disabled:cursor-not-allowed"
            >
              Assign to Multiple ({selectedStudents.length})
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setSelectedStudents([]);
              }}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-cyan-500/30 text-white rounded-lg font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {showGradeForm && (
        <form onSubmit={handleGradeSubmit} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-green-500/30 space-y-4">
          <h3 className="text-lg font-bold text-white">Grade Submission: {showGradeForm.title}</h3>
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm font-medium text-blue-400 mb-2">Student Submission:</p>
            <a href={showGradeForm.submission_link} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:text-cyan-300 underline break-all">
              {showGradeForm.submission_link}
            </a>
            {showGradeForm.submission_notes && (
              <p className="text-sm text-gray-400 mt-2">{showGradeForm.submission_notes}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Grade (0-100)</label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={gradeData.grade}
              onChange={(e) => setGradeData({...gradeData, grade: e.target.value})}
              required
              className="w-full px-4 py-3 bg-gray-950 border border-green-500/30 rounded-lg text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Feedback</label>
            <textarea
              value={gradeData.feedback}
              onChange={(e) => setGradeData({...gradeData, feedback: e.target.value})}
              required
              placeholder="Provide feedback to the student..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-950 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500 resize-none"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white rounded-lg font-semibold shadow-lg shadow-green-500/30"
            >
              Submit Grade
            </button>
            <button
              type="button"
              onClick={() => {
                setShowGradeForm(null);
                setGradeData({ grade: '', feedback: '', status: 'completed' });
              }}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-green-500/30 text-white rounded-lg font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {showReassignForm && (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Reassign Task: {showReassignForm.title}</h3>
            <p className="text-sm text-gray-400">{showReassignForm.description}</p>
            <p className="text-sm text-gray-500 mt-1">Originally assigned to: {showReassignForm.student_id}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Students to Reassign ({reassignStudents.length} selected)
            </label>
            <div className="max-h-[300px] overflow-y-auto bg-gray-950 border border-yellow-500/30 rounded-lg p-3 space-y-2">
              {students.map(student => (
                <label key={student.student_id} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-800/50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={reassignStudents.includes(student.student_id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setReassignStudents([...reassignStudents, student.student_id]);
                      } else {
                        setReassignStudents(reassignStudents.filter(id => id !== student.student_id));
                      }
                    }}
                    className="w-4 h-4 text-yellow-600 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                  />
                  <span className="text-sm text-white">{student.full_name} ({student.student_id})</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleReassignTask}
              disabled={reassignStudents.length === 0}
              className="flex-1 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg font-semibold shadow-lg shadow-yellow-500/30 disabled:cursor-not-allowed"
            >
              Reassign to {reassignStudents.length} Student(s)
            </button>
            <button
              type="button"
              onClick={() => {
                setShowReassignForm(null);
                setReassignStudents([]);
              }}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-yellow-500/30 text-white rounded-lg font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xl font-bold text-white mb-4">Submitted Tasks (Awaiting Review)</h3>
        <div className="space-y-4">
          {submittedTasks.map((task) => (
            <div key={task.id} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/50 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white">{task.title}</h4>
                  <p className="text-sm text-gray-400 mt-1">Student ID: {task.student_id}</p>
                  <p className="text-sm text-gray-500">Submitted: {new Date(task.submitted_at).toLocaleString()}</p>
                  <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <a href={task.submission_link} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:text-cyan-300 underline break-all">
                      {task.submission_link}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => setShowGradeForm(task)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white rounded-lg text-sm font-semibold"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Grade</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        {submittedTasks.length === 0 && (
          <div className="text-center py-8 bg-gray-900/50 rounded-xl border border-blue-500/20">
            <p className="text-gray-400">No submitted tasks awaiting review</p>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-4">All Tasks</h3>
        <div className="space-y-4">
          {allTasks.slice(0, 10).map((task) => (
            <div key={task.id} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-bold text-white">{task.title}</h4>
                  <p className="text-sm text-gray-400">Student: {task.student_id} | Status: {task.status}</p>
                  {task.due_date && (
                    <p className="text-sm text-gray-500">Due: {new Date(task.due_date).toLocaleDateString()}</p>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  {task.grade > 0 && (
                    <span className="text-green-400 font-bold">Grade: {task.grade}/100</span>
                  )}
                  <button
                    onClick={() => setShowReassignForm(task)}
                    className="flex items-center space-x-2 px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-semibold transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reassign</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
