# Groudon
### WebGIS Decision Support and Spatial Monitoring System

Groudon is a geospatial analytics dashboard and decision support system for tracking administrative records, processing workflows, and procedural anomalies across India.

---

## Features

- **Pan-India Administrative Cartography**:
  - Vector and satellite coverage across all 36 States and Union Territories.
  - Interactive state selection with bounding box framing.
  - State isolation mode with world-mask clipping and smooth pan-India reset.
  - Territory mapping covering island regions including Lakshadweep and Andaman & Nicobar.
- **Color Theme Configuration**:
  - Configurable palette themes (Ember Glow, Midnight Forest, Obsidian Amber, Crimson Dusk, Cobalt Slate) with animated visual transitions.
- **Anomaly Detection and Review**:
  - Tracks procedural delays, documentation backlogs, and committee verification bottlenecks.
  - Categorizes anomalies by severity level (Critical, High Delay, Procedural).
  - Provides summary reports and operational recommendations for administrative review.
- **Satellite and Vector Map Layers**:
  - High-resolution Esri World Imagery with multi-level scaling.
  - District administrative boundaries and parcel-level spatial overlays.
- **Operational Metrics**:
  - Key performance indicator cards for total submissions, approved titles, and pending verification cases.
  - Searchable claims table with status filtering and district-level breakdown.

---

## Technology Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, PostCSS
- **Mapping**: Leaflet, React-Leaflet, GeoJSON
- **Data Visualization**: Recharts
- **Icons**: Lucide-React

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Kartikey-3005/WebGIS-FRA-Monitoring-System.git
   cd WebGIS-FRA-Monitoring-System
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## Context

This project supports spatial monitoring workflows aligned with the statutory framework of the Forest Rights Act (FRA) 2006 under the Ministry of Tribal Affairs (MoTA), Government of India.
