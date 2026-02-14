
import React from 'react';

interface TechnicalHiderProps {
  onContinue: () => void;
}

const TechnicalHider: React.FC<TechnicalHiderProps> = ({ onContinue }) => {
  const siteUrl = window.location.origin;
  const iframeCode = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Google</title>
    <link rel="icon" href="https://ssl.gstatic.com/classroom/favicon.png">
    <style>
        body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; background: #020617; }
        iframe { width: 100%; height: 100%; border: none; position: absolute; inset: 0; }
    </style>
</head>
<body>
    <iframe src="${siteUrl}"></iframe>
</body>
</html>`;

  const handleWindowAB = () => {
    window.open(siteUrl, "_blank", "width=1200,height=800,menubar=no,status=no");
    onContinue();
  };

  const handleFileCloak = () => {
    const blob = new Blob([iframeCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AstraLauncher.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onContinue();
  };

  const handleBlobCloak = () => {
    const blob = new Blob([iframeCode], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
    onContinue();
  };

  const handleAB_Cloak = () => {
    const win = window.open('about:blank', '_blank');
    if (win) {
      win.document.write(iframeCode);
      win.document.close();
    }
    onContinue();
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black p-6 font-astra">
      <div className="max-w-2xl w-full text-center space-y-12">
        <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Welcome to Astra!
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-medium tracking-wide">
            Use one of the following to make the link last longer!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in zoom-in duration-1000 delay-300">
          <button 
            onClick={handleWindowAB}
            className="flex flex-col items-center gap-3 p-5 bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all active:scale-95 shadow-lg group"
          >
            <div className="w-8 h-8 flex items-center justify-center">
               <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
               </svg>
            </div>
            <span className="text-white text-[10px] md:text-xs font-black uppercase tracking-widest leading-tight">Window A:B</span>
          </button>

          <button 
            onClick={handleFileCloak}
            className="flex flex-col items-center gap-3 p-5 bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all active:scale-95 shadow-lg group"
          >
            <div className="w-8 h-8 flex items-center justify-center">
               <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
               </svg>
            </div>
            <span className="text-white text-[10px] md:text-xs font-black uppercase tracking-widest leading-tight">File Cloak</span>
          </button>

          <button 
            onClick={handleBlobCloak}
            className="flex flex-col items-center gap-3 p-5 bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all active:scale-95 shadow-lg group"
          >
            <div className="w-8 h-8 flex items-center justify-center">
               <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
               </svg>
            </div>
            <span className="text-white text-[10px] md:text-xs font-black uppercase tracking-widest leading-tight">Blob Cloak</span>
          </button>

          <button 
            onClick={handleAB_Cloak}
            className="flex flex-col items-center gap-3 p-5 bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all active:scale-95 shadow-lg group"
          >
            <div className="w-8 h-8 flex items-center justify-center">
               <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
               </svg>
            </div>
            <span className="text-white text-[10px] md:text-xs font-black uppercase tracking-widest leading-tight">A:B Cloak</span>
          </button>
        </div>

        <div className="pt-8">
          <button 
            onClick={onContinue}
            className="text-slate-500 hover:text-white text-xs font-black uppercase tracking-[0.3em] transition-colors"
          >
            Continue to Site →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechnicalHider;
