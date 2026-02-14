
import React, { useState } from 'react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('astra_users') || '[]');
      
      if (isLogin) {
        const userMatch = users.find((u: any) => u.username === username && u.password === password);
        if (userMatch) {
          const sessionUser: User = {
            username: userMatch.username,
            joinedAt: userMatch.joinedAt,
            xp: userMatch.xp || 0,
            isAstraPlus: userMatch.isAstraPlus || false
          };
          onAuthSuccess(sessionUser);
          onClose();
        } else {
          setError('Invalid login. Please check your username and password.');
        }
      } else {
        if (users.some((u: any) => u.username === username)) {
          setError('Username already taken.');
        } else {
          const newUser = {
            username,
            password,
            joinedAt: new Date().toISOString(),
            xp: 0,
            isAstraPlus: false
          };
          users.push(newUser);
          localStorage.setItem('astra_users', JSON.stringify(users));
          
          const sessionUser: User = {
            username: newUser.username,
            joinedAt: newUser.joinedAt,
            xp: 0,
            isAstraPlus: false
          };
          onAuthSuccess(sessionUser);
          onClose();
        }
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-[2.5rem] p-10 shadow-[0_0_50px_rgba(79,70,229,0.2)] overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px] pointer-events-none" />
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-astra font-bold text-white italic tracking-tighter uppercase mb-2">
              {isLogin ? 'Sign In' : 'Create Account'}
            </h2>
            <p className="text-indigo-400 text-[10px] font-black tracking-[0.4em] uppercase">
              Login System
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-4">Username</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-light"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-4">Password</label>
              <input 
                type="password" 
                required
                className="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-light"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-rose-500 text-xs font-bold text-center animate-pulse uppercase tracking-tight">{error}</p>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-white text-slate-950 hover:bg-indigo-400 hover:text-white disabled:bg-slate-800 disabled:text-slate-600 font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl active:scale-95 text-sm"
            >
              {isLoading ? 'LOADING...' : isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs font-bold text-slate-500 hover:text-indigo-400 uppercase tracking-widest transition-colors"
            >
              {isLogin ? "Don't have an account? Create one" : "Already registered? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
