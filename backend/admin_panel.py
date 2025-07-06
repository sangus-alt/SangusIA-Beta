from fastapi import APIRouter, Depends
from auth import get_current_user, is_master_user

admin_router = APIRouter()

def master_required(user=Depends(get_current_user)):
    if not is_master_user(user):
        raise HTTPException(status_code=403, detail="Seul le maître peut accéder ici")
    return user

@admin_router.get("/system/stats")
def system_stats(user=Depends(master_required)):
    import psutil, platform
    return {
        "cpu_percent": psutil.cpu_percent(),
        "memory": psutil.virtual_memory()._asdict(),
        "platform": platform.platform(),
        "python_version": platform.python_version()
    }

@admin_router.get("/system/files")
def list_files(user=Depends(master_required)):
    # Affiche les fichiers importants pour la maintenance
    import os
    files = os.listdir(".")
    return {"files": files}

@admin_router.post("/system/restart")
def restart_server(user=Depends(master_required)):
    # Exemple : relance le serveur (adapter selon ton infra)
    os.system("sudo systemctl restart sangus.service")
    return {"status": "redémarrage demandé"}