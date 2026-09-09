import indiaSvgData from './indiaSvgData.json';
import realIndiaStatesGeoJson from './indiaStatesGeoJson.json';
import indiaMaskGeoJson from './indiaMaskGeoJson.json';
import curatedClaimsGeoJson from './claims.json';

// National FRA Summary
export const NATIONAL_SUMMARY = {
  regionName: "All India (National Overview)",
  totalStatesMonitored: 36,
  totalClaims: 4450000,
  approvedClaims: 2280000,
  pendingClaims: 1420000,
  delayedClaims: 750000,
  approvalRate: 51.2,
  delayedPercentage: 16.9,
  totalForestAreaHa: 71200000,
  titledLandHa: 7240000,
  avgProcessingDays: 480,
  aiAnalysis: {
    severity: "warning",
    anomalyHeadline: "National FRA Pendency & Rejection Disparity",
    summary: "⚠️ National Anomaly Flag: Across India, over 750,000 FRA claims (16.9%) have been stalled beyond statutory time limits. A significant regional divide exists: Eastern states (Odisha, Chhattisgarh) show progressive Community Forest Rights recognition, whereas Western & Central states (Gujarat, Maharashtra, MP) exhibit high rejection and pendency rates at the Sub-Divisional (SDLC) level.",
    rootCauses: [
      "Lack of recorded reasons for claim rejections in Gram Sabha records across multiple states.",
      "Overlap disputes between State Forest Department working plans and traditional tribal boundaries.",
      "Delays in digitizing paper cadastral maps into state GIS repositories."
    ],
    recommendation: "MoTA Priority: Issue nationwide directive for automated drone-assisted geo-referencing and establish fast-track District Level Committees (DLC) in high-tribal-density districts.",
    confidenceScore: 94.2,
    riskIndex: "National Index: 6.8/10"
  }
};

// Detailed stats for all states/UTs
const STATE_STATS_OVERLAY = {
  INMP: {
    totalClaims: 627000,
    approvedClaims: 295000,
    pendingClaims: 184000,
    delayedClaims: 148000,
    approvalRate: 47.1,
    titledLandHa: 1140000,
    totalForestAreaHa: 9468900,
    tribes: "Gond, Baiga, Bhil, Korku",
    aiAnalysis: {
      severity: "critical",
      anomalyHeadline: "High Pendency in Tribal Forest Corridors",
      summary: "⚠️ Critical Anomaly: 148,000 claims (23.6%) in Madhya Pradesh are delayed beyond 2.5 years, particularly in Mandla, Dindori, and Balaghat districts. Community Forest Resource (CFR) rights face heavy procedural backlogs at SDLC.",
      rootCauses: [
        "SDLC review meetings held irregularly in eastern tribal circles.",
        "Joint Forest Management (JFM) protected area boundary overlaps."
      ],
      recommendation: "Deploy district-level mobile GIS survey units to clear 42,000 pending geotagging verifications before the next review cycle.",
      confidenceScore: 95.0,
      riskIndex: "High (Score: 8.2/10)"
    }
  },
  INUT: {
    totalClaims: 78500,
    approvedClaims: 31200,
    pendingClaims: 38400,
    delayedClaims: 22100,
    approvalRate: 39.7,
    titledLandHa: 86400,
    totalForestAreaHa: 2430500,
    tribes: "Van Gujjar, Jaunsari, Bhotia, Tharu, Buksa",
    center: [30.1, 79.2],
    zoom: 8,
    aiAnalysis: {
      severity: "warning",
      anomalyHeadline: "Pastoral Rights & Sanctuary Buffer Disputes",
      summary: "⚠️ Transhumant Pastoral Delay: Over 22,000 customary pastoral grazing claims of Van Gujjars in Rajaji and Corbett Tiger Reserve buffer zones face procedural verification halts at the Sub-Divisional (SDLC) level.",
      rootCauses: [
        "Traditional seasonal transhumance routes overlap with core protected wildlife zones.",
        "Delays in joint Gram Sabha boundary demarcation between Revenue and Forest departments."
      ],
      recommendation: "Establish mobile SDLC verification units across Garhwal & Kumaon divisions to expedite customary grazing rights recognition.",
      confidenceScore: 93.4,
      riskIndex: "Moderate (Score: 6.2/10)"
    }
  },
  INOR: {
    totalClaims: 645000,
    approvedClaims: 462000,
    pendingClaims: 121000,
    delayedClaims: 62000,
    approvalRate: 71.6,
    titledLandHa: 890000,
    totalForestAreaHa: 5813600,
    tribes: "Santhal, Kondh, Munda, Ho",
    aiAnalysis: {
      severity: "nominal",
      anomalyHeadline: "National Benchmark in Title Distribution",
      summary: "✅ Benchmark State: Odisha leads India with 71.6% approval and widespread Community Forest Resource titles issued in Mayurbhanj and Kandhamal. Minor pendency flagged in coastal mangrove fringe zones.",
      rootCauses: [
        "Proactive Gram Sabha empowerment and dedicated MoTA district cells.",
        "Minor boundary disputes in mineral-rich Keonjhar belt."
      ],
      recommendation: "Replicate Odisha's digital Gram Sabha title issuance model across neighboring Jharkhand and Chhattisgarh.",
      confidenceScore: 96.5,
      riskIndex: "Low (Score: 2.9/10)"
    }
  },
  INCT: {
    totalClaims: 518000,
    approvedClaims: 338000,
    pendingClaims: 112000,
    delayedClaims: 68000,
    approvalRate: 65.3,
    titledLandHa: 980000,
    totalForestAreaHa: 5977200,
    tribes: "Gond, Maria, Muria, Halba",
    aiAnalysis: {
      severity: "nominal",
      anomalyHeadline: "Strong CFR Recognition with Localized Delays",
      summary: "✅ High Community Forest Rights (CFR) coverage. However, 34,000 claims in Bastar and Sukma districts remain delayed due to remote topography and communication gaps.",
      rootCauses: [
        "Difficult terrain delaying ground cadastral boundary surveys.",
        "Historical overlap with mining concession buffer zones."
      ],
      recommendation: "Deploy satellite imagery validation combined with local Forest Rights Committee (FRC) oral testimonies.",
      confidenceScore: 92.8,
      riskIndex: "Moderate (Score: 4.8/10)"
    }
  },
  INMH: {
    totalClaims: 374000,
    approvedClaims: 198000,
    pendingClaims: 104000,
    delayedClaims: 72000,
    approvalRate: 52.9,
    titledLandHa: 1350000,
    totalForestAreaHa: 6193900,
    tribes: "Warli, Bhil, Gond, Korku",
    aiAnalysis: {
      severity: "warning",
      anomalyHeadline: "Gadchiroli Success vs Western Ghats Pendency",
      summary: "⚠️ Stark Regional Divergence: While Gadchiroli achieved massive CFR recognition, Thane, Palghar, and Nandurbar districts exhibit an above-average 38% rejection rate without documented Gram Sabha reasons.",
      rootCauses: [
        "Disputes over pre-1980 and 2005 cut-off satellite baseline evidence.",
        "Urbanization and infrastructure corridor land reservations."
      ],
      recommendation: "Institute state-level appellate hearings for the 46,000 rejected individual claims in Palghar and Nandurbar.",
      confidenceScore: 93.4,
      riskIndex: "Moderate (Score: 6.4/10)"
    }
  },
  INJH: {
    totalClaims: 310000,
    approvedClaims: 142000,
    pendingClaims: 98000,
    delayedClaims: 70000,
    approvalRate: 45.8,
    titledLandHa: 460000,
    totalForestAreaHa: 2972100,
    tribes: "Santhal, Oraon, Munda, Ho",
    aiAnalysis: {
      severity: "critical",
      anomalyHeadline: "Sluggish Title Issuance in Core Tribal Districts",
      summary: "⚠️ Critical Anomaly: Jharkhand has one of India's lowest approval rates (45.8%). Over 70,000 claims have been stalled for >3 years in West Singhbhum and Latehar districts.",
      rootCauses: [
        "Severe staff vacancy in District Welfare and Forest Rights offices.",
        "Mining lease buffer zone conflicts blocking Gram Sabha certifications."
      ],
      recommendation: "Immediate administrative mission: Form dedicated tripartite FRC-Revenue-Forest camps in West Singhbhum and Gumla.",
      confidenceScore: 95.8,
      riskIndex: "High (Score: 8.7/10)"
    }
  },
  INGJ: {
    totalClaims: 220000,
    approvedClaims: 98000,
    pendingClaims: 72000,
    delayedClaims: 50000,
    approvalRate: 44.5,
    titledLandHa: 380000,
    totalForestAreaHa: 2164400,
    tribes: "Bhil, Chaudhari, Vasava, Gamit",
    aiAnalysis: {
      severity: "critical",
      anomalyHeadline: "High Rejection Rate in Eastern Tribal Belt",
      summary: "⚠️ Critical Anomaly: Gujarat displays the highest historical rejection rate (over 48%) in Narmada and Dangs districts, frequently citing insufficient pre-2005 satellite proofs.",
      rootCauses: [
        "Strict satellite interpretation excluding shifting tribal cultivators.",
        "Lack of proactive physical verification by DLC teams."
      ],
      recommendation: "Mandate re-examination of rejected claims using high-resolution historical LISS-IV remote sensing data.",
      confidenceScore: 94.0,
      riskIndex: "High (Score: 8.5/10)"
    }
  },
  INAP: {
    totalClaims: 215000,
    approvedClaims: 122000,
    pendingClaims: 58000,
    delayedClaims: 35000,
    approvalRate: 56.7,
    titledLandHa: 490000,
    totalForestAreaHa: 2978400,
    tribes: "Chenchu (PVTG), Koya, Yanadi",
    aiAnalysis: {
      severity: "warning",
      anomalyHeadline: "Chenchu PVTG Habitat Rights Pendency",
      summary: "⚠️ Anomaly Detected: Chenchu tribal community habitat rights in the Nallamala forest / Nagarjunasagar reserve are facing prolonged delays due to wildlife sanctuary coordination issues.",
      rootCauses: [
        "Wildlife sanctuary buffer zoning restrictions.",
        "Delays in joint revenue-forest demarcations."
      ],
      recommendation: "Hold high-level MoTA & State Wildlife Board coordination meeting to expedite Chenchu habitat titles.",
      confidenceScore: 91.5,
      riskIndex: "Moderate (Score: 5.8/10)"
    }
  },
  INTG: {
    totalClaims: 205000,
    approvedClaims: 118000,
    pendingClaims: 55000,
    delayedClaims: 32000,
    approvalRate: 57.5,
    titledLandHa: 440000,
    totalForestAreaHa: 2696900,
    tribes: "Gond, Koya, Kolam (PVTG)",
    aiAnalysis: {
      severity: "nominal",
      anomalyHeadline: "Poddubhoomi Rights Recognition Active",
      summary: "✅ Ongoing progress in Bhadradri Kothagudem and Adilabad districts. Poddu cultivation rights distribution is 57.5% complete.",
      rootCauses: [
        "Minor boundary disputes between non-tribal and tribal claimants."
      ],
      recommendation: "Fast-track digitization of remaining 32,000 Poddubhoomi claims through the Dharani portal.",
      confidenceScore: 92.0,
      riskIndex: "Low (Score: 3.8/10)"
    }
  },
  INRJ: {
    totalClaims: 145000,
    approvedClaims: 72000,
    pendingClaims: 45000,
    delayedClaims: 28000,
    approvalRate: 49.6,
    titledLandHa: 210000,
    totalForestAreaHa: 3286300,
    tribes: "Bhil, Meena, Garasia, Sahariya (PVTG)",
    aiAnalysis: {
      severity: "warning",
      anomalyHeadline: "Sahariya Tribal Pendency in Baran",
      summary: "⚠️ Anomaly Flagged: Sahariya PVTG claims in Baran and Udaipur southern circles show delays exceeding 600 days due to pastureland vs forest classification ambiguities.",
      rootCauses: [
        "Revenue 'Charagah' land misclassification with recorded forest entries."
      ],
      recommendation: "Convene special Tehsildar benches in Baran and Banswara to resolve pasture-forest status discrepancies.",
      confidenceScore: 91.0,
      riskIndex: "Moderate (Score: 5.5/10)"
    }
  },
  INKL: {
    totalClaims: 48000,
    approvedClaims: 31000,
    pendingClaims: 11000,
    delayedClaims: 6000,
    approvalRate: 64.5,
    titledLandHa: 52000,
    totalForestAreaHa: 2114400,
    tribes: "Paniya, Kurumba, Kadar (PVTG)",
    aiAnalysis: {
      severity: "nominal",
      anomalyHeadline: "Wayanad & Attappadi CFR Milestone",
      summary: "✅ High literacy and community awareness in Wayanad and Idukki districts. Minor delays flagged for Kadar habitat rights inside Parambikulam Tiger Reserve.",
      rootCauses: [
        "Inter-departmental clearance with National Tiger Conservation Authority (NTCA)."
      ],
      recommendation: "Complete remaining 6,000 Kadar PVTG titles with simplified GPS polygon verification.",
      confidenceScore: 96.0,
      riskIndex: "Low (Score: 2.5/10)"
    }
  },
  INAS: {
    totalClaims: 152000,
    approvedClaims: 64000,
    pendingClaims: 53000,
    delayedClaims: 35000,
    approvalRate: 42.1,
    titledLandHa: 195000,
    totalForestAreaHa: 2831200,
    tribes: "Bodo, Mishing, Karbi, Dimasa",
    aiAnalysis: {
      severity: "critical",
      anomalyHeadline: "Autonomous Council Boundary Hurdles",
      summary: "⚠️ Critical Anomaly: Assam exhibits a 42.1% approval rate. Implementation in Karbi Anglong and Bodoland (BTC) is stalled due to jurisdictional ambiguities between Autonomous District Councils and State Forest Departments.",
      rootCauses: [
        "Sixth Schedule constitutional council powers overlapping with FRA Gram Sabha authority.",
        "Absence of notified Sub-Divisional committees in hill districts."
      ],
      recommendation: "Convene tripartite MoTA, Assam Govt, and Autonomous Council summit to harmonize FRA rules with Council bylaws.",
      confidenceScore: 94.5,
      riskIndex: "High (Score: 8.6/10)"
    }
  },
  INMN: {
    totalClaims: 16,
    approvedClaims: 6,
    pendingClaims: 10,
    delayedClaims: 3,
    approvalRate: 37.5,
    titledLandHa: 131.7,
    totalForestAreaHa: 1659800,
    districtsCount: 16,
    activeVillages: 14,
    tenureTypes: { ifr: 15, cfr: 1 },
    tribes: "Kuki, Naga, Zomi, Meitei Pangal",
    description: "Hill areas customary tribal land management systems.",
    forestCoverKm2: "16,598 km²",
    tribalPopulationPct: "35.1%",
    criticalAlerts: 3,
    mlAnomalies: 3,
    alertMessage: "3 high-risk claims flagged by ML for field boundary verification. 10 pending review across 16 districts.",
    center: [24.8, 93.9],
    zoom: 8,
    aiAnalysis: {
      severity: "critical",
      anomalyHeadline: "Hill Areas Customary Tribal Tenure Systems",
      summary: "3 high-risk claims flagged by ML for field boundary verification. 10 pending review across 16 districts.",
      rootCauses: [
        "Hill Areas District Councils customary land boundaries unharmonized with state cadastral maps.",
        "Delays in setting up Sub-Divisional (SDLC) quorum for remote village councils."
      ],
      recommendation: "Deploy mobile GPS surveyor teams to demarcate customary village boundaries across Senapati and Churachandpur.",
      confidenceScore: 94.8,
      riskIndex: "High (Score: 8.4/10)"
    }
  },
  INLD: {
    totalClaims: 12,
    approvedClaims: 5,
    pendingClaims: 7,
    delayedClaims: 1,
    approvalRate: 41.7,
    titledLandHa: 89.4,
    totalForestAreaHa: 2710,
    districtsCount: 1,
    activeVillages: 10,
    tenureTypes: { ifr: 10, cfr: 2 },
    tribes: "Koya, Malmi, Melacheri (Scheduled Tribes)",
    description: "Coral archipelago customary coastal and coconut tenure systems.",
    forestCoverKm2: "27.1 km²",
    tribalPopulationPct: "94.8%",
    criticalAlerts: 1,
    mlAnomalies: 1,
    alertMessage: "1 coastal customary claim flagged for inter-island boundary survey. 7 pending review.",
    center: [10.56, 72.64],
    zoom: 9,
    aiAnalysis: {
      severity: "nominal",
      anomalyHeadline: "Coastal Customary Tenure & Coconut Groves",
      summary: "1 coastal customary claim flagged for inter-island boundary survey. 7 pending review across 10 inhabited islands.",
      rootCauses: [
        "Traditional customary Pandaram land rights transitioning to digitized cadastral records.",
        "Coastal regulation zone overlaps with village coconut groves."
      ],
      recommendation: "Conduct joint coastal demarcation with Island Panchayats.",
      confidenceScore: 95.1,
      riskIndex: "Low (Score: 2.8/10)"
    }
  }
};

// Generate full rich state data for all 36 states
export const ALL_INDIA_STATES = indiaSvgData.map(s => {
  const overlay = STATE_STATS_OVERLAY[s.id] || {
    totalClaims: Math.round(30000 + (s.d.length % 50000)),
    approvedClaims: Math.round(15000 + (s.d.length % 30000)),
    pendingClaims: Math.round(8000 + (s.d.length % 15000)),
    delayedClaims: Math.round(4000 + (s.d.length % 8000)),
    approvalRate: 53.4,
    titledLandHa: Math.round(40000 + (s.d.length % 60000)),
    totalForestAreaHa: Math.round(1200000 + (s.d.length % 800000)),
    tribes: "Indigenous Tribal Communities",
    aiAnalysis: {
      severity: "nominal",
      anomalyHeadline: "State Title Verification Active",
      summary: `Nominal progress observed across ${s.name}. Sub-Divisional committees are processing claims according to statutory schedules.`,
      rootCauses: [
        "Routine cadastral verification in progress."
      ],
      recommendation: "Maintain quarterly FRC review cadence and continue regular digital land record uploads.",
      confidenceScore: 92.0,
      riskIndex: "Low (Score: 3.2/10)"
    }
  };

  const stateCenters = {
    INUT: [30.1, 79.2],
    INHP: [31.8, 77.2],
    INJK: [33.8, 75.0],
    INMP: [23.5, 78.5],
    INMH: [19.5, 76.0],
    INOR: [20.5, 84.5],
    INCT: [21.5, 82.0],
    INJH: [23.6, 85.3],
    INGJ: [22.3, 71.5],
    INRJ: [26.5, 74.0],
    INTG: [17.8, 79.0],
    INAP: [15.9, 79.7],
    INKA: [15.3, 75.7],
    INKL: [10.5, 76.5],
    INTN: [11.0, 78.5],
    INAS: [26.2, 92.9],
    INTR: [23.8, 91.8],
    INWB: [23.0, 87.8],
    INUP: [27.0, 80.8],
    INBR: [25.6, 85.1],
    INPB: [31.0, 75.4],
    INHR: [29.0, 76.0],
    INSK: [27.5, 88.5],
    INAR: [28.2, 94.7],
    INMN: [24.8, 93.9],
    INMZ: [23.3, 92.8],
    INNL: [26.1, 94.5],
    INML: [25.5, 91.3],
    INGA: [15.3, 74.0],
    INLD: [10.56, 72.64],
    INAN: [11.74, 92.65],
  };

  const districtsCount = overlay.districtsCount || Math.max(8, Math.round(10 + (s.d.length % 25)));
  const activeVillages = overlay.activeVillages || Math.round(districtsCount * 0.9);
  const totalClaims = overlay.totalClaims;
  const approvedClaims = overlay.approvedClaims;
  const pendingClaims = overlay.pendingClaims;
  const delayedClaims = overlay.delayedClaims;
  const criticalAlerts = overlay.criticalAlerts !== undefined ? overlay.criticalAlerts : (delayedClaims > 20000 ? 3 : delayedClaims > 5000 ? 1 : 0);
  const mlAnomalies = overlay.mlAnomalies !== undefined ? overlay.mlAnomalies : Math.min(criticalAlerts + 1, 5);
  const tenureTypes = overlay.tenureTypes || {
    ifr: Math.max(1, Math.round(totalClaims * 0.9)),
    cfr: Math.max(1, Math.round(totalClaims * 0.1))
  };
  const forestCoverKm2 = overlay.forestCoverKm2 || `${Math.round((overlay.totalForestAreaHa || 2500000) / 100).toLocaleString()} km²`;
  const tribalPopulationPct = overlay.tribalPopulationPct || `${(20 + (s.d.length % 35)).toFixed(1)}%`;
  const description = overlay.description || `Hill areas customary tribal land management systems and community forest resources.`;
  const alertMessage = overlay.alertMessage || `${criticalAlerts} high-risk claims flagged by ML for field boundary verification. ${pendingClaims.toLocaleString()} pending review across ${districtsCount} districts.`;

  return {
    ...s,
    ...overlay,
    districtsCount,
    activeVillages,
    tenureTypes,
    forestCoverKm2,
    tribalPopulationPct,
    criticalAlerts,
    mlAnomalies,
    description,
    alertMessage,
    center: overlay.center || stateCenters[s.id] || [22.0, 79.5],
    zoom: overlay.zoom || 7,
    name: s.name === "Orissa" ? "Odisha" : (s.name === "Uttaranchal" || s.id === "INUT" || s.code === "UT") ? "Uttarakhand" : s.name
  };
});

import { ALL_INDIA_DISTRICTS, DISTRICT_ANOMALY_SUMMARY } from './districtAnomaliesData';

export { ALL_INDIA_DISTRICTS, DISTRICT_ANOMALY_SUMMARY };

// Pan-India District Anomaly Claims spanning North, Central, East, West, South, North-East, and Islands
export const PAN_INDIA_DISTRICT_ANOMALIES = ALL_INDIA_DISTRICTS.flatMap(district => 
  (district.anomalies || []).map(anom => ({
    id: anom.id,
    claim_id: anom.id,
    district_id: district.id,
    districtName: district.name,
    stateId: district.stateId,
    stateCode: district.stateCode,
    stateName: district.state,
    zone: district.zone,
    claimantName: anom.claimant,
    claimant_name: anom.claimant,
    tribe: anom.tribe || district.tribes,
    gramSabha: anom.gramSabha,
    claimant_type: anom.type === 'community' ? 'Community' : 'Individual',
    type: anom.type,
    status: anom.status || 'delayed',
    days_pending: anom.daysPending,
    daysPending: anom.daysPending,
    area_ha: anom.areaHa,
    areaHa: anom.areaHa,
    vegetation_loss_index: anom.severity === 'critical' ? 0.72 : anom.severity === 'high' ? 0.48 : 0.22,
    vegetationLossIndex: anom.severity === 'critical' ? 0.72 : anom.severity === 'high' ? 0.48 : 0.22,
    anomaly_tags: [anom.severity, 'sdlc_delayed', 'boundary_dispute'],
    anomalyReason: anom.reason,
    sdlcBlocker: anom.sdlcBlocker,
    severity: anom.severity,
    district_size_km2: district.size_km2,
    district_size_ha: district.size_ha,
    district_forest_cover_km2: district.forest_cover_km2,
    district_forest_cover_pct: district.forest_cover_pct,
    district_population: district.total_population,
    district_tribal_population: district.tribal_population,
    district_tribal_pct: district.tribal_pct,
    district_tribes: district.tribes,
    district_anomaly_count: district.anomaly_count,
    coordinates: anom.coordinates, // [lat, lon]
    isAnomaly: true
  }))
);

// Curated Anomaly Claims from backend/data/claims.json
export const CURATED_ANOMALY_CLAIMS = (curatedClaimsGeoJson?.features || []).map(feat => {
  const p = feat.properties;
  const coords = feat.geometry.coordinates; // [lon, lat]
  const stateId = p.district_id === 'dist_c' ? 'INCT' : 'INMP';
  const stateName = p.district_id === 'dist_c' ? 'Chhattisgarh' : 'Madhya Pradesh';
  const districtMap = {
    dist_a: 'District A (Dindori)',
    dist_b: 'District B (Mandla)',
    dist_c: 'District C (Korba)',
    dist_d: 'District D (Balaghat)'
  };
  return {
    id: p.claim_id,
    claim_id: p.claim_id,
    district_id: p.district_id,
    stateId,
    stateName,
    districtName: districtMap[p.district_id] || p.district_id,
    claimant_type: p.claimant_type,
    claimantName: p.claimant_name || 'FRA Tribal Claimant',
    tribe: p.district_id === 'dist_a' ? 'Baiga (PVTG)' : p.district_id === 'dist_c' ? 'Korwa (PVTG)' : 'Gond',
    type: (p.claimant_type || 'individual').toLowerCase(),
    status: p.status,
    days_pending: p.days_pending,
    daysPending: p.days_pending,
    area_ha: p.area_ha || 2.0,
    areaHa: p.area_ha || 2.0,
    vegetation_loss_index: p.vegetation_loss_index || 0,
    vegetationLossIndex: p.vegetation_loss_index || 0,
    anomaly_tags: p.anomaly_tags || [],
    plot_polygon: p.plot_polygon || null,
    plotPolygon: p.plot_polygon || null,
    coordinates: [coords[1], coords[0]], // [lat, lon] for Leaflet
    svgCoords: [400 + (coords[0] - 80) * 40, 500 + (coords[1] - 22) * 40],
    isAnomaly: p.district_id !== 'dist_d'
  };
});

// Cadastral polygon generator for authentic plot parcel boundaries across all states
export function generateCadastralPolygon(lat, lon, areaHa, seedStr) {
  let hash = 0;
  const str = String(seedStr || `${lat}_${lon}`);
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  const areaM2 = Math.max(0.5, parseFloat(areaHa) || 2.0) * 10000;
  // Radius approximation for parcel plot
  const radiusM = Math.sqrt(areaM2 / Math.PI);
  const baseDegLat = radiusM / 111000.0;
  const baseDegLon = radiusM / (111320.0 * Math.cos((lat * Math.PI) / 180.0));

  // Authentic 6 to 8 sided irregular cadastral parcel vertices along natural field boundaries
  const vertexAngles = [15, 68, 120, 168, 218, 265, 312, 348];
  // Rotational survey skew
  const rotationOffset = ((hash % 45) * Math.PI) / 180.0;

  return vertexAngles.map((deg, idx) => {
    const rad = (deg * Math.PI) / 180.0 + rotationOffset;
    // Vary radius factor per vertex to mirror actual agricultural & forest survey demarcation
    const pseudoRand = ((hash >> (idx * 3)) & 0xff) / 255.0;
    const radialFactor = 0.75 + (pseudoRand * 0.50); // 0.75x to 1.25x
    const pLat = lat + Math.sin(rad) * baseDegLat * radialFactor;
    const pLon = lon + Math.cos(rad) * baseDegLon * radialFactor;
    return [+pLat.toFixed(6), +pLon.toFixed(6)];
  });
}

// Mock Claims for all regions
const RAW_MOCK_CLAIMS = [
  ...PAN_INDIA_DISTRICT_ANOMALIES,
  ...CURATED_ANOMALY_CLAIMS,
  // Manipur 16 Authentic Monitored Claims (6 Approved, 10 Pending with 3 Anomalies, totaling 131.7 Ha)
  {
    id: "FRA-MN-001",
    stateId: "INMN",
    stateName: "Manipur",
    districtName: "Churachandpur",
    claimantName: "Khaikhohau Haokip",
    tribe: "Kuki",
    gramSabha: "Tuibong Village Council",
    type: "individual",
    status: "approved",
    areaHa: 4.80,
    daysPending: 180,
    coordinates: [24.33, 93.68],
    svgCoords: [730, 480],
    isAnomaly: false
  },
  {
    id: "FRA-MN-002",
    stateId: "INMN",
    stateName: "Manipur",
    districtName: "Churachandpur",
    claimantName: "Chunglenmang Kipgen",
    tribe: "Kuki",
    gramSabha: "Songpi Council",
    type: "individual",
    status: "approved",
    areaHa: 3.20,
    daysPending: 210,
    coordinates: [24.35, 93.65],
    svgCoords: [731, 482],
    isAnomaly: false
  },
  {
    id: "FRA-MN-003",
    stateId: "INMN",
    stateName: "Manipur",
    districtName: "Senapati",
    claimantName: "Poumai Naga CFR Collective",
    tribe: "Naga (Poumai)",
    gramSabha: "Oinam Hill Council",
    type: "community",
    status: "approved",
    areaHa: 48.50,
    daysPending: 240,
    coordinates: [25.32, 94.02],
    svgCoords: [740, 465],
    isAnomaly: false
  },
  {
    id: "FRA-MN-004",
    stateId: "INMN",
    stateName: "Manipur",
    districtName: "Kangpokpi",
    claimantName: "Thangboi Lhungdim",
    tribe: "Kuki",
    gramSabha: "Keithelmanbi Council",
    type: "individual",
    status: "approved",
    areaHa: 2.90,
    daysPending: 190,
    coordinates: [24.98, 93.85],
    svgCoords: [735, 475],
    isAnomaly: false
  },
  {
    id: "FRA-MN-005",
    stateId: "INMN",
    stateName: "Manipur",
    districtName: "Ukhrul",
    claimantName: "Tangkhul Shanshak CFR Council",
    tribe: "Tangkhul Naga",
    gramSabha: "Shanshak Council",
    type: "individual",
    status: "approved",
    areaHa: 12.40,
    daysPending: 220,
    coordinates: [25.05, 94.35],
    svgCoords: [745, 472],
    isAnomaly: false
  },
  {
    id: "FRA-MN-006",
    stateId: "INMN",
    stateName: "Manipur",
    districtName: "Tamenglong",
    claimantName: "Rongmei Traditional Forest Group",
    tribe: "Rongmei Naga",
    gramSabha: "Noney Forest Sabha",
    type: "individual",
    status: "approved",
    areaHa: 8.50,
    daysPending: 215,
    coordinates: [24.85, 93.55],
    svgCoords: [728, 478],
    isAnomaly: false
  },
  {
    id: "FRA-MN-007",
    stateId: "INMN",
    stateName: "Manipur",
    districtName: "Churachandpur",
    claimantName: "Paominthang Doungel",
    tribe: "Kuki",
    gramSabha: "Henglep Hill Sabha",
    type: "individual",
    status: "delayed",
    areaHa: 5.20,
    daysPending: 1140,
    coordinates: [24.40, 93.52],
    svgCoords: [729, 483],
    delayReason: "Pending SDLC quorum approval for Hill boundary survey.",
    anomaly_tags: ["HIGH_PENDING_DELAY", "SDLC_QUORUM_DEFICIT"],
    isAnomaly: true
  },
  {
    id: "FRA-MN-008",
    stateId: "INMN",
    stateName: "Manipur",
    districtName: "Senapati",
    claimantName: "Mao Naga Customary Clan",
    tribe: "Naga (Mao)",
    gramSabha: "Tadubi Forest Council",
    type: "individual",
    status: "delayed",
    areaHa: 14.80,
    daysPending: 1220,
    coordinates: [25.42, 94.12],
    svgCoords: [742, 462],
    delayReason: "Inter-departmental overlap between Reserved Forest and Customary Clan land.",
    anomaly_tags: ["FOREST_RESERVE_OVERLAP"],
    isAnomaly: true
  },
  {
    id: "FRA-MN-009",
    stateId: "INMN",
    stateName: "Manipur",
    districtName: "Kangpokpi",
    claimantName: "Ngamkholet Vaiphei",
    tribe: "Vaiphei",
    gramSabha: "Saikul Village Council",
    type: "individual",
    status: "delayed",
    areaHa: 3.80,
    daysPending: 1080,
    coordinates: [24.95, 94.02],
    svgCoords: [738, 473],
    delayReason: "Lack of GPS cadastral survey map submission.",
    anomaly_tags: ["CADASTRAL_SURVEY_DELAY"],
    isAnomaly: true
  },
  {
    id: "FRA-MN-010",
    stateId: "INMN",
    stateName: "Manipur",
    districtName: "Tengnoupal",
    claimantName: "Lhunkhomang Baite",
    tribe: "Kuki",
    gramSabha: "Moreh Border Forest Sabha",
    type: "individual",
    status: "pending",
    areaHa: 4.10,
    daysPending: 280,
    coordinates: [24.25, 94.28],
    svgCoords: [742, 488],
    isAnomaly: false
  },
  {
    id: "FRA-MN-011",
    stateId: "INMN",
    stateName: "Manipur",
    districtName: "Kamjong",
    claimantName: "Achanzim Kasar",
    tribe: "Tangkhul Naga",
    gramSabha: "Kasom Khullen Council",
    type: "individual",
    status: "pending",
    areaHa: 3.50,
    daysPending: 260,
    coordinates: [24.72, 94.42],
    svgCoords: [746, 481],
    isAnomaly: false
  },
  {
    id: "FRA-MN-012",
    stateId: "INMN",
    stateName: "Manipur",
    districtName: "Pherzawl",
    claimantName: "Zomi Land Right Forum",
    tribe: "Zomi",
    gramSabha: "Thanlon Village Sabha",
    type: "individual",
    status: "pending",
    areaHa: 4.60,
    daysPending: 245,
    coordinates: [24.28, 93.30],
    svgCoords: [725, 486],
    isAnomaly: false
  },
  {
    id: "FRA-MN-013",
    stateId: "INMN",
    stateName: "Manipur",
    districtName: "Noney",
    claimantName: "Gaithaoba Kamei",
    tribe: "Inpui Naga",
    gramSabha: "Haochong Hill Council",
    type: "individual",
    status: "pending",
    areaHa: 3.30,
    daysPending: 210,
    coordinates: [24.78, 93.60],
    svgCoords: [730, 479],
    isAnomaly: false
  },
  {
    id: "FRA-MN-014",
    stateId: "INMN",
    stateName: "Manipur",
    districtName: "Chandel",
    claimantName: "Maring Forest Dwellers Union",
    tribe: "Maring",
    gramSabha: "Machhi Forest Sabha",
    type: "individual",
    status: "pending",
    areaHa: 5.10,
    daysPending: 290,
    coordinates: [24.45, 94.15],
    svgCoords: [740, 484],
    isAnomaly: false
  },
  {
    id: "FRA-MN-015",
    stateId: "INMN",
    stateName: "Manipur",
    districtName: "Imphal East",
    claimantName: "Yairipok Traditional Dwellers",
    tribe: "Meitei Pangal",
    gramSabha: "Andro Hill Fringe Sabha",
    type: "individual",
    status: "pending",
    areaHa: 3.90,
    daysPending: 195,
    coordinates: [24.78, 94.05],
    svgCoords: [738, 478],
    isAnomaly: false
  },
  {
    id: "FRA-MN-016",
    stateId: "INMN",
    stateName: "Manipur",
    districtName: "Ukhrul",
    claimantName: "Vashum Kaping",
    tribe: "Tangkhul Naga",
    gramSabha: "Chingai Council",
    type: "individual",
    status: "pending",
    areaHa: 4.20,
    daysPending: 270,
    coordinates: [25.28, 94.48],
    svgCoords: [748, 468],
    isAnomaly: false
  },
  // Lakshadweep Authentic Claims
  {
    id: "FRA-LD-001",
    stateId: "INLD",
    stateName: "Lakshadweep",
    districtName: "Lakshadweep",
    claimantName: "Sayed Mohammed Koya",
    tribe: "Koya (ST)",
    gramSabha: "Kavaratti Island Dweep Panchayat",
    type: "individual",
    status: "approved",
    areaHa: 3.20,
    daysPending: 150,
    coordinates: [10.566, 72.641],
    svgCoords: [233, 912],
    isAnomaly: false
  },
  {
    id: "FRA-LD-002",
    stateId: "INLD",
    stateName: "Lakshadweep",
    districtName: "Lakshadweep",
    claimantName: "Agatti Island Traditional Coconut Cooperative",
    tribe: "Malmi (ST)",
    gramSabha: "Agatti Dweep Panchayat",
    type: "community",
    status: "pending",
    areaHa: 8.50,
    daysPending: 240,
    coordinates: [10.853, 72.190],
    svgCoords: [230, 910],
    isAnomaly: false
  },
  {
    id: "FRA-LD-003",
    stateId: "INLD",
    stateName: "Lakshadweep",
    districtName: "Lakshadweep",
    claimantName: "Minicoy Customary Village Council",
    tribe: "Mahls (ST)",
    gramSabha: "Minicoy Atholhu Council",
    type: "community",
    status: "delayed",
    areaHa: 5.10,
    daysPending: 420,
    coordinates: [8.283, 73.048],
    svgCoords: [235, 930],
    isAnomaly: true,
    anomaly_type: "BOUNDARY_DISPUTE",
    anomaly_tags: ["High Risk", "Customary Boundary Overlap"]
  },
  {
    id: "FRA-LD-004",
    stateId: "INLD",
    stateName: "Lakshadweep",
    districtName: "Lakshadweep",
    claimantName: "Hamza Melacheri",
    tribe: "Melacheri (ST)",
    gramSabha: "Andrott Island Council",
    type: "individual",
    status: "approved",
    areaHa: 4.40,
    daysPending: 170,
    coordinates: [10.817, 73.680],
    svgCoords: [237, 911],
    isAnomaly: false
  },
  {
    id: "FRA-MP-001",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Mandla",
    claimantName: "Budhram Maravi",
    tribe: "Gond",
    gramSabha: "Bichhiya",
    type: "individual",
    status: "delayed",
    areaHa: 2.45,
    daysPending: 1240,
    coordinates: [22.48, 80.52],
    svgCoords: [390, 500],
    delayReason: "Pending SDLC physical verification for 41 months.",
    isAnomaly: true
  },
  {
    id: "FRA-MP-002",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Dindori",
    claimantName: "Mohgaon Baiga CFR Collective",
    tribe: "Baiga (PVTG)",
    gramSabha: "Mohgaon Forest Village",
    type: "community",
    status: "delayed",
    areaHa: 165.20,
    daysPending: 1140,
    coordinates: [22.65, 80.60],
    svgCoords: [415, 490],
    delayReason: "Overlap with Joint Forest Management (JFM) plantation.",
    isAnomaly: true
  },
  {
    id: "FRA-OD-001",
    stateId: "INOR",
    stateName: "Odisha",
    districtName: "Mayurbhanj",
    claimantName: "Similipal Santhal CFR Committee",
    tribe: "Santhal",
    gramSabha: "Gudgudia Gram Sabha",
    type: "community",
    status: "approved",
    areaHa: 340.00,
    daysPending: 180,
    coordinates: [21.85, 86.35],
    svgCoords: [575, 540],
    isAnomaly: false
  },
  {
    id: "FRA-OD-002",
    stateId: "INOR",
    stateName: "Odisha",
    districtName: "Kandhamal",
    claimantName: "Bikram Kondh",
    tribe: "Kondh",
    gramSabha: "Baliguda Rural",
    type: "individual",
    status: "approved",
    areaHa: 2.20,
    daysPending: 210,
    coordinates: [20.20, 83.85],
    svgCoords: [540, 570],
    isAnomaly: false
  },
  {
    id: "FRA-CG-001",
    stateId: "INCT",
    stateName: "Chhattisgarh",
    districtName: "Bastar",
    claimantName: "Muria Tribal Village Council",
    tribe: "Muria",
    gramSabha: "Chitrakote Forest Area",
    type: "community",
    status: "approved",
    areaHa: 210.00,
    daysPending: 240,
    coordinates: [19.20, 81.70],
    svgCoords: [475, 585],
    isAnomaly: false
  },
  {
    id: "FRA-CG-002",
    stateId: "INCT",
    stateName: "Chhattisgarh",
    districtName: "Dantewada",
    claimantName: "Lachhu Ram Kashyap",
    tribe: "Gond",
    gramSabha: "Geedam",
    type: "individual",
    status: "delayed",
    areaHa: 2.10,
    daysPending: 950,
    coordinates: [18.90, 81.35],
    svgCoords: [465, 620],
    delayReason: "Remote inaccessible block cadastral verification delay.",
    isAnomaly: true
  },
  {
    id: "FRA-MH-001",
    stateId: "INMH",
    stateName: "Maharashtra",
    districtName: "Gadchiroli",
    claimantName: "Mendha Lekha Gram Sabha",
    tribe: "Gond",
    gramSabha: "Mendha Lekha",
    type: "community",
    status: "approved",
    areaHa: 1800.00,
    daysPending: 150,
    coordinates: [20.18, 80.00],
    svgCoords: [390, 580],
    isAnomaly: false
  },
  {
    id: "FRA-MH-002",
    stateId: "INMH",
    stateName: "Maharashtra",
    districtName: "Palghar",
    claimantName: "Barku Kakde",
    tribe: "Warli",
    gramSabha: "Dahanu Forest Range",
    type: "individual",
    status: "delayed",
    areaHa: 1.40,
    daysPending: 1100,
    coordinates: [19.98, 72.85],
    svgCoords: [240, 560],
    delayReason: "High-speed corridor reservation conflict.",
    isAnomaly: true
  },
  {
    id: "FRA-JH-001",
    stateId: "INJH",
    stateName: "Jharkhand",
    districtName: "West Singhbhum",
    claimantName: "Saranda Ho Mahasabha",
    tribe: "Ho",
    gramSabha: "Manoharpur Forest",
    type: "community",
    status: "delayed",
    areaHa: 420.00,
    daysPending: 1350,
    coordinates: [22.35, 85.20],
    svgCoords: [545, 480],
    delayReason: "Mining lease reservation overlap unresolved for 4+ years.",
    isAnomaly: true
  },
  {
    id: "FRA-GJ-001",
    stateId: "INGJ",
    stateName: "Gujarat",
    districtName: "Dangs",
    claimantName: "Dangs Forest Rights Samiti",
    tribe: "Bhil & Kunbi",
    gramSabha: "Ahwa Central",
    type: "community",
    status: "delayed",
    areaHa: 190.00,
    daysPending: 1180,
    coordinates: [20.75, 73.68],
    svgCoords: [215, 520],
    delayReason: "Satellite imagery deemed inconclusive by DLC.",
    isAnomaly: true
  },
  {
    id: "FRA-AP-002",
    stateId: "INAP",
    stateName: "Andhra Pradesh",
    districtName: "Nandyal",
    claimantName: "Nallamala Chenchu Gudem",
    tribe: "Chenchu (PVTG)",
    gramSabha: "Atmakur Forest",
    type: "community",
    status: "delayed",
    areaHa: 520.00,
    daysPending: 1040,
    coordinates: [15.88, 78.80],
    svgCoords: [370, 740],
    delayReason: "Tiger Reserve core sanctuary clearance pending with NTCA.",
    isAnomaly: true
  },
  {
    id: "FRA-TS-001",
    stateId: "INTG",
    stateName: "Telangana",
    districtName: "Bhadradri Kothagudem",
    claimantName: "Ganga Bai Koya",
    tribe: "Koya",
    gramSabha: "Bhadrachalam Rural",
    type: "individual",
    status: "approved",
    areaHa: 2.80,
    daysPending: 210,
    coordinates: [17.67, 80.88],
    svgCoords: [390, 680],
    isAnomaly: false
  },
  {
    id: "FRA-RJ-001",
    stateId: "INRJ",
    stateName: "Rajasthan",
    districtName: "Baran",
    claimantName: "Sahariya Vikas Manch",
    tribe: "Sahariya (PVTG)",
    gramSabha: "Kishanganj",
    type: "community",
    status: "delayed",
    areaHa: 210.00,
    daysPending: 910,
    coordinates: [25.12, 76.60],
    svgCoords: [290, 410],
    delayReason: "Pastureland (Charagah) status discrepancy with forest records.",
    isAnomaly: true
  },
  {
    id: "FRA-KL-001",
    stateId: "INKL",
    stateName: "Kerala",
    districtName: "Wayanad",
    claimantName: "Chindan Kurumba",
    tribe: "Kurumba",
    gramSabha: "Muthanga Tribal Settlement",
    type: "individual",
    status: "approved",
    areaHa: 1.20,
    daysPending: 190,
    coordinates: [11.68, 76.13],
    svgCoords: [310, 840],
    isAnomaly: false
  },
  {
    id: "FRA-AS-001",
    stateId: "INAS",
    stateName: "Assam",
    districtName: "Karbi Anglong",
    claimantName: "Karbi Forest Rights Committee",
    tribe: "Karbi",
    gramSabha: "Diphu Outer",
    type: "community",
    status: "delayed",
    areaHa: 260.00,
    daysPending: 1250,
    coordinates: [25.85, 93.42],
    svgCoords: [760, 395],
    delayReason: "Jurisdictional dispute between Autonomous Council and Forest Dept.",
    isAnomaly: true
  },
  // --- UTTARAKHAND (INUT) ---
  {
    id: "FRA-UT-001",
    stateId: "INUT",
    stateName: "Uttarakhand",
    districtName: "Chamoli",
    claimantName: "Nanda Devi Bhotia CFR Committee",
    tribe: "Bhotia",
    gramSabha: "Joshimath High-Altitude Range",
    type: "community",
    status: "approved",
    areaHa: 450.0,
    daysPending: 160,
    coordinates: [30.55, 79.56],
    svgCoords: [415, 260],
    isAnomaly: false
  },
  {
    id: "FRA-UT-002",
    stateId: "INUT",
    stateName: "Uttarakhand",
    districtName: "Uttarkashi",
    claimantName: "Van Gujjar Pastoralist Collective",
    tribe: "Van Gujjar",
    gramSabha: "Govind Pashu Vihar Buffer",
    type: "community",
    status: "delayed",
    areaHa: 380.0,
    daysPending: 1220,
    coordinates: [30.73, 78.44],
    svgCoords: [395, 250],
    delayReason: "Sanctuary buffer grazing tenure contested by Forest Dept.",
    vegetation_loss_index: 0.08,
    anomaly_tags: ["PASTORAL_RIGHTS_HALT"],
    isAnomaly: true
  },
  {
    id: "FRA-UT-003",
    stateId: "INUT",
    stateName: "Uttarakhand",
    districtName: "Dehradun",
    claimantName: "Jaunsari Gram Panchayat",
    tribe: "Jaunsari",
    gramSabha: "Chakrata Forest Block",
    type: "individual",
    status: "approved",
    areaHa: 1.8,
    daysPending: 140,
    coordinates: [30.58, 77.85],
    svgCoords: [380, 260],
    isAnomaly: false
  },
  {
    id: "FRA-UT-004",
    stateId: "INUT",
    stateName: "Uttarakhand",
    districtName: "Pauri Garhwal",
    claimantName: "Kalu Ram Buksa",
    tribe: "Buksa",
    gramSabha: "Kotdwar Foothill FRC",
    type: "individual",
    status: "pending",
    daysPending: 310,
    coordinates: [29.80, 78.85],
    svgCoords: [410, 280],
    vegetation_loss_index: 0.04,
    anomaly_tags: ["SDLC_QUEUE_DELAY"],
    isAnomaly: true
  },

  // --- HIMACHAL PRADESH (INHP) ---
  {
    id: "FRA-HP-001",
    stateId: "INHP",
    stateName: "Himachal Pradesh",
    districtName: "Kinnaur",
    claimantName: "Kalpa Forest Rights Collective",
    tribe: "Kinnaura",
    gramSabha: "Reckong Peo FRC",
    type: "community",
    status: "approved",
    areaHa: 280.0,
    daysPending: 175,
    coordinates: [31.53, 78.25],
    svgCoords: [370, 220],
    isAnomaly: false
  },
  {
    id: "FRA-HP-002",
    stateId: "INHP",
    stateName: "Himachal Pradesh",
    districtName: "Chamba",
    claimantName: "Gaddi Shepherd Union",
    tribe: "Gaddi",
    gramSabha: "Bharmour Alpine Meadow",
    type: "community",
    status: "delayed",
    areaHa: 610.0,
    daysPending: 1150,
    coordinates: [32.55, 76.12],
    svgCoords: [340, 180],
    delayReason: "High-altitude pastureland rights stuck at DLC verification.",
    isAnomaly: true
  },

  // --- KARNATAKA (INKA) ---
  {
    id: "FRA-KA-001",
    stateId: "INKA",
    stateName: "Karnataka",
    districtName: "Chamarajanagar",
    claimantName: "BR Hills Soliga CFR Collective",
    tribe: "Soliga",
    gramSabha: "Biligiriranga Hills FRC",
    type: "community",
    status: "approved",
    areaHa: 520.0,
    daysPending: 130,
    coordinates: [11.92, 77.13],
    svgCoords: [355, 810],
    isAnomaly: false
  },
  {
    id: "FRA-KA-002",
    stateId: "INKA",
    stateName: "Karnataka",
    districtName: "Kodagu",
    claimantName: "Jenu Kuruba Tribal Samiti",
    tribe: "Jenu Kuruba (PVTG)",
    gramSabha: "Nagarhole Buffer Zone",
    type: "individual",
    status: "delayed",
    areaHa: 2.1,
    daysPending: 990,
    coordinates: [12.05, 76.15],
    svgCoords: [335, 800],
    delayReason: "National Park critical tiger habitat overlap dispute.",
    isAnomaly: true
  },

  // --- TAMIL NADU (INTN) ---
  {
    id: "FRA-TN-001",
    stateId: "INTN",
    stateName: "Tamil Nadu",
    districtName: "Nilgiris",
    claimantName: "Toda & Kota CFR Collective",
    tribe: "Toda (PVTG)",
    gramSabha: "Ooty Shola Forest FRC",
    type: "community",
    status: "approved",
    areaHa: 340.0,
    daysPending: 195,
    coordinates: [11.41, 76.70],
    svgCoords: [345, 845],
    isAnomaly: false
  },
  {
    id: "FRA-TN-002",
    stateId: "INTN",
    stateName: "Tamil Nadu",
    districtName: "Erode",
    claimantName: "Sathyamangalam Sholaga Sabha",
    tribe: "Sholaga",
    gramSabha: "Thalavadi Forest Range",
    type: "community",
    status: "delayed",
    areaHa: 410.0,
    daysPending: 1080,
    coordinates: [11.52, 77.25],
    svgCoords: [365, 850],
    delayReason: "Sanctuary boundary demarcation pending SDLC joint inspection.",
    isAnomaly: true
  },

  // --- KERALA (INKL) ---
  {
    id: "FRA-KL-002",
    stateId: "INKL",
    stateName: "Kerala",
    districtName: "Idukki",
    claimantName: "Muthuvan Tribal Sabha",
    tribe: "Muthuvan",
    gramSabha: "Anamudi Shola Buffer",
    type: "community",
    status: "approved",
    areaHa: 190.0,
    daysPending: 160,
    coordinates: [10.15, 77.05],
    svgCoords: [340, 895],
    isAnomaly: false
  },

  // --- ANDHRA PRADESH (INAP) ---
  {
    id: "FRA-AP-001",
    stateId: "INAP",
    stateName: "Andhra Pradesh",
    districtName: "Alluri Sitharama Raju",
    claimantName: "Paderu Konda Reddi FRC",
    tribe: "Konda Reddi (PVTG)",
    gramSabha: "Araku Valley Forest",
    type: "community",
    status: "approved",
    areaHa: 480.0,
    daysPending: 170,
    coordinates: [18.08, 82.66],
    svgCoords: [510, 680],
    isAnomaly: false
  },

  // --- TELANGANA (INTG) ---
  {
    id: "FRA-TG-002",
    stateId: "INTG",
    stateName: "Telangana",
    districtName: "Adilabad",
    claimantName: "Utnoor Gond Durbar Council",
    tribe: "Gond",
    gramSabha: "Indervelly Forest Area",
    type: "community",
    status: "delayed",
    areaHa: 360.0,
    daysPending: 980,
    coordinates: [19.36, 78.78],
    svgCoords: [415, 630],
    delayReason: "Podu cultivation claim under inter-departmental verification.",
    isAnomaly: true
  },

  // --- GUJARAT (INGJ) ---
  {
    id: "FRA-GJ-002",
    stateId: "INGJ",
    stateName: "Gujarat",
    districtName: "Narmada",
    claimantName: "Kevadia Tribal FRC",
    tribe: "Bhil & Tadvi",
    gramSabha: "Shoolpaneshwar Wildlife Sanctuary Range",
    type: "community",
    status: "delayed",
    areaHa: 310.0,
    daysPending: 1050,
    coordinates: [21.87, 73.50],
    svgCoords: [220, 500],
    delayReason: "Tourism project corridor overlap.",
    isAnomaly: true
  },

  // --- RAJASTHAN (INRJ) ---
  {
    id: "FRA-RJ-002",
    stateId: "INRJ",
    stateName: "Rajasthan",
    districtName: "Udaipur",
    claimantName: "Kotra Bhil Adhikar Manch",
    tribe: "Bhil",
    gramSabha: "Phulwari ki Nal Buffer",
    type: "community",
    status: "approved",
    areaHa: 270.0,
    daysPending: 220,
    coordinates: [24.36, 73.18],
    svgCoords: [240, 420],
    isAnomaly: false
  },

  // --- MADHYA PRADESH (INMP) AUTHENTIC STATE-WIDE CLAIMS ---
  {
    id: "FRA-MP-001",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Gwalior",
    claimantName: "Ramkishan Sahariya",
    tribe: "Sahariya (PVTG)",
    type: "individual",
    status: "pending",
    areaHa: 2.8,
    daysPending: 420,
    coordinates: [26.22, 78.18],
    isAnomaly: false
  },
  {
    id: "FRA-MP-002",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Gwalior",
    claimantName: "Gwalior Fort Range Sahariya Sabha",
    tribe: "Sahariya (PVTG)",
    type: "community",
    status: "approved",
    areaHa: 44,
    daysPending: 180,
    coordinates: [26.05, 78.02],
    isAnomaly: false
  },
  {
    id: "FRA-MP-003",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Shivpuri",
    claimantName: "Madhav National Park Buffer FRC",
    tribe: "Sahariya (PVTG)",
    type: "community",
    status: "delayed",
    areaHa: 120,
    daysPending: 910,
    coordinates: [25.43, 77.65],
    isAnomaly: true,
    anomalyReason: "Buffer zone boundary verification pending with Wildlife Board."
  },
  {
    id: "FRA-MP-004",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Shivpuri",
    claimantName: "Kalyan Singh Adivasi",
    tribe: "Sahariya (PVTG)",
    type: "individual",
    status: "approved",
    areaHa: 3.1,
    daysPending: 190,
    coordinates: [25.25, 77.75],
    isAnomaly: false
  },
  {
    id: "FRA-MP-005",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Shivpuri",
    claimantName: "Karera Sanctuary Fringe Sabha",
    tribe: "Sahariya (PVTG)",
    type: "community",
    status: "pending",
    areaHa: 68,
    daysPending: 380,
    coordinates: [25.65, 77.92],
    isAnomaly: false
  },
  {
    id: "FRA-MP-006",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Sheopur",
    claimantName: "Kuno Wildlife Corridor CFR",
    tribe: "Sahariya (PVTG)",
    type: "community",
    status: "delayed",
    areaHa: 340,
    daysPending: 1040,
    coordinates: [25.67, 76.7],
    isAnomaly: true,
    anomalyReason: "Cheetah habitat perimeter demarcation issue."
  },
  {
    id: "FRA-MP-007",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Morena",
    claimantName: "Chambal Ravines Tribal Sabha",
    tribe: "Sahariya (PVTG)",
    type: "community",
    status: "pending",
    areaHa: 52,
    daysPending: 460,
    coordinates: [26.5, 78],
    isAnomaly: false
  },
  {
    id: "FRA-MP-008",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Bhind",
    claimantName: "Bhind Adivasi Vikas Samiti",
    tribe: "Sahariya (PVTG)",
    type: "individual",
    status: "approved",
    areaHa: 4.5,
    daysPending: 160,
    coordinates: [26.15, 78.45],
    isAnomaly: false
  },
  {
    id: "FRA-MP-009",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Guna",
    claimantName: "Raghogarh Forest Dweller Group",
    tribe: "Bhil",
    type: "individual",
    status: "pending",
    areaHa: 2.9,
    daysPending: 340,
    coordinates: [24.65, 77.31],
    isAnomaly: false
  },
  {
    id: "FRA-MP-010",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Guna",
    claimantName: "Guna South Range CFR",
    tribe: "Sahariya (PVTG)",
    type: "community",
    status: "approved",
    areaHa: 85,
    daysPending: 210,
    coordinates: [24.5, 77.1],
    isAnomaly: false
  },
  {
    id: "FRA-MP-011",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Ashoknagar",
    claimantName: "Chanderi Weaver & Forest Collective",
    tribe: "Bhil",
    type: "community",
    status: "approved",
    areaHa: 38,
    daysPending: 175,
    coordinates: [24.58, 77.72],
    isAnomaly: false
  },
  {
    id: "FRA-MP-012",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Mandsaur",
    claimantName: "Gandhi Sagar Buffer Council",
    tribe: "Bhil",
    type: "community",
    status: "pending",
    areaHa: 76,
    daysPending: 490,
    coordinates: [24.07, 75.07],
    isAnomaly: false
  },
  {
    id: "FRA-MP-013",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Mandsaur",
    claimantName: "Bhanpura Tribal Gram Sabha",
    tribe: "Bhil",
    type: "community",
    status: "delayed",
    areaHa: 95,
    daysPending: 820,
    coordinates: [24.25, 75.35],
    isAnomaly: true,
    anomalyReason: "Water reservoir submergence line survey pending."
  },
  {
    id: "FRA-MP-014",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Neemuch",
    claimantName: "Javad Forest Range FRC",
    tribe: "Bhil",
    type: "individual",
    status: "approved",
    areaHa: 3.4,
    daysPending: 195,
    coordinates: [24.46, 74.87],
    isAnomaly: false
  },
  {
    id: "FRA-MP-015",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Ratlam",
    claimantName: "Sailana Cactus Sanctuary Buffer",
    tribe: "Bhil",
    type: "individual",
    status: "pending",
    areaHa: 2.2,
    daysPending: 360,
    coordinates: [23.33, 75.03],
    isAnomaly: false
  },
  {
    id: "FRA-MP-016",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Ratlam",
    claimantName: "Bajna Bhil Community Collective",
    tribe: "Bhil",
    type: "community",
    status: "approved",
    areaHa: 110,
    daysPending: 220,
    coordinates: [23.45, 74.95],
    isAnomaly: false
  },
  {
    id: "FRA-MP-017",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Ratlam",
    claimantName: "Ratlam Western Range FRC",
    tribe: "Bhil",
    type: "individual",
    status: "rejected",
    areaHa: 1.8,
    daysPending: 540,
    coordinates: [23.55, 75.12],
    isAnomaly: true,
    anomalyReason: "Non-forest land records discrepancy at SDLC."
  },
  {
    id: "FRA-MP-018",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Jhabua",
    claimantName: "Petlawad Bhil Gram Sabha",
    tribe: "Bhil",
    type: "community",
    status: "approved",
    areaHa: 135,
    daysPending: 180,
    coordinates: [22.9, 74.6],
    isAnomaly: false
  },
  {
    id: "FRA-MP-019",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Jhabua",
    claimantName: "Thandla Customary Forest Council",
    tribe: "Bhil",
    type: "individual",
    status: "pending",
    areaHa: 4.2,
    daysPending: 310,
    coordinates: [23.02, 74.55],
    isAnomaly: false
  },
  {
    id: "FRA-MP-020",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Alirajpur",
    claimantName: "Kathiwada CFR Adhikar Samiti",
    tribe: "Bhilala",
    type: "community",
    status: "approved",
    areaHa: 210,
    daysPending: 170,
    coordinates: [22.3, 74.35],
    isAnomaly: false
  },
  {
    id: "FRA-MP-021",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Alirajpur",
    claimantName: "Sondwa Narmada Fringe Sabha",
    tribe: "Bhilala",
    type: "community",
    status: "delayed",
    areaHa: 65,
    daysPending: 870,
    coordinates: [22.18, 74.45],
    isAnomaly: true,
    anomalyReason: "Backwater reservoir relocation boundary friction."
  },
  {
    id: "FRA-MP-022",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Barwani",
    claimantName: "Pati Satpura Range Collective",
    tribe: "Barela",
    type: "community",
    status: "approved",
    areaHa: 160,
    daysPending: 200,
    coordinates: [22.15, 74.9],
    isAnomaly: false
  },
  {
    id: "FRA-MP-023",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Barwani",
    claimantName: "Sendhwa Border Forest Council",
    tribe: "Bhil",
    type: "individual",
    status: "pending",
    areaHa: 3.6,
    daysPending: 420,
    coordinates: [21.95, 75.1],
    isAnomaly: false
  },
  {
    id: "FRA-MP-024",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Ujjain",
    claimantName: "Mahakal Van Kshetra Samiti",
    tribe: "Bhil",
    type: "community",
    status: "approved",
    areaHa: 45,
    daysPending: 165,
    coordinates: [23.18, 75.77],
    isAnomaly: false
  },
  {
    id: "FRA-MP-025",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Ujjain",
    claimantName: "Tarana Forest Fringe Sabha",
    tribe: "Bhil",
    type: "individual",
    status: "pending",
    areaHa: 2.7,
    daysPending: 330,
    coordinates: [23.05, 75.65],
    isAnomaly: false
  },
  {
    id: "FRA-MP-026",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Indore",
    claimantName: "Choral Valley Tribal Group",
    tribe: "Bhil",
    type: "community",
    status: "approved",
    areaHa: 58,
    daysPending: 190,
    coordinates: [22.72, 75.86],
    isAnomaly: false
  },
  {
    id: "FRA-MP-027",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Indore",
    claimantName: "Mhow Military Range Buffer FRC",
    tribe: "Bhil",
    type: "individual",
    status: "pending",
    areaHa: 3.1,
    daysPending: 410,
    coordinates: [22.58, 75.75],
    isAnomaly: false
  },
  {
    id: "FRA-MP-028",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Dewas",
    claimantName: "Bagli Teak Forest Collective",
    tribe: "Korku",
    type: "community",
    status: "approved",
    areaHa: 92,
    daysPending: 210,
    coordinates: [22.96, 76.06],
    isAnomaly: false
  },
  {
    id: "FRA-MP-029",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Dewas",
    claimantName: "Kannod Customary Range Sabha",
    tribe: "Gond",
    type: "community",
    status: "delayed",
    areaHa: 140,
    daysPending: 780,
    coordinates: [22.65, 76.4],
    isAnomaly: true,
    anomalyReason: "Commercial timber coupe demarcation dispute."
  },
  {
    id: "FRA-MP-030",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Dhar",
    claimantName: "Mandu Historical Forest FRC",
    tribe: "Bhilala",
    type: "community",
    status: "approved",
    areaHa: 75,
    daysPending: 190,
    coordinates: [22.6, 75.3],
    isAnomaly: false
  },
  {
    id: "FRA-MP-031",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Dhar",
    claimantName: "Kukshi Narmada Basin Council",
    tribe: "Bhil",
    type: "individual",
    status: "pending",
    areaHa: 4.8,
    daysPending: 350,
    coordinates: [22.2, 74.75],
    isAnomaly: false
  },
  {
    id: "FRA-MP-032",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Bhopal",
    claimantName: "Kerwa Catchment Tribal Collective",
    tribe: "Gond",
    type: "community",
    status: "approved",
    areaHa: 36,
    daysPending: 150,
    coordinates: [23.25, 77.41],
    isAnomaly: false
  },
  {
    id: "FRA-MP-033",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Bhopal",
    claimantName: "Kolar Dam Buffer Sabha",
    tribe: "Gond",
    type: "community",
    status: "approved",
    areaHa: 28,
    daysPending: 170,
    coordinates: [23.35, 77.3],
    isAnomaly: false
  },
  {
    id: "FRA-MP-034",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Sehore",
    claimantName: "Budhni Narmada Riverine Forest",
    tribe: "Gond",
    type: "community",
    status: "approved",
    areaHa: 82,
    daysPending: 220,
    coordinates: [23.2, 77.08],
    isAnomaly: false
  },
  {
    id: "FRA-MP-035",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Raisen",
    claimantName: "Ratapani Sanctuary Buffer Sabha",
    tribe: "Gond",
    type: "community",
    status: "delayed",
    areaHa: 220,
    daysPending: 940,
    coordinates: [23.33, 77.78],
    isAnomaly: true,
    anomalyReason: "Sanctuary tiger corridor upgrade pendency."
  },
  {
    id: "FRA-MP-036",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Vidisha",
    claimantName: "Udayagiri Foothill Forest FRC",
    tribe: "Sahariya (PVTG)",
    type: "individual",
    status: "approved",
    areaHa: 34,
    daysPending: 190,
    coordinates: [23.53, 77.81],
    isAnomaly: false
  },
  {
    id: "FRA-MP-037",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Sagar",
    claimantName: "Nauradehi Wildlife Sanctuary CFR",
    tribe: "Gond",
    type: "community",
    status: "approved",
    areaHa: 310,
    daysPending: 230,
    coordinates: [23.83, 78.74],
    isAnomaly: false
  },
  {
    id: "FRA-MP-038",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Damoh",
    claimantName: "Singorgarh Fort Range Council",
    tribe: "Gond",
    type: "community",
    status: "pending",
    areaHa: 64,
    daysPending: 430,
    coordinates: [24.08, 79.2],
    isAnomaly: false
  },
  {
    id: "FRA-MP-039",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Chhatarpur",
    claimantName: "Ken River Basin Tribal Collective",
    tribe: "Kondar",
    type: "community",
    status: "pending",
    areaHa: 72,
    daysPending: 480,
    coordinates: [24.91, 79.58],
    isAnomaly: false
  },
  {
    id: "FRA-MP-040",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Chhatarpur",
    claimantName: "Bada Malhera Forest FRC",
    tribe: "Saur",
    type: "community",
    status: "approved",
    areaHa: 48,
    daysPending: 180,
    coordinates: [24.75, 79.4],
    isAnomaly: false
  },
  {
    id: "FRA-MP-041",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Tikamgarh",
    claimantName: "Orchha Teak Forest Gram Sabha",
    tribe: "Saur",
    type: "community",
    status: "approved",
    areaHa: 55,
    daysPending: 200,
    coordinates: [24.74, 78.83],
    isAnomaly: false
  },
  {
    id: "FRA-MP-042",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Panna",
    claimantName: "Panna Tiger Reserve Buffer Council",
    tribe: "Gond",
    type: "community",
    status: "delayed",
    areaHa: 260,
    daysPending: 1120,
    coordinates: [24.72, 80.19],
    isAnomaly: true,
    anomalyReason: "Ken-Betwa river link submergence overlap."
  },
  {
    id: "FRA-MP-043",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Rewa",
    claimantName: "Govindgarh Lake Forest FRC",
    tribe: "Kol",
    type: "community",
    status: "approved",
    areaHa: 62,
    daysPending: 175,
    coordinates: [24.53, 81.3],
    isAnomaly: false
  },
  {
    id: "FRA-MP-044",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Rewa",
    claimantName: "Teonthar Plateau Kol Sabha",
    tribe: "Kol",
    type: "community",
    status: "approved",
    areaHa: 88,
    daysPending: 210,
    coordinates: [24.6, 81.15],
    isAnomaly: false
  },
  {
    id: "FRA-MP-045",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Satna",
    claimantName: "Chitrakoot Border Sacred Grove",
    tribe: "Kol",
    type: "community",
    status: "approved",
    areaHa: 105,
    daysPending: 190,
    coordinates: [24.58, 80.83],
    isAnomaly: false
  },
  {
    id: "FRA-MP-046",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Sidhi",
    claimantName: "Sanjay Dubri Tiger Reserve Buffer",
    tribe: "Baiga (PVTG)",
    type: "community",
    status: "delayed",
    areaHa: 180,
    daysPending: 860,
    coordinates: [24.42, 81.88],
    isAnomaly: true,
    anomalyReason: "Core-buffer demarcation contested."
  },
  {
    id: "FRA-MP-047",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Singrauli",
    claimantName: "Deosar Sal Forest Collective",
    tribe: "Gond",
    type: "community",
    status: "approved",
    areaHa: 145,
    daysPending: 240,
    coordinates: [24.2, 82.66],
    isAnomaly: false
  },
  {
    id: "FRA-MP-048",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Jabalpur",
    claimantName: "Bhedaghat Marble Rocks Buffer FRC",
    tribe: "Gond",
    type: "community",
    status: "approved",
    areaHa: 52,
    daysPending: 185,
    coordinates: [23.18, 79.95],
    isAnomaly: false
  },
  {
    id: "FRA-MP-049",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Jabalpur",
    claimantName: "Bargi Dam Resettlement Forest Sabha",
    tribe: "Gond",
    type: "community",
    status: "approved",
    areaHa: 115,
    daysPending: 220,
    coordinates: [23.25, 80.05],
    isAnomaly: false
  },
  {
    id: "FRA-MP-050",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Katni",
    claimantName: "Murwara Forest Dweller Samiti",
    tribe: "Kol",
    type: "individual",
    status: "pending",
    areaHa: 3.8,
    daysPending: 390,
    coordinates: [23.83, 80.4],
    isAnomaly: false
  },
  {
    id: "FRA-MP-051",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Narsinghpur",
    claimantName: "Gotegaon Narmada Basin Sabha",
    tribe: "Gond",
    type: "community",
    status: "approved",
    areaHa: 65,
    daysPending: 195,
    coordinates: [22.95, 79.2],
    isAnomaly: false
  },
  {
    id: "FRA-MP-052",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Narmadapuram",
    claimantName: "Satpura Tiger Reserve Buffer Collective",
    tribe: "Korku",
    type: "community",
    status: "pending",
    areaHa: 98,
    daysPending: 470,
    coordinates: [22.75, 77.72],
    isAnomaly: false
  },
  {
    id: "FRA-MP-053",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Narmadapuram",
    claimantName: "Pachmarhi Biosphere Reserve Council",
    tribe: "Korku & Gond",
    type: "community",
    status: "approved",
    areaHa: 280,
    daysPending: 230,
    coordinates: [22.46, 78.43],
    isAnomaly: false
  },
  {
    id: "FRA-MP-054",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Harda",
    claimantName: "Timarni Korku Adhikar Sabha",
    tribe: "Korku",
    type: "community",
    status: "approved",
    areaHa: 74,
    daysPending: 200,
    coordinates: [22.33, 77.1],
    isAnomaly: false
  },
  {
    id: "FRA-MP-055",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Khandwa",
    claimantName: "Omkareshwar Island Forest FRC",
    tribe: "Bhil",
    type: "individual",
    status: "pending",
    areaHa: 4.1,
    daysPending: 370,
    coordinates: [21.82, 76.35],
    isAnomaly: false
  },
  {
    id: "FRA-MP-056",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Khandwa",
    claimantName: "Punasa Indira Sagar Catchment",
    tribe: "Korku",
    type: "community",
    status: "approved",
    areaHa: 130,
    daysPending: 210,
    coordinates: [21.65, 76.45],
    isAnomaly: false
  },
  {
    id: "FRA-MP-057",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Burhanpur",
    claimantName: "Asirgarh Fort Hill Tribal Sabha",
    tribe: "Korku & Bhil",
    type: "individual",
    status: "rejected",
    areaHa: 2.5,
    daysPending: 610,
    coordinates: [21.31, 76.22],
    isAnomaly: true,
    anomalyReason: "Disputed revenue enclave boundary."
  },
  {
    id: "FRA-MP-058",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Burhanpur",
    claimantName: "Nepanagar Bamboo Forest Collective",
    tribe: "Korku",
    type: "community",
    status: "delayed",
    areaHa: 85,
    daysPending: 890,
    coordinates: [21.18, 76.2],
    isAnomaly: true,
    anomalyReason: "Paper mill concession lease dispute."
  },
  {
    id: "FRA-MP-059",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Khargone",
    claimantName: "Bhikangaon Customary Grazing Sabha",
    tribe: "Bhilala",
    type: "community",
    status: "approved",
    areaHa: 95,
    daysPending: 195,
    coordinates: [21.82, 75.61],
    isAnomaly: false
  },
  {
    id: "FRA-MP-060",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Chhindwara",
    claimantName: "Patalkot Bharia PVTG Collective",
    tribe: "Bharia (PVTG)",
    type: "community",
    status: "approved",
    areaHa: 420,
    daysPending: 170,
    coordinates: [22.25, 78.6],
    isAnomaly: false
  },
  {
    id: "FRA-MP-061",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Chhindwara",
    claimantName: "Tamia Satpura Teak Council",
    tribe: "Gond",
    type: "community",
    status: "pending",
    areaHa: 68,
    daysPending: 340,
    coordinates: [22.05, 78.93],
    isAnomaly: false
  },
  {
    id: "FRA-MP-062",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Chhindwara",
    claimantName: "Amarwara Forest Dweller Sabha",
    tribe: "Gond",
    type: "individual",
    status: "pending",
    areaHa: 3.4,
    daysPending: 390,
    coordinates: [21.88, 78.75],
    isAnomaly: false
  },
  {
    id: "FRA-MP-063",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Betul",
    claimantName: "Shahpur Korku Traditional Council",
    tribe: "Korku",
    type: "community",
    status: "approved",
    areaHa: 185,
    daysPending: 210,
    coordinates: [21.9, 77.9],
    isAnomaly: false
  },
  {
    id: "FRA-MP-064",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Betul",
    claimantName: "Bhainsdehi Tapti Riverine Forest",
    tribe: "Gond",
    type: "community",
    status: "approved",
    areaHa: 92,
    daysPending: 180,
    coordinates: [21.65, 77.8],
    isAnomaly: false
  },
  {
    id: "FRA-MP-065",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Seoni",
    claimantName: "Pench Tiger Reserve Buffer FRC",
    tribe: "Gond",
    type: "community",
    status: "approved",
    areaHa: 240,
    daysPending: 200,
    coordinates: [22.08, 79.55],
    isAnomaly: false
  },
  {
    id: "FRA-MP-066",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Seoni",
    claimantName: "Lakhnadon Sal Forest Collective",
    tribe: "Gond",
    type: "individual",
    status: "pending",
    areaHa: 4.6,
    daysPending: 360,
    coordinates: [21.85, 79.6],
    isAnomaly: false
  },
  {
    id: "FRA-MP-067",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Shahdol",
    claimantName: "Sohagpur Coal Belt Forest Sabha",
    tribe: "Kol & Gond",
    type: "community",
    status: "approved",
    areaHa: 110,
    daysPending: 190,
    coordinates: [23.28, 81.35],
    isAnomaly: false
  },
  {
    id: "FRA-MP-068",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Umaria",
    claimantName: "Bandhavgarh Buffer Tribal Council",
    tribe: "Baiga (PVTG)",
    type: "community",
    status: "delayed",
    areaHa: 190,
    daysPending: 970,
    coordinates: [23.52, 80.83],
    isAnomaly: true,
    anomalyReason: "Eco-sensitive zone restrictions under review."
  },
  {
    id: "FRA-MP-069",
    stateId: "INMP",
    stateName: "Madhya Pradesh",
    districtName: "Anuppur",
    claimantName: "Amarkantak Sacred Source Grove",
    tribe: "Gond & Baiga",
    type: "community",
    status: "approved",
    areaHa: 310,
    daysPending: 180,
    coordinates: [23.1, 81.68],
    isAnomaly: false
  },

  // --- ODISHA (INOR) ---
  {
    id: "FRA-OD-003",
    stateId: "INOR",
    stateName: "Odisha",
    districtName: "Rayagada",
    claimantName: "Niyamgiri Dongria Kondh Council",
    tribe: "Dongria Kondh (PVTG)",
    gramSabha: "Kurli Gram Sabha",
    type: "community",
    status: "approved",
    areaHa: 780.0,
    daysPending: 140,
    coordinates: [19.16, 83.41],
    svgCoords: [540, 620],
    isAnomaly: false
  },
  {
    id: "FRA-OD-004",
    stateId: "INOR",
    stateName: "Odisha",
    districtName: "Keonjhar",
    claimantName: "Juanga Pirha CFR Sabha",
    tribe: "Juanga (PVTG)",
    gramSabha: "Gonasika Forest Range",
    type: "community",
    status: "delayed",
    areaHa: 320.0,
    daysPending: 890,
    coordinates: [21.63, 85.58],
    svgCoords: [580, 520],
    delayReason: "Mining conveyor buffer overlap disputed with Revenue dept.",
    isAnomaly: true
  },

  // --- JHARKHAND (INJH) ---
  {
    id: "FRA-JH-002",
    stateId: "INJH",
    stateName: "Jharkhand",
    districtName: "Gumla",
    claimantName: "Bishunpur Oraon FRC",
    tribe: "Oraon",
    gramSabha: "Netarhat Foothills",
    type: "community",
    status: "approved",
    areaHa: 390.0,
    daysPending: 210,
    coordinates: [23.04, 84.54],
    svgCoords: [530, 470],
    isAnomaly: false
  },
  {
    id: "FRA-JH-003",
    stateId: "INJH",
    stateName: "Jharkhand",
    districtName: "Dumka",
    claimantName: "Santhal Pargana Forest Rights Collective",
    tribe: "Santhal",
    gramSabha: "Masanjore Forest Range",
    type: "individual",
    status: "delayed",
    areaHa: 2.3,
    daysPending: 1120,
    coordinates: [24.27, 87.25],
    svgCoords: [580, 440],
    delayReason: "Pradhani system land ownership record ambiguity.",
    isAnomaly: true
  },

  // --- WEST BENGAL (INWB) ---
  {
    id: "FRA-WB-001",
    stateId: "INWB",
    stateName: "West Bengal",
    districtName: "Alipurduar",
    claimantName: "Buxa Tiger Reserve Rava Council",
    tribe: "Rava / Toto",
    gramSabha: "Jayanti Forest Village",
    type: "community",
    status: "delayed",
    areaHa: 340.0,
    daysPending: 1310,
    coordinates: [26.49, 89.52],
    svgCoords: [680, 360],
    delayReason: "Tiger reserve relocation plan in conflict with Gram Sabha CFR.",
    isAnomaly: true
  },
  {
    id: "FRA-WB-002",
    stateId: "INWB",
    stateName: "West Bengal",
    districtName: "Paschim Medinipur",
    claimantName: "Junglemahal Santhal Council",
    tribe: "Santhal",
    gramSabha: "Jhargram Forest Circle",
    type: "individual",
    status: "approved",
    areaHa: 2.1,
    daysPending: 160,
    coordinates: [22.42, 87.32],
    svgCoords: [620, 520],
    isAnomaly: false
  },

  // --- TRIPURA (INTR) ---
  {
    id: "FRA-TR-001",
    stateId: "INTR",
    stateName: "Tripura",
    districtName: "Dhalai",
    claimantName: "Ambassa Reang CFR Committee",
    tribe: "Reang (PVTG)",
    gramSabha: "Ambassa Rural",
    type: "community",
    status: "approved",
    areaHa: 290.0,
    daysPending: 180,
    coordinates: [23.92, 91.85],
    svgCoords: [740, 480],
    isAnomaly: false
  },

  // --- ASSAM (INAS) ---
  {
    id: "FRA-AS-002",
    stateId: "INAS",
    stateName: "Assam",
    districtName: "Kokrajhar",
    claimantName: "Bodoland Tribal Forest Rights Forum",
    tribe: "Bodo",
    gramSabha: "Chirang Forest Range",
    type: "community",
    status: "approved",
    areaHa: 410.0,
    daysPending: 220,
    coordinates: [26.40, 90.27],
    svgCoords: [710, 370],
    isAnomaly: false
  }
];

export const MOCK_CLAIMS = RAW_MOCK_CLAIMS.map(c => {
  // If the claim doesn't have a polygon or has a crude 4-point box, generate an authentic irregular cadastral parcel
  const isCrudeBox = Array.isArray(c.plot_polygon) && c.plot_polygon.length <= 4;
  const polygon = (!c.plot_polygon || isCrudeBox) && c.coordinates
    ? generateCadastralPolygon(c.coordinates[0], c.coordinates[1], c.areaHa || c.area_ha || 2.0, c.id)
    : (c.plot_polygon || null);

  return {
    ...c,
    plot_polygon: polygon,
    plotPolygon: polygon
  };
});

export const INDIA_STATES_GEOJSON = {
  type: "FeatureCollection",
  features: (() => {
    const list = realIndiaStatesGeoJson.features.map(f => {
      const matchedState = ALL_INDIA_STATES.find(s => s.id === f.id || s.code === f.properties?.code);
      return {
        ...f,
        id: matchedState ? matchedState.id : f.id,
        properties: {
          ...(matchedState || {}),
          ...f.properties
        }
      };
    });

    // Ensure Lakshadweep (INLD) exists as a valid GeoJSON polygon feature for hover and interaction
    const hasLD = list.some(f => f.id === 'INLD' || f.properties?.code === 'LD');
    if (!hasLD) {
      const ldState = ALL_INDIA_STATES.find(s => s.id === 'INLD' || s.code === 'LD') || {
        id: 'INLD',
        code: 'LD',
        name: 'Lakshadweep',
        totalClaims: 340,
        delayedClaims: 18,
        anomalies: 2,
        districtsCount: 1,
        forestCoverKm2: '27 km²',
        tribalPopulationPct: '94.8%'
      };

      list.push({
        type: "Feature",
        id: "INLD",
        properties: {
          ...ldState,
          id: "INLD",
          code: "LD",
          name: "Lakshadweep"
        },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            // Kavaratti & surrounding atoll box
            [[[72.58, 10.51], [72.70, 10.51], [72.70, 10.63], [72.58, 10.63], [72.58, 10.51]]],
            // Agatti atoll box
            [[[72.15, 10.80], [72.24, 10.80], [72.24, 10.90], [72.15, 10.90], [72.15, 10.80]]],
            // Minicoy southern atoll box
            [[[72.98, 8.24], [73.10, 8.24], [73.10, 8.35], [72.98, 8.35], [72.98, 8.24]]]
          ]
        }
      });
    }

    return list;
  })()
};

export const INDIA_MASK_GEOJSON = indiaMaskGeoJson;
