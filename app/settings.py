from fastapi import APIRouter, Depends, HTTPException, status, Request, Form
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Muderris, VerificationCode, DeletedUserLog
from app.settings_models import ParentSettings, MuderrisSettings
from app.security import get_current_user, get_current_muderris, verify_password, hash_password
from app.email_service import send_verification_code
from datetime import datetime, timedelta
import uuid
import random
import re
import os
import uuid
from fastapi import UploadFile, File

# PIL import'unu try-except ile yap
try:
    from PIL import Image
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False
    print("PIL (Pillow) yüklü değil. Profil resmi yükleme devre dışı.")

import io

templates = Jinja2Templates(directory="templates")
router = APIRouter(
    prefix="/settings",
    tags=["Ayarlar & Kullanıcı"]
)

# Profil resmi upload klasörü - DÜZELTİLMİŞ
UPLOAD_DIR = os.path.join("static", "uploads", "profiles")
os.makedirs(UPLOAD_DIR, exist_ok=True)

# --- AYARLAR HTML SAYFASI ---
@router.get("/", response_class=HTMLResponse)
def settings_page(request: Request, db: Session = Depends(get_db)):
    user_id = request.session.get("user_id")
    muderris_id = request.session.get("muderris_id")
    user = None
    muderris = None
    if user_id:
        user = db.query(User).filter(User.id == user_id).first()
    if muderris_id:
        muderris = db.query(Muderris).filter(Muderris.id == muderris_id).first()
    return templates.TemplateResponse("settings.html", {
        "request": request,
        "user": user,
        "muderris": muderris,
        "user_type": "parent" if user_id else ("muderris" if muderris_id else None)
    })

# --- EBEVEYN AYARLARI API ---
@router.get("/api/settings/parent", response_model=dict)
def get_parent_settings(db: Session = Depends(get_db), user=Depends(get_current_user)):
    settings = db.query(ParentSettings).filter_by(user_id=user.id).first()
    if not settings:
        raise HTTPException(status_code=404, detail="Ayarlar bulunamadı")
    return settings.__dict__

@router.post("/api/settings/parent/update")
def update_parent_settings(data: dict, db: Session = Depends(get_db), user=Depends(get_current_user)):
    settings = db.query(ParentSettings).filter_by(user_id=user.id).first()
    if not settings:
        raise HTTPException(status_code=404, detail="Ayarlar bulunamadı")
    for key, value in data.items():
        if hasattr(settings, key):
            setattr(settings, key, value)
    db.commit()
    return {"success": True}

# --- MÜDERRİS AYARLARI API ---
@router.get("/api/settings/muderris", response_model=dict)
def get_muderris_settings(db: Session = Depends(get_db), muderris=Depends(get_current_muderris)):
    settings = db.query(MuderrisSettings).filter_by(muderris_id=muderris.id).first()
    if not settings:
        raise HTTPException(status_code=404, detail="Ayarlar bulunamadı")
    return settings.__dict__

@router.post("/api/settings/muderris/update")
def update_muderris_settings(data: dict, db: Session = Depends(get_db), muderris=Depends(get_current_muderris)):
    settings = db.query(MuderrisSettings).filter_by(muderris_id=muderris.id).first()
    if not settings:
        raise HTTPException(status_code=404, detail="Ayarlar bulunamadı")
    for key, value in data.items():
        if hasattr(settings, key):
            setattr(settings, key, value)
    db.commit()
    return {"success": True}

# --- TEMA AYARI ---
@router.post("/update-theme")
def update_theme(theme: str, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    user.theme_preference = theme
    db.commit()
    return {"status": "success", "theme": theme}

# --- SESLİ YANIT ---
@router.post("/update-voice")
def update_voice(enabled: bool, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    user.voice_enabled = enabled
    db.commit()
    return {"status": "success", "voice_enabled": enabled}

# --- GİRİŞ BİLDİRİMİ ---
@router.post("/update-login-notify")
def update_login_notify(enabled: bool, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    user.login_notify_enabled = enabled
    db.commit()
    return {"status": "success", "login_notify_enabled": enabled}

# --- 2FA ---
@router.post("/toggle-2fa")
def toggle_2fa(enabled: bool, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    user.two_factor_enabled = enabled
    db.commit()
    return {"status": "success", "two_factor_enabled": enabled}

# --- PROFİL GÜNCELLEME (DÜZELTİLMİŞ) ---
@router.post("/update-profile")
def update_profile(
    request: Request,
    first_name: str = Form(...),
    last_name: str = Form(...),
    phone: str = Form(""),
    birth_date: str = Form(""),
    db: Session = Depends(get_db)
):
    # Session'dan user_id'yi al
    user_id = request.session.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Giriş gerekli.")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı.")
    
    try:
        # Kullanıcı bilgilerini güncelle
        user.first_name = first_name
        user.last_name = last_name
        user.phone = phone if phone else None
        
        # Doğum tarihini parse et
        if birth_date:
            try:
                user.birth_date = datetime.strptime(birth_date, "%Y-%m-%d").date()
            except ValueError:
                raise HTTPException(status_code=400, detail="Geçersiz doğum tarihi formatı.")
        else:
            user.birth_date = None
        
        db.commit()
        
        return {
            "status": "success",
            "message": "Profil başarıyla güncellendi.",
            "user": {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "phone": user.phone,
                "birth_date": user.birth_date.strftime("%Y-%m-%d") if user.birth_date else None
            }
        }
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Profil güncellenirken hata oluştu: {str(e)}")

# --- ŞİFRE DEĞİŞTİRME (API VERSİYONU) ---
@router.post("/change-password-api")
def change_password_api(
    current_password: str,
    new_password: str,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    if not verify_password(current_password, user.password_hash):
        raise HTTPException(status_code=400, detail="Mevcut şifre hatalı.")
    user.password_hash = hash_password(new_password)
    db.commit()
    return {"status": "success"}

# --- MÜDERRİS EKLEME VE SİLME ---
@router.post("/add-muderris")
def add_muderris(
    request: Request,
    first_name: str = Form(...),
    last_name: str = Form(...),
    username: str = Form(...),
    password: str = Form(...),
    birth_date: str = Form(...),
    gender: str = Form(None),
    school: str = Form(None),
    interests: str = Form(None),
    db: Session = Depends(get_db)
):
    # Session kontrolü
    user_id = request.session.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Giriş yapmanız gerekiyor")
    
    # Username kontrolü
    existing_muderris = db.query(Muderris).filter(Muderris.username == username).first()
    if existing_muderris:
        return JSONResponse({"error": "Bu kullanıcı adı zaten kullanılıyor"}, status_code=400)
    
    # Yeni müderris oluştur
    hashed_password = hash_password(password)
    new_muderris = Muderris(
        parent_id=user_id,
        first_name=first_name,
        last_name=last_name,
        username=username,
        password_hash=hashed_password,
        birth_date=datetime.strptime(birth_date, "%Y-%m-%d").date(),
        gender=gender,
        interests=interests
    )
    
    try:
        db.add(new_muderris)
        db.commit()
        
        return JSONResponse({
            "success": True,
            "message": "Müderris başarıyla eklendi",
            "muderris_id": new_muderris.id
        })
        
    except Exception as e:
        db.rollback()
        return JSONResponse({"error": f"Müderris eklenirken hata oluştu: {str(e)}"}, status_code=500)

# Müderris Silme (POST) - DÜZELTİLMİŞ
@router.post("/delete-muderris")
def delete_muderris(
    request: Request,
    muderris_id: str = Form(...),
    db: Session = Depends(get_db)
):
    # Session kontrolü
    user_id = request.session.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Giriş yapmanız gerekiyor")
    
    # Müderris'i bul ve kontrol et
    muderris = db.query(Muderris).filter(
        Muderris.id == muderris_id,
        Muderris.parent_id == user_id
    ).first()
    
    if not muderris:
        return JSONResponse({"error": "Müderris bulunamadı"}, status_code=404)
    
    try:
        db.delete(muderris)
        db.commit()
        
        return JSONResponse({
            "success": True,
            "message": "Müderris başarıyla silindi"
        })
        
    except Exception as e:
        db.rollback()
        return JSONResponse({"error": f"Müderris silinirken hata oluştu: {str(e)}"}, status_code=500)

# --- HESAP SİLME VE DOĞRULAMA ---
@router.post("/send-email-code")
def send_email_code(purpose: str, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    code = str(random.randint(100000, 999999))
    ver_code = VerificationCode(
        email=user.email,
        code=code,
        purpose=purpose,
        created_at=datetime.utcnow(),
        expires_in=600
    )
    db.add(ver_code)
    db.commit()
    send_verification_code(user.email, code, purpose)
    return {"status": "success"}

@router.post("/confirm-email-code")
def confirm_email_code(code: str, purpose: str, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    record = db.query(VerificationCode).filter_by(
        email=user.email, code=code, purpose=purpose
    ).order_by(VerificationCode.created_at.desc()).first()
    if not record or (datetime.utcnow() - record.created_at).total_seconds() > record.expires_in:
        raise HTTPException(status_code=400, detail="Kod geçersiz veya süresi doldu.")
    return {"status": "success"}

@router.delete("/delete-account")
def delete_account(
    code: str,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
    request: Request = None
):
    record = db.query(VerificationCode).filter_by(
        email=user.email, code=code, purpose="account_delete"
    ).order_by(VerificationCode.created_at.desc()).first()
    if not record or (datetime.utcnow() - record.created_at).total_seconds() > record.expires_in:
        raise HTTPException(status_code=400, detail="Kod geçersiz veya süresi doldu.")

    log = DeletedUserLog(
        user_id=user.id,
        email=user.email,
        deleted_at=datetime.utcnow(),
        ip_address=request.client.host if request else None,
        reason="Kullanıcı isteğiyle"
    )
    db.add(log)
    db.delete(user)
    db.commit()
    return {"status": "deleted"}
# --- KULLANICI BİLGİLERİNİ GETİR - DEBUG İLE ---
@router.get("/api/user-profile")
def get_user_profile(request: Request, db: Session = Depends(get_db)):
    """Kullanıcı profil bilgilerini getir"""
    user_id = request.session.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Giriş gerekli")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")
    
    return {
        "success": True,
        "data": {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phone": user.phone,
            "birth_date": user.birth_date.strftime("%Y-%m-%d") if user.birth_date else None,
            "profile_image": user.profile_image,
            "created_at": user.created_at.isoformat() if user.created_at else None,
            "email_verified": user.email_verified
        }
    }

# --- PROFİL RESMİ YÜKLEME - DÜZELTİLMİŞ ---
@router.post("/upload-profile-image")
async def upload_profile_image(
    file: UploadFile = File(...),
    request: Request = None,
    db: Session = Depends(get_db)
):
    # PIL kontrolü
    if not PIL_AVAILABLE:
        raise HTTPException(status_code=500, detail="PIL (Pillow) yüklü değil. Profil resmi yükleme devre dışı.")
    
    # Session'dan user_id'yi al
    user_id = request.session.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Giriş gerekli.")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı.")
    
    # Dosya türü kontrolü
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="Sadece resim dosyaları kabul edilir.")
    
    # Dosya boyutu kontrolü (5MB)
    if file.size > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Dosya boyutu 5MB'dan küçük olmalıdır.")
    
    try:
        # Resmi oku
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))
        
        # Resmi 200x200 boyutuna getir - PIL versiyonuna göre
        try:
            # Yeni PIL versiyonu
            image.thumbnail((200, 200), Image.Resampling.LANCZOS)
        except AttributeError:
            try:
                # Eski PIL versiyonu
                image.thumbnail((200, 200), Image.LANCZOS)
            except AttributeError:
                # En eski PIL versiyonu
                image.thumbnail((200, 200))
        
        # Benzersiz dosya adı oluştur
        file_extension = os.path.splitext(file.filename)[1].lower()
        if file_extension not in ['.jpg', '.jpeg', '.png', '.gif']:
            file_extension = '.jpg'
        
        filename = f"profile_{user_id}_{uuid.uuid4().hex}{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        
        # Resmi kaydet
        try:
            image.save(file_path, quality=85, optimize=True)
        except:
            # Optimize parametresi olmayan versiyonlar için
            image.save(file_path, quality=85)
        
        # Eski profil resmini sil
        if user.profile_image:
            old_file_path = os.path.join("static", user.profile_image.lstrip("/static/"))
            if os.path.exists(old_file_path):
                try:
                    os.remove(old_file_path)
                    print(f"Eski profil resmi silindi: {old_file_path}")
                except Exception as e:
                    print(f"Eski profil resmi silinirken hata: {e}")
        
        # Veritabanını güncelle - DÜZELTİLMİŞ YOL
        profile_image_url = f"/static/uploads/profiles/{filename}"
        user.profile_image = profile_image_url
        db.commit()
        
        print(f"Profil resmi yüklendi: {profile_image_url}")  # Debug
        print(f"Dosya yolu: {file_path}")  # Debug
        print(f"Dosya var mı: {os.path.exists(file_path)}")  # Debug
        
        return {
            "status": "success",
            "message": "Profil resmi başarıyla yüklendi",
            "image_url": profile_image_url
        }
        
    except Exception as e:
        print(f"Profil resmi yükleme hatası: {str(e)}")  # Debug
        raise HTTPException(status_code=500, detail=f"Resim yükleme hatası: {str(e)}")

# --- TEST ENDPOINT ---
@router.get("/api/test-session")
def test_session(request: Request):
    return {
        "session_data": dict(request.session),
        "user_id": request.session.get("user_id"),
        "muderris_id": request.session.get("muderris_id"),
        "is_logged_in": bool(request.session.get("user_id") or request.session.get("muderris_id"))
    }

# Ayarları kaydet (POST) - YENİ EKLENDİ
@router.post("/save-settings")
def save_settings(
    request: Request,
    theme_preference: str = Form("dark"),
    two_factor_enabled: bool = Form(False),
    login_notify_enabled: bool = Form(True),
    voice_enabled: bool = Form(False),
    night_mode_enabled: bool = Form(False),
    night_start: str = Form("21:00"),
    night_end: str = Form("06:00"),
    animation_enabled: bool = Form(True),
    auto_update_enabled: bool = Form(True),
    db: Session = Depends(get_db)
):
    # Session kontrolü
    user_id = request.session.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Giriş yapmanız gerekiyor")
    
    # Kullanıcıyı bul
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")
    
    try:
        # Ayarları güncelle
        user.theme_preference = theme_preference
        user.two_factor_enabled = two_factor_enabled
        user.login_notify_enabled = login_notify_enabled
        user.voice_enabled = voice_enabled
        
        # Gece modu ayarları (session'da sakla)
        request.session["night_mode_enabled"] = night_mode_enabled
        request.session["night_start"] = night_start
        request.session["night_end"] = night_end
        request.session["animation_enabled"] = animation_enabled
        request.session["auto_update_enabled"] = auto_update_enabled
        
        db.commit()
        
        return JSONResponse({
            "success": True,
            "message": "Ayarlar başarıyla kaydedildi"
        })
        
    except Exception as e:
        db.rollback()
        return JSONResponse({"error": f"Ayarlar kaydedilirken hata oluştu: {str(e)}"}, status_code=500)

# --- TAKVİM NOT EKLEME API ---
@router.post("/calendar/add")
def add_calendar_note(
    request: Request,
    title: str = Form(...),
    description: str = Form(""),
    date: str = Form(...),
    is_hijri: bool = Form(False),
    db: Session = Depends(get_db)
):
    """Takvim notu ekle"""
    user_id = request.session.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Giriş gerekli")
    
    try:
        from app.models import CalendarEvent
        event = CalendarEvent(
            user_id=user_id,
            title=title,
            description=description,
            date=datetime.strptime(date, "%Y-%m-%d").date(),
            is_hijri=is_hijri
        )
        db.add(event)
        db.commit()
        db.refresh(event)
        
        return {
            "success": True,
            "event_id": event.id,
            "message": "Not başarıyla eklendi"
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Not eklenirken hata: {str(e)}")

# --- TAKVİM NOT SİLME API ---
@router.post("/calendar/delete")
def delete_calendar_note(
    request: Request,
    event_id: int = Form(...),
    db: Session = Depends(get_db)
):
    """Takvim notu sil"""
    user_id = request.session.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Giriş gerekli")
    
    try:
        from app.models import CalendarEvent
        event = db.query(CalendarEvent).filter(
            CalendarEvent.id == event_id,
            CalendarEvent.user_id == user_id
        ).first()
        
        if not event:
            raise HTTPException(status_code=404, detail="Not bulunamadı")
        
        db.delete(event)
        db.commit()
        
        return {
            "success": True,
            "message": "Not başarıyla silindi"
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Not silinirken hata: {str(e)}")

