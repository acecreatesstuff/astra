
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
  badge?: string;
}

const GameCard: React.FC<GameCardProps> = ({ game, onSelect, badge }) => {
  return (
    <div 
      onClick={() => onSelect(game)}
      className="group relative bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700/50 transition-all duration-300 hover:scale-[1.02] hover:bg-slate-700/50 hover:border-indigo-500/50 cursor-pointer"
    >
      {badge && (
        <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-indigo-600 text-xs font-bold rounded shadow-lg">
          {badge}
        </div>
      )}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors">
            {game.title}
          </h3>
          <span className="text-xs font-semibold text-slate-400 bg-slate-900/50 px-2 py-1 rounded">
            {game.category}
          </span>
        </div>
        <p className="text-sm text-slate-400 line-clamp-2 h-10">
          {game.description}
        </p>
        
        <div className="mt-4 flex items-center justify-between text-xs font-medium">
          <div className="flex items-center text-yellow-500">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {game.rating.toFixed(1)}
          </div>
          <div className="text-slate-500">
            {game.plays.toLocaleString()} plays
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
