from fastapi import APIRouter

agent_router = APIRouter()

# Exemple de route IA
@agent_router.post("/generate")
async def generate_code(prompt: str):
    # Appel au modèle IA local ou distant (à adapter)
    result = f"Code généré pour : {prompt}"
    return {"result": result}