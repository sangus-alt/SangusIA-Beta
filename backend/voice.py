from fastapi import APIRouter, UploadFile, File, Depends
from auth import get_current_user
import os, shutil

voice_router = APIRouter()

@voice_router.post("/upload-voice")
async def upload_voice(file: UploadFile = File(...), user=Depends(get_current_user)):
    user_dir = f"user_voices/{user.username}"
    os.makedirs(user_dir, exist_ok=True)
    out_path = os.path.join(user_dir, file.filename)
    with open(out_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"url": f"/static/voices/{user.username}/{file.filename}"}

@voice_router.post("/speak")
async def speak(text: str, user=Depends(get_current_user)):
    # Appelle ton moteur TTS custom avec la voix du maître
    fake_audio_path = f"user_voices/{user.username}/tts_sample.wav"
    return FileResponse(fake_audio_path, media_type="audio/wav")