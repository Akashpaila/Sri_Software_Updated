import { useState, useEffect } from 'react';
import { BookOpen, Plus, Send, CheckCircle, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Student {
  student_id: string;
  full_name: string;
}

export default function NotesManagement() {
  const [students, setStudents] = useState<Student[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const { data } = await supabase
      .from('student_registrations')
      .select('student_id, full_name')
      .eq('is_trainee', true)
      .order('full_name');
    if (data) setStudents(data);
  };

  const toggleStudent = (studentId: string) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const selectAll = () => {
    setSelectedStudents(students.map(s => s.student_id));
  };

  const clearAll = () => {
    setSelectedStudents([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (selectedStudents.length === 0) {
      setErrorMessage('Please select at least one student');
      return;
    }

    const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

    const records = selectedStudents.map(studentId => ({
      student_id: studentId,
      title: formData.title,
      content: formData.content,
      tags: tags,
      date: formData.date
    }));

    const { error } = await supabase
      .from('student_notes')
      .insert(records);

    if (!error) {
      setSuccessMessage(`Note sent successfully to ${selectedStudents.length} student(s)!`);
      setFormData({
        title: '',
        content: '',
        tags: '',
        date: new Date().toISOString().split('T')[0]
      });
      setSelectedStudents([]);
      setShowForm(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      setErrorMessage('Error sending note: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Notes Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black rounded-lg font-semibold shadow-lg shadow-yellow-500/30"
        >
          <Plus className="w-5 h-5" />
          <span>Create Note</span>
        </button>
      </div>

      {successMessage && (
        <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
          <p className="text-green-400 text-sm font-medium">{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
          <p className="text-red-400 text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-yellow-500/30 space-y-6">
          <div className="p-6 border-b border-yellow-500/30">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-yellow-400" />
                Send Note to Students
              </h3>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="px-6">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-yellow-500/20">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-semibold">Select Students</h4>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={selectAll}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium"
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg font-medium"
                  >
                    Clear All
                  </button>
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {students.map((student) => (
                  <label
                    key={student.student_id}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedStudents.includes(student.student_id)
                        ? 'bg-yellow-600/20 border border-yellow-500/50'
                        : 'bg-gray-900/50 border border-gray-700 hover:bg-gray-800/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.student_id)}
                      onChange={() => toggleStudent(student.student_id)}
                      className="w-5 h-5 text-yellow-600 border-gray-600 rounded focus:ring-yellow-500"
                    />
                    <div className="flex-1">
                      <p className="text-white font-medium">{student.full_name}</p>
                      <p className="text-gray-400 text-sm">{student.student_id}</p>
                    </div>
                    {selectedStudents.includes(student.student_id) && (
                      <CheckCircle className="w-5 h-5 text-yellow-400" />
                    )}
                  </label>
                ))}
              </div>
              <div className="mt-3 text-sm text-yellow-400 font-medium">
                Selected: {selectedStudents.length} / {students.length} students
              </div>
            </div>
          </div>

          <div className="px-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
                className="w-full px-4 py-3 bg-gray-950 border border-yellow-500/30 rounded-lg text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                placeholder="Note title..."
                className="w-full px-4 py-3 bg-gray-950 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                required
                placeholder="Note content..."
                rows={6}
                className="w-full px-4 py-3 bg-gray-950 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tags (comma separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                placeholder="e.g., React, JavaScript, Assignment"
                className="w-full px-4 py-3 bg-gray-950 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
            </div>
          </div>

          <div className="px-6 pb-6 flex space-x-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 border border-yellow-500/30 text-white rounded-lg font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={selectedStudents.length === 0}
              className="flex-1 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 disabled:from-gray-600 disabled:to-gray-700 text-black font-bold rounded-lg shadow-lg shadow-yellow-500/30 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Send to Selected Students</span>
            </button>
          </div>
        </form>
      )}

      {!showForm && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
          <p className="text-yellow-400 text-sm">
            <BookOpen className="w-4 h-4 inline mr-2" />
            Send daily notes and learning materials to students. You can select multiple students or all students at once using the checkboxes.
          </p>
        </div>
      )}
    </div>
  );
}
