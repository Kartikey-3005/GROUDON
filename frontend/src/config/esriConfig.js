// Esri World Imagery Configuration with ArcGIS API Key Support

export const DEFAULT_ESRI_KEY = import.meta.env.VITE_ESRI_API_KEY || "AAPK7d2d3a9437144bbfaef199e4b6eb35a6pU5sBwY04Zz4PzX2aC5Nqg0gK8jF3qL1mZ9";

export function getEsriImageryUrl(apiKey = DEFAULT_ESRI_KEY) {
  // Esri World Imagery high-resolution satellite tiles
  // Appends the token parameter if API key is provided
  if (apiKey && apiKey.trim() !== '') {
    return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}?token=${apiKey.trim()}`;
  }
  return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
}

export function getEsriReferenceUrl(apiKey = DEFAULT_ESRI_KEY) {
  // Esri World Boundaries and Places overlay for satellite
  if (apiKey && apiKey.trim() !== '') {
    return `https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}?token=${apiKey.trim()}`;
  }
  return 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}';
}

export const ESRI_ATTRIBUTION = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
