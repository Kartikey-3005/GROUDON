/**
 * Frontend Service to communicate with the FastAPI Gemini AI Backend
 * Base URL: http://localhost:8000
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Fetch GeoJSON FeatureCollection of the 3 district boundary polygons
 */
export async function fetchDistricts() {
  const res = await fetch(`${API_BASE_URL}/api/districts`);
  if (!res.ok) {
    throw new Error(`Failed to fetch districts: ${res.statusText}`);
  }
  return await res.json();
}

/**
 * Fetch GeoJSON FeatureCollection of claim points for a specific district
 */
export async function fetchClaimsByDistrict(districtId) {
  const res = await fetch(`${API_BASE_URL}/api/claims/${districtId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch claims for ${districtId}: ${res.statusText}`);
  }
  return await res.json();
}

/**
 * Trigger Gemini AI decision-support analysis for a district
 */
export async function analyzeDistrict(districtId) {
  const res = await fetch(`${API_BASE_URL}/api/analyze/${districtId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to analyze ${districtId}: ${res.statusText}`);
  }
  return await res.json();
}

export { API_BASE_URL };
