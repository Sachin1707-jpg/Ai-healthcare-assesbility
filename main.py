import os
import logging
from fastapi import FastAPI
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# App paths - Flat structure
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INDEX_PATH = os.path.join(BASE_DIR, "index.html")

app = FastAPI(title="HealthAI Backend")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import and include API routes from the root api.py
import api
app.include_router(api.router, prefix="/api")

# Serve specific static files from root
@app.get("/style.css")
async def get_css():
    return FileResponse(os.path.join(BASE_DIR, "style.css"))

@app.get("/app.js")
async def get_js():
    return FileResponse(os.path.join(BASE_DIR, "app.js"))

@app.get("/")
async def read_index():
    if os.path.exists(INDEX_PATH):
        return FileResponse(INDEX_PATH)
    return JSONResponse(
        status_code=404, 
        content={"error": "index.html not found at root."}
    )

@app.get("/health")
async def health():
    return {
        "status": "healthy", 
        "index_file_exists": os.path.exists(INDEX_PATH),
        "style_file_exists": os.path.exists(os.path.join(BASE_DIR, "style.css")),
        "js_file_exists": os.path.exists(os.path.join(BASE_DIR, "app.js"))
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    # Module name is 'main'
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
