import React from 'react';
import { FileText, CheckCircle2, Clock, AlertTriangle, LandPlot } from 'lucide-react';

export default function MetricsGrid({ selectedState, nationalSummary }) {
  const data = selectedState || nationalSummary;
  const isState = Boolean(selectedState);

  const approvalRate = data.approvalRate;
  const delayedRate = isState 
    ? ((data.delayedClaims / data.totalClaims) * 100).toFixed(1)
    : data.delayedPercentage;

  return (
    <div className="space-y-2.5">
      {/* 4 Clean Metric Cards */}
      <div className="grid grid-cols-2 gap-2">
        {/* Total Claims */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-medium">Total Claims</span>
            <FileText className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="mt-1">
            <div className="text-xl font-bold text-white tracking-tight">
              {data.totalClaims.toLocaleString()}
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {isState ? `Tribes: ${data.tribes}` : `${data.totalStatesMonitored} Major States`}
            </p>
          </div>
        </div>

        {/* Approved Titles */}
        <div className="bg-slate-900/90 border border-emerald-500/20 rounded-xl p-3 hover:border-emerald-500/40 transition">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-[11px] font-medium">Approved Titles</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="mt-1">
            <div className="text-xl font-bold text-emerald-400 tracking-tight">
              {data.approvedClaims.toLocaleString()}
            </div>
            <p className="text-[10px] font-semibold text-emerald-300 mt-0.5">
              {approvalRate}% Approval Rate
            </p>
          </div>
        </div>

        {/* Pending Review */}
        <div className="bg-slate-900/90 border border-amber-500/20 rounded-xl p-3 hover:border-amber-500/40 transition">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-[11px] font-medium">Pending Review</span>
            <Clock className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="mt-1">
            <div className="text-xl font-bold text-amber-400 tracking-tight">
              {data.pendingClaims.toLocaleString()}
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Awaiting SDLC/DLC
            </p>
          </div>
        </div>

        {/* Delayed Anomalies */}
        <div className="bg-slate-900/90 border border-rose-500/30 rounded-xl p-3 hover:border-rose-500/50 transition">
          <div className="flex items-center justify-between text-rose-400">
            <span className="text-[11px] font-medium">Delayed Claims</span>
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="mt-1">
            <div className="text-xl font-bold text-rose-400 tracking-tight">
              {data.delayedClaims.toLocaleString()}
            </div>
            <p className="text-[10px] font-semibold text-rose-300 mt-0.5">
              {delayedRate}% Flagged
            </p>
          </div>
        </div>
      </div>

      {/* Clean Progress Meter */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-slate-400 text-[11px]">Title Distribution Progress</span>
          <span className="font-bold text-emerald-400 font-mono text-[11px]">{approvalRate}% Complete</span>
        </div>
        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
          <div 
            className="bg-emerald-500 h-full transition-all duration-500" 
            style={{ width: `${approvalRate}%` }} 
            title={`Approved: ${approvalRate}%`}
          />
          <div 
            className="bg-amber-500 h-full transition-all duration-500" 
            style={{ width: `${((data.pendingClaims / data.totalClaims) * 100).toFixed(1)}%` }} 
            title="Pending"
          />
          <div 
            className="bg-rose-500 h-full transition-all duration-500" 
            style={{ width: `${delayedRate}%` }} 
            title="Delayed"
          />
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Approved ({approvalRate}%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Pending
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            Delayed ({delayedRate}%)
          </span>
        </div>
      </div>

      {/* Forest Land Titled Summary */}
      <div className="bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/20 rounded-xl p-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <LandPlot className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Titled Forest Land</p>
            <p className="font-bold text-white text-sm">
              {data.titledLandHa.toLocaleString()} <span className="text-xs font-normal text-slate-400">Hectares</span>
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-400">Total Forest Area</p>
          <p className="font-semibold text-slate-300 text-xs">
            {data.totalForestAreaHa.toLocaleString()} Ha
          </p>
        </div>
      </div>
    </div>
  );
}
