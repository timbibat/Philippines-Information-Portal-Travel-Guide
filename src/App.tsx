import { useState, useEffect, useRef } from 'react';
import { 
  ISLAND_GROUPS, 
  DESTINATIONS, 
  DISHES, 
  PHRASES, 
  QUIZ_QUESTIONS 
} from './data';
import { 
  Compass, 
  Utensils, 
  Languages, 
  HelpCircle, 
  Send, 
  RefreshCw, 
  MapPin, 
  Sun, 
  Sparkles, 
  BookOpen, 
  Info, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  ChevronRight, 
  Globe, 
  Calendar, 
  Award, 
  Volume2, 
  Search,
  Heart
} from 'lucide-react';
import { ChatMessage, Destination, Dish, Phrase } from './types';

export default function App() {
  // Region Selection State
  const [selectedGroup, setSelectedGroup] = useState<'Luzon' | 'Visayas' | 'Mindanao'>('Luzon');
  const [activeDestId, setActiveDestId] = useState<string | null>('batanes');

  // Culinary Selection State
  const [selectedDishId, setSelectedDishId] = useState<string>('adobo');
  const activeDish = DISHES.find(d => d.id === selectedDishId) || DISHES[0];

  // Phrasebook States
  const [phraseSearch, setPhraseSearch] = useState<string>('');
  const [activePhraseContext, setActivePhraseContext] = useState<'all' | 'greetings' | 'dining' | 'travel'>('all');
  const [selectedLanguageForPhrase, setSelectedLanguageForPhrase] = useState<'tagalog' | 'cebuano' | 'ilocano'>('tagalog');
  const [soundNote, setSoundNote] = useState<string | null>(null);

  // Trivia State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Mabuhay! I am Bayani, your interactive Philippine Guide & Cultural Concierge. 🌴 Ask me anything about planning your trip, local food, hidden beaches, or native festivals! What island are you dreaming of visiting?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Filter regional data and destinations
  const groupData = ISLAND_GROUPS.find(g => g.name === selectedGroup)!;
  const regionalDestinations = DESTINATIONS.filter(d => d.islandGroup === selectedGroup);

  // Scroll chatbot to bottom on news
  useEffect(() => {
    if (chatMessages.length > 1) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Handle Quiz selection
  const handleAnswerOptionClick = (optionIdx: number) => {
    if (hasAnswered) return;
    setSelectedOptionIdx(optionIdx);
    setHasAnswered(true);
    
    if (optionIdx === QUIZ_QUESTIONS[currentQuestionIdx].correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextIdx = currentQuestionIdx + 1;
    if (nextIdx < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIdx(nextIdx);
      setSelectedOptionIdx(null);
      setHasAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setHasAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  // Predefined prompts for Chatbot
  const ChatPrompts = [
    { title: "🎒 3-Day Cebu Itinerary", prompt: "Build me a fully structured 3-day itinerary in Cebu focusing on beaches, historic architecture, and local Lechon." },
    { title: "🍍 Must-try street food", prompt: "Can you list the most popular and unique Filipino street foods, how they taste, and where to find them?" },
    { title: "🌊 Siargao Packing Guide", prompt: "I am traveling to Siargao. What clothes, accessories, and surfing gear should I bring? Any safety precautions?" }
  ];

  // Send message to Bayani
  const handleSendMessage = async (msgText: string) => {
    if (!msgText.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: msgText,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsSending(true);
    setApiError(null);

    try {
      // Build basic conversational history for Gemini
      const formattedHistory = chatMessages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: msgText,
          history: formattedHistory
        })
      });

      const data = await res.json();

      if (res.ok && data.text) {
        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'model',
          text: data.text,
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, assistantMsg]);
      } else {
        setApiError(data.error || "An error occurred with the AI assistant.");
      }
    } catch (err: any) {
      setApiError("Unable to connect to the guide server. Please ensure GEMINI_API_KEY is configured in Secrets.");
      console.error("Chat failure:", err);
    } finally {
      setIsSending(false);
    }
  };

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

  // Play Pronunciation Tip Text-To-Speech simulation (client-side feedback)
  const triggerPronunciationTip = (phrase: Phrase, text: string) => {
    setSoundNote(`Pronouncing: "${text}" -> Try reading it as: ${phrase.pronunciationTip}`);
    // Clear after a few seconds
    setTimeout(() => {
      setSoundNote((current) => current && current.includes(text) ? null : current);
    }, 5000);
  };

  return (
    <div className="min-h-screen text-slate-800 font-sans antialiased">
      {/* HEADER SECTION - Brand Identity */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-40 py-4 px-6 md:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-1 w-10">
              <div className="h-2 w-full accent-blue rounded-full"></div>
              <div className="h-2 w-full accent-red rounded-full"></div>
            </div>
            <div>
              <span className="text-2xl font-serif-display font-black tracking-tight text-[#0038A8] italic">
                PILIPINAS
              </span>
              <span className="ml-2 font-mono text-[9px] bg-amber-400 text-slate-900 border border-amber-300 font-extrabold px-1.5 py-0.5 rounded-sm">
                BENTO COMPANION
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

      {/* CORE BENTO PORTAL CONTAINER */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* ROW 1: Hero Block & Flag Color Accents */}
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

        {/* ROW 2: Interactive Regional Explorer Grid */}
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
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/30 space-y-3">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 uppercase">
                  {groupData.tagline}
                </span>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
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
                  <div className="space-y-6">
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

        {/* ROW 3: Culinary & Multi-Dialect Phrasebook Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Chef Bento Card - Culinary Explorer */}
          <div className="col-span-1 lg:col-span-7 bento-grid-item p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="stat-label">FLAVORS OF THE ARCHIPELAGO</span>
                <h3 className="text-2xl font-serif-display font-black text-slate-900 tracking-tight">Cuisine Showcase</h3>
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
              <div className="space-y-4 pt-2">
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
          </div>

          {/* Phrasebook Bento Card - Interactive Translations */}
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
                    className={`flex-1 text-center py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                      selectedLanguageForPhrase === lang
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
              <div className="max-h-[220px] overflow-y-auto space-y-1.5 pr-1">
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
        </div>

        {/* ROW 4: Live Trivia Challenge */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-[28px] p-6 sm:p-8 border border-slate-800 shadow-2xl hover:translate-y-[-2px] hover:shadow-3xl transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="stat-label text-slate-500">KNOWLEDGE BATTLE</span>
              <h3 className="text-2xl font-serif-display font-black text-white tracking-tight">Archipelago Heritage Trivia</h3>
              <p className="text-xs text-slate-400 mt-0.5">Test your understanding of cultural history and state statistics</p>
            </div>
            {!quizFinished && (
              <span className="text-xs bg-slate-800 border border-slate-700/50 text-slate-300 font-bold px-3 py-1 rounded-full">
                Question {currentQuestionIdx + 1} of {QUIZ_QUESTIONS.length}
              </span>
            )}
          </div>

          {quizFinished ? (
            /* Finished/Score Board */
            <div className="text-center py-10 space-y-4 max-w-md mx-auto animate-fadeIn">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-400 text-slate-950 text-2xl font-black">
                {score === QUIZ_QUESTIONS.length ? '👑' : '🎉'}
              </div>
              <h4 className="text-2xl font-serif-display font-bold text-white">Quiz Completed!</h4>
              <p className="text-slate-300 text-sm">
                You scored <span className="font-bold text-amber-400 text-lg">{score}</span> out of {QUIZ_QUESTIONS.length} correct answers.
              </p>
              <div className="pt-2 bg-slate-900/60 p-4 rounded-xl border border-slate-850">
                <p className="text-xs text-slate-400">
                  {score >= 5 
                    ? "Exceptional! Devoted explorer. You know the Philippines inside-out!"
                    : score >= 3 
                      ? "Awesome job! You've got an active interest in the islands' stories."
                      : "Great start! Play again or read our bento cells to learn more secrets!"}
                </p>
              </div>
              <button
                onClick={handleRestartQuiz}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-350 text-slate-900 font-black rounded-lg text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                Restart Heritage Quiz
              </button>
            </div>
          ) : (
            /* Active Question Panel */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start animate-fadeIn">
              {/* Question text & Progress bar */}
              <div className="md:col-span-6 space-y-4">
                <div className="h-1.5 w-full bg-slate-850 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-400 transition-all duration-300"
                    style={{ width: `${((currentQuestionIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  ></div>
                </div>

                <h4 className="text-xl font-bold leading-relaxed text-blue-50 font-serif-display">
                  {QUIZ_QUESTIONS[currentQuestionIdx].question}
                </h4>

                {/* Explanation text on answer */}
                {hasAnswered && (
                  <div className="p-4 bg-slate-900/80 border border-slate-800/80 rounded-xl space-y-1 animate-fadeIn">
                    <p className="text-[9px] font-extrabold tracking-widest text-amber-400 uppercase">HERITAGE SECRETS</p>
                    <p className="text-xs text-slate-300 leading-relaxed italic font-medium">
                      "{QUIZ_QUESTIONS[currentQuestionIdx].explanation}"
                    </p>
                  </div>
                )}
              </div>

              {/* Interactive choice options */}
              <div className="md:col-span-6 space-y-3">
                <div className="grid gap-2">
                  {QUIZ_QUESTIONS[currentQuestionIdx].options.map((opt, idx) => {
                    const isCorrect = idx === QUIZ_QUESTIONS[currentQuestionIdx].correctAnswerIndex;
                    const isSelected = idx === selectedOptionIdx;
                    
                    let btnStyle = "bg-slate-900/60 text-slate-200 border border-slate-800 hover:bg-slate-800 hover:border-slate-700";
                    if (hasAnswered) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold";
                      } else if (isSelected) {
                        btnStyle = "bg-red-950/80 border-red-500 text-red-350";
                      } else {
                        btnStyle = "bg-slate-900/40 opacity-40 text-slate-500 border-slate-900 pointer-events-none";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerOptionClick(idx)}
                        disabled={hasAnswered}
                        className={`w-full text-left p-4 rounded-xl text-xs transition-all flex items-center justify-between gap-2 shadow-xs ${btnStyle}`}
                      >
                        <span className="font-semibold">{opt}</span>
                        {hasAnswered && (
                          isCorrect ? (
                            <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                          ) : isSelected ? (
                            <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                          ) : null
                        )}
                      </button>
                    );
                  })}
                </div>

                {hasAnswered && (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full text-center py-2.5 bg-[#0038A8] hover:bg-blue-800 hover:scale-102 font-bold text-xs uppercase tracking-widest text-white rounded-xl transition-all shadow-md"
                  >
                    {currentQuestionIdx === QUIZ_QUESTIONS.length - 1 ? "Finish and view score" : "Next Question"}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ROW 5: AI Concierge Assistant (Bayani) */}
        <section id="bayani" className="bento-grid-item p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60">
            <div>
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-amber-600 uppercase tracking-widest bg-amber-400/10 px-2.5 py-1 rounded">
                🤖 SERVER-SIDE SMART CONCIERGE
              </span>
              <h3 className="text-2xl font-serif-display font-black text-slate-900 tracking-tight mt-2">
                Ask Bayani, Your Virtual Companion
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Let Gemini plan custom itineraries, locate white sandbars, explain island lore, and suggest local delicacies.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Guide suggestions panel */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[9px] font-extrabold tracking-widest text-[#0038A8] uppercase block">
                PREDEFINED QUICK-TIPS
              </span>
              <p className="text-xs text-slate-400 italic font-medium">
                Ask anything, or click a quick suggestion block below to test itinerary planning instantly:
              </p>
              
              <div className="grid gap-2.5">
                {ChatPrompts.map((cp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(cp.prompt)}
                    className="w-full text-left p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:shadow-xs hover:border-[#0038A8]/30 text-xs font-semibold text-slate-700 transition-all"
                  >
                    {cp.title}
                  </button>
                ))}
              </div>

              {/* Informative Help Card */}
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl flex gap-3">
                <Info className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-700">Flagship Host Credentials</p>
                  <p className="text-[11px] text-slate-500 leading-normal font-medium">
                    This interactive bot communicates with our persistent node server utilizing Gemini. All suggestions are tourist-centric and cultural.
                  </p>
                </div>
              </div>
            </div>

            {/* AI Active chat log */}
            <div className="lg:col-span-8 flex flex-col h-[400px] border border-slate-200/60 rounded-2xl bg-slate-50/50 overflow-hidden shadow-inner">
              {/* Active list container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map(msg => {
                  const isGuide = msg.role === 'model';
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3 max-w-[85%] ${isGuide ? 'mr-auto animate-slideInLeft' : 'ml-auto flex-row-reverse animate-slideInRight'}`}
                    >
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 border text-xs font-black select-none shadow-xs ${
                        isGuide 
                          ? 'bg-[#0038A8] text-amber-300 border-[#0038A8]' 
                          : 'bg-slate-800 text-white border-slate-800'
                      }`}>
                        {isGuide ? 'B' : 'U'}
                      </div>
                      <div className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                        isGuide
                          ? 'chat-bubble-ai'
                          : 'chat-bubble-user font-semibold'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}

                {isSending && (
                  <div className="flex gap-3 max-w-[70%] mr-auto">
                    <div className="h-8 w-8 rounded-full bg-[#0038A8] text-amber-300 flex items-center justify-center border border-[#0038A8] text-xs font-black animate-pulse">
                      B
                    </div>
                    <div className="bg-white text-slate-500 border border-slate-200/60 rounded-2xl px-4 py-3 text-xs italic flex items-center gap-2 shadow-xs">
                      <div className="flex gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce delay-75"></span>
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce delay-150"></span>
                      </div>
                      Bayani is writing custom travel tips...
                    </div>
                  </div>
                )}

                {apiError && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-900 rounded-xl text-xs space-y-1 animate-fadeIn">
                    <p className="font-extrabold uppercase text-[10px] tracking-wider text-red-950">Secret API Key Missing / Off line</p>
                    <p className="leading-snug text-red-700 font-medium">{apiError}</p>
                    <p className="text-[10px] text-slate-500 mt-1">Notice: In the developer zone, please check the secrets tab on top control panel.</p>
                  </div>
                )}
                
                <div ref={chatBottomRef} />
              </div>

              {/* Chat Text bar */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputMessage);
                }}
                className="p-3 bg-white border-t border-slate-200/80 flex gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask Bayani about Batanes, Ilocos culture, Sinulog..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm outline-hidden focus:border-[#0038A8] focus:bg-white focus:ring-2 focus:ring-[#0038A8]/10"
                  disabled={isSending}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isSending}
                  className="h-10 px-4 bg-[#0038A8] hover:bg-blue-800 disabled:bg-slate-100 disabled:text-slate-350 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md hover:scale-102 active:scale-98 transition-all"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
            
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full bg-slate-950 text-slate-500 py-12 px-6 mt-16 text-center text-xs space-y-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-amber-400 animate-pulse" />
            <span className="font-serif-display text-lg font-bold tracking-tight text-white">Mabuhay Pilipinas Portal</span>
          </div>
          <p className="max-w-md text-center md:text-right text-[11px] leading-relaxed font-medium text-slate-400">
            Crafted meticulously in a Bento grid design representing Philippine Flag dimensions, honoring local customs, and preserving the rich geographic heritage of our islands.
          </p>
        </div>
        <div className="h-px bg-slate-900 my-4 max-w-7xl mx-auto"></div>
        <p className="text-[10px] opacity-60">© {new Date().getFullYear()} Pilipinas Discovery Portal. Enjoy the travels! Maraming Salamat.</p>
      </footer>
    </div>
  );
}
