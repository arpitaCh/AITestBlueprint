from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import sys
import os

# Add tools directory to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'tools'))
from generate_test_cases import generate_test_cases

app = FastAPI()

# Mount static files
app.mount("/static", StaticFiles(directory="app/static"), name="static")

class GenerateRequest(BaseModel):
    user_input: str

@app.get("/")
async def read_root():
    """Serve the main HTML page"""
    return FileResponse("app/static/index.html")

@app.post("/generate")
async def generate_test_cases_endpoint(request: GenerateRequest):
    """
    Layer 2 (Navigation): Route user input to the deterministic tool
    """
    try:
        # Call Layer 3 tool
        result = generate_test_cases(request.user_input)
        
        if result["status"] == "error":
            raise HTTPException(status_code=500, detail=result["message"])
        
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
