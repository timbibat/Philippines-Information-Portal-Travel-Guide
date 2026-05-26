import { useState } from 'react';
import { PHRASES } from '../data';
import { Search, Volume2 } from 'lucide-react';
import { Phrase } from '../types';

export default function Phrasebook() {
  const [phraseSearch, setPhraseSearch] = useState<string>('');
  const [activePhraseContext, setActivePhraseContext] = useState<'all' | 'greetings' | 'dining' | 'travel'>('all');
  const [selectedLanguageForPhrase, setSelectedLanguageForPhrase] = useState<'tagalog' | 'cebuano' | 'ilocano'>('tagalog');
  const [soundNote, setSoundNote] = useState<string | null>(null);

  // Filter Phrasebook
  const filteredPhrases = PHRASES.filter(phrase => {
    const matchesContext = activePhraseContext === 'all' || phrase.context === activePhraseContext;
    const searchString = phraseSearch.toLowerCase();
    const matchesSearch = phrase.english.toLowerCase().includes(searchString) ||
      phrase.tagalog.toLowerCase().includes(searchString) ||
      phrase.cebuano.toLowerCase().includes(searchString) ||
      phrase.ilocano.toLowerCase().includes(searchString);
    return matchesContext && matchesSearch;
  });

  // Play Pronunciation Tip using real Web Speech API Text-to-Speech
  const triggerPronunciationTip = (phrase: Phrase, text: string) => {
    setSoundNote(`Pronouncing: "${text}" -> Try reading it as: ${phrase.pronunciationTip}`);
    
    // Web Speech API - speaks the phrase out loud
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any currently speaking voices
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Use Tagalog voice if tagalog is selected, otherwise fallback to local reader
      if (selectedLanguageForPhrase === 'tagalog') {
        utterance.lang = 'fil-PH';
      } else {
        utterance.lang = 'fil-PH'; // Bisaya/Ilocano also spoken with Filipino phonetics works best
      }
      
      utterance.rate = 0.8; // Speak slightly slower for educational clarity
      window.speechSynthesis.speak(utterance);
    }

    // Clear after a few seconds
    setTimeout(() => {
      setSoundNote((current) => current && current.includes(text) ? null : current);
    }, 5000);
  };

  return (
    <div className="col-span-1 lg:col-span-5 bento-grid-item p-6 flex flex-col justify-between">
      <div className="space-y-4">
        <div>
          <span className="stat-label">LOCAL TRANSLATIONS</span>
          <h3 className="text-2xl font-serif-display font-black text-slate-900 tracking-tight">Phrasebook</h3>
          <p className="text-xs text-slate-500 mt-1">Compare phrases across Tagalog, Cebuano, and Ilocano</p>
        </div>

        {/* Target Language selector buttons */}
        <div className="flex gap-1.5 p-1 bg-slate-50 border border-slate-200/60 rounded-xl">
          {(['tagalog', 'cebuano', 'ilocano'] as const).map(lang => (
            <button
              key={lang}
              onClick={() => setSelectedLanguageForPhrase(lang)}
              className={`flex-1 text-center py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${selectedLanguageForPhrase === lang
                  ? 'bg-[#0038A8] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
            >
              {lang === 'tagalog' ? 'Tagalog (N)' : lang === 'cebuano' ? 'Cebuano (S)' : 'Ilocano (N)'}
            </button>
          ))}
        </div>

        {/* Search bar & Category filter Row */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search words..."
              value={phraseSearch}
              onChange={(e) => setPhraseSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs outline-hidden focus:border-[#0038A8] focus:bg-white"
            />
          </div>
          <select
            value={activePhraseContext}
            onChange={(e) => setActivePhraseContext(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs outline-hidden font-bold text-slate-600 focus:border-[#0038A8]"
          >
            <option value="all">All Situations</option>
            <option value="greetings">Greetings</option>
            <option value="dining">Eating & Dining</option>
            <option value="travel">Transport & Travel</option>
          </select>
        </div>

        {/* Audio Pronunciation note overlay if active */}
        {soundNote && (
          <div className="p-2.5 bg-amber-50 border border-amber-300 rounded-lg text-xs text-amber-900 flex items-start gap-1.5 animate-fadeIn">
            <Volume2 className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
            <span className="font-semibold">{soundNote}</span>
          </div>
        )}

        {/* Phrase matching Scrollbox */}
        <div className="h-[500px] overflow-y-auto space-y-1.5 pr-1">
          {filteredPhrases.length > 0 ? (
            filteredPhrases.map(phr => {
              const translation = phr[selectedLanguageForPhrase];
              return (
                <div
                  key={phr.id}
                  onClick={() => triggerPronunciationTip(phr, translation)}
                  className="p-3 bg-slate-50/50 hover:bg-amber-50/50 hover:border-amber-200 border border-slate-100 rounded-lg cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{phr.english}</p>
                    <p className="text-sm font-black text-slate-900">{translation}</p>
                  </div>
                  <button className="h-7 w-7 bg-white text-slate-400 hover:text-amber-500 hover:border-amber-300 rounded-full border border-slate-150 flex items-center justify-center transition-colors group-hover:scale-105">
                    <Volume2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-center py-6 text-xs text-slate-400">No phrases found. Try adjusting filters.</p>
          )}
        </div>
      </div>

      <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>(N) Northern Dialects</span>
        <span>(S) Southern Dialects</span>
      </div>
    </div>
  );
}
