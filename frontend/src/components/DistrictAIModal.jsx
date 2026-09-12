import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Bot, 
  AlertTriangle, 
  CheckCircle2, 
  Server, 
  RefreshCw, 
  FileText, 
  Layers, 
  Terminal, 
  ExternalLink,
  Flame,
  Clock,
  Ban,
  ShieldCheck
} from 'lucide-react';
import { analyzeDistrict, fetchClaimsByDistrict, fetchDistricts, API_BASE_URL } from '../services/fraApi';

export default function DistrictAIModal({ isOpen, onClose, theme }) {
  const [selectedDistrictId, setSelectedDistrictId] = useState('dist_a');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [claimsGeoJson, setClaimsGeoJson] = useState(null);
  const [backendOnline, setBackendOnline] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Fallback theme colors if not provided
  const currentTheme = theme || {
    bg: '#080402',
    surface: '#120a06',
    surfaceMuted: '#1a0e08',
    surfaceBorder: '#3d2012',
    borderLight: '#55341e',
    textPrimary: '#ffffff',
    textSecondary: '#dfcca9',
    textMuted: '#9c7d61',
    accent: '#ea580c',
    buttonColor: '#ea580c'
  };

  // Default curated 4 districts
  const [districtsList, setDistrictsList] = useState([
    { 
      id: 'dist_a', 
      name: 'District A (Dindori)', 
      flag: 'HIGH_PENDING_DELAY', 
      desc: '78% Pending Delay (620 Days Backlog)',
      severity: 'critical'
    },
    { 
      id: 'dist_b', 
      name: 'District B (Mandla)', 
      flag: 'ABNORMAL_REJECTION_SPIKE', 
      desc: '82% Rejection Spike within 14 Days',
      severity: 'critical'
    },
    { 
      id: 'dist_c', 
      name: 'District C (Korba)', 
      flag: 'FOREST_COVER_LOSS_ON_CLAIM', 
      desc: '42.5% Deforestation on Pending CFR',
      severity: 'critical'
    },
    { 
      id: 'dist_d', 
      name: 'District D (Balaghat)', 
      flag: 'NORMAL', 
      desc: 'Benchmark Control Group (65 Days Turnaround)',
      severity: 'nominal'
    }
  ]);

  // Initialize districts and auto-run analysis
  useEffect(() => {
    if (isOpen) {
      loadDistricts();
      runDistrictAnalysis(selectedDistrictId);
    }
  }, [isOpen]);

  const loadDistricts = async () => {
    try {
      const distData = await fetchDistricts();
      if (distData && distData.features && distData.features.length > 0) {
        const mapped = distData.features.map(f => ({
          id: f.properties.district_id,
          name: f.properties.name,
          flag: f.properties.anomaly_flag,
          desc: f.properties.description || `${f.properties.pending_rate_pct}% pending, flag: ${f.properties.anomaly_flag}`,
          severity: f.properties.anomaly_flag === 'NORMAL' ? 'nominal' : 'critical'
        }));
        setDistrictsList(mapped);
      }
      setBackendOnline(true);
    } catch (e) {
      console.warn('Using default districts list:', e);
      setBackendOnline(true);
    }
  };

  const runDistrictAnalysis = async (districtId) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const [data, claims] = await Promise.all([
        analyzeDistrict(districtId),
        fetchClaimsByDistrict(districtId).catch(() => null)
      ]);
      setAnalysisResult(data);
      if (claims) setClaimsGeoJson(claims);
      setBackendOnline(true);
    } catch (err) {
      console.error(err);
      setErrorMessage('Could not complete district decision analysis.');
    } finally {
      setLoading(false);
    }
  };

  const handleDistrictSelect = (districtId) => {
    setSelectedDistrictId(districtId);
    runDistrictAnalysis(districtId);
  };

  const getFlagBadge = (flag) => {
    switch (flag) {
      case 'HIGH_PENDING_DELAY':
        return {
          icon: <Clock className="w-3.5 h-3.5 text-rose-400" />,
          label: 'Bureaucratic Delay',
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
        };
      case 'ABNORMAL_REJECTION_SPIKE':
        return {
          icon: <Ban className="w-3.5 h-3.5 text-amber-400" />,
          label: 'Rejection Spike',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
        };
      case 'FOREST_COVER_LOSS_ON_CLAIM':
        return {
          icon: <Flame className="w-3.5 h-3.5 text-red-400" />,
          label: 'Canopy Loss & Encroachment',
          badge: 'bg-red-500/20 text-red-300 border-red-500/40'
        };
      case 'NORMAL':
      default:
        return {
          icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />,
          label: 'Benchmark Control',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
        };
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-colors duration-300"
        style={{
          backgroundColor: currentTheme.surface,
          borderColor: currentTheme.surfaceBorder
        }}
      >
        {/* Header */}
        <div 
          className="p-4 border-b flex items-center justify-between"
          style={{
            backgroundColor: currentTheme.surfaceMuted,
            borderColor: currentTheme.surfaceBorder
          }}
        >
          <div className="flex items-center gap-2.5">
            <div 
              className="w-9 h-9 rounded-xl overflow-hidden shadow-lg shrink-0 border"
              style={{ borderColor: currentTheme.borderLight }}
            >
              <img 
                src="/groudon.jpg" 
                alt="Groudon AI" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                FRA Spatial Decision Intelligence
                <span 
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: `${currentTheme.accent}20`,
                    borderColor: `${currentTheme.accent}40`,
                    color: currentTheme.textSecondary
                  }}
                >
                  Autonomous Engine v2.0
                </span>
              </h2>
              <p className="text-xs" style={{ color: currentTheme.textMuted }}>
                Targeted Anomaly Decision Support • High-Precision Statistical GIS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
              backendOnline 
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' 
                : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
            }`}>
              <Server className="w-3 h-3" />
              <span>{backendOnline ? 'Decision Engine Active' : 'Initializing...'}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* District Options Selection (Direct click generates & loads without extra button) */}
          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: currentTheme.textSecondary }}>
              Choose Targeted Anomaly District (Auto-Analyzed):
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {districtsList.map((dist) => {
                const flagMeta = getFlagBadge(dist.flag);
                const isSelected = selectedDistrictId.toLowerCase() === dist.id.toLowerCase();
                return (
                  <button
                    key={dist.id}
                    onClick={() => handleDistrictSelect(dist.id)}
                    className="p-3 rounded-xl border text-left transition flex flex-col justify-between group"
                    style={{
                      backgroundColor: isSelected ? `${currentTheme.accent}25` : currentTheme.surfaceMuted,
                      borderColor: isSelected ? currentTheme.accent : currentTheme.surfaceBorder,
                      boxShadow: isSelected ? `0 0 15px ${currentTheme.accent}30` : 'none'
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs truncate text-white" title={dist.name}>{dist.name}</span>
                        <span 
                          className="text-[9px] font-mono px-1 py-0.5 rounded"
                          style={{
                            backgroundColor: currentTheme.surface,
                            color: currentTheme.textMuted
                          }}
                        >
                          {dist.id}
                        </span>
                      </div>
                      <p className="text-[10px] leading-snug line-clamp-2 mb-2" style={{ color: currentTheme.textMuted }}>
                        {dist.desc}
                      </p>
                    </div>
                    <div className="pt-1">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border inline-flex items-center gap-1 ${flagMeta.badge}`}>
                        {flagMeta.icon}
                        <span>{dist.flag}</span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div 
              className="p-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-mono animate-pulse"
              style={{
                backgroundColor: currentTheme.surfaceMuted,
                borderColor: currentTheme.surfaceBorder,
                color: currentTheme.textSecondary
              }}
            >
              <RefreshCw className="w-4 h-4 animate-spin" style={{ color: currentTheme.accent }} />
              <span>Prompting Gemini API with Exact Anomaly Evidence...</span>
            </div>
          )}

          {/* Error / Instructions Banner if Backend is offline */}
          {errorMessage && !loading && (
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3.5 text-xs text-amber-200 space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Backend Server Offline or Unreachable:</span>
              </div>
              <p className="text-[11px] text-slate-300">
                In your terminal, start the FastAPI server with:
              </p>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-2 font-mono text-emerald-400 text-[11px] flex items-center justify-between">
                <span>uvicorn backend.main:app --reload --port 8000</span>
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
              </div>
            </div>
          )}

          {/* Analysis Results Display */}
          {analysisResult && (
            <div className="space-y-3 animate-in fade-in duration-300">
              {/* Executive Summary Card */}
              <div 
                className="rounded-xl border p-4 shadow-xl"
                style={{
                  backgroundColor: currentTheme.surfaceMuted,
                  borderColor: currentTheme.borderLight
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" style={{ color: currentTheme.accent }} />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      Ministry Executive Decision-Support Briefing (2-Sentence Analysis)
                    </h3>
                  </div>
                  <span 
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: `${currentTheme.accent}20`,
                      borderColor: `${currentTheme.accent}40`,
                      color: currentTheme.textSecondary
                    }}
                  >
                    {analysisResult.ai_engine || 'Gemini AI'}
                  </span>
                </div>
                <div 
                  className="text-xs leading-relaxed font-sans p-3.5 rounded-lg border"
                  style={{
                    backgroundColor: currentTheme.surface,
                    borderColor: currentTheme.surfaceBorder,
                    color: currentTheme.textSecondary
                  }}
                >
                  <p>{analysisResult.ai_anomaly_report}</p>
                </div>
              </div>

              {/* Exact Numerical Evidence Table */}
              <div 
                className="rounded-xl border p-3.5"
                style={{
                  backgroundColor: currentTheme.surfaceMuted,
                  borderColor: currentTheme.surfaceBorder
                }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="text-[11px] font-semibold flex items-center gap-1.5" style={{ color: currentTheme.textSecondary }}>
                    <FileText className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
                    <span>Exact Statistical Evidence Driving Alert:</span>
                  </h4>
                  <span 
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                    style={{
                      backgroundColor: analysisResult.anomaly_flag === 'NORMAL' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                      borderColor: analysisResult.anomaly_flag === 'NORMAL' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)',
                      color: analysisResult.anomaly_flag === 'NORMAL' ? '#6ee7b7' : '#fca5a5'
                    }}
                  >
                    Flag: {analysisResult.anomaly_flag}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
                  <div 
                    className="p-2 rounded-lg border"
                    style={{ backgroundColor: currentTheme.surface, borderColor: currentTheme.surfaceBorder }}
                  >
                    <span className="text-[10px] block" style={{ color: currentTheme.textMuted }}>Total Claims</span>
                    <span className="text-sm font-bold text-white">{analysisResult.statistics.total_claims}</span>
                  </div>
                  <div 
                    className="p-2 rounded-lg border"
                    style={{ backgroundColor: currentTheme.surface, borderColor: currentTheme.surfaceBorder }}
                  >
                    <span className="text-[10px] block" style={{ color: currentTheme.textMuted }}>Pending Ratio</span>
                    <span className="text-sm font-bold text-amber-400">
                      {analysisResult.statistics.pending_percentage}%
                    </span>
                  </div>
                  <div 
                    className="p-2 rounded-lg border"
                    style={{ backgroundColor: currentTheme.surface, borderColor: currentTheme.surfaceBorder }}
                  >
                    <span className="text-[10px] block" style={{ color: currentTheme.textMuted }}>Rejection Ratio</span>
                    <span className="text-sm font-bold text-rose-400">
                      {analysisResult.statistics.rejected_percentage}%
                    </span>
                  </div>
                  <div 
                    className="p-2 rounded-lg border"
                    style={{ backgroundColor: currentTheme.surface, borderColor: currentTheme.surfaceBorder }}
                  >
                    <span className="text-[10px] block" style={{ color: currentTheme.textMuted }}>Max Delay</span>
                    <span className="text-sm font-bold text-rose-300">
                      {analysisResult.statistics.max_delay_days}d
                    </span>
                  </div>
                  <div 
                    className="p-2 rounded-lg border"
                    style={{ backgroundColor: currentTheme.surface, borderColor: currentTheme.surfaceBorder }}
                  >
                    <span className="text-[10px] block" style={{ color: currentTheme.textMuted }}>Veg Loss Index</span>
                    <span className="text-sm font-bold text-emerald-400">
                      {analysisResult.statistics.avg_pending_vegetation_loss_pct || analysisResult.statistics.avg_vegetation_loss_pct}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Claims Layer GeoJSON Feed */}
              {claimsGeoJson && (
                <div 
                  className="rounded-xl border p-3 text-xs space-y-2"
                  style={{
                    backgroundColor: currentTheme.surfaceMuted,
                    borderColor: currentTheme.surfaceBorder
                  }}
                >
                  <div className="flex items-center justify-between" style={{ color: currentTheme.textSecondary }}>
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4" style={{ color: currentTheme.accent }} />
                      <span>Curated Claim Points: <strong className="text-white">{claimsGeoJson.total_features || claimsGeoJson.features?.length} Points</strong></span>
                    </div>
                    <span className="text-[10px] font-mono" style={{ color: currentTheme.textMuted }}>GeoJSON FeatureCollection</span>
                  </div>

                  {/* Micro list of claims with anomaly tags */}
                  <div className="max-h-32 overflow-y-auto space-y-1.5 pr-1 font-mono text-[11px]">
                    {claimsGeoJson.features.map((feat) => {
                      const p = feat.properties;
                      const isHighLoss = p.vegetation_loss_index >= 0.20;
                      const isDelayed = p.days_pending >= 300;
                      const isApproved = p.status === 'approved';
                      const isRejected = p.status === 'rejected';

                      return (
                        <div 
                          key={p.claim_id}
                          className="p-2 rounded border flex items-center justify-between gap-2"
                          style={{
                            backgroundColor: currentTheme.surface,
                            borderColor: currentTheme.borderLight
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${
                              isApproved ? 'bg-emerald-400' :
                              (isDelayed || isHighLoss || isRejected) ? 'bg-rose-500' :
                              'bg-amber-400'
                            }`} />
                            <span className="text-white font-bold">{p.claim_id}</span>
                            <span className="text-[10px]" style={{ color: currentTheme.textMuted }}>({p.claimant_type})</span>
                          </div>

                          <div className="flex items-center gap-2 text-[10px]">
                            <span style={{ color: currentTheme.textSecondary }}>{p.days_pending} days</span>
                            {p.vegetation_loss_index > 0 && (
                              <span className={isHighLoss ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                                loss: {(p.vegetation_loss_index * 100).toFixed(0)}%
                              </span>
                            )}
                            <span 
                              className="px-1.5 py-0.2 rounded uppercase text-[9px] font-bold"
                              style={{
                                backgroundColor: isApproved ? 'rgba(16, 185, 129, 0.2)' : isRejected ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                                color: isApproved ? '#6ee7b7' : isRejected ? '#fca5a5' : '#fcd34d'
                              }}
                            >
                              {p.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div 
          className="p-3 border-t flex items-center justify-between text-xs"
          style={{
            backgroundColor: currentTheme.surfaceMuted,
            borderColor: currentTheme.surfaceBorder,
            color: currentTheme.textMuted
          }}
        >
          <span>WebGIS FRA Monitoring Platform • Client Analytics Architecture</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-white rounded-lg font-medium transition"
            style={{
              backgroundColor: currentTheme.buttonColor
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
