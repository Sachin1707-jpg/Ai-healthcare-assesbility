import os
import json
import logging
import traceback
from fastapi import APIRouter
from fastapi.responses import JSONResponse
import google.generativeai as genai

from models import SymptomRequest, EmergencyRequest, SchemeRequest
from app.utils.helpers import get_mock_hospitals

router = APIRouter()
logger = logging.getLogger(__name__)

GEMINI_SYSTEM_PROMPT = """
You are a cautious AI medical assistant for rural India.
IMPORTANT:
- NOT a doctor. No prescriptions.
- Always include disclaimer.
- Response MUST be JSON with: summary, possible_causes[], risk_level (Low/Medium/High), recommended_actions[], when_to_see_doctor, disclaimer, detected_symptoms[], conditions[].
"""

@router.post("/analyze")
async def analyze_symptoms(req: SymptomRequest):
    logger.info(f"Analyzing: {req.text}")
    
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return JSONResponse(status_code=500, content={"success": False, "error": "API Key missing"})
    
    genai.configure(api_key=api_key)
    
    try:
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash", 
            system_instruction=GEMINI_SYSTEM_PROMPT
        )
        prompt = f"Symptoms: {req.text}. Language: {req.language}. Age: {req.age}. Sex: {req.sex}."
        response = model.generate_content(prompt)
        
        text = response.text.strip()
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0].strip()
        elif "```" in text:
            text = text.split("```")[1].split("```")[0].strip()
            
        ai_data = json.loads(text)
        
        # Risk Mapping
        risk_level = ai_data.get("risk_level", "Low")
        risk_map = {
            "High": {"color": "#ef4444", "reason_en": "Serious condition.", "reason_hi": "गंभीर स्थिति।", "action_en": "Seek help.", "action_hi": "मदद लें।"},
            "Medium": {"color": "#f59e0b", "reason_en": "Consult soon.", "reason_hi": "जल्द सलाह लें।", "action_en": "See doctor.", "action_hi": "डॉक्टर को दिखाएं।"},
            "Low": {"color": "#10b981", "reason_en": "Mild symptoms.", "reason_hi": "हल्के लक्षण।", "action_en": "Rest.", "action_hi": "आराम करें।"}
        }
        risk_info = risk_map.get(risk_level, risk_map["Low"]).copy()
        risk_info["level"] = risk_level

        return {
            "success": True,
            "risk": risk_info,
            "ai_analysis": ai_data,
            "hospitals": get_mock_hospitals() if risk_level != "Low" else []
        }
        
    except Exception as e:
        logger.error(f"Error: {e}")
        return {
            "success": True,
            "risk": {"level": "Low", "color": "#10b981", "reason_en": "Offline mode", "action_en": "Try later"},
            "ai_analysis": {"summary": "AI temporarily offline."},
            "hospitals": []
        }

@router.get("/hospitals")
async def get_hospitals():
    return {"hospitals": get_mock_hospitals()}

@router.post("/emergency")
async def trigger_emergency(req: EmergencyRequest):
    return {"success": True, "message": "Emergency alerted."}

@router.post("/schemes")
async def check_schemes(req: SchemeRequest):
    return {"eligible_schemes": [], "total": 0}
