import React from 'react';
import { Sparkles, AlertTriangle, AlertCircle, CheckCircle2, Lightbulb, ShieldAlert } from 'lucide-react';

export default function AIAnomalyCard({ selectedState, nationalSummary }) {
  const analysis = selectedState ? selectedState.aiAnalysis : nationalSummary.aiAnalysis;

  const severityConfig = {
    critical: {
      badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />,
      border: 'border-rose-500/40',
      tag: 'PRIORITY VERIFICATION'
    },
    warning: {
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      icon: <AlertCircle className="w-3.5 h-3.5 text-amber-400" />,
      border: 'border-amber-500/40',
      tag: 'FIELD REVIEW TARGET'
    },
    nominal: {
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
      border: 'border-emerald-500/40',
      tag: 'BENCHMARK STATUS'
    }
  };

  const current = severityConfig[analysis.severity] || severityConfig.warning;

  return (
    <div className={`relative rounded-xl bg-slate-900/90 border ${current.border} p-4 shadow-xl ai-card-glow transition-all`}>
      {/* Top AI Badge Bar */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
              Tenure Verification Insights
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Decision Support
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">
              {selectedState ? `${selectedState.name} Overview` : "National Pan-India Pattern"}
            </p>
          </div>
        </div>

        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 ${current.badge}`}>
          {current.icon}
          {current.tag}
        </span>
      </div>

      {/* Main Plain-English Summary */}
      <div className="rounded-lg bg-slate-950/80 border border-slate-800 p-3 mb-3">
        <div className="text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>{analysis.anomalyHeadline}</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {analysis.summary ? analysis.summary.replace(/⚠️|Critical Anomaly:|Anomaly Flagged:|Anomaly Detected:|National Anomaly Flag:/gi, '').trim() : ''}
        </p>
      </div>

      {/* Root Causes */}
      <div className="mb-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 text-amber-400" />
          Detected Bottlenecks:
        </p>
        <div className="space-y-1">
          {analysis.rootCauses.map((cause, idx) => (
            <div key={idx} className="text-[11px] text-slate-300 flex items-start gap-1.5 bg-slate-800/40 p-1.5 rounded border border-slate-800/70">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 shrink-0"></span>
              <span className="leading-snug">{cause}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div className="rounded-lg bg-emerald-950/30 border border-emerald-500/30 p-2.5">
        <p className="text-[10px] font-semibold text-emerald-300 mb-0.5 flex items-center gap-1">
          <Lightbulb className="w-3 h-3 text-emerald-400" />
          Recommended Action:
        </p>
        <p className="text-[11px] text-emerald-100/90 leading-snug">
          {analysis.recommendation}
        </p>
      </div>
    </div>
  );
}
