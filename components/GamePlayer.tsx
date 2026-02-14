
import React, { useState, useEffect } from 'react';
import { Game } from '../types';

interface GamePlayerProps {
  game: Game;
  onClose: () => void;
}

const GamePlayer: React.FC<GamePlayerProps> = ({ game, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) setIsFullscreen(false);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isFullscreen, onClose]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-slate-950 flex flex-col ${isFullscreen ? '' : 'p-4 md:p-8'}`}>
      <div className={`flex items-center justify-between mb-4 ${isFullscreen ? 'absolute top-4 right-4 z-50 bg-black/50 p-2 rounded-lg' : ''}`}>
        {!isFullscreen && (
          <div className="flex items-center">
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-full mr-4 text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-xl md:text-2xl font-bold">{game.title}</h2>
          </div>
        )}
        
        <div className="flex gap-2">
          <button 
            onClick={toggleFullscreen}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L4 4m0 0l5 0m-5 0l0 5m11-5l5 5m0 0l-5 0m5 0l0-5M9 15l-5 5m0 0l5 0m-5 0l0-5m11 5l5-5m0 0l-5 0m5 0l0 5" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            )}
          </button>
          {!isFullscreen && (
            <button 
              onClick={onClose}
              className="p-2 bg-red-900/50 hover:bg-red-900 rounded-lg text-red-200 transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 w-full bg-black rounded-xl overflow-hidden shadow-2xl relative border border-slate-800">
        <iframe 
          src={game.url} 
          className="w-full h-full border-none"
          title={game.title}
          allow="autoplay; fullscreen; keyboard"
        />
      </div>
      
      {!isFullscreen && (
        <div className="mt-4 text-slate-400 text-sm hidden md:block">
          Playing <span className="text-indigo-400 font-semibold">{game.title}</span> • Press <kbd className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700 text-xs">ESC</kbd> to exit player
        </div>
      )}
    </div>
  );
};

export default GamePlayer;
