import { useState, useEffect } from 'react';
import { Search, User, Calendar, BookOpen, FileText, FolderKanban, ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function StudentsOverview() {
  const [students, setStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);
  const [studentDetails, setStudentDetails] = useState<{[key: string]: any}>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    student_id: '',
    email: '',
    mobile_number: '',
    alternate_mobile_number: '',
    password: '',
    date_of_birth: '',
    gender: '',
    blood_group: '',
    father_name: '',
    mother_name: '',
    current_address: '',
    permanent_address: '',
    city: '',
    emergency_contact_name: '',
    emergency_contact_number: '',
    college_name: '',
    education_qualification: '',
    degree_type: '',
    branch_specialization: '',
    university_board: '',
    year_of_graduation: '',
    cgpa: '',
    previous_education: '',
    course_enrolled: '',
    batch_number: '',
    enrollment_date: '',
    status: 'active',
    remarks: '',
    is_trainee: true
  });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const { data } = await supabase
      .from('student_registrations')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setStudents(data);
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const { error } = await supabase
      .from('student_registrations')
      .insert([formData]);

    if (error) {
      setErrorMessage(error.message || 'Failed to add student');
      console.error('Error adding student:', error);
    } else {
      setSuccessMessage('Student added successfully!');
      setTimeout(() => {
        setShowAddModal(false);
        setSuccessMessage('');
        setFormData({
          full_name: '',
          student_id: '',
          email: '',
          mobile_number: '',
          alternate_mobile_number: '',
          password: '',
          date_of_birth: '',
          gender: '',
          blood_group: '',
          father_name: '',
          mother_name: '',
          current_address: '',
          permanent_address: '',
          city: '',
          emergency_contact_name: '',
          emergency_contact_number: '',
          college_name: '',
          education_qualification: '',
          degree_type: '',
          branch_specialization: '',
          university_board: '',
          year_of_graduation: '',
          cgpa: '',
          previous_education: '',
          course_enrolled: '',
          batch_number: '',
          enrollment_date: '',
          status: 'active',
          remarks: '',
          is_trainee: true
        });
      }, 1500);
      loadStudents();
    }
  };

  const loadStudentDetails = async (studentId: string) => {
    const [tasks, notes, projects, attendance] = await Promise.all([
      supabase.from('student_tasks').select('*').eq('student_id', studentId).order('created_at', { ascending: false }).limit(5),
      supabase.from('student_notes').select('*').eq('student_id', studentId).order('date', { ascending: false }).limit(5),
      supabase.from('student_projects').select('*').eq('student_id', studentId).order('created_at', { ascending: false }).limit(5),
      supabase.from('student_attendance').select('*').eq('student_id', studentId).order('date', { ascending: false }).limit(10)
    ]);

    const attendanceStats = {
      total: attendance.data?.length || 0,
      present: attendance.data?.filter(a => a.status === 'present').length || 0,
      percentage: attendance.data?.length ? Math.round((attendance.data.filter(a => a.status === 'present').length / attendance.data.length) * 100) : 0
    };

    setStudentDetails(prev => ({
      ...prev,
      [studentId]: {
        tasks: tasks.data || [],
        notes: notes.data || [],
        projects: projects.data || [],
        attendance: attendance.data || [],
        attendanceStats
      }
    }));
  };

  const toggleStudentExpanded = async (studentId: string) => {
    if (expandedStudent === studentId) {
      setExpandedStudent(null);
    } else {
      setExpandedStudent(studentId);
      if (!studentDetails[studentId]) {
        await loadStudentDetails(studentId);
      }
    }
  };

  const filteredStudents = students.filter(student =>
    student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.student_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">All Students</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transition-all flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Student</span>
          </button>
          <div className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 rounded-lg text-sm font-medium">
            Total: {students.length}
          </div>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or student ID..."
          className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
        />
      </div>

      <div className="grid gap-4">
        {filteredStudents.map((student) => {
          const isExpanded = expandedStudent === student.student_id;
          const details = studentDetails[student.student_id];

          return (
            <div key={student.id} className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-yellow-500/20 hover:border-yellow-500/50 transition-all">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30">
                      <User className="w-6 h-6 text-black" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-bold text-white">{student.full_name}</h3>
                        {student.is_trainee && (
                          <span className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 rounded-full text-xs font-bold">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">ID: {student.student_id}</p>
                      <p className="text-sm text-gray-500">{student.college_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-400">{student.course_enrolled || 'No course'}</p>
                      <p className="text-sm text-gray-500">Batch: {student.batch_number || 'N/A'}</p>
                    </div>
                    <button
                      onClick={() => toggleStudentExpanded(student.student_id)}
                      className="p-2 hover:bg-yellow-500/20 rounded-lg transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-yellow-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-yellow-400" />
                      )}
                    </button>
                  </div>
                </div>

                {isExpanded && details && (
                  <div className="mt-6 pt-6 border-t border-yellow-500/20 space-y-6">
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                        <Calendar className="w-6 h-6 text-yellow-400 mb-2" />
                        <p className="text-2xl font-bold text-white">{details.attendanceStats.percentage}%</p>
                        <p className="text-xs text-gray-400">Attendance</p>
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <FileText className="w-6 h-6 text-blue-400 mb-2" />
                        <p className="text-2xl font-bold text-white">{details.tasks.length}</p>
                        <p className="text-xs text-gray-400">Recent Tasks</p>
                      </div>
                      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                        <BookOpen className="w-6 h-6 text-cyan-400 mb-2" />
                        <p className="text-2xl font-bold text-white">{details.notes.length}</p>
                        <p className="text-xs text-gray-400">Recent Notes</p>
                      </div>
                      <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                        <FolderKanban className="w-6 h-6 text-purple-400 mb-2" />
                        <p className="text-2xl font-bold text-white">{details.projects.length}</p>
                        <p className="text-xs text-gray-400">Projects</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-yellow-400 flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          Recent Tasks
                        </h4>
                        {details.tasks.length > 0 ? (
                          <div className="space-y-2">
                            {details.tasks.map((task: any) => (
                              <div key={task.id} className="bg-black/30 rounded-lg p-3 border border-yellow-500/10">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium text-white">{task.title}</p>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                    task.status === 'submitted' ? 'bg-blue-500/20 text-blue-400' :
                                    'bg-orange-500/20 text-orange-400'
                                  }`}>
                                    {task.status}
                                  </span>
                                </div>
                                {task.grade > 0 && (
                                  <p className="text-xs text-green-400 mt-1">Grade: {task.grade}/100</p>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No tasks assigned</p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-cyan-400 flex items-center">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Recent Notes
                        </h4>
                        {details.notes.length > 0 ? (
                          <div className="space-y-2">
                            {details.notes.map((note: any) => (
                              <div key={note.id} className="bg-black/30 rounded-lg p-3 border border-yellow-500/10">
                                <p className="text-sm font-medium text-white">{note.title}</p>
                                <p className="text-xs text-gray-500">{new Date(note.date).toLocaleDateString()}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No notes sent</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-purple-400 flex items-center">
                        <FolderKanban className="w-4 h-4 mr-2" />
                        Projects
                      </h4>
                      {details.projects.length > 0 ? (
                        <div className="space-y-2">
                          {details.projects.map((project: any) => (
                            <div key={project.id} className="bg-black/30 rounded-lg p-3 border border-yellow-500/10">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-white">{project.project_name}</p>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  project.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                                }`}>
                                  {project.status}
                                </span>
                              </div>
                              {project.technologies && project.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {project.technologies.slice(0, 3).map((tech: string, idx: number) => (
                                    <span key={idx} className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No projects assigned</p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-green-400 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Recent Attendance ({details.attendanceStats.present}/{details.attendanceStats.total})
                      </h4>
                      {details.attendance.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {details.attendance.map((att: any) => (
                            <div key={att.id} className={`px-3 py-2 rounded-lg text-xs font-medium ${
                              att.status === 'present' ? 'bg-green-500/20 text-green-400 border border-green-500/50' :
                              att.status === 'late' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' :
                              'bg-red-500/20 text-red-400 border border-red-500/50'
                            }`}>
                              {new Date(att.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No attendance records</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12 bg-gray-900/50 rounded-xl border border-yellow-500/20">
          <p className="text-gray-400">No students found</p>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-yellow-500/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900 border-b border-yellow-500/30 p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">Add New Student</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-yellow-500/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="p-6 space-y-6">
              {errorMessage && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-400 text-sm">{errorMessage}</p>
                </div>
              )}

              {successMessage && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                  <p className="text-green-400 text-sm">{successMessage}</p>
                </div>
              )}

              <div className="space-y-4">
                <h4 className="text-lg font-bold text-yellow-400 border-b border-yellow-500/30 pb-2">Basic Information</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                      placeholder="Enter student's full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Student ID *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.student_id}
                      onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                      placeholder="Enter unique student ID"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                      placeholder="Enter password for login"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                      placeholder="student@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.mobile_number}
                      onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                      placeholder="Enter mobile number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Alternate Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={formData.alternate_mobile_number}
                      onChange={(e) => setFormData({ ...formData, alternate_mobile_number: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                      placeholder="Alternate contact number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Blood Group
                    </label>
                    <select
                      value={formData.blood_group}
                      onChange={(e) => setFormData({ ...formData, blood_group: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Father's Name
                    </label>
                    <input
                      type="text"
                      value={formData.father_name}
                      onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                      placeholder="Father's name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Mother's Name
                    </label>
                    <input
                      type="text"
                      value={formData.mother_name}
                      onChange={(e) => setFormData({ ...formData, mother_name: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                      placeholder="Mother's name"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-bold text-yellow-400 border-b border-yellow-500/30 pb-2">Address Details</h4>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Current Address
                    </label>
                    <textarea
                      value={formData.current_address}
                      onChange={(e) => setFormData({ ...formData, current_address: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                      placeholder="Enter current address"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Permanent Address
                    </label>
                    <textarea
                      value={formData.permanent_address}
                      onChange={(e) => setFormData({ ...formData, permanent_address: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                      placeholder="Enter permanent address"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                        placeholder="Enter city"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Emergency Contact Name
                      </label>
                      <input
                        type="text"
                        value={formData.emergency_contact_name}
                        onChange={(e) => setFormData({ ...formData, emergency_contact_name: e.target.value })}
                        className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                        placeholder="Emergency contact name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Emergency Contact Number
                      </label>
                      <input
                        type="tel"
                        value={formData.emergency_contact_number}
                        onChange={(e) => setFormData({ ...formData, emergency_contact_number: e.target.value })}
                        className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                        placeholder="Emergency contact number"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-bold text-yellow-400 border-b border-yellow-500/30 pb-2">Education Details</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      College Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.college_name}
                      onChange={(e) => setFormData({ ...formData, college_name: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                      placeholder="Enter college name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Education Qualification *
                    </label>
                    <select
                      required
                      value={formData.education_qualification}
                      onChange={(e) => setFormData({ ...formData, education_qualification: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                    >
                      <option value="">Select Qualification</option>
                      <option value="10th">10th Standard</option>
                      <option value="12th">12th Standard</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Graduate">Graduate</option>
                      <option value="Postgraduate">Postgraduate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Degree Type
                    </label>
                    <select
                      value={formData.degree_type}
                      onChange={(e) => setFormData({ ...formData, degree_type: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                    >
                      <option value="">Select Degree Type</option>
                      <option value="Bachelor of Technology">B.Tech</option>
                      <option value="Bachelor of Engineering">B.E.</option>
                      <option value="Bachelor of Science">B.Sc</option>
                      <option value="Bachelor of Computer Applications">BCA</option>
                      <option value="Bachelor of Commerce">B.Com</option>
                      <option value="Bachelor of Arts">B.A.</option>
                      <option value="Master of Technology">M.Tech</option>
                      <option value="Master of Science">M.Sc</option>
                      <option value="Master of Computer Applications">MCA</option>
                      <option value="Master of Business Administration">MBA</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Branch/Specialization
                    </label>
                    <input
                      type="text"
                      value={formData.branch_specialization}
                      onChange={(e) => setFormData({ ...formData, branch_specialization: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                      placeholder="e.g., Computer Science"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      University/Board
                    </label>
                    <input
                      type="text"
                      value={formData.university_board}
                      onChange={(e) => setFormData({ ...formData, university_board: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                      placeholder="University or Board name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Year of Graduation
                    </label>
                    <input
                      type="text"
                      value={formData.year_of_graduation}
                      onChange={(e) => setFormData({ ...formData, year_of_graduation: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                      placeholder="e.g., 2024"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      CGPA/Percentage *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cgpa}
                      onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                      placeholder="e.g., 8.5 or 85%"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Previous Education
                    </label>
                    <input
                      type="text"
                      value={formData.previous_education}
                      onChange={(e) => setFormData({ ...formData, previous_education: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                      placeholder="12th/Intermediate details"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-bold text-yellow-400 border-b border-yellow-500/30 pb-2">Training Details</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Course Enrolled
                    </label>
                    <input
                      type="text"
                      value={formData.course_enrolled}
                      onChange={(e) => setFormData({ ...formData, course_enrolled: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                      placeholder="e.g., Full Stack Development"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Batch Number
                    </label>
                    <input
                      type="text"
                      value={formData.batch_number}
                      onChange={(e) => setFormData({ ...formData, batch_number: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                      placeholder="e.g., Batch 2024-01"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Enrollment Date
                    </label>
                    <input
                      type="date"
                      value={formData.enrollment_date}
                      onChange={(e) => setFormData({ ...formData, enrollment_date: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="completed">Completed</option>
                      <option value="dropped">Dropped</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Remarks
                    </label>
                    <textarea
                      value={formData.remarks}
                      onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                      placeholder="Additional notes or comments"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <input
                  type="checkbox"
                  id="is_trainee"
                  checked={formData.is_trainee}
                  onChange={(e) => setFormData({ ...formData, is_trainee: e.target.checked })}
                  className="w-5 h-5 rounded border-yellow-500/30 bg-black/30 text-yellow-500 focus:ring-yellow-500"
                />
                <label htmlFor="is_trainee" className="text-sm font-medium text-gray-300">
                  Mark as Active Trainee
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transition-all"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
