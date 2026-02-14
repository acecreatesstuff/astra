
import React from 'react';
import { CLOAK_OPTIONS, CloakOption } from './CloakSelector';

interface SettingsPageProps {
  onApplyCloak: (option: CloakOption) => void;
  currentCloakId: string;
  fastMode: boolean;
  onToggleFastMode: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onApplyCloak, currentCloakId, fastMode, onToggleFastMode }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 animate-in fade-in duration-700">
      <div className="mb-12">
        <h1 className="text-4xl font-astra font-bold text-white italic tracking-tight uppercase mb-4">Settings</h1>
        <p className="text-slate-500 font-light italic">Customize your Astra experience and security preferences.</p>
      </div>

      <section className="space-y-8">
        <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-astra font-bold text-white uppercase italic">Tab Disguise</h2>
          </div>

          <p className="text-slate-400 text-sm mb-8 font-light max-w-2xl leading-relaxed">
            Changing your disguise updates the tab's title and favicon in your browser bar. This helps keep your activity private in shared environments.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CLOAK_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => onApplyCloak(option)}
                className={`group relative p-6 rounded-2xl border transition-all text-left overflow-hidden ${
                  currentCloakId === option.id 
                  ? 'bg-indigo-600/10 border-indigo-500/50 ring-1 ring-indigo-500/50' 
                  : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-white/10">
                    {option.id === 'none' ? (
                      <span className="text-xl">❌</span>
                    ) : (
                      <img src={option.icon} alt={option.name} className="w-6 h-6 object-contain" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white uppercase tracking-tight">{option.name}</div>
                    <div className="text-[10px] text-slate-500 font-medium">{option.title}</div>
                  </div>
                </div>
                {currentCloakId === option.id && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white uppercase italic mb-4">Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex flex-col">
                  <span className="text-sm text-slate-300 font-bold uppercase tracking-widest">Fast Mode</span>
                  <span className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">Disables all animations</span>
                </div>
                <button 
                  onClick={onToggleFastMode}
                  className={`w-12 h-6 rounded-full relative px-1 flex items-center transition-colors ${fastMode ? 'bg-indigo-600' : 'bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-all ${fastMode ? 'ml-auto' : 'ml-0'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 opacity-50">
                <span className="text-sm text-slate-300 font-bold uppercase tracking-widest">Low Latency</span>
                <div className="w-10 h-5 bg-indigo-600 rounded-full relative px-1 flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full ml-auto" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white uppercase italic mb-4">Security</h3>
            <div className="space-y-4">
               <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 opacity-50">
                <span className="text-sm text-slate-300 font-bold uppercase tracking-widest">Auto-Lock</span>
                <div className="w-10 h-5 bg-slate-700 rounded-full relative px-1 flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-sm text-slate-300 font-bold uppercase tracking-widest">History Blur</span>
                <div className="w-10 h-5 bg-indigo-600 rounded-full relative px-1 flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full ml-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
