export default function Header() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-40 py-4 px-6 md:px-8 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg" 
            alt="Flag of the Philippines" 
            className="w-9 h-auto rounded-xs shadow-xs border border-slate-200/50"
          />
          <div>
            <span className="text-2xl font-serif-display font-black tracking-tight text-[#0038A8] italic">
              PILIPINAS
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <div className="flex gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
            <span className="px-3 py-1 bg-white/60 border border-slate-200/60 rounded-full text-slate-600 shadow-xs flex items-center gap-1">
              ☀️ Tropical 27°C
            </span>
            <span className="px-3 py-1 bg-white/60 border border-slate-200/60 rounded-full text-slate-600 shadow-xs flex items-center gap-1">
              🇵🇭 PHP / Peso
            </span>
          </div>
          <a 
            href="#bayani"
            className="px-4 py-1.5 bg-[#0038A8] hover:bg-blue-800 hover:scale-102 active:scale-98 text-white rounded-full text-xs font-bold tracking-wider shadow-sm transition-all"
          >
            TALK TO BAYANI
          </a>
        </div>
      </div>
    </header>
  );
}
