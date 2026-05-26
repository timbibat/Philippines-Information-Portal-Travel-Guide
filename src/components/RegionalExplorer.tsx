import { useState } from 'react';
import { ISLAND_GROUPS, DESTINATIONS } from '../data';
import { MapPin, ChevronRight, Compass, Sparkles } from 'lucide-react';

export default function RegionalExplorer() {
  const [selectedGroup, setSelectedGroup] = useState<'Luzon' | 'Visayas' | 'Mindanao'>('Luzon');
  const [activeDestId, setActiveDestId] = useState<string | null>('batanes');

  // Filter regional data and destinations
  const groupData = ISLAND_GROUPS.find(g => g.name === selectedGroup)!;
  const regionalDestinations = DESTINATIONS.filter(d => d.islandGroup === selectedGroup);

  return (
    <div className="bento-grid-item p-6 sm:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <span className="stat-label">ARCHIPELAGO EXPLORER</span>
          <h3 className="text-2xl font-serif-display font-black text-slate-900 tracking-tight">Geographic Divisions</h3>
        </div>
        {/* Luzon Visayas Mindanao Selector Row */}
        <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl self-start border border-slate-200/50">
          {(['Luzon', 'Visayas', 'Mindanao'] as const).map((g) => {
            const isActive = selectedGroup === g;
            return (
              <button
                key={g}
                onClick={() => {
                  setSelectedGroup(g);
                  // Set default active destination for this group
                  const associated = DESTINATIONS.filter(d => d.islandGroup === g);
                  if (associated.length > 0) setActiveDestId(associated[0].id);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                  isActive 
                    ? 'bg-[#0038A8] text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Regional Card profile */}
        <div className="lg:col-span-4 space-y-4">
          <div key={selectedGroup} className="animate-fade-in p-5 bg-slate-50 rounded-2xl border border-slate-200/30 space-y-3">
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 uppercase">
              {groupData.tagline}
            </span>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
              {groupData.description}
            </p>
            <div className="h-px bg-slate-200/60 my-2"></div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="font-bold text-slate-400">☀️ CLIMATE:</span>
                <span className="font-semibold text-slate-700">{groupData.climate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-slate-400">🗣️ LANGUAGES:</span>
                <span className="font-semibold text-slate-700">{groupData.nativeLanguages.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Destination selector inline buttons */}
          <div className="space-y-2">
            <span className="stat-label block px-1">Curated Spots</span>
            <div className="grid grid-cols-1 gap-1.5">
              {regionalDestinations.map(d => {
                const isActive = activeDestId === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setActiveDestId(d.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                      isActive 
                        ? 'bg-amber-500 text-white font-bold border-amber-600 shadow-sm' 
                        : 'bg-white text-slate-700 border-slate-150 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      {d.name}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Selected spot detail card with Experiences & Local Secret */}
        <div className="lg:col-span-8 bg-white/40 backdrop-blur-xs border border-slate-200/50 p-6 rounded-2xl shadow-xs">
          {activeDestId ? (() => {
            const dest = DESTINATIONS.find(d => d.id === activeDestId)!;
            return (
              <div key={activeDestId} className="animate-fade-in space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#CE1126] uppercase tracking-wider mb-1">
                      📍 {dest.location}
                    </span>
                    <h4 className="text-2xl font-serif-display font-black text-slate-900 tracking-tight">{dest.name}</h4>
                  </div>
                  <span className="bg-amber-400/10 border border-amber-300/30 text-amber-800 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
                    📅 BEST TIME: {dest.bestTime}
                  </span>
                </div>

                {dest.imageUrl && (
                  <div className="w-full h-48 sm:h-64 rounded-2xl overflow-hidden shadow-xs border border-slate-200/50 relative group">
                    <img 
                      src={dest.imageUrl} 
                      alt={dest.name} 
                      className="w-full h-full object-cover group-hover:scale-102 transition-all duration-500"
                    />
                  </div>
                )}

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  {dest.description}
                </p>

                {/* Experiences Grid */}
                <div className="space-y-2">
                  <span className="text-[9px] font-extrabold tracking-widest text-[#0038A8] uppercase block">
                    🎒 CORE ACTIVITIES & EXPERIENCES
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {dest.activities.map((act, i) => (
                      <div key={i} className="flex items-start gap-2 bg-white/95 border border-slate-200/60 p-3 rounded-lg shadow-xs hover:border-[#0038A8]/20 transition-all duration-300">
                        <Sparkles className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                        <span className="text-xs text-slate-700 font-semibold">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Local Secret yellow card */}
                <div className="p-4 bg-amber-50/70 border-l-4 border-amber-400 rounded-r-xl space-y-1">
                  <p className="text-xs font-bold text-amber-950 uppercase tracking-widest flex items-center gap-1.5">
                    💡 LOCAL SECRET / INSIDER TIP
                  </p>
                  <p className="text-xs text-slate-700 leading-relaxed italic font-medium">
                    "{dest.funFact}"
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {dest.tags.map((tag, i) => (
                    <span key={i} className="text-[9px] font-black uppercase text-slate-500 bg-slate-100 border border-slate-200/40 px-2 py-0.5 rounded tracking-wide">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })() : (
            <div className="text-center py-12 text-slate-450">
              <Compass className="h-10 w-10 text-slate-300 mx-auto animate-pulse mb-2" />
              Select a destination to discover regional secrets
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
