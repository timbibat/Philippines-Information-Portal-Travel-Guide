import { useState } from 'react';
import { DISHES } from '../data';

export default function CuisineShowcase() {
  const [selectedDishId, setSelectedDishId] = useState<string>('adobo');
  const activeDish = DISHES.find(d => d.id === selectedDishId) || DISHES[0];

  return (
    <section aria-label="Filipino Cuisine Showcase" className="col-span-1 lg:col-span-7 bento-grid-item p-6 flex flex-col justify-between">
      <div className="space-y-4">
        <div>
          <span className="stat-label">FLAVORS OF THE ARCHIPELAGO</span>
          <h2 className="text-2xl font-serif-display font-black text-slate-900 tracking-tight">Cuisine Showcase</h2>
          <p className="text-xs text-slate-500 mt-1">Click a dish below to study its origins, preparation, and flavor profiles</p>
        </div>

        {/* Dish Selector row */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-slate-100">
          {DISHES.map(d => (
            <button
              key={d.id}
              onClick={() => setSelectedDishId(d.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black whitespace-nowrap transition-all shrink-0 ${
                selectedDishId === d.id 
                  ? 'bg-[#CE1126] text-white shadow-sm scale-102' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>

        {/* Selected dish details */}
        <div key={activeDish.id} className="animate-fade-in space-y-4 pt-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h4 className="text-xl font-serif-display font-black text-slate-900 flex items-center gap-1.5">
                {activeDish.name}
                {activeDish.originalName && (
                  <span className="text-xs font-semibold text-slate-400">({activeDish.originalName})</span>
                )}
              </h4>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider">Pronounced: {activeDish.pronunciation}</p>
            </div>
            <span className="text-xs font-extrabold text-[#CE1126] bg-red-50 border border-red-100 px-2.5 py-0.5 rounded-full">
              Origin: {activeDish.islandGroupOrigin}
            </span>
          </div>

          {activeDish.imageUrl && (
            <div className="w-full h-40 sm:h-52 rounded-2xl overflow-hidden shadow-xs border border-slate-200/50 relative group">
              <img 
                src={activeDish.imageUrl} 
                alt={`${activeDish.name} — traditional Filipino dish from ${activeDish.islandGroupOrigin}`} 
                className="w-full h-full object-cover group-hover:scale-102 transition-all duration-500"
              />
            </div>
          )}

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
            {activeDish.description}
          </p>

          {/* Cultural History Highlight */}
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">History & Cultural Context:</span>
            <p className="text-xs text-slate-700 leading-snug font-medium italic">"{activeDish.historyAndCulture}"</p>
          </div>

          {/* Flavor tags and key ingredients */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <span className="text-[9px] font-extrabold tracking-widest text-[#CE1126] uppercase block mb-1">FLAVOR PROFILE</span>
              <div className="flex flex-wrap gap-1">
                {activeDish.flavorProfile.map((flv, idx) => (
                  <span key={idx} className="text-[10px] font-bold text-slate-700 bg-amber-100/60 px-2.5 py-0.5 rounded">
                    {flv}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[9px] font-extrabold tracking-widest text-slate-400 uppercase block mb-1">KEY INGREDIENTS</span>
              <p className="text-xs text-slate-700 font-semibold">
                {activeDish.mainIngredients.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 text-right">
        <span className="text-[10px] text-slate-400 font-mono italic">
          Preparation style: {activeDish.cookingStyle}
        </span>
      </div>
    </section>
  );
}
