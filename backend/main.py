import os
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types

app = FastAPI(title="ElectionVerse AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini Client
# Automatically uses GEMINI_API_KEY from environment variables
try:
    client = genai.Client()
    HAS_AI = True
except Exception as e:
    client = None
    HAS_AI = False
    print("Warning: Gemini client could not be initialized. Please set GEMINI_API_KEY environment variable.")

class ContentRequest(BaseModel):
    type: str
    topic: str

@app.post("/api/generate-content")
async def generate_content(req: ContentRequest):
    if not HAS_AI:
        return {"content": f"### MOCK DATA\n\nGenerated **{req.type}** for: `{req.topic}`\n\n*Note: Set the `GEMINI_API_KEY` environment variable in the backend to enable real AI generation.*"}
    
    prompt = f"You are a civic intelligence AI. Generate a {req.type} about {req.topic}. Format the output beautifully using Markdown."
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        return {"content": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class StrategyEvalRequest(BaseModel):
    candidate: str
    region: str
    budget: int
    audience: str
    strategy: str

@app.post("/api/strategy-eval")
async def strategy_eval(req: StrategyEvalRequest):
    if not HAS_AI:
        # Mock response
        return {
            "evaluation": {
                "winProbability": 65,
                "confidence": "Medium",
                "strengths": ["Clear target audience", f"Budget of ${req.budget} is reasonable"],
                "weaknesses": ["Strategy lacks granular tactical details"],
                "improvements": ["Specify field ops plan", "Increase digital ad spend"],
                "budgetVerdict": "Adequate for region",
                "audienceFit": "Good alignment",
                "keyRisk": "Opponent outspending on media",
                "narrative": "A decent initial plan, but needs significantly more tactical depth to secure a comfortable victory in the final weeks."
            }
        }
        
    prompt = f"""
    You are an expert political strategist AI. Evaluate the following campaign strategy:
    Candidate: {req.candidate}
    Region: {req.region}
    Budget: ${req.budget}
    Target Audience: {req.audience}
    Strategy: {req.strategy}
    
    Return a JSON object strictly matching this format (no markdown code blocks, just raw JSON):
    {{
        "winProbability": <integer between 1-99>,
        "confidence": "<Low/Medium/High>",
        "strengths": ["<strength 1>", "<strength 2>"],
        "weaknesses": ["<weakness 1>", "<weakness 2>"],
        "improvements": ["<improvement 1>", "<improvement 2>"],
        "budgetVerdict": "<short verdict on budget>",
        "audienceFit": "<short verdict on audience fit>",
        "keyRisk": "<one main risk>",
        "narrative": "<a 2-3 sentence brutal but constructive evaluation narrative>"
    }}
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
            ),
        )
        eval_data = json.loads(response.text)
        return {"evaluation": eval_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
