import { useEffect, useState } from 'react';
import { Award, BookOpen, Calendar, TrendingUp, Target, Clock, User, Upload, Camera } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface DashboardHomeProps {
  studentId: string;
  studentName: string;
}

export default function DashboardHome({ studentId, studentName }: DashboardHomeProps) {
  const [stats, setStats] = useState({
    attendance: 0,
    projectScore: 0,
    testScore: 0,
    performance: 'Loading...',
    pendingTasks: 0,
    completedProjects: 0,
  });
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, [studentId]);

  const loadDashboardData = async () => {
    try {
      const [studentData, tasks, projects] = await Promise.all([
        supabase.from('student_registrations').select('*').eq('student_id', studentId).maybeSingle(),
        supabase.from('student_tasks').select('*').eq('student_id', studentId),
        supabase.from('student_projects').select('*').eq('student_id', studentId),
      ]);

      if (studentData.data) {
        setStats({
          attendance: studentData.data.attendance_percentage || 0,
          projectScore: studentData.data.project_score || 0,
          testScore: studentData.data.test_score || 0,
          performance: studentData.data.performance_rating || 'Not Evaluated',
          pendingTasks: tasks.data?.filter((t: any) => t.status === 'pending').length || 0,
          completedProjects: projects.data?.filter((p: any) => p.status === 'completed').length || 0,
        });
        setProfilePhotoUrl(studentData.data.profile_photo_url || '');
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Photo size must be less than 2MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setUploadingPhoto(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;

      const { error } = await supabase
        .from('student_registrations')
        .update({ profile_photo_url: base64String })
        .eq('student_id', studentId);

      setUploadingPhoto(false);

      if (!error) {
        setProfilePhotoUrl(base64String);
        setSuccessMessage('Profile photo updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        alert('Error uploading photo: ' + error.message);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {successMessage && (
        <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
          <p className="text-green-400 text-sm font-medium">{successMessage}</p>
        </div>
      )}

      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">Welcome Back, {studentName}!</h2>
            <p className="text-blue-100">Here's your learning progress overview</p>
          </div>
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 overflow-hidden flex items-center justify-center">
              {profilePhotoUrl ? (
                <img src={profilePhotoUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-white/80" />
              )}
            </div>
            <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                disabled={uploadingPhoto}
                className="hidden"
              />
              {uploadingPhoto ? (
                <div className="text-white text-xs">Uploading...</div>
              ) : (
                <Camera className="w-6 h-6 text-white" />
              )}
            </label>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
        <h3 className="text-white font-semibold mb-4 flex items-center">
          <Upload className="w-5 h-5 mr-2 text-blue-400" />
          Profile Photo
        </h3>
        <div className="flex items-center space-x-6">
          <div className="w-32 h-32 rounded-xl bg-gray-800 border-2 border-blue-500/30 overflow-hidden flex items-center justify-center">
            {profilePhotoUrl ? (
              <img src={profilePhotoUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-16 h-16 text-gray-600" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-gray-400 text-sm mb-3">Upload your profile photo (Max 2MB, JPG/PNG)</p>
            <label className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-semibold cursor-pointer transition-all">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                disabled={uploadingPhoto}
                className="hidden"
              />
              <Upload className="w-4 h-4" />
              <span>{uploadingPhoto ? 'Uploading...' : 'Choose Photo'}</span>
            </label>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-10 h-10 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{stats.attendance}%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Attendance</h3>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-10 h-10 text-green-600" />
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{stats.projectScore}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Project Score</h3>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="w-10 h-10 text-orange-600" />
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{stats.testScore}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Test Score</h3>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-10 h-10 text-cyan-600" />
            <span className="text-lg font-bold text-gray-900 dark:text-white">{stats.performance}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Performance</h3>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pending Tasks</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">{stats.pendingTasks}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Tasks awaiting submission</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Completed Projects</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">{stats.completedProjects}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Successfully completed</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-left">
            <BookOpen className="w-6 h-6 text-blue-600 mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">View Notes</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Check daily notes</p>
          </button>
          <button className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-left">
            <Target className="w-6 h-6 text-green-600 mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">Submit Task</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Complete assignment</p>
          </button>
          <button className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors text-left">
            <Award className="w-6 h-6 text-cyan-600 mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">View Progress</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Check performance</p>
          </button>
        </div>
      </div>
    </div>
  );
}
