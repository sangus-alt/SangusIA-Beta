from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio

ws_router = APIRouter()

@ws_router.websocket("/ws/stream_ia")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            prompt = data
            # Simule la génération IA streaming (remplace par ton vrai modèle !)
            for fragment in ["Bonjour, ", "voici ", "la réponse ", "en direct."]:
                await asyncio.sleep(0.5)
                await websocket.send_text(fragment)
            await websocket.send_text("[END]")
    except WebSocketDisconnect:
        pass