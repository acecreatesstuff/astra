
import React, { useState, useEffect, useRef } from 'react';

const ProxyPage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [...prev.slice(-15), `[${time}] ${msg}`]);
  };

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsConnecting(true);
    addLog(`STARTING BROWSER FOR: ${url}`);
    
    setTimeout(() => addLog("Connecting to site..."), 400);
    setTimeout(() => addLog("Setting up browser settings..."), 900);
    setTimeout(() => addLog("Preparing page..."), 1400);
    setTimeout(() => {
      addLog("READY. REDIRECTING WINDOW.");
      window.location.href = `/?launch=true&url=${encodeURIComponent(url)}`;
    }, 2200);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 animate-in fade-in duration-1000">
      <div className="flex flex-col lg:flex-row gap-10">
        
        <div className="flex-1 space-y-8">
          <div className="bg-slate-900/40 border border-indigo-500/20 rounded-[3rem] p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-astra font-bold text-white uppercase italic tracking-tighter">Private Browser</h1>
                <p className="text-[10px] text-indigo-400 font-black tracking-[0.4em] uppercase">Browser version 3.1</p>
              </div>
            </div>

            <form onSubmit={handleLaunch} className="space-y-6">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <span className="text-indigo-500 font-black text-xs">GO://</span>
                </div>
                <input 
                  type="text" 
                  placeholder="Enter site url (e.g. google.com)"
                  className="w-full bg-slate-950/80 border border-white/5 rounded-2xl pl-20 pr-8 py-6 text-white text-lg placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all font-light"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Real-time', status: 'ON' },
                  { label: 'Unblocked', status: 'YES' },
                  { label: 'Security', status: 'ACTIVE' },
                  { label: 'Cookies', status: 'SYNCED' }
                ].map((t) => (
                  <div key={t.label} className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center">
                    <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">{t.label}</div>
                    <div className="text-xs font-bold text-indigo-400">{t.status}</div>
                  </div>
                ))}
              </div>

              <button 
                type="submit"
                disabled={isConnecting || !url.trim()}
                className="w-full py-6 bg-white text-slate-950 hover:bg-indigo-400 hover:text-white disabled:bg-slate-800 disabled:text-slate-600 font-black uppercase tracking-[0.3em] rounded-2xl transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-95 text-sm"
              >
                {isConnecting ? 'STARTING BROWSER...' : 'LAUNCH BROWSER'}
              </button>
            </form>
          </div>

          <div className="bg-black/60 border border-white/5 rounded-[2rem] p-6 font-mono text-[11px] h-48 overflow-y-auto no-scrollbar shadow-inner">
            <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
              </div>
              <span className="text-slate-600 uppercase font-black tracking-widest ml-2">Logs</span>
            </div>
            {logs.length === 0 && <div className="text-slate-700 italic">No active session. Ready.</div>}
            {logs.map((log, i) => (
              <div key={i} className="text-indigo-400/80 mb-1 animate-in slide-in-from-left-2 duration-300">
                <span className="text-slate-600 mr-2">➜</span> {log}
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <div className="p-8 bg-indigo-950/20 border border-indigo-500/20 rounded-[2.5rem]">
            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-6 border-b border-white/5 pb-4 italic">Browser Engine</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                 <span className="text-[10px] text-slate-500 font-black uppercase">Full Page Mode</span>
                 <span className="text-[10px] text-emerald-500 font-bold">ACTIVE</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-[10px] text-slate-500 font-black uppercase">Session Sync</span>
                 <span className="text-[10px] text-emerald-500 font-bold">READY</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-[10px] text-slate-500 font-black uppercase">Browser Settings</span>
                 <span className="text-[10px] text-emerald-500 font-bold">UPDATED</span>
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-900/40 border border-white/5 rounded-[2.5rem] relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl" />
             <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Fast Browser</h4>
             <p className="text-[11px] text-slate-500 leading-relaxed font-light italic">
               Sites often block old browsing methods. Our new engine bypasses this by loading sites directly in the window. You stay on our page while any other site loads normally, with our control bar at the top to help you get back.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProxyPage;
