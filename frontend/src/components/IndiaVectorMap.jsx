import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft,
  MapPin, 
  Sparkles, 
  Info,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';
import { useSmoothViewBox } from '../hooks/useSmoothViewBox';

export default function IndiaVectorMap({
  statesList = [],
  selectedState = null,
  onSelectState = () => {},
  onResetAllIndia = () => {},
  claims = [],
  activeClaim = null,
  onSelectClaim = () => {}
}) {
  const [hoveredState, setHoveredState] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showClaimDots, setShowClaimDots] = useState(true);
  const [showLabels, setShowLabels] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Compute Target ViewBox based on whether a state is selected
  const targetViewBox = useMemo(() => {
    if (!selectedState) {
      // Normal Full India Map ViewBox
      return { x: 0, y: 0, w: 1000, h: 1000 };
    }

    // Precise bounding box of the isolated selected state with nice padding
    const bounds = selectedState.bounds || {
      centerX: selectedState.cx || 500,
      centerY: selectedState.cy || 500,
      width: 250,
      height: 250
    };

    const maxDim = Math.max(bounds.width || 250, bounds.height || 250);
    const pad = Math.max(maxDim * 0.15, 20); // 15% breathing room around state
    const size = maxDim + 2 * pad;
    const x = bounds.centerX - size / 2;
    const y = bounds.centerY - size / 2;

    return {
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      w: Math.round(size * 10) / 10,
      h: Math.round(size * 10) / 10,
    };
  }, [selectedState]);

  // Smooth animated transition between full India map and isolated state
  const animatedViewBox = useSmoothViewBox(targetViewBox, 600);

  // When a state is selected, ONLY show that state! Hide all other states of India!
  const visibleStates = useMemo(() => {
    if (selectedState) {
      return statesList.filter(s => s.id === selectedState.id);
    }
    return statesList;
  }, [selectedState, statesList]);

  // Relevant claims to display: only show when a state is selected
  const visibleClaims = useMemo(() => {
    if (!showClaimDots || !selectedState) return [];
    return claims.filter(c => c.stateId === selectedState.id);
  }, [claims, selectedState, showClaimDots]);

  return (
    <div 
      className="relative w-full h-full bg-slate-900 flex items-center justify-center overflow-hidden select-none"
      onMouseMove={handleMouseMove}
    >
      {/* Top Left: Navigation & State Status */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        {selectedState ? (
          <div className="flex items-center gap-2">
            {/* Prominent Back to Normal India Map Button */}
            <button
              onClick={onResetAllIndia}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-lg shadow-blue-950/60 transition transform hover:-translate-x-0.5 active:scale-95"
              title="Click to go back to normal India map"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Normal India Map</span>
            </button>

            <div className="bg-slate-950/85 backdrop-blur-md border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 flex items-center gap-2 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-white">
                Viewing Isolated State: <strong className="text-emerald-400">{selectedState.code}</strong>
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-slate-950/80 backdrop-blur-md border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-200 flex items-center gap-2 shadow-lg">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-white">Click any state to show ONLY that state</span>
          </div>
        )}
      </div>

      {/* Top Right Toggles */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        {selectedState && (
          <button
            onClick={onResetAllIndia}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-1 transition shadow"
            title="Reset to All India Map"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
            <span>Reset Map</span>
          </button>
        )}


        <button
          onClick={() => setShowClaimDots(!showClaimDots)}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border transition shadow ${
            showClaimDots 
              ? 'bg-slate-800 text-emerald-400 border-slate-700' 
              : 'bg-slate-900/80 text-slate-400 border-slate-800'
          }`}
        >
          {showClaimDots ? "Claims: ON" : "Claims: OFF"}
        </button>
      </div>


      {/* Main SVG Map */}
      <svg
        viewBox={animatedViewBox}
        className="w-full h-full max-h-[92vh] max-w-[92vw] drop-shadow-[0_20px_45px_rgba(0,0,0,0.7)] cursor-pointer transition-all duration-500"
      >
        {/* Render States (If a state is clicked, ONLY that state is rendered!) */}
        <g id="features">
          {visibleStates.map((state) => {
            const isSelected = selectedState && selectedState.id === state.id;
            const isHovered = hoveredState && hoveredState.id === state.id;

            return (
              <path
                key={state.id}
                d={state.d}
                id={state.id}
                fill={isSelected ? '#2563eb' : isHovered ? '#38bdf8' : '#5b84a6'}
                stroke="#ffffff"
                strokeWidth={isSelected ? "1.8" : isHovered ? "1.5" : "0.75"}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300 hover:brightness-110"
                onClick={() => {
                  if (isSelected) {
                    // Clicking the selected state again returns to normal India map!
                    onResetAllIndia();
                  } else {
                    // Clicking selects and isolates this state!
                    onSelectState(state);
                  }
                }}
                onMouseEnter={() => setHoveredState(state)}
                onMouseLeave={() => setHoveredState(null)}
              />
            );
          })}
        </g>

        {/* State Code Badges (Matching User's Reference Image) */}
        {showLabels && (
          <g id="state-labels" className="pointer-events-auto">
            {visibleStates.map((state) => {
              const isSelected = selectedState && selectedState.id === state.id;
              const isHovered = hoveredState && hoveredState.id === state.id;
              const x = state.cx;
              const y = state.cy;

              // When isolated, slightly scale up badge for perfect readability
              const scale = isSelected ? 1.4 : 1;
              const rw = 32 * scale;
              const rh = 22 * scale;

              return (
                <g 
                  key={`label-${state.id}`}
                  className="cursor-pointer transition-transform hover:scale-110"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isSelected) {
                      onResetAllIndia();
                    } else {
                      onSelectState(state);
                    }
                  }}
                  onMouseEnter={() => setHoveredState(state)}
                  onMouseLeave={() => setHoveredState(null)}
                >
                  <rect
                    x={x - rw / 2}
                    y={y - rh / 2}
                    width={rw}
                    height={rh}
                    rx={7 * scale}
                    fill={isSelected ? '#1e3a8a' : isHovered ? '#0284c7' : '#476e8e'}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? '2' : '1.2'}
                    className="drop-shadow-md transition-colors"
                  />
                  <text
                    x={x}
                    y={y + (4 * scale)}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize={11 * scale}
                    fontWeight="bold"
                    fontFamily="Inter, sans-serif"
                    className="pointer-events-none select-none"
                  >
                    {state.code}
                  </text>
                </g>
              );
            })}
          </g>
        )}

        {/* Claim Points Layer for Isolated State or All India */}
        {visibleClaims.map((claim) => {
          if (!claim.svgCoords) return null;

          const isDelayed = claim.status === 'delayed';
          const isApproved = claim.status === 'approved';
          const fill = isApproved ? '#10b981' : isDelayed ? '#ef4444' : '#f59e0b';
          const isCurrent = activeClaim && activeClaim.id === claim.id;

          // Scale markers appropriately when zoomed into isolated state
          const radius = selectedState ? (isCurrent ? 9 : 6) : (isCurrent ? 7 : 5);

          return (
            <g
              key={claim.id}
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onSelectClaim(claim);
              }}
            >
              {/* Pulsing ring */}
              {(isDelayed || isCurrent) && (
                <circle
                  cx={claim.svgCoords[0]}
                  cy={claim.svgCoords[1]}
                  r={radius * 1.8}
                  fill="none"
                  stroke={fill}
                  strokeWidth="1.5"
                  opacity="0.75"
                  strokeDasharray="3,3"
                />
              )}
              <circle
                cx={claim.svgCoords[0]}
                cy={claim.svgCoords[1]}
                r={radius}
                fill={fill}
                stroke="#ffffff"
                strokeWidth={isCurrent ? "2.5" : "1.5"}
                className="transition-transform hover:scale-150 drop-shadow"
              />
              {/* Detailed text label when in isolated state view */}
              {selectedState && (
                <text
                  x={claim.svgCoords[0] + radius + 4}
                  y={claim.svgCoords[1] + 3}
                  fill="#ffffff"
                  fontSize="8.5"
                  fontWeight="bold"
                  fontFamily="Inter, sans-serif"
                  className="pointer-events-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                >
                  {claim.claimantName.split(' ')[0]} ({claim.areaHa} Ha)
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Hover Tooltip when on Full India Map */}
      {hoveredState && !selectedState && (
        <div 
          className="absolute pointer-events-none z-30 bg-slate-950/95 border border-slate-700/90 rounded-xl p-3 shadow-2xl text-xs text-white max-w-xs transition-opacity duration-150"
          style={{
            left: `${Math.min(mousePos.x + 18, window.innerWidth * 0.6 - 220)}px`,
            top: `${Math.min(mousePos.y + 18, window.innerHeight - 150)}px`,
          }}
        >
          <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5 mb-1.5">
            <span className="font-bold text-sm text-white flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-blue-600 text-xs font-mono font-bold">
                {hoveredState.code}
              </span>
            </span>
            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
              hoveredState.aiAnalysis?.severity === 'critical' ? 'bg-rose-500/20 text-rose-300' :
              hoveredState.aiAnalysis?.severity === 'warning' ? 'bg-amber-500/20 text-amber-300' :
              'bg-emerald-500/20 text-emerald-300'
            }`}>
              {hoveredState.approvalRate}% Approved
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
            <div>
              <span className="text-slate-400 block text-[10px]">Total Claims</span>
              <span className="font-bold text-white">{hoveredState.totalClaims.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Approved Titles</span>
              <span className="font-bold text-emerald-400">{hoveredState.approvedClaims.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Pending</span>
              <span className="font-medium text-amber-400">{hoveredState.pendingClaims.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Delayed</span>
              <span className="font-medium text-rose-400">{hoveredState.delayedClaims.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-2 text-[10px] text-emerald-400 font-semibold pt-1.5 border-t border-slate-800/80">
            👉 Click to isolate & show ONLY {hoveredState.code}
          </div>
        </div>
      )}

      {/* Bottom Floating Info Pill */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-xs text-slate-300 bg-slate-950/85 backdrop-blur-md border border-slate-800 rounded-xl px-3 py-1.5 shadow-lg">
        <Info className="w-3.5 h-3.5 text-indigo-400" />
        <span>
          {selectedState 
            ? `Showing ONLY ${selectedState.code}. Click the state or button to return to All India map.` 
            : "Click on any state to hide the rest of India and show ONLY that state."}
        </span>
      </div>
    </div>
  );
}
