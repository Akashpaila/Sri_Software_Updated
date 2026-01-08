import { useState } from 'react';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LoginProps {
  onLoginSuccess?: (studentId: string, studentName: string) => void;
  onAdminClick?: () => void;
}

export default function Login({ onLoginSuccess, onAdminClick }: LoginProps) {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data, error: searchError } = await supabase
        .from('student_registrations')
        .select('*')
        .eq('student_id', studentId.trim().toUpperCase())
        .maybeSingle();

      if (searchError) throw searchError;

      if (!data) {
        setError('Invalid Student ID or Password. Please check and try again.');
      } else if (data.password !== password) {
        setError('Invalid Student ID or Password. Please check and try again.');
      } else {
        if (onLoginSuccess) {
          onLoginSuccess(data.student_id, data.full_name);
        }
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="login" className="py-20 bg-black">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-3xl p-8 border border-yellow-500/30 shadow-2xl shadow-yellow-500/10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-yellow-500/50">
              <LogIn className="w-8 h-8 text-black" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Student Login
            </h2>
            <p className="text-gray-400">
              Access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Student ID
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500" />
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-black border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-white transition-colors placeholder:text-gray-500"
                  placeholder="Enter your Student ID"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-black border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-white transition-colors placeholder:text-gray-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-900/30 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 disabled:from-gray-600 disabled:to-gray-700 text-black font-bold rounded-lg transition-all shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Login to Dashboard</span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-yellow-400 hover:text-yellow-300 hover:underline font-medium"
              >
                Register now
              </button>
            </p>
            {onAdminClick && (
              <div className="pt-3 border-t border-yellow-500/20">
                <button
                  onClick={onAdminClick}
                  className="text-xs text-gray-500 hover:text-gray-400 transition-colors"
                >
                  Admin Access
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
