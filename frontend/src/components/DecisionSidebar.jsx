import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  RotateCcw, 
  Download, 
  Search, 
  ShieldAlert,
  ChevronRight,
  Globe2,
  AlertCircle,
  Layers
} from 'lucide-react';
import AIAnomalyCard from './AIAnomalyCard';
import MetricsGrid from './MetricsGrid';

export default function DecisionSidebar({
  selectedState = null,
  statesList = [],
  onSelectState = () => {},
  onResetAllIndia = () => {},
  nationalSummary,
  claims = [],
  activeClaim = null,
  onSelectClaim = () => {}
}) {
  const [claimSearch, setClaimSearch] = useState('');

  // Filter claims for sidebar feed
  const relevantClaims = claims.filter(c => {
    if (selectedState && c.stateId !== selectedState.id) return false;
    if (claimSearch) {
      const q = claimSearch.toLowerCase();
      return (
        c.claimantName.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.stateName.toLowerCase().includes(q) ||
        c.districtName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <aside className="w-full h-full bg-slate-950/95 border-l border-slate-800 flex flex-col overflow-hidden text-slate-100 shadow-2xl">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/60 shrink-0">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {selectedState ? <Building2 className="w-4 h-4" /> : <Globe2 className="w-4 h-4 text-indigo-400" />}
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Decision Support Panel
              </p>
              <h2 className="text-base font-bold text-white leading-tight">
                {selectedState ? `${selectedState.name}` : "All India (National)"}
              </h2>
            </div>
          </div>

          {selectedState ? (
            <button
              onClick={onResetAllIndia}
              className="px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex items-center gap-1 transition"
              title="Return to National Overview"
            >
              <RotateCcw className="w-3 h-3 text-emerald-400" />
              All India
            </button>
          ) : (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              11 States Monitored
            </span>
          )}
        </div>

        {/* Horizontal Quick-Select State Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 no-scrollbar text-xs">
          <button
            onClick={onResetAllIndia}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition shrink-0 ${
              !selectedState
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/40'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
            }`}
          >
            🇮🇳 All India
          </button>
          {statesList.map(s => {
            const isSelected = selectedState && selectedState.id === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectState(s)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition shrink-0 flex items-center gap-1 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
                }`}
              >
                <MapPin className="w-2.5 h-2.5" />
                {s.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* 1. AI Anomaly Analysis Card */}
        <AIAnomalyCard 
          selectedState={selectedState} 
          nationalSummary={nationalSummary} 
        />

        {/* 2. Core KPI Metrics */}
        <MetricsGrid 
          selectedState={selectedState} 
          nationalSummary={nationalSummary} 
        />

        {/* 3. Claims Feed Section */}
        <div className="space-y-2 pt-1 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>{selectedState ? `${selectedState.name} Claims` : "Key National Claims"}</span>
              <span className="text-[10px] text-slate-400 font-mono">({relevantClaims.length})</span>
            </h4>
            <span className="text-[10px] text-slate-500">Click to locate on map</span>
          </div>

          {/* Active Cadastral Parcel Inspection Card */}
          {activeClaim && (
            <div className="p-3 rounded-xl bg-slate-900/95 border border-indigo-500/60 shadow-lg shadow-indigo-950/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold flex items-center gap-1">
                  <Layers className="w-3 h-3 text-indigo-400" />
                  Cadastral Plot Inspection
                </span>
                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded capitalize ${
                  activeClaim.status === 'approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                  activeClaim.status === 'pending' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  {activeClaim.status}
                </span>
              </div>

              <div>
                <h5 className="text-sm font-bold text-white leading-tight">{activeClaim.claimantName || activeClaim.claimant_name}</h5>
                <p className="text-[11px] text-slate-400">
                  {activeClaim.id || activeClaim.claim_id} • {activeClaim.districtName || activeClaim.district_id}, {activeClaim.stateName}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                <div className="p-1.5 rounded bg-slate-950/80 border border-slate-800">
                  <span className="text-[9px] text-slate-400 block">Cadastral Area</span>
                  <span className="font-bold text-emerald-400 font-mono">
                    {activeClaim.areaHa || activeClaim.area_ha || 2.0} Ha
                  </span>
                </div>
                <div className="p-1.5 rounded bg-slate-950/80 border border-slate-800">
                  <span className="text-[9px] text-slate-400 block">Processing Time</span>
                  <span className={`font-bold font-mono ${(activeClaim.daysPending || activeClaim.days_pending) > 300 ? 'text-rose-400' : 'text-slate-200'}`}>
                    {activeClaim.daysPending || activeClaim.days_pending || 0} days
                  </span>
                </div>
              </div>

              {activeClaim.plot_polygon && (
                <div className="text-[10px] text-slate-400 p-1.5 rounded bg-slate-950/60 border border-slate-800/80 font-mono flex items-center justify-between">
                  <span className="text-[9px] text-slate-500">Cadastral Boundary:</span>
                  <span className="text-emerald-300 font-semibold text-[9px]">4 Vertices Georeferenced</span>
                </div>
              )}
            </div>
          )}

          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              value={claimSearch}
              onChange={(e) => setClaimSearch(e.target.value)}
              placeholder="Search claimant, state, district..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Claims List */}
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {relevantClaims.map(claim => {
              const isSelected = activeClaim && activeClaim.id === claim.id;
              const isDelayed = claim.status === 'delayed';

              return (
                <div
                  key={claim.id}
                  onClick={() => onSelectClaim(claim)}
                  className={`p-2.5 rounded-lg border transition cursor-pointer text-xs ${
                    isSelected
                      ? 'bg-slate-800 border-indigo-500 ring-1 ring-indigo-500/50'
                      : isDelayed
                      ? 'bg-slate-900/90 border-rose-500/30 hover:border-rose-500/60'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white text-xs">{claim.claimantName}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full capitalize ${
                      claim.status === 'approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      claim.status === 'pending' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {claim.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{claim.districtName}, {claim.stateName}</span>
                    <span className="font-semibold text-emerald-400">{claim.areaHa} Ha</span>
                  </div>

                  {claim.delayReason && (
                    <div className="mt-1.5 text-[10px] text-rose-300 bg-rose-950/30 p-1 rounded border border-rose-500/20">
                      <strong>Anomaly:</strong> {claim.delayReason}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between gap-2 shrink-0">
        <button
          onClick={() => {
            alert(`Generating Briefing Report for ${selectedState ? selectedState.name : 'All India (National Circle)'}...`);
          }}
          className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 flex items-center justify-center gap-1.5 transition shadow"
        >
          <Download className="w-3.5 h-3.5 text-emerald-400" />
          Export Report
        </button>

        <button
          onClick={() => {
            alert(`Nodal alert dispatched for ${selectedState ? selectedState.name : 'national'} monitoring committee.`);
          }}
          className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 flex items-center justify-center gap-1.5 transition shadow shadow-indigo-900/40"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-indigo-200" />
          Dispatch Alert
        </button>
      </div>
    </aside>
  );
}
