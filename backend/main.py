from fastapi import FastAPI, BackgroundTasks
from users import router as users_router
from agent_ia import agent_router
from logs import setup_logging, logger
from tasks import long_ia_task

setup_logging()
app = FastAPI()

# Inclusions de routes
app.include_router(users_router, prefix="/users")
app.include_router(agent_router, prefix="/ia")

@app.get("/")
def read_root():
    return {"msg": "Bienvenue sur Sangus API !"}

# Exemple endpoint pour lancer une tâche IA asynchrone
@app.post("/async-ia-task")
async def async_ia(prompt: str, user_id: int, background_tasks: BackgroundTasks):
    background_tasks.add_task(long_ia_task, prompt, user_id)
    logger.info(f"Async IA task demandée pour user {user_id}")
    return {"status": "Traitement IA lancé en fond"}