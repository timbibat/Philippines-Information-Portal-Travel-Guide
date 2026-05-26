import { Utensils } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Main 2x2 Accent Hero Cell */}
      <div className="col-span-1 lg:col-span-8 bg-gradient-to-br from-[#0038A8] to-[#002776] text-white rounded-[28px] relative p-8 md:p-10 border-none shadow-xl overflow-hidden flex flex-col justify-between min-h-[380px] hover:translate-y-[-4px] hover:shadow-2xl transition-all duration-300">
        {/* Ambient Background Glow */}
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 left-10 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest bg-white/15 px-3 py-1 rounded-full text-amber-300 mb-6 border border-white/10">
            🇵🇭 Pearl of the Orient Seas
          </span>
          <h1 className="text-6xl md:text-8xl font-serif-display font-black leading-[0.9] tracking-tighter mb-4">
            7,641<br/>
            <span className="text-amber-300 font-sans text-4xl md:text-5xl font-black uppercase tracking-widest block mt-2">ISLANDS</span>
          </h1>
        </div>

        <div className="relative z-10 max-w-xl text-blue-50/90 space-y-4">
          <p className="text-sm md:text-base font-medium leading-relaxed">
            Welcome to a spectacular archipelago of unmatched hospitality, pristine biodiverse waters, ancient mountainous rice terraces, and a tapestry of rich cultures and world-famous cuisines.
          </p>
          <div className="pt-2 flex flex-wrap gap-2">
            <span className="text-xs bg-white/10 border border-white/5 px-3 py-1 rounded-md font-bold tracking-wide">3 Major Island Divisions</span>
            <span className="text-xs bg-white/10 border border-white/5 px-3 py-1 rounded-md font-bold tracking-wide">82 Provinces</span>
            <span className="text-xs bg-white/10 border border-white/5 px-3 py-1 rounded-md font-bold tracking-wide">175+ Dialects</span>
          </div>
        </div>
      </div>

      {/* Side Bento Column: Fast Facts & Quick Climate Card */}
      <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
        {/* Flag Graphic Bento Header */}
        <div className="bento-grid-item p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-bl-full pointer-events-none animate-pulse-glow"></div>
          <div>
            <div className="stat-label">Capital City</div>
            <h2 className="text-3xl font-serif-display font-black text-slate-900 tracking-tight">Manila</h2>
            <p className="text-xs text-slate-500 mt-1">Historically rich metropolitan epicenter</p>
          </div>
          <div className="h-px bg-slate-100 my-4"></div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400/10 text-amber-500 font-black flex items-center justify-center text-lg">
              ☀️
            </div>
            <div>
              <div className="stat-label">Official Languages</div>
              <p className="text-sm font-bold text-slate-800">Filipino & English</p>
            </div>
          </div>
        </div>

        {/* Red Cuisine Info Bento Card */}
        <div className="bg-gradient-to-br from-[#CE1126] to-[#b00d1e] text-white rounded-[28px] border-none p-6 shadow-md relative overflow-hidden flex flex-col justify-between flex-1 hover:translate-y-[-4px] hover:shadow-2xl transition-all duration-300">
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-amber-300">
              <Utensils className="h-3 w-3" /> Culinary Heritage
            </span>
            <h3 className="text-2xl font-serif-display font-bold italic tracking-tight mt-3 mb-2">
              MALAY, SPANISH, CHINESE FUSION
            </h3>
            <p className="text-xs text-red-100/90 leading-relaxed">
              Filipino food celebrates vinegar-braising (Adobo), sour tamarind broths (Sinigang), and charcoal-roasted whole lechon skewered with fragrant lemongrass.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-red-200">
            <span>Try "Halo-Halo" for dessert</span>
            <span>🍧</span>
          </div>
        </div>
      </div>
    </div>
  );
}
