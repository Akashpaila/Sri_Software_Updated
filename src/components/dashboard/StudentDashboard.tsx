import { useState } from 'react';
import { Home, FolderKanban, BookOpen, FileText, Calendar, User, TrendingUp, LogOut, Menu, X, DollarSign } from 'lucide-react';
import DashboardHome from './DashboardHome';
import DashboardProjects from './DashboardProjects';
import DashboardNotes from './DashboardNotes';
import DashboardTasks from './DashboardTasks';
import DashboardAttendance from './DashboardAttendance';
import DashboardFees from './DashboardFees';
import DashboardResume from './DashboardResume';

interface StudentDashboardProps {
  studentId: string;
  studentName: string;
  onLogout: () => void;
}

export default function StudentDashboard({ studentId, studentName, onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'notes', label: 'Daily Notes', icon: BookOpen },
    { id: 'tasks', label: 'Tasks', icon: FileText },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'fees', label: 'Fees', icon: DollarSign },
    { id: 'resume', label: 'Resume', icon: User },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <DashboardHome studentId={studentId} studentName={studentName} />;
      case 'projects':
        return <DashboardProjects studentId={studentId} />;
      case 'notes':
        return <DashboardNotes studentId={studentId} />;
      case 'tasks':
        return <DashboardTasks studentId={studentId} />;
      case 'attendance':
        return <DashboardAttendance studentId={studentId} />;
      case 'fees':
        return <DashboardFees />;
      case 'resume':
        return <DashboardResume studentId={studentId} />;
      default:
        return <DashboardHome studentId={studentId} studentName={studentName} />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="flex h-screen overflow-hidden">
        <aside className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-yellow-500/30 transition-transform duration-300 ease-in-out`}>
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-yellow-500/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/50">
                  <TrendingUp className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h2 className="font-bold text-white">Dashboard</h2>
                  <p className="text-xs text-yellow-400">{studentName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-lg shadow-lg shadow-yellow-500/30">
                  {studentName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{studentName}</p>
                  <p className="text-xs text-gray-400">Student ID: {studentId}</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-400'
                        : 'text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-yellow-500/30">
              <button
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-gray-900 border-b border-yellow-500/30 px-6 py-4 shadow-lg shadow-yellow-500/10">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-yellow-500/20 text-yellow-400"
              >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div className="flex-1 lg:flex-none">
                <h1 className="text-2xl font-bold text-white">
                  {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                </h1>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 bg-black">
            {renderContent()}
          </main>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
