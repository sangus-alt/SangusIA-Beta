from database import SessionLocal, Base, engine
from users import User
from master_config import MASTER_USERNAME, MASTER_EMAIL
from auth import get_password_hash

Base.metadata.create_all(bind=engine)
db = SessionLocal()
user = db.query(User).filter(User.username == MASTER_USERNAME).first()
if not user:
    master = User(
        username=MASTER_USERNAME,
        email=MASTER_EMAIL,
        hashed_password=get_password_hash("TON_MDP_SUPER_SECURE"),
        is_master=True,
        display_name="Maître de Sangus"
    )
    db.add(master)
    db.commit()
    print("Compte maître créé.")
else:
    print("Compte maître déjà existant.")