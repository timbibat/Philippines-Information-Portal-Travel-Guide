import { Globe } from 'lucide-react';

export default function Footer() {
  return (
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
      <p className="text-[10px] opacity-60">Created by Timothy Irwin Bibat</p>
    </footer>
  );
}
