
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import Logo from './Logo';

const AIHelper: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);

  const handleHelp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setChat(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: "You are Astra AI. Your goal is to provide correct, high-quality, and insightful information. You should answer complex or 'big' questions with depth, while ensuring the explanation remains easy to understand and clear for any reader. Use simple, clean plain text only. DO NOT use LaTeX, math symbols like $, or formatting codes like \\bf or {}. Focus on being accurate, thorough, and accessible.",
        },
      });

      setChat(prev => [...prev, { role: 'assistant', text: response.text || 'I encountered an error.' }]);
    } catch (error) {
      console.error(error);
      setChat(prev => [...prev, { role: 'assistant', text: 'Error: Unable to connect to the server.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="mb-12 text-center animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-2 mb-6">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Astra AI</span>
        </div>
        <h1 className="text-5xl font-astra font-bold mb-6 italic tracking-tight uppercase">STUDY CENTER</h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto font-light italic">Access a huge library of information.</p>
      </div>

      <div className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col h-[700px] shadow-2xl backdrop-blur-xl relative">
        <div className="flex-1 overflow-y-auto p-10 space-y-8 no-scrollbar">
          {chat.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-8 animate-in fade-in duration-1000">
              <Logo className="w-16 h-16 opacity-20 grayscale" />
              <p className="text-xl font-light italic tracking-wide text-center max-w-sm">How can I help you with your studies today?</p>
              <div className="grid grid-cols-2 gap-4 w-full max-w-lg mt-4">
                {['Theory of Relativity', 'Advanced Calculus', 'Medieval History', 'Creative Writing'].map(t => (
                  <button 
                    key={t}
                    onClick={() => setInput(t)}
                    className="p-5 text-xs font-bold bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-indigo-500/30 transition-all text-slate-400 uppercase tracking-widest"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
          {chat.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-6 rounded-3xl ${msg.role === 'user' ? 'bg-indigo-600/20 text-indigo-100 border border-indigo-500/30' : 'bg-slate-800/40 text-slate-200 border border-white/5 backdrop-blur-md shadow-lg font-light leading-relaxed whitespace-pre-wrap'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-800/40 p-5 rounded-3xl border border-white/5 flex gap-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleHelp} className="p-6 bg-slate-950/60 border-t border-white/10 flex gap-4 backdrop-blur-xl">
          <input 
            type="text" 
            placeholder="Search the database..."
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-light"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            disabled={loading}
            className="w-16 h-16 bg-white text-slate-950 hover:bg-indigo-400 hover:text-white rounded-2xl flex items-center justify-center transition-all disabled:opacity-50 active:scale-90 shadow-xl"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIHelper;
