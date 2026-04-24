# Ai-healthcare-assesbility
AI-Powered Healthcare Accessibility Platform

It is an AI-driven healthcare accessibility platform designed to make healthcare guidance simple, affordable, and accessible for everyone—especially rural communities, low-literacy users, senior citizens, and underserved populations.

It helps users understand symptoms, analyze medical reports, discover government healthcare schemes, and access healthcare services through a multilingual voice-first interface.

---

## 🚀 Features

### 🩺 AI Symptom Checker
- Real-time symptom analysis using **Google Gemini API**
- Smart risk categorization: **High / Medium / Low**
- Early care recommendations
- Context-aware health guidance

### 🎙 Voice-First Interface
- Supports **Hindi / English / Hinglish**
- Speech-to-text and text-to-speech interaction
- Designed for low-literacy and non-technical users

### 📄 Medical Report Analysis
- Upload prescriptions or reports
- OCR + Gemini AI powered interpretation
- Simplified explanations of medical terms
- Personalized diet and wellness suggestions

### 🏥 Healthcare Access Integration
- Nearby hospitals and clinics
- Medicine availability assistance
- Doctor consultation support

### 💳 Government Scheme Matching
- PMJAY / Ayushman Bharat / ESIC support
- Detects eligibility for free or affordable treatment schemes

### 📶 Rural Ready Technology
- Low-bandwidth optimized
- 2G compatible
- Progressive Web App (PWA)
- Mobile-first design

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Progressive Web App (PWA)

### Backend
- FastAPI
- Supabase
- PostgreSQL
- Redis

### AI / ML
- **Google Gemini API**
- spaCy (NLP)
- Scikit-learn
- OCR (Tesseract.js)

### APIs
- Google Maps API
- OpenFDA
- Twilio
- Govt Healthcare Schemes APIs

### Deployment
- Vercel / Netlify / Docker / AWS

---

## 🤖 How Google Gemini API is Used

Project Alpha uses **Google Gemini API** for:

- Symptom understanding from natural language input
- Health risk summarization
- Medical report explanation
- Personalized healthcare guidance
- Multilingual conversational assistance
- Smart healthcare recommendations

---

## 🔐 Security & Compliance

- JWT Authentication
- Role-Based Access Control (RBAC)
- Data Encryption
- PII Masking
- TLS 1.3 Secure Transmission
- HIPAA-ready architecture
- FHIR R4 compliant

---

## 🌍 Impact

- 600M+ reachable users
- Free AI triage system
- Better rural healthcare access
- Reduced hospital overload
- Faster decision making
- Improved health awareness

---

## 🎯 Target Users

- Rural Families
- ASHA Workers
- Senior Citizens
- Low-income Users
- Non-technical Users

---

## ⚙ Installation

```bash
git clone https://github.com/yourusername/project-alpha.git
cd project-alpha
npm install
npm run dev

# HealthAI

An AI-powered healthcare assistant application providing symptom analysis and health recommendations.

## Directory Structure

```
project-root/
├── static/              # Frontend static files (CSS, JS, HTML)
├── app/                 # FastAPI backend application
│   ├── main.py          # Main application entry point
│   ├── models.py        # Pydantic data models
│   ├── routes/          # API endpoints
│   └── utils/           # Helper functions
├── tests/               # Automated tests
├── .env                 # Environment variables
└── requirements.txt     # Python dependencies
```

## Setup

1. Create a virtual environment and install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Configure `.env` file with `GEMINI_API_KEY`.
3. Run the development server:
   ```bash
   uvicorn app.main:app --reload
   ```
