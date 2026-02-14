
import React from 'react';

export interface CloakOption {
  id: string;
  name: string;
  title: string;
  icon: string;
  logo: string;
}

export const CLOAK_OPTIONS: CloakOption[] = [
  { 
    id: 'google', 
    name: 'Google Search', 
    title: 'Google', 
    icon: 'https://www.google.com/favicon.ico',
    logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png'
  },
  { 
    id: 'classroom', 
    name: 'Classroom', 
    title: 'Classes', 
    icon: 'https://ssl.gstatic.com/classroom/favicon.png',
    logo: 'https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png'
  },
  { 
    id: 'wikipedia', 
    name: 'Wikipedia', 
    title: 'Wikipedia, the free encyclopedia', 
    icon: 'https://en.wikipedia.org/static/favicon/wikipedia.ico',
    logo: 'https://en.wikipedia.org/static/images/project-logos/enwiki.png'
  },
  { 
    id: 'calculator', 
    name: 'Calculator', 
    title: 'Calculator', 
    icon: 'https://www.google.com/s2/favicons?domain=desmos.com&sz=64',
    logo: 'https://www.desmos.com/assets/img/og-main.png'
  },
  { 
    id: 'none', 
    name: 'No Disguise', 
    title: 'Astra | Web Games', 
    icon: '/favicon.ico',
    logo: ''
  }
];

interface CloakSelectorProps {
  onSelect: (option: CloakOption) => void;
}

const CloakSelector: React.FC<CloakSelectorProps> = ({ onSelect }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950 p-6 overflow-y-auto">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-8 duration-700">
          <h1 className="text-4xl md:text-6xl font-astra font-bold text-white mb-4 italic tracking-tighter uppercase">
            Choose Your Disguise
          </h1>
          <p className="text-slate-500 text-lg font-light italic">
            Select how you want this tab to appear in your browser history and bar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-1000 delay-200">
          {CLOAK_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelect(option)}
              className="group relative bg-slate-900/50 border border-white/5 rounded-[2rem] p-8 transition-all hover:bg-white/5 hover:border-indigo-500/30 text-left overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl pointer-events-none group-hover:bg-indigo-500/10 transition-all" />
              
              <div className="flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {option.id === 'none' ? (
                    <span className="text-2xl">❌</span>
                  ) : (
                    <img src={option.icon} alt={option.name} className="w-10 h-10 object-contain" />
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight italic">
                  {option.name}
                </h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  The tab will be named "{option.title}" and use its icon.
                </p>

                <div className="mt-8 text-[10px] font-black text-indigo-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Select Disguise →
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-16 text-center text-slate-700 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
          Secure • Fast • Hidden
        </div>
      </div>
    </div>
  );
};

export default CloakSelector;
