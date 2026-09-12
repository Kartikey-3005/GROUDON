import localDistrictsGeoJson from '../data/districts.json';
import localClaimsGeoJson from '../data/claims.json';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const VITE_GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

// District alias mapping
const ID_ALIASES = {
  dist_001: 'dist_a',
  dist_002: 'dist_d',
  dist_003: 'dist_b',
  dist_a: 'dist_a',
  dist_b: 'dist_b',
  dist_c: 'dist_c',
  dist_d: 'dist_d'
};

function resolveDistrictId(inputId) {
  if (!inputId) return null;
  const clean = inputId.toString().trim().toLowerCase();
  if (ID_ALIASES[clean]) return ID_ALIASES[clean];
  const found = localDistrictsGeoJson.features?.find(
    f => f.properties?.district_id?.toLowerCase() === clean
  );
  return found ? found.properties.district_id.toLowerCase() : null;
}

function calculateDistrictStatistics(districtId, claimsFeatures) {
  const total = claimsFeatures.length;
  if (total === 0) {
    return {
      total_claims: 0,
      pending_count: 0,
      pending_ratio: 0.0,
      pending_percentage: 0.0,
      approved_count: 0,
      approved_ratio: 0.0,
      approved_percentage: 0.0,
      rejected_count: 0,
      rejection_ratio: 0.0,
      rejected_percentage: 0.0,
      max_delay_days: 0,
      avg_days_pending: 0.0,
      avg_vegetation_loss_index: 0.0,
      avg_vegetation_loss_pct: 0.0,
      avg_pending_vegetation_loss_pct: 0.0,
      community_claims: 0,
      individual_claims: 0
    };
  }

  const propsList = claimsFeatures.map(f => f.properties || {});
  const pending = propsList.filter(p => p.status === 'pending');
  const approved = propsList.filter(p => p.status === 'approved');
  const rejected = propsList.filter(p => p.status === 'rejected');

  const pendingDays = pending.map(p => p.days_pending || 0);
  const allDays = propsList.map(p => p.days_pending || 0);

  const maxDelay = pendingDays.length ? Math.max(...pendingDays) : (allDays.length ? Math.max(...allDays) : 0);
  const avgDelay = pendingDays.length 
    ? (pendingDays.reduce((a, b) => a + b, 0) / pendingDays.length)
    : (allDays.reduce((a, b) => a + b, 0) / total);

  const vegLosses = propsList.map(p => p.vegetation_loss_index || 0.0);
  const avgVegIndex = vegLosses.length ? (vegLosses.reduce((a, b) => a + b, 0) / vegLosses.length) : 0.0;

  const pendingVeg = pending.map(p => p.vegetation_loss_index || 0.0);
  const avgPendingVegIndex = pendingVeg.length ? (pendingVeg.reduce((a, b) => a + b, 0) / pendingVeg.length) : avgVegIndex;

  return {
    total_claims: total,
    pending_count: pending.length,
    pending_ratio: Math.round((pending.length / total) * 1000) / 1000,
    pending_percentage: Math.round((pending.length / total) * 1000) / 10,
    approved_count: approved.length,
    approved_ratio: Math.round((approved.length / total) * 1000) / 10,
    approved_percentage: Math.round((approved.length / total) * 1000) / 10,
    rejected_count: rejected.length,
    rejection_ratio: Math.round((rejected.length / total) * 1000) / 1000,
    rejected_percentage: Math.round((rejected.length / total) * 1000) / 10,
    max_delay_days: Math.round(maxDelay),
    avg_days_pending: Math.round(avgDelay * 10) / 10,
    avg_vegetation_loss_index: Math.round(avgVegIndex * 1000) / 1000,
    avg_vegetation_loss_pct: Math.round(avgVegIndex * 1000) / 10,
    avg_pending_vegetation_loss_pct: Math.round(avgPendingVegIndex * 1000) / 10,
    community_claims: propsList.filter(p => p.claimant_type === 'Community').length,
    individual_claims: propsList.filter(p => p.claimant_type === 'Individual').length
  };
}

function generateConciseBriefingFallback(districtName, anomalyFlag, stats, districtProps) {
  if (anomalyFlag === 'HIGH_PENDING_DELAY') {
    return (
      `${districtName} is flagged for critical administrative bottlenecks with a ${stats.pending_percentage}% ` +
      `pending rate and a maximum wait time of ${stats.max_delay_days} days (averaging ${stats.avg_days_pending} days). ` +
      `This administrative stagnation at the SDLC verification stage severely impacts tribal claimants awaiting statutory recognition.`
    );
  } else if (anomalyFlag === 'ABNORMAL_REJECTION_SPIKE') {
    return (
      `${districtName} is flagged for an acute rejection spike, recording an anomalous ${stats.rejected_percentage}% ` +
      `rejection rate with claims summarily dismissed within an average turnaround of only ${stats.avg_days_pending} days. ` +
      `This abnormal pattern points to systematic procedural bypasses and unrecorded Gram Sabha determinations requiring immediate audit.`
    );
  } else if (anomalyFlag === 'FOREST_COVER_LOSS_ON_CLAIM') {
    const vegPct = districtProps.vegetation_loss_pct || stats.avg_pending_vegetation_loss_pct;
    return (
      `${districtName} is flagged for severe land conflict and encroachment, exhibiting a ${stats.pending_percentage}% ` +
      `pending rate overlaid with ${vegPct}% vegetation loss on pending Community Forest Resource claims. ` +
      `Satellite-detected canopy degradation indicates illegal deforestation and tenure contestation that demand prompt inter-departmental enforcement.`
    );
  } else {
    return (
      `${districtName} serves as a compliant benchmark district, maintaining a balanced ${stats.pending_percentage}% ` +
      `pending rate, a ${stats.approved_percentage}% approval rate, and an efficient turnaround of ${stats.avg_days_pending} days. ` +
      `Operational indicators reflect robust Gram Sabha and DLC coordination with negligible canopy disruption.`
    );
  }
}

/**
 * Fetch GeoJSON FeatureCollection of district boundary polygons
 */
export async function fetchDistricts() {
  // If user explicitly configured an external backend URL and it's active
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/districts`);
      if (res.ok) return await res.json();
    } catch {
      // Fall through to in-memory datasets
    }
  }
  return localDistrictsGeoJson;
}

/**
 * Fetch GeoJSON FeatureCollection of claim points for a specific district
 */
export async function fetchClaimsByDistrict(districtId) {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/claims/${districtId}`);
      if (res.ok) return await res.json();
    } catch {
      // Fall through to in-memory datasets
    }
  }

  const canonicalId = resolveDistrictId(districtId) || districtId?.toLowerCase();
  const matching = (localClaimsGeoJson.features || []).filter(
    f => (f.properties?.district_id || '').toLowerCase() === canonicalId
  );

  const districtFeat = (localDistrictsGeoJson.features || []).find(
    f => (f.properties?.district_id || '').toLowerCase() === canonicalId
  );

  return {
    type: 'FeatureCollection',
    district_id: canonicalId,
    district_name: districtFeat?.properties?.name || canonicalId,
    total_features: matching.length,
    features: matching
  };
}

/**
 * Trigger Decision-Support Analysis for a district
 * Runs 100% in-browser without requiring a Python backend.
 */
export async function analyzeDistrict(districtId) {
  // Check optional remote backend if configured
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/analyze/${districtId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback to client-side engine
    }
  }

  const canonicalId = resolveDistrictId(districtId) || districtId?.toLowerCase();
  const districtFeat = (localDistrictsGeoJson.features || []).find(
    f => (f.properties?.district_id || '').toLowerCase() === canonicalId
  );

  const districtProps = districtFeat?.properties || {
    district_id: canonicalId,
    name: canonicalId,
    anomaly_flag: 'HIGH_PENDING_DELAY',
    state: 'Madhya Pradesh'
  };

  const claimsResult = await fetchClaimsByDistrict(canonicalId);
  const stats = calculateDistrictStatistics(canonicalId, claimsResult.features || []);

  // Attempt direct Gemini API call if client key is configured, else use decision briefing engine
  let briefing = '';
  let engine = 'In-Browser Decision Support Engine';

  if (VITE_GEMINI_API_KEY) {
    try {
      const prompt = `You are a senior data analyst for the Ministry of Tribal Affairs monitoring Forest Rights Act (FRA) implementation.
District: ${districtProps.name}
Pre-calculated Anomaly Flag: ${districtProps.anomaly_flag}
Exact Numerical Evidence:
- Total Claims Sampled: ${stats.total_claims}
- Pending Rate: ${stats.pending_percentage}%
- Rejection Rate: ${stats.rejected_percentage}%
- Approval Rate: ${stats.approved_percentage}%
- Maximum Wait Time: ${stats.max_delay_days} days
- Average Processing / Wait Time: ${stats.avg_days_pending} days
- Vegetation Loss on Claims: ${districtProps.vegetation_loss_pct || stats.avg_pending_vegetation_loss_pct}%
- Community Forest Rights Claims: ${stats.community_claims}
- Individual Claims: ${stats.individual_claims}

Instructions:
Generate a concise, 2-sentence executive briefing highlighting why this district was flagged and the exact metrics driving the alert. Do NOT hallucinate data. Exactly 2 sentences.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
      );
      if (response.ok) {
        const data = await response.json();
        const geminiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (geminiText && geminiText.trim().length > 20) {
          briefing = geminiText.trim();
          engine = 'Gemini 1.5 Flash (Client-Side)';
        }
      }
    } catch {
      // Use fallback
    }
  }

  if (!briefing) {
    briefing = generateConciseBriefingFallback(
      districtProps.name,
      districtProps.anomaly_flag || 'NORMAL',
      stats,
      districtProps
    );
  }

  return {
    district_id: canonicalId,
    district_name: districtProps.name,
    state: districtProps.state || 'Madhya Pradesh',
    anomaly_flag: districtProps.anomaly_flag || 'NORMAL',
    statistics: stats,
    ai_anomaly_report: briefing,
    ai_engine: engine
  };
}

export { API_BASE_URL };

