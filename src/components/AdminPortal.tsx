import { useState } from 'react';
import { Calendar, FileText, BookOpen, FolderKanban, LogOut, Users, DollarSign } from 'lucide-react';
import AttendanceManagement from './admin/AttendanceManagement';
import NotesManagement from './admin/NotesManagement';
import TasksManagement from './admin/TasksManagement';
import ProjectsManagement from './admin/ProjectsManagement';
import StudentsOverview from './admin/StudentsOverview';
import FeesManagement from './admin/FeesManagement';

interface AdminPortalProps {
  adminName: string;
  onLogout: () => void;
}

export default function AdminPortal({ adminName, onLogout }: AdminPortalProps) {
  const [activeTab, setActiveTab] = useState('students');

  const menuItems = [
    { id: 'students', label: 'Students Overview', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'fees', label: 'Fees Management', icon: DollarSign },
    { id: 'notes', label: 'Notes', icon: BookOpen },
    { id: 'tasks', label: 'Tasks', icon: FileText },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'students':
        return <StudentsOverview />;
      case 'attendance':
        return <AttendanceManagement />;
      case 'fees':
        return <FeesManagement />;
      case 'notes':
        return <NotesManagement />;
      case 'tasks':
        return <TasksManagement />;
      case 'projects':
        return <ProjectsManagement />;
      default:
        return <StudentsOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="flex h-screen overflow-hidden">
        <aside className="w-64 bg-gray-900 border-r border-yellow-500/30">
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-yellow-500/30">
              <h2 className="text-xl font-bold text-yellow-400">Admin Portal</h2>
              <p className="text-sm text-gray-400 mt-1">{adminName}</p>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
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
          <header className="bg-gray-900 border-b border-yellow-500/30 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">
              {menuItems.find(item => item.id === activeTab)?.label || 'Admin Portal'}
            </h1>
          </header>

          <main className="flex-1 overflow-y-auto p-6 bg-black">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}
