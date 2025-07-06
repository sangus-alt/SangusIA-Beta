import asyncio
from logs import logger

# Exemple de tâche asynchrone IA
async def long_ia_task(prompt: str, user_id: int):
    logger.info(f"Start async IA task for user {user_id}")
    await asyncio.sleep(2)  # Simule un long traitement
    result = f"Traitement IA terminé pour: {prompt[:20]}..."
    logger.info(f"End async IA task for user {user_id}")
    return result