# Groudon 🌋
### Next-Gen WebGIS Decision Support & Monitoring System

**Groudon** is an advanced, interactive geospatial intelligence dashboard and AI-driven decision support system designed for granular monitoring, anomaly detection, and spatial analysis across India.

---

## 🌟 Key Features

- **Interactive Pan-India Administrative Map**:
  - Full vector and satellite map of India with all 36 States and Union Territories.
  - Interactive state capsule badges and smooth auto-framing bounding box transitions.
  - **State Isolation View**: Dynamic world-mask ring isolating chosen states and administrative districts on demand with smooth return to full-country view.
  - Archipelago and Island territory support including Lakshadweep and Andaman & Nicobar.
- **Dynamic Multi-Theme System**:
  - Includes custom UI color schemes (Ember Glow, Midnight Forest, Obsidian Amber, Crimson Dusk, Cobalt Slate, etc.) with cinematic diamond/diagonal animated theme transitions.
- **AI Anomaly Detection Engine**:
  - High-precision tracking of pendency backlogs, administrative friction, and procedural bottlenecks.
  - Automated anomaly classification (Critical, High Delay, Procedural) with drill-down metrics.
  - Plain-English administrative summaries and actionable intervention recommendations for committee stakeholders.
- **High-Resolution Satellite Cartography**:
  - Esri World Imagery integration with clean satellite visuals and native zoom support up to level 19.
  - Detailed administrative district boundaries and cadastral plot monitoring.
- **Interactive Analytics & Progress Tracking**:
  - Comprehensive KPI metric cards for claims, approved titles, pending verifications, and anomaly ratios.
  - Real-time district-wise anomaly radar and status distribution feeds.
- **Claims Drill-down Feed**:
  - Searchable list of Individual Forest Rights (IFR) and Community Forest Rights (CFR) claims.
  - Color-coded status markers: 🟢 Approved, 🟡 Pending, 🔴 Delayed/Anomaly.

---

## 🛠️ Tech Stack

- **Frontend**: React 19 (Functional components, Hooks)
- **Bundler & Dev Server**: Vite
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Geospatial & Vector Mapping**: React-Leaflet, Leaflet, Custom SVG Vector Engine, `svg-path-bounds`
- **Charts & Visualization**: Recharts
- **Icons**: Lucide-React

---

## 🚀 Quick Start

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Kartikey-3005/WebGIS-FRA-Monitoring-System.git
   cd WebGIS-FRA-Monitoring-System
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Locally**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Production Build**:
   ```bash
   npm run build
   ```

---

## 🏛️ Governance Context

Built aligned with the **Forest Rights Act (FRA) 2006** guidelines issued by the **Ministry of Tribal Affairs (MoTA)**, Government of India, supporting transparent, spatial, and timely title distribution to Scheduled Tribes and Other Traditional Forest Dwellers (OTFD).
