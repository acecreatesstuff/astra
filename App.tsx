
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';
import AstraPlusPromo from './components/AstraPlusPromo';
import AIHelper from './components/AIHelper';
import ProxyPage from './components/ProxyPage';
import SuggestionModal from './components/SuggestionModal';
import AuthModal from './components/AuthModal';
import Logo from './components/Logo';
import CloakSelector, { CLOAK_OPTIONS, CloakOption } from './components/CloakSelector';
import TechnicalHider from './components/TechnicalHider';
import SettingsPage from './components/SettingsPage';
import { GAMES } from './constants';
import { Game, Category, View, User } from './types';

const CATEGORIES: Category[] = ['Action', 'Puzzle', 'Casual', 'Sports', 'Strategy', 'Arcade'];

const AstraHero: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const words = ["Inspiration", "Fun", "Happiness"];
  const typingSpeed = isDeleting ? 50 : 150;

  useEffect(() => {
    const timer = setTimeout(() => {
      const fullWord = words[currentWordIndex];
      
      if (!isDeleting) {
        setDisplayText(fullWord.substring(0, displayText.length + 1));
        if (displayText.length === fullWord.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayText(fullWord.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex]);

  return (
    <div className="relative h-[450px] md:h-[550px] rounded-[3rem] overflow-hidden mb-16 bg-space border border-white/5 flex flex-col items-center justify-center text-center px-6 transition-all duration-1000">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] glow-purple pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] glow-blue pointer-events-none" />

      <div className="relative z-10 animate-in fade-in zoom-in duration-1000">
        <div className="mb-10 flex justify-center">
          <Logo className="w-24 h-24 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] transform -rotate-3 hover:rotate-0 transition-all duration-700" />
        </div>
        
        <h1 className="text-7xl md:text-9xl font-astra font-bold tracking-tighter text-white mb-6 italic drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] uppercase tracking-[0.1em]">
          ASTRA
        </h1>
        
        <div className="h-12 flex items-center justify-center">
          <p className="text-2xl md:text-4xl font-light text-slate-400 tracking-tight">
            Creating "<span className="text-white font-medium typing-cursor">{displayText}</span>"
          </p>
        </div>

        <div className="mt-14 flex flex-wrap gap-6 justify-center">
          <div className="px-8 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-xs font-black text-indigo-400 uppercase tracking-[0.3em]">
            FAST ENGINE
          </div>
          <div className="px-8 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-xs font-black text-indigo-400 uppercase tracking-[0.3em]">
            LAG FREE
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
};

const App: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [currentView, setCurrentView] = useState<View>('Games');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isHiderSelected, setIsHiderSelected] = useState<boolean>(!!sessionStorage.getItem('astra_hider_passed'));
  const [currentCloakId, setCurrentCloakId] = useState<string>(localStorage.getItem('astra_cloak') || 'none');
  const [fastMode, setFastMode] = useState<boolean>(localStorage.getItem('astra_fast_mode') === 'true');

  useEffect(() => {
    const savedSession = localStorage.getItem('astra_session');
    if (savedSession) {
      setCurrentUser(JSON.parse(savedSession));
    }

    const savedCloak = localStorage.getItem('astra_cloak');
    if (savedCloak) {
      const option = CLOAK_OPTIONS.find(o => o.id === savedCloak);
      if (option) applyCloak(option);
    }
  }, []);

  const applyCloak = (option: CloakOption) => {
    document.title = option.title;
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = option.icon;
    document.getElementsByTagName('head')[0].appendChild(link);
    localStorage.setItem('astra_cloak', option.id);
    setCurrentCloakId(option.id);
  };

  const toggleFastMode = () => {
    const newVal = !fastMode;
    setFastMode(newVal);
    localStorage.setItem('astra_fast_mode', String(newVal));
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('astra_session', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('astra_session');
  };

  const handleUpgradeSuccess = () => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, isAstraPlus: true };
    setCurrentUser(updatedUser);
    localStorage.setItem('astra_session', JSON.stringify(updatedUser));
    
    const users = JSON.parse(localStorage.getItem('astra_users') || '[]');
    const userIdx = users.findIndex((u: any) => u.username === currentUser.username);
    if (userIdx !== -1) {
      users[userIdx].isAstraPlus = true;
      localStorage.setItem('astra_users', JSON.stringify(users));
    }
  };

  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const renderContent = () => {
    switch (currentView) {
      case 'AIHelper':
        return <AIHelper />;
      case 'Proxy':
        return <ProxyPage />;
      case 'Settings':
        return (
          <SettingsPage 
            onApplyCloak={applyCloak} 
            currentCloakId={currentCloakId} 
            fastMode={fastMode} 
            onToggleFastMode={toggleFastMode}
          />
        );
      case 'Games':
      default:
        return (
          <>
            {!searchQuery && activeCategory === 'All' && <AstraHero />}
            
            <AstraPlusPromo 
              currentUser={currentUser} 
              onAuthRequired={() => setIsAuthModalOpen(true)}
              onUpgradeSuccess={handleUpgradeSuccess}
            />
            
            <div className="flex items-center gap-4 overflow-x-auto pb-6 mb-12 no-scrollbar">
              <button 
                onClick={() => setActiveCategory('All')}
                className={`px-8 py-3.5 rounded-[1.5rem] font-bold whitespace-nowrap transition-all border ${activeCategory === 'All' ? 'bg-white text-slate-950 border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'bg-slate-900/50 text-slate-500 border-white/5 hover:bg-slate-800/80 hover:text-slate-300'}`}
              >
                All Games
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-3.5 rounded-[1.5rem] font-bold whitespace-nowrap transition-all border ${activeCategory === cat ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)]' : 'bg-slate-900/50 text-slate-500 border-white/5 hover:bg-slate-800/80 hover:text-slate-300'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="game-grid">
              {filteredGames.length > 0 ? (
                filteredGames.map(game => (
                  <GameCard 
                    key={game.id} 
                    game={game} 
                    onSelect={setSelectedGame}
                    badge={game.plays > 50000 ? 'POPULAR' : undefined}
                  />
                ))
              ) : (
                <div className="col-span-full py-28 text-center bg-white/5 rounded-[3rem] border border-white/5 backdrop-blur-sm">
                  <div className="text-7xl mb-6 animate-pulse">🛸</div>
                  <h3 className="text-3xl font-astra font-bold text-slate-200">No Games Found</h3>
                  <p className="text-slate-500 mt-3 max-w-sm mx-auto font-light">Nothing turned up in your search.</p>
                  <button 
                    onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                    className="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-indigo-400 font-bold transition-all border border-indigo-500/20"
                  >
                    Reset Search
                  </button>
                </div>
              )}
            </div>
          </>
        );
    }
  };

  if (!isHiderSelected) {
    return <TechnicalHider onContinue={() => {
      sessionStorage.setItem('astra_hider_passed', 'true');
      setIsHiderSelected(true);
    }} />;
  }

  return (
    <div className={`min-h-screen pb-20 bg-slate-950 text-slate-200 selection:bg-indigo-500/30 font-astra ${fastMode ? 'fast-mode' : ''}`}>
      <Navbar 
        onSearch={setSearchQuery} 
        searchQuery={searchQuery} 
        onMenuToggle={() => setIsSidebarOpen(true)} 
        onSuggestToggle={() => setIsSuggestModalOpen(true)}
        onAuthToggle={() => setIsAuthModalOpen(true)}
        currentUser={currentUser}
      />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 animate-in fade-in duration-1000">
        {renderContent()}
      </main>

      <SuggestionModal 
        isOpen={isSuggestModalOpen} 
        onClose={() => setIsSuggestModalOpen(false)} 
      />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {selectedGame && (
        <GamePlayer 
          game={selectedGame} 
          onClose={() => setSelectedGame(null)} 
        />
      )}

      <footer className="border-t border-white/5 py-16 px-4 md:px-8 mt-20 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-4 mb-3">
              <Logo className="w-8 h-8 opacity-80" />
              <span className="text-2xl font-astra font-bold text-white tracking-widest italic uppercase">ASTRA</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs font-light leading-relaxed">Providing the best unblocked games for everyone. Powered by Glide Studios.</p>
          </div>
          
          <div className="flex gap-12 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-all">Privacy</a>
            <a href="#" className="hover:text-white transition-all">Rules</a>
            <a href="#" className="hover:text-white transition-all">Support</a>
          </div>

          <div className="text-slate-700 text-[11px] font-black uppercase tracking-[0.4em]">
            Version 2.5.0 • © 2024
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
