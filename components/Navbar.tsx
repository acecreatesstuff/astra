
import React from 'react';
import { DISCORD_URL } from '../constants';
import Logo from './Logo';
import { User } from '../types';

interface NavbarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onMenuToggle: () => void;
  onSuggestToggle: () => void;
  onAuthToggle: () => void;
  currentUser: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, searchQuery, onMenuToggle, onSuggestToggle, onAuthToggle, currentUser }) => {
  const handleDiscordJoin = () => {
    window.open(DISCORD_URL, '_blank');
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-slate-950/40 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <button 
            onClick={onMenuToggle}
            className="p-2 hover:bg-white/5 rounded-xl text-slate-400 hover:text-white transition-colors border border-transparent hover:border-white/10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.reload()}>
            <Logo className="w-8 h-8 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
            <span className="text-2xl font-astra font-bold tracking-tight text-white uppercase italic tracking-widest">ASTRA</span>
          </div>
          
          <div className="flex gap-2 md:hidden">
            <button 
              onClick={onAuthToggle}
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button 
              onClick={handleDiscordJoin}
              className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white shadow-lg transition-transform active:scale-95"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="relative flex-1 w-full group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl leading-5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all sm:text-sm backdrop-blur-md"
            placeholder="Search for games..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={onSuggestToggle}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 font-bold text-sm transition-all active:scale-95"
          >
            Suggest Games
          </button>
          
          <div className="h-6 w-px bg-white/10" />

          {currentUser ? (
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden lg:block">
                <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none">User Active</div>
                <div className="text-sm font-bold text-white uppercase italic">{currentUser.username}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-black">
                {currentUser.username[0].toUpperCase()}
              </div>
            </div>
          ) : (
            <button 
              onClick={onAuthToggle}
              className="flex items-center gap-2 px-6 py-2 bg-white text-slate-950 hover:bg-indigo-400 hover:text-white rounded-xl font-black text-sm transition-all active:scale-95 uppercase tracking-widest"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
