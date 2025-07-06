from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
import httpx
import os

app = FastAPI()

ELEVEN_API_KEY = os.environ.get("ELEVEN_API_KEY", "TA_CLE_API")
VOICE_ID = os.environ.get("ELEVEN_VOICE_ID", "TON_ID_VOIX")

@app.post("/eleven_tts")
async def eleven_tts(req: Request):
    data = await req.json()
    text = data["text"]
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/stream"
    headers = {
        "xi-api-key": ELEVEN_API_KEY,
        "Content-Type": "application/json"
    }
    payload = {
        "text": text,
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.7},
        "model_id": "eleven_multilingual_v2"
    }
    async with httpx.AsyncClient() as client:
        resp = await client.post(url, json=payload, headers=headers, timeout=60)
        return StreamingResponse(resp.aiter_bytes(), media_type="audio/mpeg")