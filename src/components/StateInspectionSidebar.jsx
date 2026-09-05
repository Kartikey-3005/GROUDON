import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle, 
  AlertTriangle, 
  ShieldAlert, 
  MapPin, 
  Users, 
  TreePine, 
  Maximize2, 
  Layers, 
  Filter,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { ALL_INDIA_DISTRICTS, DISTRICT_ANOMALY_SUMMARY } from '../data/districtAnomaliesData';

export default function StateInspectionSidebar({
  selectedState,
  statesList = [],
  onSelectState = () => {},
  claims = [],
  onViewClaims = () => {},
  onSelectClaim = () => {},
  theme
}) {
  // Active Sidebar Mode: 'districts' (default for anomalies & demographics) or 'state' (overview)
  const [activeTab, setActiveTab] = useState('districts');
  
  // District search & filtering
  const [districtSearch, setDistrictSearch] = useState('');
  const [selectedZone, setSelectedZone] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [expandedDistrictId, setExpandedDistrictId] = useState(ALL_INDIA_DISTRICTS[0]?.id || null);

  // State search
  const [stateSearch, setStateSearch] = useState('');

  // Fallback active state
  const activeState = selectedState || statesList.find(s => s.code === 'MN') || statesList[0] || {
    id: 'INMN',
    code: 'MN',
    name: 'Manipur',
    districtsCount: 16,
    activeVillages: 14,
    titledLandHa: 131.7,
    totalClaims: 16,
    approvedClaims: 6,
    pendingClaims: 10,
    delayedClaims: 3,
    scheduledReviews: 3,
    fieldSurveys: 3,
    tenureTypes: { ifr: 15, cfr: 1 },
    forestCoverKm2: '16,598 km²',
    tribalPopulationPct: '35.1%',
    description: 'Hill areas customary tribal land management systems.',
    alertMessage: '3 cadastral units scheduled for field boundary verification. 10 claims under administrative review across 16 districts.'
  };

  // State claims count
  const stateClaimsCount = claims.filter(c => 
    c.stateId === activeState.id || (c.stateName && c.stateName.toLowerCase() === activeState.name.toLowerCase())
  ).length || activeState.totalClaims || 16;

  // Filtered districts list
  const filteredDistricts = useMemo(() => {
    return ALL_INDIA_DISTRICTS.filter(d => {
      // If a state is selected and user hasn't switched zone manually, prioritize state's districts
      if (selectedState && selectedZone === 'All' && !districtSearch.trim()) {
        const matchesState = d.stateId === selectedState.id || 
                             d.stateCode === selectedState.code || 
                             d.state.toLowerCase() === (selectedState.name || '').toLowerCase();
        if (matchesState) return true;
      }

      // Zone filter
      if (selectedZone !== 'All' && d.zone !== selectedZone) {
        return false;
      }

      // Severity filter
      if (severityFilter !== 'All' && d.severity !== severityFilter.toLowerCase()) {
        return false;
      }

      // Text query
      if (districtSearch.trim()) {
        const q = districtSearch.toLowerCase().trim();
        const matchesName = d.name.toLowerCase().includes(q);
        const matchesState = d.state.toLowerCase().includes(q);
        const matchesTribes = d.tribes.toLowerCase().includes(q);
        const matchesZone = d.zone.toLowerCase().includes(q);
        const matchesAnomalies = d.anomalies.some(a => 
          a.claimant.toLowerCase().includes(q) || 
          a.tribe.toLowerCase().includes(q) || 
          a.reason.toLowerCase().includes(q)
        );
        return matchesName || matchesState || matchesTribes || matchesZone || matchesAnomalies;
      }

      return true;
    });
  }, [districtSearch, selectedZone, severityFilter, selectedState]);

  // Filter states list for Quick State Jump
  const filteredStates = statesList.filter(s => {
    if (!stateSearch.trim()) return true;
    const q = stateSearch.toLowerCase().trim();
    return s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q);
  });

  const zones = ["All", "North", "Central", "East", "West", "South", "North-East", "Islands"];

  const handleLocateDistrict = (district) => {
    // Select parent state if found
    const parentState = statesList.find(
      s => s.id === district.stateId || s.code === district.stateCode || s.name.toLowerCase() === district.state.toLowerCase()
    );
    if (parentState) {
      onSelectState(parentState);
    }
    // Select first anomaly to center map on coordinates
    if (district.anomalies && district.anomalies.length > 0) {
      const anom = district.anomalies[0];
      onSelectClaim({
        id: anom.id,
        claim_id: anom.id,
        claimantName: anom.claimant,
        stateId: district.stateId,
        stateName: district.state,
        districtName: district.name,
        coordinates: anom.coordinates || district.center,
        areaHa: anom.areaHa,
        daysPending: anom.daysPending,
        severity: anom.severity,
        status: anom.status,
        type: anom.type,
        tribe: anom.tribe || district.tribes,
        isAnomaly: true,
        anomalyReason: anom.reason,
        sdlcBlocker: anom.sdlcBlocker
      });
    }
  };

  const handleLocateAnomaly = (district, anom) => {
    const parentState = statesList.find(
      s => s.id === district.stateId || s.code === district.stateCode || s.name.toLowerCase() === district.state.toLowerCase()
    );
    if (parentState) {
      onSelectState(parentState);
    }
    onSelectClaim({
      id: anom.id,
      claim_id: anom.id,
      claimantName: anom.claimant,
      stateId: district.stateId,
      stateName: district.state,
      districtName: district.name,
      coordinates: anom.coordinates || district.center,
      areaHa: anom.areaHa,
      daysPending: anom.daysPending,
      severity: anom.severity,
      status: anom.status,
      type: anom.type,
      tribe: anom.tribe || district.tribes,
      isAnomaly: true,
      anomalyReason: anom.reason,
      sdlcBlocker: anom.sdlcBlocker
    });
  };
  return (
    <div className="w-full h-full flex flex-col gap-3 p-3 sm:p-5 overflow-hidden select-none font-sans">
      {/* =========================================================================
          STATE INSPECTION & OVERVIEW (Clean single-mode view, no anomaly tab)
         ========================================================================= */}
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
          {/* Card 1: Selected State Metrics */}
          <div 
            className="rounded-2xl p-4 sm:p-5 border shadow-2xl flex flex-col gap-4"
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.surfaceBorder
            }}
          >
            {/* Top Header: Tag & Code Badge */}
            <div className="flex items-center justify-between">
              <span 
                className="text-[10px] font-mono tracking-widest uppercase font-bold"
                style={{ color: theme.textSecondary, opacity: 0.7 }}
              >
                SELECTED STATE
              </span>

              <span 
                className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border"
                style={{ 
                  backgroundColor: theme.surfaceMuted,
                  borderColor: theme.borderLight,
                  color: theme.textSecondary 
                }}
              >
                {activeState.code} • {activeState.districtsCount || 16} Districts
              </span>
            </div>

            {/* State Title & Subtitle */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-1">
                {activeState.name}
              </h2>
              <p 
                className="text-xs leading-relaxed"
                style={{ color: theme.textSecondary, opacity: 0.85 }}
              >
                {activeState.description || 'Customary tribal land management systems and community tenure.'}
              </p>
            </div>

            {/* 3 Metrics Cards in a Row */}
            <div className="grid grid-cols-3 gap-2">
              <div 
                className="p-3 rounded-xl border flex flex-col justify-between"
                style={{ backgroundColor: theme.surfaceMuted, borderColor: theme.surfaceBorder }}
              >
                <span className="text-[9px] font-mono uppercase tracking-wider font-semibold" style={{ color: theme.textSecondary, opacity: 0.7 }}>
                  TOTAL FOREST AREA
                </span>
                <div className="my-0.5">
                  <span className="text-sm font-bold text-white">
                    {activeState.titledLandHa || 131.7}
                  </span>
                  <span className="text-xs font-normal text-white/70 ml-1">ha</span>
                </div>
                <span className="text-[9px]" style={{ color: theme.textMuted }}>
                  Claimed forest land
                </span>
              </div>

              <div 
                className="p-3 rounded-xl border flex flex-col justify-between"
                style={{ backgroundColor: theme.surfaceMuted, borderColor: theme.surfaceBorder }}
              >
                <span className="text-[9px] font-mono uppercase tracking-wider font-semibold" style={{ color: theme.textSecondary, opacity: 0.7 }}>
                  DISTRICTS
                </span>
                <div className="my-0.5">
                  <span className="text-sm font-bold text-white">
                    {activeState.districtsCount || 16}
                  </span>
                  <span className="text-xs font-normal text-white/70 ml-1">active</span>
                </div>
                <span className="text-[9px]" style={{ color: theme.textMuted }}>
                  {activeState.activeVillages || 14} villages
                </span>
              </div>

              <div 
                className="p-3 rounded-xl border flex flex-col justify-between"
                style={{ backgroundColor: theme.surfaceMuted, borderColor: theme.surfaceBorder }}
              >
                <span className="text-[9px] font-mono uppercase tracking-wider font-semibold" style={{ color: theme.textSecondary, opacity: 0.7 }}>
                  TENURE TYPES
                </span>
                <div className="my-0.5">
                  <span className="text-sm font-bold text-white">
                    {activeState.tenureTypes?.ifr || 15}
                  </span>
                  <span className="text-xs font-normal text-white/70 ml-1">IFR</span>
                </div>
                <span className="text-[9px]" style={{ color: theme.textMuted }}>
                  {activeState.tenureTypes?.cfr || 1} CFR
                </span>
              </div>
            </div>

            {/* Key Statistics Table */}
            <div className="flex flex-col gap-2 pt-1 border-t" style={{ borderColor: theme.surfaceBorder }}>
              <div className="flex items-center justify-between text-xs font-mono">
                <span style={{ color: theme.textSecondary, opacity: 0.85 }}>Total Monitored Claims:</span>
                <span className="font-bold text-white">{activeState.totalClaims || 16}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span style={{ color: theme.textSecondary, opacity: 0.85 }}>Title Granted / Approved:</span>
                <span className="font-bold text-emerald-400">{activeState.approvedClaims || 6}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span style={{ color: theme.textSecondary, opacity: 0.85 }}>Pending Verification:</span>
                <span className="font-bold text-white">{activeState.pendingClaims || 10}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span style={{ color: theme.textSecondary, opacity: 0.85 }}>Field Verification Pending:</span>
                <span className="font-bold text-white">{activeState.fieldSurveys ?? activeState.delayedClaims ?? 3}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-1.5 font-medium" style={{ color: theme.textSecondary }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }} />
                  Scheduled DLC Reviews:
                </span>
                <span className="font-bold text-white">{activeState.scheduledReviews ?? activeState.criticalAlerts ?? 3}</span>
              </div>
            </div>

            {/* FSI & Demographics Row */}
            <div 
              className="grid grid-cols-2 gap-4 p-3 rounded-xl border"
              style={{ backgroundColor: theme.surfaceMuted, borderColor: theme.surfaceBorder }}
            >
              <div>
                <span className="text-[9px] font-mono block" style={{ color: theme.textMuted }}>
                  Forest Cover (FSI)
                </span>
                <span className="text-xs font-bold text-white">
                  {activeState.forestCoverKm2 || '16,598 km²'}
                </span>
              </div>
              <div>
                <span className="text-[9px] font-mono block" style={{ color: theme.textMuted }}>
                  Tribal Population
                </span>
                <span className="text-xs font-bold text-white">
                  {activeState.tribalPopulationPct || '35.1%'}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => onViewClaims && onViewClaims(activeState)}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-2 shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              style={{ 
                backgroundColor: theme.buttonColor,
                boxShadow: `0 10px 25px -5px ${theme.buttonColor}40`
              }}
            >
              <span>View {activeState.name} AI Decision Analysis</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Quick State Jump */}
          <div 
            className="rounded-2xl p-4 sm:p-5 border shadow-2xl flex flex-col min-h-[250px]"
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.surfaceBorder
            }}
          >
            <div className="flex items-center justify-between gap-2 pb-3 mb-2 border-b" style={{ borderColor: theme.surfaceBorder }}>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  QUICK STATE JUMP
                </span>
                <span 
                  className="px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold"
                  style={{
                    backgroundColor: `${theme.accent}25`,
                    color: theme.accent,
                    border: `1px solid ${theme.accent}40`
                  }}
                >
                  36 States & UTs
                </span>
              </div>

              <div 
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs w-36 sm:w-44 transition focus-within:border-amber-500"
                style={{ 
                  backgroundColor: theme.surfaceMuted,
                  borderColor: theme.borderLight
                }}
              >
                <Search className="w-3.5 h-3.5 shrink-0" style={{ color: theme.textMuted }} />
                <input
                  type="text"
                  value={stateSearch}
                  onChange={(e) => setStateSearch(e.target.value)}
                  placeholder="Search state..."
                  className="bg-transparent border-none outline-none text-xs text-white placeholder:text-stone-500 w-full font-mono"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col divide-y" style={{ borderColor: `${theme.surfaceBorder}60` }}>
              {filteredStates.map((state) => {
                const isSelected = activeState.id === state.id || activeState.code === state.code;
                return (
                  <button
                    key={state.id || state.code}
                    onClick={() => onSelectState(state)}
                    className={`w-full py-2.5 px-2 flex items-center justify-between text-left transition group rounded-lg ${
                      isSelected ? 'bg-white/5' : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-emerald-400" />
                      <span className={`text-xs font-medium truncate font-sans ${
                        isSelected ? 'text-white font-bold' : 'text-stone-300 group-hover:text-white'
                      }`}>
                        {state.name}
                      </span>
                    </div>
                    <span 
                      className="px-1.5 py-0.2 rounded text-[9px] font-mono"
                      style={{ backgroundColor: theme.surfaceMuted, color: theme.textMuted }}
                    >
                      {state.code}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
    </div>
  );
}
