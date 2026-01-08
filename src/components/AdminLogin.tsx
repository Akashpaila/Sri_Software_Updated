import { useState } from 'react';
import { Shield, Lock, User as UserIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AdminLoginProps {
  onLoginSuccess: (name: string) => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data, error: loginError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .maybeSingle();

      if (loginError) throw loginError;

      if (data) {
        onLoginSuccess(data.full_name);
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-yellow-500/20 rounded-full border border-yellow-500/50 mb-4">
            <Shield className="w-12 h-12 text-yellow-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Admin Portal</h2>
          <p className="text-gray-400 mt-2">Sign in to manage students and training</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-8 border border-yellow-500/30 shadow-2xl shadow-yellow-500/20 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <UserIcon className="w-4 h-4 inline mr-2" />
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 bg-black border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Lock className="w-4 h-4 inline mr-2" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-black border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-sm font-semibold">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 disabled:from-gray-400 disabled:to-gray-500 text-black rounded-lg font-bold transition-all shadow-lg hover:shadow-yellow-500/50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="text-center text-sm text-gray-500 pt-4 border-t border-yellow-500/20">
            Default credentials: admin / admin123
          </div>
        </form>
      </div>
    </div>
  );
}
