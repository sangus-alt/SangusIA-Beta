from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session
from auth import get_current_user
from database import SessionLocal

router = APIRouter()

@router.get("/me")
def get_my_profile(user=Depends(get_current_user)):
    # retourne profil du maître uniquement
    return {"username": user.username, "email": user.email, "display_name": user.display_name}

@router.put("/me")
def edit_my_profile(display_name: str, user=Depends(get_current_user), db: Session = Depends(SessionLocal)):
    user.display_name = display_name
    db.commit()
    db.refresh(user)
    return {"display_name": user.display_name}