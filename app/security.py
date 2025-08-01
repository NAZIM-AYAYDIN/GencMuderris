import bcrypt
import jwt
from datetime import datetime, timedelta
from fastapi import Request, HTTPException, status, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import models
import os

# -- Şifre Hash ve Kontrol --

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(password: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False

# -- E-Posta Doğrulama Token (JWT) --

JWT_SECRET = os.getenv("JWT_SECRET", "super_secret_key_change_this")
JWT_ALG = "HS256"
TOKEN_EXPIRES_MIN = 30  # Dakika, e-posta linki için

def create_email_token(email: str) -> str:
    payload = {
        "email": email,
        "exp": datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRES_MIN)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)

def verify_email_token(token: str) -> str or None:
    try:
        decoded = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
        return decoded.get("email")
    except Exception:
        return None

# -- JWT Session (isteğe bağlı, API için) --

def create_access_token(data: dict, expires_minutes: int = 60*24) -> str:
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(minutes=expires_minutes)
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)

def decode_access_token(token: str) -> dict or None:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
    except Exception:
        return None

# -- Kullanıcıyı Session/JWT'den Çek --

def get_current_user(request: Request, db: Session = Depends(get_db)):
    user_id = request.session.get("user_id")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Giriş gerekli.")
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Kullanıcı bulunamadı.")
    return user

def get_current_muderris(request: Request, db: Session = Depends(get_db)):
    muderris_id = request.session.get("muderris_id")
    if not muderris_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Giriş gerekli.")
    muderris = db.query(models.Muderris).filter(models.Muderris.id == muderris_id).first()
    if not muderris:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Müderris bulunamadı.")
    return muderris
