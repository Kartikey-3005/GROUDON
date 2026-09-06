import React, { useEffect, useRef, useState, useMemo } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  GeoJSON, 
  CircleMarker, 
  Polygon,
  Popup,
  Tooltip,
  useMap 
} from 'react-leaflet';
import { 
  User, 
  Users, 
  AlertTriangle, 
  RotateCcw,
  Globe, 
  Flame,
  Clock,
  ShieldCheck,
  Ban,
  Layers,
  Plus,
  Minus,
  Maximize2
} from 'lucide-react';
import indiaMaskGeoJson from '../data/indiaMaskGeoJson.json';
import indiaDistrictsGeoJson from '../data/indiaDistrictsGeoJson.json';
import { 
  getEsriImageryUrl, 
  getEsriReferenceUrl, 
  ESRI_ATTRIBUTION 
} from '../config/esriConfig';

const LAKSHADWEEP_ISLANDS = [
  { name: 'Kavaratti', coords: [10.566, 72.641], isCapital: true },
  { name: 'Agatti', coords: [10.853, 72.190] },
  { name: 'Andrott', coords: [10.817, 73.680] },
  { name: 'Minicoy', coords: [8.283, 73.048] },
  { name: 'Amini', coords: [11.124, 72.731] },
  { name: 'Kadmat', coords: [11.233, 72.780] },
  { name: 'Kalpeni', coords: [10.083, 73.633] }
];

// Helper to calculate exact bounding box of any state feature for perfect auto-framing
function getFeatureBounds(feature) {
  if (!feature || !feature.geometry || !feature.geometry.coordinates) return null;
  const geom = feature.geometry;
  const allCoords = [];
  if (geom.type === 'Polygon') {
    allCoords.push(...geom.coordinates[0]);
  } else if (geom.type === 'MultiPolygon') {
    for (const poly of geom.coordinates) {
      if (poly && poly[0]) {
        allCoords.push(...poly[0]);
      }
    }
  }
  if (allCoords.length === 0) return null;
  const lons = allCoords.map(c => c[0]);
  const lats = allCoords.map(c => c[1]);
  return [
    [Math.min(...lats), Math.min(...lons)],
    [Math.max(...lats), Math.max(...lons)]
  ];
}

// Controller to smoothly animate map camera and expose map instance & zoom level
function MapController({ selectedState, resetTrigger, activeClaim, onMapReady, onZoomChange, statesGeoJson }) {
  const map = useMap();

  useEffect(() => {
    if (onMapReady) {
      onMapReady(map);
    }
  }, [map, onMapReady]);

  useEffect(() => {
    const handleZoom = () => {
      if (onZoomChange) {
        onZoomChange(map.getZoom());
      }
    };
    map.on('zoomend', handleZoom);
    handleZoom();
    return () => {
      map.off('zoomend', handleZoom);
    };
  }, [map, onZoomChange]);

  useEffect(() => {
    if (activeClaim && activeClaim.coordinates) {
      // Zoom directly into the cadastral plot parcel boundary
      map.flyTo(activeClaim.coordinates, 15, {
        animate: true,
        duration: 1.2
      });
    } else if (selectedState) {
      // Find the state's exact polygon feature in statesGeoJson for perfect framing
      const feat = statesGeoJson?.features?.find(f =>
        f.id === selectedState.id ||
        f.properties?.id === selectedState.id ||
        f.properties?.code === selectedState.code ||
        f.properties?.name?.toLowerCase() === (selectedState.name || '').toLowerCase()
      );

      const bounds = getFeatureBounds(feat);
      if (bounds) {
        const isSmallTerritory = selectedState.code === 'LD' || selectedState.code === 'GA' || selectedState.code === 'PY';
        map.fitBounds(bounds, {
          padding: [30, 30],
          maxZoom: isSmallTerritory ? 12.0 : 10.5,
          animate: true,
          duration: 1.0
        });
      } else if (selectedState.center) {
        map.flyTo(selectedState.center, selectedState.zoom || 8, {
          animate: true,
          duration: 1.2
        });
      }
    } else {
      // Pan-India Overview: instantly zoom out with zero animation, no effects
      map.setView([22.5, 79.5], 5, { animate: false });
    }
  }, [selectedState, resetTrigger, activeClaim, map, statesGeoJson]);

  return null;
}

export default function WebGISMap({
  statesGeoJson = { type: 'FeatureCollection', features: [] },
  claimsData = [],
  selectedState = null,
  onSelectState = () => {},
  onResetAllIndia = () => {},
  resetTrigger = 0,
  activeClaim = null,
  onSelectClaim = () => {},
  theme = {}
}) {
  const t = {
    maskColor: theme?.maskColor || '#080402',
    stateStroke: theme?.stateStroke || '#dfcca9',
    stateHover: theme?.stateHover || '#f97316',
    stateHoverFill: theme?.stateHoverFill || theme?.accent || '#ea580c',
    surface: theme?.surface || '#120a06',
    surfaceMuted: theme?.surfaceMuted || '#1a0e08',
    surfaceBorder: theme?.surfaceBorder || '#452615',
    borderLight: theme?.borderLight || '#55341e',
    textPrimary: theme?.textPrimary || '#ffffff',
    textSecondary: theme?.textSecondary || '#dfcca9',
    textMuted: theme?.textMuted || '#9c7d61',
    accent: theme?.accent || '#ea580c',
    pillBg: theme?.pillBg || 'rgba(20, 11, 6, 0.90)',
    pillBorder: theme?.pillBorder || '#452615',
    buttonColor: theme?.buttonColor || '#ea580c'
  };

  const [statusFilter, setStatusFilter] = useState('all');
  const [baseLayer, setBaseLayer] = useState('satellite'); // 'satellite' | 'topo' | 'osm'
  const [showParcels, setShowParcels] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [hoveredState, setHoveredState] = useState(null);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(5);
  const geoJsonRef = useRef(null);
  const districtGeoJsonRef = useRef(null);

  const handleZoomIn = () => {
    if (mapInstance) {
      mapInstance.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstance) {
      mapInstance.zoomOut(1, { animate: false });
    }
  };

  const handleFitIndia = () => {
    if (mapInstance) {
      mapInstance.setView([22.5, 79.5], 5, { animate: false });
    }
    onResetAllIndia();
  };

  // Basemap Tile Layers (Satellite and Street)
  const basemapTiles = {
    satellite: {
      url: getEsriImageryUrl(),
      referenceUrl: getEsriReferenceUrl(),
      attribution: ESRI_ATTRIBUTION
    },
    osm: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors'
    }
  };

  // Detailed Realistic Districts: Shown for the selected state
  const activeDistrictsGeoJson = useMemo(() => {
    if (!indiaDistrictsGeoJson || !indiaDistrictsGeoJson.features || !selectedState) return null;

    const stateCode = selectedState.code || (selectedState.id ? selectedState.id.replace('IN', '') : null);
    const stateName = (selectedState.name || '').toLowerCase();
    const matching = indiaDistrictsGeoJson.features.filter(f => {
      const p = f.properties || {};
      return (stateCode && p.state_code === stateCode) ||
             (p.state && p.state.toLowerCase() === stateName);
    });
    if (matching.length === 0) return null;
    return {
      type: 'FeatureCollection',
      features: matching
    };
  }, [selectedState]);

  // Filter claims: Show pan-India anomalies in All-India mode, or filter by selected state
  const filteredClaims = useMemo(() => {
    if (!selectedState) {
      // In Pan-India view: Show all anomalies scattered across all 7 zones of India!
      return claimsData.filter(claim => {
        if (!claim.isAnomaly && claim.status !== 'delayed') return false;
        if (statusFilter !== 'all') {
          if (statusFilter === 'delayed' && !(claim.status === 'delayed' || (claim.days_pending >= 300 || claim.daysPending >= 300))) {
            return false;
          }
          if (statusFilter !== 'delayed' && claim.status !== statusFilter) {
            return false;
          }
        }
        return true;
      });
    }

    const stateId = selectedState.id || (selectedState.code ? `IN${selectedState.code}` : null);
    const stateCode = selectedState.code || (selectedState.id ? selectedState.id.replace('IN', '') : null);
    const stateName = (selectedState.name || '').toLowerCase();

    return claimsData.filter(claim => {
      const claimStateId = claim.stateId || '';
      const claimStateCode = claimStateId.replace('IN', '');
      const claimStateName = (claim.stateName || '').toLowerCase();

      const matchesState = 
        (stateId && claimStateId === stateId) ||
        (stateCode && claimStateCode === stateCode) ||
        (stateName && claimStateName === stateName);

      if (!matchesState) return false;

      if (statusFilter !== 'all') {
        if (statusFilter === 'delayed' && !(claim.status === 'delayed' || (claim.days_pending >= 300 || claim.daysPending >= 300))) {
          return false;
        }
        if (statusFilter !== 'delayed' && claim.status !== statusFilter) {
          return false;
        }
      }
      return true;
    });
  }, [claimsData, selectedState, statusFilter]);

  // Dynamic Mask: When a state is selected, mask out everything except that state
  const activeMaskGeoJson = useMemo(() => {
    if (!selectedState) {
      return indiaMaskGeoJson;
    }

    const stateFeature = statesGeoJson?.features?.find(f => 
      f.id === selectedState.id || 
      f.properties?.id === selectedState.id || 
      f.properties?.code === selectedState.code ||
      (selectedState.name && f.properties?.name && selectedState.name.toLowerCase() === f.properties.name.toLowerCase())
    );

    if (!stateFeature || !stateFeature.geometry) {
      return indiaMaskGeoJson;
    }

    const worldRing = [
      [-180.0, 85.0],
      [180.0, 85.0],
      [180.0, -85.0],
      [-180.0, -85.0],
      [-180.0, 85.0]
    ];

    let stateHoles = [];
    if (stateFeature.geometry.type === 'Polygon') {
      stateHoles = [stateFeature.geometry.coordinates[0]];
    } else if (stateFeature.geometry.type === 'MultiPolygon') {
      stateHoles = stateFeature.geometry.coordinates.map(p => p[0]);
    }

    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: `Mask outside ${selectedState.name}` },
          geometry: {
            type: "Polygon",
            coordinates: [worldRing, ...stateHoles]
          }
        }
      ]
    };
  }, [selectedState, statesGeoJson]);

  // State Boundary Styling: only the selected state is outlined when active
  const getStateStyle = (feature) => {
    const isSelected = selectedState && (
      selectedState.id === feature.id || 
      selectedState.id === feature.properties?.id ||
      selectedState.code === feature.properties?.code ||
      (selectedState.name && feature.properties?.name && selectedState.name.toLowerCase() === feature.properties.name.toLowerCase())
    );

    // If a state is selected, completely hide other state borders so only the chosen state is on screen
    if (selectedState && !isSelected) {
      return {
        fillColor: 'transparent',
        fillOpacity: 0,
        color: 'transparent',
        weight: 0,
        opacity: 0,
      };
    }

    if (isSelected) {
      return {
        fillColor: 'transparent',
        fillOpacity: 0,
        color: t.accent,
        weight: 2.8,
        opacity: 1.0,
      };
    }

    const isHovered = hoveredState && (
      hoveredState.id === feature.id ||
      hoveredState.id === feature.properties?.id ||
      hoveredState.code === feature.properties?.code
    );

    if (isHovered) {
      return {
        fillColor: t.stateHoverFill || t.accent,
        fillOpacity: 0.28,
        color: t.stateHover || t.accent,
        weight: 2.6,
        opacity: 1.0,
      };
    }

    // Delicate state border matching user reference image & theme
    return {
      fillColor: '#000000',
      fillOpacity: 0.001,
      color: t.stateStroke,
      weight: 1.15,
      opacity: 0.88,
    };
  };

  // Detailed Administrative District Boundary Styling (Clean, delicate lines)
  const getDistrictStyle = (feature) => {
    return {
      fillColor: t.accent,
      fillOpacity: 0.04,
      color: t.borderLight || '#9c7d61',
      weight: 1.2,
      opacity: 0.85,
      dashArray: '3, 4'
    };
  };

  // District Hover & Information Tooltip
  const onEachDistrict = (feature, layer) => {
    const p = feature.properties || {};
    layer.on({
      mouseover: (e) => {
        setHoveredDistrict(p);
        e.target.setStyle({
          fillOpacity: 0.22,
          weight: 2.2,
          color: t.stateHover || t.accent
        });
      },
      mouseout: (e) => {
        setHoveredDistrict(null);
        if (districtGeoJsonRef.current) {
          districtGeoJsonRef.current.resetStyle(e.target);
        }
      }
    });

    const areaKm2 = p.total_area_ha ? Math.round(p.total_area_ha / 100).toLocaleString() : null;
    layer.bindTooltip(
      `<div style="font-family: ui-sans-serif, system-ui; font-size: 11px; line-height: 1.4;">
        <div style="font-weight: 700; color: #ffffff; font-size: 12px; margin-bottom: 2px;">${p.name || 'District'} District</div>
        <div style="color: #cbd5e1; font-size: 10px; margin-bottom: 4px;">State: ${p.state || 'India'}</div>
        <div style="display: flex; flex-direction: column; gap: 2px; color: #94a3b8; font-size: 10px;">
          <span>Forest Cover: <strong style="color: #34d399;">${p.forest_cover_pct || 65}%</strong></span>
          <span>Tribal Population: <strong style="color: #60a5fa;">${p.tribal_population_pct || 40}%</strong></span>
          ${areaKm2 ? `<span>Area: <strong style="color: #f1f5f9;">${areaKm2} km²</strong></span>` : ''}
          ${p.claims_count ? `<span>Monitored Units: <strong style="color: #f59e0b;">${p.claims_count}</strong></span>` : ''}
        </div>
      </div>`,
      { sticky: true, opacity: 0.95, className: 'district-leaflet-tooltip' }
    );
  };

  // State Event Listeners: smooth hover and click to enter state view
  const onEachState = (feature, layer) => {
    const props = feature.properties || {};
    const stateName = props.name || 'State';
    const stateCode = props.code || (props.id ? props.id.replace('IN', '') : 'IN');
    const totalClaims = props.totalClaims ? (props.totalClaims > 1000 ? Math.round(props.totalClaims / 1000).toLocaleString() + 'k' : props.totalClaims.toLocaleString()) : '156';
    const anomaliesCount = props.anomalies !== undefined ? props.anomalies : (props.criticalAlerts ? props.criticalAlerts * 4 + 3 : 11);

    // Bind realistic floating state card matching theme & user's reference design
    layer.bindTooltip(
      `<div style="background: ${t.surface}fa; border: 1.5px solid ${t.borderLight}; border-radius: 12px; padding: 12px 14px; min-width: 195px; box-shadow: 0 12px 30px rgba(0,0,0,0.85); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; cursor: pointer; pointer-events: none;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px;">
          <span style="font-weight: 700; color: ${t.stateHover || '#fde68a'}; font-size: 13.5px; letter-spacing: -0.2px;">${stateName}</span>
          <span style="background: rgba(255,255,255,0.12); color: ${t.textSecondary || '#cbd5e1'}; font-size: 9.5px; font-weight: 600; padding: 1px 6px; border-radius: 4px; border: 1px solid ${t.surfaceBorder};">${stateCode}</span>
        </div>
        <div style="color: ${t.textSecondary || '#cbd5e1'}; font-size: 11px; margin-bottom: 3px;">Total Claims: <strong style="color: #ffffff; font-weight: 700;">${totalClaims}</strong></div>
        <div style="color: ${t.textSecondary || '#cbd5e1'}; font-size: 11px; margin-bottom: 10px;">Anomalies: <strong style="color: #ffffff; font-weight: 700;">${anomaliesCount}</strong></div>
        <div style="background: ${t.accent}; color: #ffffff; padding: 6px 12px; border-radius: 8px; font-weight: 700; font-size: 11px; text-align: center; box-shadow: 0 2px 8px ${t.accent}66;">
          Click to view state monitoring &rarr;
        </div>
      </div>`,
      { 
        sticky: true, 
        opacity: 0.98, 
        className: 'state-hover-card-tooltip',
        offset: [15, 0]
      }
    );

    layer.on({
      click: () => {
        if (selectedState && (selectedState.id === props.id || selectedState.code === props.code)) {
          onResetAllIndia();
        } else {
          onSelectState(props);
        }
      },
      mouseover: (e) => {
        setHoveredState(feature.properties);
        e.target.setStyle({
          fillColor: t.stateHoverFill || t.accent,
          fillOpacity: 0.28,
          weight: 2.6,
          color: t.stateHover || t.accent
        });
      },
      mouseout: (e) => {
        setHoveredState(null);
        if (geoJsonRef.current) {
          geoJsonRef.current.resetStyle(e.target);
        }
      }
    });
  };

  // Administrative & Anomaly Marker Colors
  // - Crimson / Red: Critical Anomaly
  // - Orange: High Delay Anomaly
  // - Amber: Anomaly Warning / Pending
  // - Green: Approved Titles
  // - Indigo: Community Forest Resource (CFR)
  // - Rose: Disputed / In Review
  const getMarkerColor = (claim) => {
    if (claim.isAnomaly) {
      if (claim.severity === 'critical') {
        return { fill: '#ef4444', border: '#7f1d1d', label: 'Critical Anomaly' };
      }
      if (claim.severity === 'high') {
        return { fill: '#f97316', border: '#9a3412', label: 'High Delay Anomaly' };
      }
      return { fill: '#eab308', border: '#854d0e', label: 'Anomaly Flagged' };
    }
    const status = claim.status;
    const isCommunity = (claim.claimant_type || claim.type || '').toLowerCase() === 'community';

    if (status === 'approved') {
      return { fill: '#10b981', border: '#059669', label: 'Approved' };
    }
    if (isCommunity) {
      return { fill: '#6366f1', border: '#4338ca', label: 'Community CFR' };
    }
    if (status === 'rejected') {
      return { fill: '#f43f5e', border: '#be123c', label: 'Rejected' };
    }
    return { fill: '#f59e0b', border: '#d97706', label: 'Pending Verification' };
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      <MapContainer
        center={[22.5, 79.5]}
        zoom={5}
        minZoom={4.0}
        maxZoom={20}
        maxBounds={[ [2.0, 60.0], [39.0, 102.0] ]}
        maxBoundsViscosity={0.7}
        scrollWheelZoom={true}
        className="w-full h-full z-10"
        style={{ backgroundColor: '#000000' }}
        zoomControl={false}
      >
        <MapController 
          selectedState={selectedState} 
          resetTrigger={resetTrigger}
          activeClaim={activeClaim}
          onMapReady={setMapInstance}
          onZoomChange={setCurrentZoom}
          statesGeoJson={statesGeoJson}
        />
        {/* Primary Basemap Tile Layer - Esri World Imagery Satellite (Clean satellite imagery without cities/country labels) */}
        <TileLayer
          key={baseLayer}
          attribution={basemapTiles[baseLayer].attribution}
          url={basemapTiles[baseLayer].url}
          maxZoom={20}
          maxNativeZoom={19}
          noWrap={true}
        />

        {/* Dynamic Pitch Black Mask Outer World Ring - zero stroke, complete black surround behind/around India */}
        <GeoJSON
          key={`mask-${selectedState ? (selectedState.id || selectedState.code) : 'all'}-pitch-black`}
          data={activeMaskGeoJson}
          style={{
            fillColor: '#000000',
            fillOpacity: 1.0,
            color: 'transparent',
            weight: 0,
            opacity: 0
          }}
          interactive={false}
        />

        {/* India States Boundary Layer */}
        <GeoJSON
          key={`states-geojson-${selectedState ? (selectedState.id || selectedState.code) : 'all'}-${t.maskColor}`}
          ref={geoJsonRef}
          data={statesGeoJson}
          style={getStateStyle}
          onEachFeature={onEachState}
        />

        {/* Detailed Administrative District Boundaries Layer */}
        {activeDistrictsGeoJson && (
          <GeoJSON
            key={`districts-${selectedState ? (selectedState.code || selectedState.id) : 'all'}-${activeDistrictsGeoJson.features?.length}-${t.maskColor}`}
            ref={districtGeoJsonRef}
            data={activeDistrictsGeoJson}
            style={getDistrictStyle}
            onEachFeature={onEachDistrict}
          />
        )}

        {/* Lakshadweep Islands Archipelago Markers (Always visible and interactive for seamless Lakshadweep hovering & selection) */}
        {LAKSHADWEEP_ISLANDS.map((isl) => {
          const isLdSelected = selectedState && (selectedState.code === 'LD' || selectedState.id === 'INLD');
          return (
            <React.Fragment key={isl.name}>
              {/* Subtle outer halo for islands */}
              <CircleMarker
                center={isl.coords}
                radius={currentZoom >= 7 ? 14 : (isl.isCapital || isLdSelected ? 9 : 7)}
                pathOptions={{
                  color: isLdSelected ? t.accent : '#fef08a',
                  fillColor: t.accent,
                  fillOpacity: isLdSelected ? 0.35 : 0.18,
                  weight: 1.5,
                  dashArray: '2, 2'
                }}
                interactive={false}
              />
              {/* Island Point Marker with Tooltip */}
              <CircleMarker
                center={isl.coords}
                radius={currentZoom >= 7 ? 6.5 : (isl.isCapital ? 5 : 4)}
                eventHandlers={{
                  click: () => {
                    const ld = {
                      id: 'INLD',
                      code: 'LD',
                      name: 'Lakshadweep',
                      center: [10.56, 72.64],
                      zoom: 9,
                      totalClaims: 340,
                      anomalies: 2
                    };
                    onSelectState(ld);
                  },
                  mouseover: () => setHoveredState({ id: 'INLD', code: 'LD', name: 'Lakshadweep', totalClaims: 340, anomalies: 2 }),
                  mouseout: () => setHoveredState(null)
                }}
                pathOptions={{
                  fillColor: isLdSelected ? t.accent : (t.stateHoverFill || t.accent),
                  fillOpacity: 0.95,
                  color: t.stateHover || '#ffffff',
                  weight: 2
                }}
              >
                <Tooltip
                  sticky={true}
                  opacity={0.98}
                  className="state-hover-card-tooltip"
                  offset={[15, 0]}
                >
                  <div style={{
                    background: `${t.surface}fa`,
                    border: `1.5px solid ${t.borderLight}`,
                    borderRadius: '12px',
                    padding: '12px 14px',
                    minWidth: '195px',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.85)',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                    cursor: 'pointer',
                    pointerEvents: 'none'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
                      <span style={{ fontWeight: 700, color: t.stateHover || '#fde68a', fontSize: '13.5px', letterSpacing: '-0.2px' }}>Lakshadweep ({isl.name})</span>
                      <span style={{ background: 'rgba(255,255,255,0.12)', color: t.textSecondary || '#cbd5e1', fontSize: '9.5px', fontWeight: 600, padding: '1px 6px', borderRadius: '4px', border: `1px solid ${t.surfaceBorder}` }}>LD</span>
                    </div>
                    <div style={{ color: t.textSecondary || '#cbd5e1', fontSize: '11px', marginBottom: '3px' }}>Total Claims: <strong style={{ color: '#ffffff', fontWeight: 700 }}>340</strong></div>
                    <div style={{ color: t.textSecondary || '#cbd5e1', fontSize: '11px', marginBottom: '10px' }}>Anomalies: <strong style={{ color: '#ffffff', fontWeight: 700 }}>2</strong></div>
                    <div style={{
                      background: t.accent,
                      color: '#ffffff',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '11px',
                      textAlign: 'center',
                      boxShadow: `0 2px 8px ${t.accent}66`
                    }}>
                      Click to view state monitoring &rarr;
                    </div>
                  </div>
                </Tooltip>
              </CircleMarker>
            </React.Fragment>
          );
        })}
      </MapContainer>

      {/* Front-end Zoom Controls (Top-Left matching user reference screenshot) */}
      <div 
        className="absolute top-6 left-6 z-[1000] flex flex-col rounded-lg shadow-2xl overflow-hidden border backdrop-blur-md"
        style={{
          backgroundColor: t.pillBg,
          borderColor: t.pillBorder
        }}
      >
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 transition border-b"
          style={{ borderColor: t.surfaceBorder }}
          title="Zoom In (+)"
          aria-label="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>

        <button
          onClick={handleZoomOut}
          className="w-8 h-8 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 transition"
          style={{ borderColor: t.surfaceBorder }}
          title="Zoom Out (-)"
          aria-label="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* Top-Right: Basemap Switcher */}
      <div className="absolute top-6 right-6 z-[1000] flex items-center gap-2">
        <div 
          className="backdrop-blur-md border rounded-xl shadow-xl p-1 flex items-center gap-1 text-xs"
          style={{
            backgroundColor: t.pillBg,
            borderColor: t.pillBorder
          }}
        >
          <button
            onClick={() => setBaseLayer('satellite')}
            className="px-2.5 py-1 rounded-lg font-mono text-[11px] transition flex items-center gap-1.5"
            style={{
              backgroundColor: baseLayer === 'satellite' ? t.surfaceMuted : 'transparent',
              color: baseLayer === 'satellite' ? '#ffffff' : t.textMuted,
              border: baseLayer === 'satellite' ? `1px solid ${t.borderLight}` : '1px solid transparent'
            }}
          >
            <Globe className="w-3 h-3" />
            <span>Satellite</span>
          </button>
          <button
            onClick={() => setBaseLayer('osm')}
            className="px-2.5 py-1 rounded-lg font-mono text-[11px] transition"
            style={{
              backgroundColor: baseLayer === 'osm' ? t.surfaceMuted : 'transparent',
              color: baseLayer === 'osm' ? '#ffffff' : t.textMuted,
              border: baseLayer === 'osm' ? `1px solid ${t.borderLight}` : '1px solid transparent'
            }}
          >
            Street
          </button>
        </div>
      </div>

      {/* Bottom-Left Information Pill */}
      <div className="absolute bottom-6 left-6 z-[1000] select-none">
        <div 
          onClick={selectedState ? onResetAllIndia : undefined}
          className={`rounded-full px-4 py-1.5 text-xs font-mono shadow-2xl tracking-wide flex items-center gap-2 border backdrop-blur-md transition ${
            selectedState ? 'cursor-pointer hover:bg-white/10' : 'pointer-events-none'
          }`}
          style={{
            backgroundColor: t.pillBg,
            borderColor: t.pillBorder,
            color: t.textSecondary
          }}
          title={selectedState ? "Click to return to All-India overview" : undefined}
        >
          {hoveredDistrict ? (
            <>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: t.accent }} />
              <span className="font-semibold text-white">{hoveredDistrict.name} District</span>
              <span style={{ color: t.textMuted }}>•</span>
              <span style={{ color: '#34d399' }}>Forest: {hoveredDistrict.forest_cover_pct}%</span>
              <span style={{ color: t.textMuted }}>•</span>
              <span style={{ color: '#60a5fa' }}>Tribal: {hoveredDistrict.tribal_population_pct}%</span>
            </>
          ) : hoveredState ? (
            <>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: t.accent }} />
              <span className="font-semibold text-white">{hoveredState.name}</span>
              <span style={{ color: t.textMuted }}>•</span>
              <span>Click to view state</span>
            </>
          ) : selectedState ? (
            <>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.accent }} />
              <span className="font-semibold text-white">{selectedState.name}</span>
              <span style={{ color: t.textMuted }}>•</span>
              <span className="underline decoration-dotted">Click to return to All-India view</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-white font-medium">Pan-India FRA Monitoring</span>
              <span style={{ color: t.textMuted }}>•</span>
              <span className="text-stone-300">National WebGIS Overview</span>
              <span style={{ color: t.textMuted }}>•</span>
              <span style={{ color: t.accent }}>Hover or click any state to inspect</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
