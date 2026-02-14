
import React, { useState } from 'react';
import { getGameRecommendations } from '../services/geminiService';
import { Game } from '../types';
import { GAMES } from '../constants';

interface AIRecommenderProps {
  onSelect: (game: Game) => void;
}

const AIRecommender: React.FC<AIRecommenderProps> = ({ onSelect }) => {
  const [mood, setMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ game: Game; reason: string }[]>([]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood.trim()) return;

    setLoading(true);
    try {
      const recs = await getGameRecommendations(mood);
      const enrichedResults = recs
        .map(rec => ({
          game: GAMES.find(g => g.id === rec.id),
          reason: rec.reason
        }))
        .filter(r => r.game !== undefined) as { game: Game; reason: string }[];
      
      setResults(enrichedResults);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900/20 via-slate-900/40 to-slate-950 rounded-[2.5rem] p-10 border border-white/5 mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] pointer-events-none group-hover:bg-indigo-500/10 transition-all duration-700" />
      
      <div className="flex items-center gap-5 mb-8">
        <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center animate-pulse">
          <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-astra font-bold tracking-tight uppercase">ASTRA SEARCH</h2>
          <p className="text-sm text-slate-500 italic">"Find me a game for a rainy day..."</p>
        </div>
      </div>

      <form onSubmit={handleAsk} className="flex flex-col md:flex-row gap-4">
        <input 
          type="text" 
          placeholder="What kind of game are you looking for?"
          className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-light"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
        <button 
          disabled={loading}
          className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg active:scale-95"
        >
          {loading ? 'SEARCHING...' : 'GO'}
        </button>
      </form>

      {results.length > 0 && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
          {results.map((res, idx) => (
            <div 
              key={idx} 
              onClick={() => onSelect(res.game)}
              className="flex gap-6 p-6 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 hover:border-indigo-500/30 cursor-pointer transition-all backdrop-blur-md shadow-xl"
            >
              <img src={res.game.thumbnail} className="w-32 h-32 object-cover rounded-2xl shadow-2xl" alt={res.game.title} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                   <h3 className="font-bold text-xl text-white tracking-tight">{res.game.title}</h3>
                   <span className="text-[9px] font-black bg-indigo-500 text-white px-3 py-1 rounded-full uppercase tracking-widest">BEST MATCH</span>
                </div>
                <p className="text-sm text-slate-400 font-light italic leading-relaxed line-clamp-2 mb-3">"{res.reason}"</p>
                <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                  Play Now <span className="text-lg">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIRecommender;
