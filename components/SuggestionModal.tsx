
import React, { useState, useEffect } from 'react';
import { validateSuggestion } from '../services/geminiService';

interface SuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1472366479524761741/gCMREl4ZEhDFlR1NI4rkz_X6E2bvODw8AtKqDbyCawgZlX8HOEohw071f7xNg78yQA3W';

const SuggestionModal: React.FC<SuggestionModalProps> = ({ isOpen, onClose }) => {
  const [suggestion, setSuggestion] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const lastSent = localStorage.getItem('astra_last_suggestion');
    if (lastSent) {
      const remaining = 30 - Math.floor((Date.now() - parseInt(lastSent)) / 1000);
      if (remaining > 0) setCooldown(remaining);
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: number;
    if (cooldown > 0) {
      timer = window.setInterval(() => {
        setCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim() || isSending || cooldown > 0) return;

    setIsSending(true);
    setErrorMsg(null);

    try {
      const moderation = await validateSuggestion(suggestion);
      
      if (!moderation.valid) {
        setErrorMsg(moderation.reason || "Your suggestion was flagged as spam or inappropriate.");
        setIsSending(false);
        return;
      }

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: '🎮 New Game Suggestion',
            description: suggestion,
            color: 6387193, 
            timestamp: new Date().toISOString(),
            footer: { text: 'Astra Feedback' }
          }]
        })
      });

      if (response.ok) {
        setSentSuccess(true);
        localStorage.setItem('astra_last_suggestion', Date.now().toString());
        setCooldown(30);
        setSuggestion('');
        setTimeout(() => {
          setSentSuccess(false);
          onClose();
        }, 2000);
      } else {
        setErrorMsg('Failed to send. Try again later.');
      }
    } catch (error) {
      console.error('Error sending suggestion:', error);
      setErrorMsg('An error occurred while sending.');
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px] pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-astra font-bold text-white italic uppercase tracking-tight">Suggest Games</h2>
              <p className="text-indigo-400 text-[10px] font-black tracking-[0.3em] mt-1 uppercase">Feedback System</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-8 p-4 bg-white/5 border border-white/5 rounded-2xl">
            <p className="text-slate-400 text-sm italic font-light leading-relaxed">
              "Your suggestions are read daily. Please be helpful and avoid spam."
            </p>
          </div>

          {sentSuccess ? (
            <div className="py-12 text-center animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">Message Received</h3>
              <p className="text-slate-500">Thanks for your suggestion.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <textarea
                  required
                  rows={4}
                  disabled={cooldown > 0 || isSending}
                  className={`w-full bg-slate-950 border rounded-2xl p-6 text-white placeholder-slate-700 focus:outline-none focus:ring-2 transition-all font-light resize-none disabled:opacity-50 ${errorMsg ? 'border-rose-500 focus:ring-rose-500/50' : 'border-white/5 focus:ring-indigo-500/50'}`}
                  placeholder="What games should we add?..."
                  value={suggestion}
                  onChange={(e) => {
                    setSuggestion(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                />
                {errorMsg && (
                  <div className="mt-2 text-rose-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 animate-in slide-in-from-top-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {errorMsg}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSending || cooldown > 0 || !suggestion.trim()}
                className="w-full py-5 bg-white text-slate-950 hover:bg-indigo-400 hover:text-white disabled:bg-slate-800 disabled:text-slate-600 font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl active:scale-95 text-sm relative overflow-hidden"
              >
                {isSending ? 'SENDING...' : cooldown > 0 ? `WAIT: ${cooldown}s` : 'SEND SUGGESTION'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestionModal;
