import React, { useState } from 'react';
import WebGISMap from './components/WebGISMap';
import StateInspectionSidebar from './components/StateInspectionSidebar';
import DecisionSidebar from './components/DecisionSidebar';
import DistrictAIModal from './components/DistrictAIModal';
import { ALL_INDIA_STATES, NATIONAL_SUMMARY, MOCK_CLAIMS, INDIA_STATES_GEOJSON } from './data/mockData';
import { THEMES, DEFAULT_THEME } from './config/themes';
import { 
  Palette, 
  ChevronDown, 
  Sparkles, 
  BarChart3, 
  X, 
  Check, 
  RotateCcw,
  ArrowLeft 
} from 'lucide-react';
import EasyThemeTransition from './components/EasyThemeTransition';

export default function App() {
  // Start with All-India overview so full map is visible, and clicking any state isolates and zooms that state
  const [selectedState, setSelectedState] = useState(null);
  const [activeClaim, setActiveClaim] = useState(null);
  const [resetTrigger, setResetTrigger] = useState(0);

  // Theme Management with EasyTransitions Animation
  const [currentTheme, setCurrentTheme] = useState(DEFAULT_THEME);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
  const [targetTransitionTheme, setTargetTransitionTheme] = useState(null);
  const [transitionType, setTransitionType] = useState('split_diamond');

  // Modals & Drawers
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Available easy transition types from the CodePen
  const transitionTypes = [
    'split_diamond',
    'split_diagonal',
    'split_diagonal_alt',
    'split_horizontal',
    'split_vertical',
    'wipe_left',
    'wipe_right',
    'wipe_top',
    'wipe_bottom'
  ];

  const handleSelectState = (stateProps) => {
    const found = ALL_INDIA_STATES.find(
      s => s.id === stateProps.id || s.code === stateProps.code || s.name.toLowerCase() === (stateProps.name || '').toLowerCase()
    );
    setSelectedState(found || stateProps);
    setActiveClaim(null);
  };

  const handleResetAllIndia = () => {
    setSelectedState(null);
    setActiveClaim(null);
    setResetTrigger(prev => prev + 1);
  };

  const handleSelectClaim = (claim) => {
    setActiveClaim(claim);
    const parentState = ALL_INDIA_STATES.find(
      s => s.id === claim.stateId || s.code === claim.stateId?.replace('IN', '')
    );
    if (parentState) {
      setSelectedState(parentState);
    }
  };

  const handleThemeSelect = (newTheme) => {
    if (newTheme.id === currentTheme.id || isThemeTransitioning) {
      setIsThemeMenuOpen(false);
      return;
    }

    setIsThemeMenuOpen(false);

    // Pick a transition type dynamically (e.g. diagonal, diamond, split)
    const randomTran = transitionTypes[Math.floor(Math.random() * transitionTypes.length)];
    setTransitionType(randomTran);
    setTargetTransitionTheme(newTheme);
    setIsThemeTransitioning(true);

    // Mid-point of animation: apply new theme colors while translucent glassy panels cover the screen
    const changePoint = 550; // ms (half of 1.1s)
    const totalDuration = 1100; // ms

    setTimeout(() => {
      setCurrentTheme(newTheme);
    }, changePoint);

    // Reset transition overlay at end of animation
    setTimeout(() => {
      setIsThemeTransitioning(false);
      setTargetTransitionTheme(null);
    }, totalDuration);
  };

  return (
    <div 
      className="h-screen w-screen relative overflow-hidden flex flex-col font-sans select-none transition-colors duration-300"
      style={{ backgroundColor: currentTheme.bg }}
    >
      {/* =========================================================================
          TOP NAVIGATION & HEADER BAR matching screenshot
         ========================================================================= */}
      <header 
        className="h-12 w-full px-5 flex items-center justify-between z-30 shrink-0 border-b backdrop-blur-md transition-colors duration-300"
        style={{ 
          backgroundColor: currentTheme.surface,
          borderColor: currentTheme.surfaceBorder 
        }}
      >
        {/* Left Title matching reference: "India FRA Monitoring — Select a state on the map to inspect claims" */}
        <div className="flex items-center gap-2 text-xs md:text-sm">
          <span className="font-bold tracking-tight text-white flex items-center gap-2">
            <span 
              className="w-2.5 h-2.5 rounded-full inline-block animate-pulse"
              style={{ backgroundColor: currentTheme.accent }} 
            />
            India FRA Monitoring
          </span>
          <span style={{ color: currentTheme.textMuted }}>—</span>
          <span 
            className="text-xs hidden sm:inline"
            style={{ color: currentTheme.textSecondary }}
          >
            Select a state on the map to inspect claims
          </span>
        </div>

        {/* Right Controls: Back to Main Website / Home, Reset, Theme Switcher Button + AI Modal */}
        <div className="flex items-center gap-2 relative">
          {/* Back to Main Website / Home Button */}
          <a
            href="/"
            onClick={(e) => {
              // If state is selected, reset to all India; otherwise follow href
              if (selectedState) {
                e.preventDefault();
                handleResetAllIndia();
              }
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 border transition hover:bg-white/10 text-white shadow-sm"
            style={{
              backgroundColor: currentTheme.surfaceMuted,
              borderColor: currentTheme.borderLight
            }}
            title="Return to Main Website / Home Overview"
          >
            <ArrowLeft className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
            <span>Back to Main Website</span>
          </a>

          {/* Reset Map View Button */}
          {selectedState && (
            <button
              onClick={handleResetAllIndia}
              className="px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 border transition hover:bg-white/5"
              style={{
                borderColor: currentTheme.surfaceBorder,
                color: currentTheme.textSecondary
              }}
              title="Reset to All-India view"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">All India</span>
            </button>
          )}

          {/* DEDICATED SEPARATE COLOR THEME SWITCHER BUTTON */}
          <div className="relative">
            <button
              id="theme-switcher-button"
              onClick={() => setIsThemeMenuOpen(prev => !prev)}
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 border shadow-lg transition hover:bg-white/10"
              style={{
                backgroundColor: currentTheme.surfaceMuted,
                borderColor: currentTheme.borderLight,
                color: currentTheme.textSecondary
              }}
              title="Change Color Theme"
              aria-expanded={isThemeMenuOpen}
            >
              <Palette className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
              <span className="flex items-center gap-1.5">
                <span 
                  className="w-2 h-2 rounded-full inline-block shadow-sm" 
                  style={{ backgroundColor: currentTheme.iconColor }} 
                />
                <span className="hidden sm:inline">{currentTheme.name}</span>
              </span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isThemeMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Theme Dropdown Menu */}
            {isThemeMenuOpen && (
              <div 
                className="absolute right-0 top-full mt-2 w-56 rounded-xl border shadow-2xl z-50 p-1.5 backdrop-blur-2xl flex flex-col gap-1"
                style={{
                  backgroundColor: currentTheme.surface,
                  borderColor: currentTheme.surfaceBorder
                }}
              >
                <div 
                  className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider font-semibold border-b mb-1"
                  style={{ 
                    borderColor: currentTheme.surfaceBorder, 
                    color: currentTheme.textMuted 
                  }}
                >
                  Select Color Theme
                </div>

                {THEMES.map((t) => {
                  const isActive = t.id === currentTheme.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleThemeSelect(t)}
                      className="w-full px-3 py-2 rounded-lg text-xs font-mono flex items-center justify-between transition group text-left"
                      style={{
                        backgroundColor: isActive ? currentTheme.surfaceMuted : 'transparent',
                        color: isActive ? '#ffffff' : currentTheme.textSecondary
                      }}
                    >
                      <div className="flex items-center gap-2.5">
                        <span 
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm flex-shrink-0"
                          style={{ backgroundColor: t.iconColor }}
                        />
                        <span className="group-hover:text-white transition">
                          {t.name}
                        </span>
                      </div>

                      {isActive && (
                        <Check className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN 2-COLUMN LAYOUT matching user's screenshot
          Left (~60%): Full WebGIS Satellite Map with Top-Left Zoom & Bottom-Left Pill
          Right (~40%): Selected State Card + Quick State Jump Card
         ========================================================================= */}
      <main className="flex-1 w-full flex flex-col lg:flex-row overflow-hidden relative">
        {/* LEFT COLUMN: Satellite WebGIS Map */}
        <section className="w-full lg:w-[58%] xl:w-[61%] h-1/2 lg:h-full relative overflow-hidden">
          <WebGISMap
            statesGeoJson={INDIA_STATES_GEOJSON}
            claimsData={MOCK_CLAIMS}
            selectedState={selectedState}
            onSelectState={handleSelectState}
            onResetAllIndia={handleResetAllIndia}
            resetTrigger={resetTrigger}
            activeClaim={activeClaim}
            onSelectClaim={handleSelectClaim}
            theme={currentTheme}
          />
        </section>

        {/* RIGHT COLUMN: State Inspection & Jump Panel */}
        <section 
          className="w-full lg:w-[42%] xl:w-[39%] h-1/2 lg:h-full overflow-hidden border-t lg:border-t-0 lg:border-l z-10 transition-colors duration-300"
          style={{ 
            backgroundColor: currentTheme.bg,
            borderColor: currentTheme.surfaceBorder 
          }}
        >
          <StateInspectionSidebar
            selectedState={selectedState}
            statesList={ALL_INDIA_STATES}
            onSelectState={handleSelectState}
            claims={MOCK_CLAIMS}
            theme={currentTheme}
            onSelectClaim={handleSelectClaim}
            onViewClaims={(state) => {
              setIsAiModalOpen(true);
            }}
          />
        </section>
      </main>

      {/* =========================================================================
          SLIDE-OVER DRAWER FOR NATIONAL ANALYTICS & DECISION SUPPORT
         ========================================================================= */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-y-0 right-0 w-full sm:w-[440px] md:w-[490px] shadow-2xl z-50 flex flex-col border-l backdrop-blur-2xl transition-all"
          style={{
            backgroundColor: currentTheme.surface,
            borderColor: currentTheme.surfaceBorder
          }}
        >
          <div 
            className="flex items-center justify-between p-4 border-b"
            style={{ 
              backgroundColor: currentTheme.surfaceMuted,
              borderColor: currentTheme.surfaceBorder 
            }}
          >
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4" style={{ color: currentTheme.accent }} />
              National FRA Analytics & Decision Support
            </h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition"
              title="Close Analytics Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <DecisionSidebar
              selectedState={selectedState}
              statesList={ALL_INDIA_STATES}
              onSelectState={handleSelectState}
              onResetAllIndia={handleResetAllIndia}
              nationalSummary={NATIONAL_SUMMARY}
              claims={MOCK_CLAIMS}
              activeClaim={activeClaim}
              onSelectClaim={handleSelectClaim}
            />
          </div>
        </div>
      )}

      {/* District Gemini AI Decision Support Modal */}
      <DistrictAIModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      {/* CodePen EasyTransitions Theme Animation with Translucent Glass */}
      <EasyThemeTransition
        isTransitioning={isThemeTransitioning}
        transitionType={transitionType}
        targetTheme={targetTransitionTheme}
      />
    </div>
  );
}
