"use client";

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import RegionalExplorer from './components/RegionalExplorer';
import CuisineShowcase from './components/CuisineShowcase';
import Phrasebook from './components/Phrasebook';
import HeritageTrivia from './components/HeritageTrivia';
import BayaniChatbot from './components/BayaniChatbot';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen text-slate-800 font-sans antialiased">
      <Header />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8" aria-label="Philippines Travel Guide Content">
        <HeroSection />
        <RegionalExplorer />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <CuisineShowcase />
          <Phrasebook />
        </div>
        <HeritageTrivia />
        <BayaniChatbot />
      </main>
      <Footer />
    </div>
  );
}
