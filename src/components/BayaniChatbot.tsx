import { useState, useEffect, useRef } from 'react';
import { Send, Info } from 'lucide-react';
import { ChatMessage } from '../types';

export default function BayaniChatbot() {
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

  // Scroll chatbot to bottom on news
  useEffect(() => {
    if (chatMessages.length > 1) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

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

  return (
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
  );
}
