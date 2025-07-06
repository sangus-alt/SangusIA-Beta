from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
import os
from TTS.api import TTS

app = FastAPI()
# Remplace par le chemin de ton modèle entraîné sur ta voix
TTS_MODEL_PATH = "models/tts-your-voice"

tts = TTS(model_path=TTS_MODEL_PATH, progress_bar=False, gpu=False)

@app.post("/coqui_tts")
async def coqui_tts(req: Request):
    data = await req.json()
    text = data["text"]
    output_path = "tts_output.wav"
    tts.tts_to_file(text=text, file_path=output_path)
    return FileResponse(output_path, media_type="audio/wav")