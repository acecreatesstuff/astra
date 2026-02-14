
import React from 'react';
import { View, User } from '../types';
import Logo from './Logo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: View;
  onViewChange: (view: View) => void;
  currentUser: User | null;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentView, onViewChange, currentUser, onLogout }) => {
  const menuItems: { id: View; label: string; icon: React.ReactNode }[] = [
    { 
      id: 'Games', 
      label: 'Games', 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> 
    },
    { 
      id: 'Proxy', 
      label: 'Proxy', 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 21a10.003 10.003 0 008.384-4.51l.054.09m-4.283-9.93l-.149.148a10.007 10.007 0 01-9.918 2.351m10.067-2.499a10.004 10.004 0 012.35 9.917m-9.056-11.083L8.123 3.42M12 11l.149-.148M12 11l-3.344-3.344M12 11l3.344 3.344M8.123 3.42a10.007 10.007 0 00-2.35 9.917m0 0l.149-.148" /></svg> 
    },
    { 
      id: 'AIHelper', 
      label: 'AI Helper', 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg> 
    },
    {
      id: 'Settings',
      label: 'Settings',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    }
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div className={`fixed top-0 left-0 bottom-0 w-72 bg-slate-950 border-r border-white/5 z-[70] transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-4 mb-12">
            <Logo className="w-10 h-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
            <span className="text-2xl font-astra font-bold text-white italic tracking-tighter tracking-widest uppercase">ASTRA</span>
          </div>

          <div className="space-y-3 flex-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onViewChange(item.id); onClose(); }}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all border ${currentView === item.id ? 'bg-indigo-600/10 text-white border-indigo-500/50 shadow-[0_0_20px_rgba(79,70,229,0.15)]' : 'text-slate-500 border-transparent hover:bg-white/5 hover:text-slate-200'}`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-auto pt-6 space-y-4">
            {currentUser && (
              <button 
                onClick={() => { onLogout(); onClose(); }}
                className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-rose-500 hover:bg-rose-500/5 border border-transparent hover:border-rose-500/20 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Log Out
              </button>
            )}

            <div className="p-5 bg-indigo-950/20 rounded-3xl border border-white/5 backdrop-blur-md">
               <p className="text-[10px] text-indigo-400 uppercase font-black tracking-[0.2em] mb-2">Status</p>
               <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-ping absolute" />
                    <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full" />
                  </div>
                  <span className="text-sm font-semibold text-slate-300">CONNECTED</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
