"""
AI-Powered Decision Support System for Forest Rights Act (FRA) Monitoring
Backend API - FastAPI + Gemini AI + Curated GeoJSON In-Memory Spatial Data
"""

import os
import json
from typing import Dict, Any, List, Optional
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables from .env files (.env in root or backend)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(BASE_DIR)

load_dotenv(os.path.join(ROOT_DIR, ".env"))
load_dotenv(os.path.join(BASE_DIR, ".env"))

# Configure Google Generative AI (Gemini)
try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ImportError:
    genai = None
    GEMINI_AVAILABLE = False

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")

if GEMINI_AVAILABLE and GEMINI_API_KEY:
    try:
        genai.configure(api_key=GEMINI_API_KEY)
        print("[OK] Google Generative AI configured with API key.")
    except Exception as e:
        print(f"[WARN] Error configuring Gemini with API key: {e}")
else:
    print("[INFO] GEMINI_API_KEY not found or google-generativeai not configured. High-precision fallback analyzer active.")

# =====================================================================
# INGEST CURATED ANOMALY DATASETS ON STARTUP
# =====================================================================

DATA_DIR = os.path.join(BASE_DIR, "data")
DISTRICTS_JSON_PATH = os.path.join(DATA_DIR, "districts.json")
CLAIMS_JSON_PATH = os.path.join(DATA_DIR, "claims.json")

# Ensure files exist; if not, trigger seed generation
if not os.path.exists(DISTRICTS_JSON_PATH) or not os.path.exists(CLAIMS_JSON_PATH):
    try:
        try:
            from backend.scripts.seed_anomalies import seed_anomaly_data
        except ImportError:
            from scripts.seed_anomalies import seed_anomaly_data
        seed_anomaly_data()
    except Exception as e:
        print(f"[WARN] Could not run seed_anomalies script automatically: {e}")

# Load in-memory datasets
LOADED_DISTRICTS_GEOJSON: Dict[str, Any] = {"type": "FeatureCollection", "features": []}
LOADED_CLAIMS_GEOJSON: Dict[str, Any] = {"type": "FeatureCollection", "features": []}

try:
    with open(DISTRICTS_JSON_PATH, "r", encoding="utf-8") as f:
        LOADED_DISTRICTS_GEOJSON = json.load(f)
    print(f"[OK] Ingested {len(LOADED_DISTRICTS_GEOJSON.get('features', []))} districts into memory.")
except Exception as e:
    print(f"[ERROR] Failed to load districts.json: {e}")

try:
    with open(CLAIMS_JSON_PATH, "r", encoding="utf-8") as f:
        LOADED_CLAIMS_GEOJSON = json.load(f)
    print(f"[OK] Ingested {len(LOADED_CLAIMS_GEOJSON.get('features', []))} claims into memory.")
except Exception as e:
    print(f"[ERROR] Failed to load claims.json: {e}")

# Build in-memory lookup index for fast retrieval
# Maps district_id -> feature & properties
DISTRICTS_INDEX: Dict[str, Dict[str, Any]] = {}
for feat in LOADED_DISTRICTS_GEOJSON.get("features", []):
    props = feat.get("properties", {})
    did = props.get("district_id", "").lower()
    if did:
        DISTRICTS_INDEX[did] = {
            "feature": feat,
            "properties": props,
            "geometry": feat.get("geometry", {})
        }

# Aliases for legacy/backward compatibility (DIST_001 -> dist_a, etc.)
ID_ALIASES: Dict[str, str] = {
    "dist_001": "dist_a",
    "dist_002": "dist_d",
    "dist_003": "dist_b",
    "dist_a": "dist_a",
    "dist_b": "dist_b",
    "dist_c": "dist_c",
    "dist_d": "dist_d",
}

def resolve_district_id(input_id: str) -> Optional[str]:
    """Resolves input district ID to canonical key (case-insensitive & alias-friendly)."""
    clean_id = input_id.strip().lower()
    if clean_id in DISTRICTS_INDEX:
        return clean_id
    if clean_id in ID_ALIASES:
        target = ID_ALIASES[clean_id]
        if target in DISTRICTS_INDEX:
            return target
    return None

# For backward compatibility exports
MOCK_DISTRICTS = {
    did: info["properties"]
    for did, info in DISTRICTS_INDEX.items()
}
MOCK_CLAIMS = [
    {
        **feat["properties"],
        "lon": feat["geometry"]["coordinates"][0],
        "lat": feat["geometry"]["coordinates"][1]
    }
    for feat in LOADED_CLAIMS_GEOJSON.get("features", [])
]


# =====================================================================
# FASTAPI APP INITIALIZATION & CORS SETUP
# =====================================================================

app = FastAPI(
    title="FRA Monitoring Decision Support System API",
    description="Targeted Anomaly Data Ingestion & Decision Support for Forest Rights Act (FRA) Monitoring.",
    version="2.0.0"
)

# Enable CORS for Frontend (Local dev, Vercel preview & production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================================================
# STATISTICAL CALCULATOR & AI EXECUTIVE BRIEFING ENGINE
# =====================================================================

def calculate_district_statistics(district_id: str, claims_features: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Computes exact statistical metrics from the claims layer:
    - pending ratio (%)
    - rejection ratio (%)
    - approved ratio (%)
    - max delay (days)
    - average delay (days)
    - average vegetation loss (%)
    """
    total = len(claims_features)
    if total == 0:
        return {
            "total_claims": 0,
            "pending_count": 0,
            "pending_ratio": 0.0,
            "pending_percentage": 0.0,
            "approved_count": 0,
            "approved_ratio": 0.0,
            "approved_percentage": 0.0,
            "rejected_count": 0,
            "rejection_ratio": 0.0,
            "rejected_percentage": 0.0,
            "max_delay_days": 0,
            "avg_days_pending": 0.0,
            "avg_vegetation_loss_index": 0.0,
            "avg_vegetation_loss_pct": 0.0,
            "community_claims": 0,
            "individual_claims": 0
        }

    props_list = [f.get("properties", {}) for f in claims_features]
    
    pending = [p for p in props_list if p.get("status") == "pending"]
    approved = [p for p in props_list if p.get("status") == "approved"]
    rejected = [p for p in props_list if p.get("status") == "rejected"]

    # Max and average delay for pending claims (or all claims if none pending)
    pending_days = [p.get("days_pending", 0) for p in pending]
    all_days = [p.get("days_pending", 0) for p in props_list]

    max_delay = max(pending_days) if pending_days else (max(all_days) if all_days else 0)
    avg_delay = (sum(pending_days) / len(pending_days)) if pending_days else (sum(all_days) / total)

    # Average vegetation loss across all claims in the district
    veg_losses = [p.get("vegetation_loss_index", 0.0) for p in props_list]
    avg_veg_index = (sum(veg_losses) / len(veg_losses)) if veg_losses else 0.0

    # For pending claims in conflict zones (like dist_c), compute specific pending veg loss
    pending_veg = [p.get("vegetation_loss_index", 0.0) for p in pending]
    avg_pending_veg_index = (sum(pending_veg) / len(pending_veg)) if pending_veg else avg_veg_index

    return {
        "total_claims": total,
        "pending_count": len(pending),
        "pending_ratio": round((len(pending) / total), 3),
        "pending_percentage": round((len(pending) / total) * 100, 1),
        "approved_count": len(approved),
        "approved_ratio": round((len(approved) / total), 3),
        "approved_percentage": round((len(approved) / total) * 100, 1),
        "rejected_count": len(rejected),
        "rejection_ratio": round((len(rejected) / total), 3),
        "rejected_percentage": round((len(rejected) / total) * 100, 1),
        "max_delay_days": int(max_delay),
        "avg_days_pending": round(avg_delay, 1),
        "avg_vegetation_loss_index": round(avg_veg_index, 3),
        "avg_vegetation_loss_pct": round(avg_veg_index * 100, 1),
        "avg_pending_vegetation_loss_pct": round(avg_pending_veg_index * 100, 1),
        "community_claims": len([p for p in props_list if p.get("claimant_type") == "Community"]),
        "individual_claims": len([p for p in props_list if p.get("claimant_type") == "Individual"])
    }


def generate_concise_briefing_fallback(
    district_name: str,
    anomaly_flag: str,
    stats: Dict[str, Any],
    district_props: Dict[str, Any]
) -> str:
    """
    High-fidelity deterministic 2-sentence executive briefing highlighting
    why this district was flagged and the exact metrics driving the alert.
    Guarantees instant, bulletproof evaluation and demo resilience.
    """
    if anomaly_flag == "HIGH_PENDING_DELAY":
        return (
            f"{district_name} is flagged for critical bureaucratic delays with a {stats['pending_percentage']}% "
            f"pending rate and a maximum wait time of {stats['max_delay_days']} days (averaging {stats['avg_days_pending']} days). "
            f"This administrative stagnation at the SDLC verification stage severely impacts tribal claimants awaiting statutory recognition."
        )
    elif anomaly_flag == "ABNORMAL_REJECTION_SPIKE":
        return (
            f"{district_name} is flagged for an acute rejection spike, recording an anomalous {stats['rejected_percentage']}% "
            f"rejection rate with claims summarily dismissed within an average turnaround of only {stats['avg_days_pending']} days. "
            f"This abnormal pattern points to systematic procedural bypasses and unrecorded Gram Sabha determinations requiring immediate audit."
        )
    elif anomaly_flag == "FOREST_COVER_LOSS_ON_CLAIM":
        veg_pct = district_props.get("vegetation_loss_pct", stats["avg_pending_vegetation_loss_pct"])
        return (
            f"{district_name} is flagged for severe land conflict and encroachment, exhibiting a {stats['pending_percentage']}% "
            f"pending rate overlaid with {veg_pct}% vegetation loss on pending Community Forest Resource claims. "
            f"Satellite-detected canopy degradation indicates illegal deforestation and tenure contestation that demand prompt inter-departmental enforcement."
        )
    else: # NORMAL / Control Benchmark
        return (
            f"{district_name} serves as a compliant benchmark district, maintaining a balanced {stats['pending_percentage']}% "
            f"pending rate, a {stats['approved_percentage']}% approval rate, and an efficient turnaround of {stats['avg_days_pending']} days. "
            f"Operational indicators reflect robust Gram Sabha and DLC coordination with negligible canopy disruption."
        )


def query_gemini_for_briefing(
    district_name: str,
    anomaly_flag: str,
    stats: Dict[str, Any],
    district_props: Dict[str, Any]
) -> tuple[str, str]:
    """
    Passes exact numerical evidence into Google Gemini API.
    Instructs Gemini to generate a concise, 2-sentence executive briefing.
    Returns (briefing_text, engine_name).
    """
    # 1. Check if Gemini is configured
    if not GEMINI_AVAILABLE or not GEMINI_API_KEY:
        fallback = generate_concise_briefing_fallback(district_name, anomaly_flag, stats, district_props)
        return fallback, "Internal Decision Support Engine (Offline Fallback)"

    # 2. Prepare structured prompt with exact numerical evidence
    prompt = (
        "You are a senior data analyst for the Ministry of Tribal Affairs monitoring Forest Rights Act (FRA) implementation.\n"
        f"District: {district_name}\n"
        f"Pre-calculated Anomaly Flag: {anomaly_flag}\n"
        f"Exact Numerical Evidence:\n"
        f"- Total Claims Sampled: {stats['total_claims']}\n"
        f"- Pending Rate: {stats['pending_percentage']}%\n"
        f"- Rejection Rate: {stats['rejected_percentage']}%\n"
        f"- Approval Rate: {stats['approved_percentage']}%\n"
        f"- Maximum Wait Time: {stats['max_delay_days']} days\n"
        f"- Average Processing / Wait Time: {stats['avg_days_pending']} days\n"
        f"- Vegetation Loss on Claims: {district_props.get('vegetation_loss_pct', stats['avg_pending_vegetation_loss_pct'])}%\n"
        f"- Community Forest Rights Claims: {stats['community_claims']}\n"
        f"- Individual Claims: {stats['individual_claims']}\n\n"
        "Instructions:\n"
        "Generate a concise, 2-sentence executive briefing highlighting why this district was flagged and the exact metrics driving the alert. "
        "Do NOT invent or hallucinate missing data. Stick strictly to the provided metrics. Exactly 2 sentences."
    )

    # 3. Call Gemini models
    candidate_models = ["gemini-1.5-flash", "gemini-2.5-flash", "gemini-pro"]
    for model_name in candidate_models:
        try:
            model = genai.GenerativeModel(model_name)
            response = model.generate_content(prompt)
            if response and response.text and len(response.text.strip()) > 20:
                return response.text.strip(), f"Gemini ({model_name})"
        except Exception as err:
            print(f"[WARN] Gemini model {model_name} attempt failed: {err}")
            continue

    # Fallback if API calls fail
    fallback = generate_concise_briefing_fallback(district_name, anomaly_flag, stats, district_props)
    return fallback, "Internal Decision Support Engine (Gemini Quota/Network Fallback)"


# =====================================================================
# API ENDPOINTS
# =====================================================================

@app.get("/")
def root():
    """Health check and API overview."""
    return {
        "service": "AI-Powered FRA Monitoring Decision Support System",
        "status": "online",
        "version": "2.0.0",
        "total_districts": len(DISTRICTS_INDEX),
        "total_claims": len(LOADED_CLAIMS_GEOJSON.get("features", [])),
        "endpoints": {
            "districts": "/api/districts",
            "claims": "/api/claims/{district_id}",
            "analyze": "/api/analyze/{district_id} (POST)"
        },
        "gemini_configured": bool(GEMINI_AVAILABLE and GEMINI_API_KEY)
    }


@app.get("/api/districts")
def get_districts():
    """
    Returns a GeoJSON FeatureCollection of the 4 district boundaries
    along with their pre-calculated anomaly flags and metrics.
    """
    return LOADED_DISTRICTS_GEOJSON


@app.get("/api/claims/{district_id}")
def get_claims_by_district(district_id: str):
    """
    Filters and returns only the GeoJSON point claims belonging to the selected district.
    """
    canonical_id = resolve_district_id(district_id)
    if not canonical_id:
        available_ids = list(DISTRICTS_INDEX.keys())
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"District '{district_id}' not found. Available IDs: {available_ids}"
        )

    # Filter claims for the canonical district_id
    matching_features = [
        feat for feat in LOADED_CLAIMS_GEOJSON.get("features", [])
        if feat.get("properties", {}).get("district_id", "").lower() == canonical_id
    ]

    district_name = DISTRICTS_INDEX[canonical_id]["properties"].get("name", canonical_id)

    return {
        "type": "FeatureCollection",
        "district_id": canonical_id,
        "district_name": district_name,
        "total_features": len(matching_features),
        "features": matching_features
    }


@app.post("/api/analyze/{district_id}")
def analyze_district(district_id: str):
    """
    Core AI Decision Support Endpoint:
    1. Resolves district_id and retrieves its claims.
    2. Calculates exact statistics (pending ratio, rejection ratio, max delay, avg vegetation loss).
    3. Passes numerical evidence into Gemini API to generate a concise, 2-sentence executive briefing.
    4. Returns structured statistics, anomaly flag, and executive briefing.
    """
    canonical_id = resolve_district_id(district_id)
    if not canonical_id:
        available_ids = list(DISTRICTS_INDEX.keys())
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"District '{district_id}' not found. Available IDs: {available_ids}"
        )

    district_record = DISTRICTS_INDEX[canonical_id]
    district_props = district_record["properties"]
    district_name = district_props.get("name", canonical_id)
    anomaly_flag = district_props.get("anomaly_flag", "NORMAL")

    # 1. Retrieve district claims
    district_claims = [
        feat for feat in LOADED_CLAIMS_GEOJSON.get("features", [])
        if feat.get("properties", {}).get("district_id", "").lower() == canonical_id
    ]

    # 2. Calculate exact numerical statistics
    stats = calculate_district_statistics(canonical_id, district_claims)

    # 3. Generate concise 2-sentence executive briefing
    briefing, ai_engine = query_gemini_for_briefing(
        district_name=district_name,
        anomaly_flag=anomaly_flag,
        stats=stats,
        district_props=district_props
    )

    # 4. Return structured response
    return {
        "district_id": canonical_id,
        "district_name": district_name,
        "state": district_props.get("state", "India"),
        "anomaly_flag": anomaly_flag,
        "statistics": stats,
        "ai_anomaly_report": briefing,
        "ai_engine": ai_engine
    }


if __name__ == "__main__":
    import uvicorn
    # If running from inside backend/ directory, use "main:app", else "backend.main:app"
    app_module = "main:app" if os.path.exists("main.py") and not os.path.exists("backend") else "backend.main:app"
    uvicorn.run(app_module, host="0.0.0.0", port=7860, reload=True)
