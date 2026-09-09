---
title: FRA Monitoring Decision Support Backend
emoji: 🌲
colorFrom: green
colorTo: indigo
sdk: docker
app_port: 7860
---

# FRA Monitoring System - FastAPI Backend

FastAPI + Google Gemini AI backend providing spatial anomaly decision support for Forest Rights Act (FRA) Monitoring.

## Endpoints
- `GET /`: Health check and summary
- `GET /api/districts`: FeatureCollection of anomaly district boundaries
- `GET /api/claims/{district_id}`: Targeted claims layer for a district
- `POST /api/analyze/{district_id}`: Real-time Gemini AI statistical decision report
