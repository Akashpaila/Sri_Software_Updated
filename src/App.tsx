import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Content from './components/Content';
import Projects from './components/Projects';
import Leadership from './components/Leadership';
import Mentors from './components/Mentors';
import HRPortal from './components/HRPortal';
import Contact from './components/Contact';
import Login from './components/Login';
import Footer from './components/Footer';
import RegistrationModal from './components/RegistrationModal';
import RequestCallbackModal from './components/RequestCallbackModal';
import StudentDashboard from './components/dashboard/StudentDashboard';
import AdminLogin from './components/AdminLogin';
import AdminPortal from './components/AdminPortal';

function App() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [adminName, setAdminName] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    const callbackTimer = setTimeout(() => {
      setIsCallbackOpen(true);
    }, 1500);

    return () => {
      clearTimeout(callbackTimer);
    };
  }, []);

  const handleLoginSuccess = (id: string, name: string) => {
    setStudentId(id);
    setStudentName(name);
    setIsLoggedIn(true);
  };

  const handleAdminLoginSuccess = (name: string) => {
    setAdminName(name);
    setIsAdminLoggedIn(true);
    setShowAdminLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setStudentId('');
    setStudentName('');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminName('');
    setShowAdminLogin(false);
  };

  if (isAdminLoggedIn) {
    return <AdminPortal adminName={adminName} onLogout={handleAdminLogout} />;
  }

  if (showAdminLogin) {
    return <AdminLogin onLoginSuccess={handleAdminLoginSuccess} />;
  }

  if (isLoggedIn) {
    return <StudentDashboard studentId={studentId} studentName={studentName} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-black transition-colors">
      <Navbar />
      <Hero />
      <Content />
      <Projects />
      <Leadership />
      <Mentors />
      <HRPortal />
      <Contact onRegisterClick={() => setIsRegistrationOpen(true)} />
      <Login onLoginSuccess={handleLoginSuccess} onAdminClick={() => setShowAdminLogin(true)} />
      <Footer />
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
      <RequestCallbackModal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
        onRegisterClick={() => setIsRegistrationOpen(true)}
      />
    </div>
  );
}

export default App;
