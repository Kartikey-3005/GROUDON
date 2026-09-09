import React from 'react';
import { Layers, AlertTriangle, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';

export default function MapLegend({
  statusFilter,
  setStatusFilter,
  claimsCount,
  totalClaims
}) {
  return (
    <div className="absolute bottom-6 left-6 z-[1000] bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl shadow-2xl p-3 text-xs select-none max-w-xs space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-1.5 border-b border-slate-800">
        <div className="flex items-center gap-1.5 font-bold text-slate-200">
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          <span>Claims & Tenure Layer</span>
        </div>
        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
          {claimsCount} plotted
        </span>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap items-center gap-1">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-2 py-0.5 rounded-lg border text-[10px] font-medium transition ${
            statusFilter === 'all'
              ? 'bg-indigo-600 border-indigo-500 text-white'
              : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
          }`}
        >
          All
        </button>

        <button
          onClick={() => setStatusFilter('approved')}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[10px] font-medium transition ${
            statusFilter === 'approved'
              ? 'bg-emerald-500/25 border-emerald-500 text-emerald-300'
              : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Approved
        </button>

        <button
          onClick={() => setStatusFilter('pending')}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[10px] font-medium transition ${
            statusFilter === 'pending'
              ? 'bg-amber-500/25 border-amber-500 text-amber-300'
              : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          Pending
        </button>

        <button
          onClick={() => setStatusFilter('delayed')}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[10px] font-medium transition ${
            statusFilter === 'delayed'
              ? 'bg-rose-500/30 border-rose-500 text-rose-300 ring-1 ring-rose-500/50'
              : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
          Delayed
        </button>
      </div>

      {/* Cadastral parcel indicator */}
      <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 border border-dashed border-emerald-400 bg-emerald-500/20 rounded-sm inline-block"></span>
          <span>Cadastral Boundary</span>
        </span>
        <span className="text-[9px] text-slate-500">Zoom in for plots</span>
      </div>
    </div>
  );
}
