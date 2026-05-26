"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [weather, setWeather] = useState<{ temp: number; emoji: string; desc: string }>({
    temp: 27,
    emoji: "☀️",
    desc: "Tropical",
  });
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=14.5995&longitude=120.9842&current=temperature_2m,weather_code"
        );
        if (!response.ok) return;
        const data = await response.json();
        if (data.current) {
          const temp = Math.round(data.current.temperature_2m);
          const code = data.current.weather_code;

          let emoji = "☀️";
          let desc = "Tropical";

          if (code === 0) {
            emoji = "☀️";
            desc = "Sunny";
          } else if (code >= 1 && code <= 3) {
            emoji = "⛅";
            desc = "Partly Cloudy";
          } else if (code === 45 || code === 48) {
            emoji = "🌫️";
            desc = "Foggy";
          } else if ((code >= 51 && code <= 65) || (code >= 80 && code <= 82)) {
            emoji = "🌧️";
            desc = "Rainy";
          } else if (code >= 95) {
            emoji = "⛈️";
            desc = "Stormy";
          }

          setWeather({ temp, emoji, desc });
        }
      } catch (error) {
        console.error("Failed to sync weather:", error);
      }
    }

    fetchWeather();
  }, []);

  useEffect(() => {
    const updateTime = () => {
      try {
        const options: Intl.DateTimeFormatOptions = {
          timeZone: "Asia/Manila",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        };
        const formatter = new Intl.DateTimeFormat("en-US", options);
        setTimeString(formatter.format(new Date()));
      } catch (e) {
        const now = new Date();
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const phTime = new Date(utc + 3600000 * 8);
        setTimeString(
          phTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })
        );
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-40 py-3 md:py-4 px-4 md:px-8 shadow-xs" role="banner">
      <nav className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-4" aria-label="Main Navigation">
        {/* Top bar on mobile, aligned row on desktop */}
        <div className="flex items-center justify-between md:justify-start gap-3">
          <div className="flex items-center gap-2 md:gap-3">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg" 
              alt="Flag of the Philippines" 
              className="w-8 md:w-9 h-auto rounded-xs shadow-xs border border-slate-200/50"
            />
            <span className="text-xl md:text-2xl font-serif-display font-black tracking-tight text-[#0038A8] italic">
              PILIPINAS
            </span>
          </div>
          
          {/* Action button inside top bar on mobile, hidden on desktop */}
          <a 
            href="#bayani"
            className="md:hidden px-3.5 py-1.5 bg-[#0038A8] hover:bg-blue-800 text-white rounded-full text-[10px] font-bold tracking-wider shadow-sm transition-all"
          >
            TALK TO BAYANI
          </a>
        </div>
        
        {/* Badges and CTA block */}
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
          {/* Scrollable metadata badges on mobile, flex-row on desktop */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 justify-start md:justify-center -mx-4 px-4 md:mx-0 md:px-0 text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 scrollbar-none" style={{ WebkitOverflowScrolling: "touch", msOverflowStyle: "none", scrollbarWidth: "none" }}>
            <span className="shrink-0 px-3 py-1.5 bg-white/60 border border-slate-200/60 rounded-full text-slate-600 shadow-xs flex items-center gap-1 transition-all">
              {weather.emoji} {weather.desc} {weather.temp}°C
            </span>
            <span className="shrink-0 px-3 py-1.5 bg-white/60 border border-slate-200/60 rounded-full text-slate-600 shadow-xs flex items-center gap-1">
              🕒 {timeString || "PHT (UTC+8)"}
            </span>
            <span className="shrink-0 px-3 py-1.5 bg-white/60 border border-slate-200/60 rounded-full text-slate-600 shadow-xs flex items-center gap-1">
              🇵🇭 PHP / Peso
            </span>
          </div>
          
          {/* Desktop-only action button */}
          <a 
            href="#bayani"
            className="hidden md:inline-block px-4 py-1.5 bg-[#0038A8] hover:bg-blue-800 hover:scale-102 active:scale-98 text-white rounded-full text-xs font-bold tracking-wider shadow-sm transition-all"
          >
            TALK TO BAYANI
          </a>
        </div>
      </nav>
    </header>
  );
}


