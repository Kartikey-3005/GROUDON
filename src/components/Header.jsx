import React from 'react';
import { 
  TreePine, 
  Sparkles, 
  Clock, 
  RotateCcw,
  MapPin,
  ChevronDown,
  Globe2
} from 'lucide-react';
import { useLiveClock } from '../hooks/useLiveClock';

export default function Header({ 
  selectedState = null, 
  statesList = [],
  onSelectState = () => {},
  onResetAllIndia = () => {},
  onOpenAiModal = () => {}
}) {
  const { formattedDate, formattedTime } = useLiveClock();

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 md:px-6 flex items-center justify-between z-30 shrink-0 select-none shadow-md">
      {/* Left: Branding */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg p-0.5 border border-white/20 shrink-0">
          <img 
            src="/groudon.jpg" 
            alt="Groudon Logo" 
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base md:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              FRA Decision Support System
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Pan-India WebGIS
              </span>
            </h1>
          </div>
          <p className="text-[11px] text-slate-400">
            Ministry of Tribal Affairs (MoTA) • Forest Rights Act 2006 Monitoring
          </p>
        </div>
      </div>

      {/* Center: State Selector Dropdown (Quick & Simple) */}
      <div className="flex items-center gap-2">
        <div className="relative flex items-center bg-slate-800/90 border border-slate-700/80 rounded-xl px-2.5 py-1.5 shadow-sm hover:border-slate-600 transition">
          {selectedState ? (
            <MapPin className="w-4 h-4 text-emerald-400 mr-2 shrink-0" />
          ) : (
            <Globe2 className="w-4 h-4 text-indigo-400 mr-2 shrink-0" />
          )}
          <select
            value={selectedState ? selectedState.id : 'all'}
            onChange={(e) => {
              if (e.target.value === 'all') {
                onResetAllIndia();
              } else {
                const found = statesList.find(s => s.id === e.target.value);
                if (found) onSelectState(found);
              }
            }}
            className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer pr-5"
          >
            <option value="all" className="bg-slate-900 text-white">
              🇮🇳 All India (National Overview)
            </option>
            {statesList.map(s => (
              <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                {s.name} ({s.code})
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
        </div>

        {selectedState && (
          <button
            onClick={onResetAllIndia}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium flex items-center gap-1 transition"
            title="Reset to All India"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">All India</span>
          </button>
        )}
      </div>

      {/* Right: AI Engine Status & Date/Time */}
      <div className="hidden md:flex items-center gap-3 text-xs">
        {/* District Gemini AI FastApi Trigger Button */}
        <button
          onClick={onOpenAiModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-900/60 to-purple-900/60 hover:from-indigo-800 hover:to-purple-800 border border-indigo-500/40 text-indigo-200 transition shadow cursor-pointer active:scale-95"
          title="Open FastAPI + Gemini AI District Decision Support API"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span className="text-[11px] font-semibold text-white">District Gemini AI</span>
          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300">FastAPI</span>
        </button>

        {/* Live Clock */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-300 font-mono text-[11px]">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{formattedDate}</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-semibold">{formattedTime}</span>
        </div>
      </div>
    </header>
  );
}
