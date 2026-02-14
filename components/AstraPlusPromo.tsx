
import React, { useState } from 'react';
import { User } from '../types';

interface AstraPlusPromoProps {
  currentUser: User | null;
  onAuthRequired: () => void;
  onUpgradeSuccess: () => void;
}

const AstraPlusPromo: React.FC<AstraPlusPromoProps> = ({ currentUser, onAuthRequired, onUpgradeSuccess }) => {
  const [isUpgrading, setIsUpgrading] = useState(false);

  const handleUpgrade = () => {
    if (!currentUser) {
      onAuthRequired();
      return;
    }

    if (currentUser.isAstraPlus) return;

    setIsUpgrading(true);
    setTimeout(() => {
      setIsUpgrading(false);
      onUpgradeSuccess();
    }, 2000);
  };

  return (
    <div className="relative group overflow-hidden rounded-[2.5rem] mb-16 p-1 bg-[#0a0a1a] border border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-[gradient_4s_linear_infinite]" />
      
      <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16 p-8 md:p-12 bg-slate-950/90 rounded-[2.3rem] backdrop-blur-2xl">
        <div className="relative w-full md:w-1/3 aspect-square flex items-center justify-center">
          <div className="absolute inset-0 bg-indigo-500/20 blur-[60px] animate-pulse" />
          <div className="z-10 flex flex-col items-center">
            <div className="text-8xl md:text-9xl font-astra font-black italic text-transparent bg-clip-text bg-gradient-to-br from-white to-indigo-500 drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]">
              {currentUser?.isAstraPlus ? 'A+' : 'A+'}
            </div>
            <div className="mt-4 px-4 py-1 bg-white/10 rounded-full border border-white/20 text-[10px] font-black tracking-[0.4em] text-white uppercase">
              {currentUser?.isAstraPlus ? 'MEMBER' : 'PREMIUM'}
            </div>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-astra font-bold text-white mb-6 italic tracking-tight uppercase">
            {currentUser?.isAstraPlus ? (
              <>Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Astra+</span></>
            ) : (
              <>Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Astra+</span></>
            )}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              { title: 'AI Games', icon: '🎮' },
              { title: 'Fast AI', icon: '⚡' },
              { title: 'Better Browser', icon: '🔒' },
              { title: 'Priority Access', icon: '🚀' }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                <span className="text-xl">{feature.icon}</span>
                <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">{feature.title}</span>
              </div>
            ))}
          </div>

          {!currentUser?.isAstraPlus ? (
            <button 
              onClick={handleUpgrade}
              disabled={isUpgrading}
              className="w-full md:w-auto px-12 py-5 bg-white text-slate-950 hover:bg-indigo-400 hover:text-white font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-95 text-sm"
            >
              {isUpgrading ? 'PROCESSING...' : currentUser ? 'UPGRADE NOW' : 'SIGN IN TO UPGRADE'}
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 text-indigo-400 font-black uppercase tracking-[0.2em] text-sm py-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Astra+ is active
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default AstraPlusPromo;
