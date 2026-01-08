import { useState } from 'react';
import { Search, User, Calendar, Award, TrendingUp, BookOpen, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface StudentData {
  id: string;
  student_id: string;
  full_name: string;
  college_name: string;
  education_qualification: string;
  mobile_number: string;
  cgpa: string;
  city: string;
  is_trainee: boolean;
  course_enrolled: string;
  batch_number: string;
  enrollment_date: string;
  attendance_percentage: number;
  performance_rating: string;
  project_score: number;
  test_score: number;
  status: string;
  remarks: string;
  created_at: string;
}

export default function HRPortal() {
  const [studentId, setStudentId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim()) {
      setError('Please enter a Student ID');
      return;
    }

    setIsSearching(true);
    setError('');
    setStudentData(null);

    try {
      const { data, error: searchError } = await supabase
        .from('student_registrations')
        .select('*')
        .eq('student_id', studentId.trim().toUpperCase())
        .maybeSingle();

      if (searchError) throw searchError;

      if (!data) {
        setError('Student ID not found in our records');
      } else {
        setStudentData(data);
      }
    } catch (err) {
      setError('Failed to search student. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section id="hr-portal" className="py-16 md:py-20 bg-black border-t border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 rounded-full text-sm font-bold shadow-lg shadow-yellow-500/30">
            HR Portal
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Student Verification System
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Enter a Student ID to view complete profile, performance, and training details
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="bg-gray-900 rounded-2xl p-6 md:p-8 border border-yellow-500/30 shadow-2xl shadow-yellow-500/20">
            <label className="block text-sm font-bold text-gray-300 mb-3">
              Student ID
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-black border border-yellow-500/30 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white transition-all text-lg placeholder-gray-500"
                  placeholder="Enter Student ID (e.g., STU12345)"
                />
              </div>
              <button
                type="submit"
                disabled={isSearching}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 disabled:from-gray-400 disabled:to-gray-500 text-black rounded-xl font-bold transition-all shadow-lg hover:shadow-yellow-500/50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  'Search'
                )}
              </button>
            </div>
            {error && (
              <div className="mt-4 p-4 bg-red-900/30 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-sm font-semibold">{error}</p>
              </div>
            )}
          </form>
        </div>

        {studentData && (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-gray-900 rounded-2xl p-6 md:p-8 border border-yellow-500/30 shadow-2xl shadow-yellow-500/20">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50">
                    <User className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {studentData.full_name}
                    </h3>
                    <p className="text-gray-400 font-semibold">ID: {studentData.student_id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {studentData.is_trainee ? (
                    <>
                      <CheckCircle className="w-6 h-6 text-yellow-400" />
                      <span className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 rounded-full text-sm font-bold">
                        Active Trainee
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6 text-gray-600" />
                      <span className="px-4 py-2 bg-gray-700 text-gray-400 rounded-full text-sm font-semibold">
                        Not Active
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                  <h4 className="text-lg font-bold text-white flex items-center">
                    <User className="w-5 h-5 mr-2 text-yellow-400" />
                    Personal Information
                  </h4>
                  <div className="space-y-3 pl-7">
                    <div>
                      <span className="text-sm text-gray-500">College:</span>
                      <p className="font-semibold text-white">{studentData.college_name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Qualification:</span>
                      <p className="font-semibold text-white">{studentData.education_qualification}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">CGPA:</span>
                      <p className="font-semibold text-white">{studentData.cgpa}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">City:</span>
                      <p className="font-semibold text-white">{studentData.city}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Mobile:</span>
                      <p className="font-semibold text-white">{studentData.mobile_number}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                  <h4 className="text-lg font-bold text-white flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-yellow-400" />
                    Training Details
                  </h4>
                  <div className="space-y-3 pl-7">
                    <div>
                      <span className="text-sm text-gray-500">Course Enrolled:</span>
                      <p className="font-semibold text-white">{studentData.course_enrolled || 'Not Assigned'}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Batch Number:</span>
                      <p className="font-semibold text-white">{studentData.batch_number || 'Not Assigned'}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Enrollment Date:</span>
                      <p className="font-semibold text-white">
                        {studentData.enrollment_date ? new Date(studentData.enrollment_date).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Status:</span>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ml-2 ${
                        studentData.status === 'Active' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' :
                        studentData.status === 'Completed' ? 'bg-green-500/20 text-green-400 border border-green-500/50' :
                        'bg-red-500/20 text-red-400 border border-red-500/50'
                      }`}>
                        {studentData.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 md:p-8 border border-yellow-500/30 shadow-2xl shadow-yellow-500/20">
              <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-yellow-400" />
                Performance Metrics
              </h4>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <Calendar className="w-8 h-8 text-yellow-400" />
                    <span className="text-3xl font-bold text-yellow-400">
                      {studentData.attendance_percentage}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 font-semibold">Attendance</p>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <Award className="w-8 h-8 text-yellow-400" />
                    <span className="text-3xl font-bold text-yellow-400">
                      {studentData.project_score}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 font-semibold">Project Score</p>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <BookOpen className="w-8 h-8 text-yellow-400" />
                    <span className="text-3xl font-bold text-yellow-400">
                      {studentData.test_score}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 font-semibold">Test Score</p>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="w-8 h-8 text-yellow-400" />
                    <span className="text-lg font-bold text-yellow-400">
                      {studentData.performance_rating}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 font-semibold">Performance</p>
                </div>
              </div>

              {studentData.remarks && (
                <div className="mt-6 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                  <h5 className="font-bold text-white mb-2">Remarks:</h5>
                  <p className="text-gray-400">{studentData.remarks}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
