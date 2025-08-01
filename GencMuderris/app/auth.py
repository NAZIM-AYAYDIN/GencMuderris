from fastapi import APIRouter, Request, Form, Depends, HTTPException, status
from fastapi.responses import RedirectResponse, HTMLResponse, JSONResponse
from sqlalchemy.orm import Session
from app.database import SessionLocal, get_db
from app import models
from app.security import (
    hash_password, verify_password,
    create_email_token, verify_email_token
)
from app.email_service import send_custom_email, send_verification_code
from datetime import datetime, timedelta
import random

from fastapi.templating import Jinja2Templates
templates = Jinja2Templates(directory="templates")
router = APIRouter()

# ---------- FORM-BASED (ESKİ YAPI, AYNEN KORUNUR) ----------

# Üye Kaydı (POST) - DÜZELTİLMİŞ
@router.post("/register", response_class=HTMLResponse)
def register_user(
    request: Request,
    first_name: str = Form(...),
    last_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(None),
    birth_date: str = Form(...),
    password: str = Form(...),
    confirm_password: str = Form(...),
    kvkk_accepted: bool = Form(False),
    gizlilik_accepted: bool = Form(False),
    uyelik_accepted: bool = Form(False),
    bildirim_izni: bool = Form(False),
    captcha_answer: str = Form(...),  # Captcha eklendi
    db: Session = Depends(get_db)
):
    # Captcha kontrolü (session'dan alınacak)
    expected_captcha = request.session.get("captcha_answer")
    if not expected_captcha or str(captcha_answer) != str(expected_captcha):
        return templates.TemplateResponse("register.html", {
            "request": request,
            "error": "Captcha cevabı yanlış. Lütfen tekrar deneyin."
        })
    
    # Şifre kontrolü
    if password != confirm_password:
        return templates.TemplateResponse("register.html", {
            "request": request,
            "error": "Şifreler uyuşmuyor."
        })
    
    # Onay kutuları kontrolü
    if not kvkk_accepted or not gizlilik_accepted or not uyelik_accepted:
        return templates.TemplateResponse("register.html", {
            "request": request,
            "error": "Lütfen gerekli onay kutularını işaretleyin."
        })
    
    # E-posta kontrolü
    existing_user = db.query(models.User).filter(models.User.email == email).first()
    if existing_user:
        return templates.TemplateResponse("register.html", {
            "request": request,
            "error": "Bu e-posta adresi zaten kayıtlı."
        })
    
    # Yeni kullanıcı oluştur
    hashed_password = hash_password(password)
    new_user = models.User(
        email=email,
        password_hash=hashed_password,
        first_name=first_name,
        last_name=last_name,
        phone=phone,
        birth_date=datetime.strptime(birth_date, "%Y-%m-%d").date(),
        kvkk_accepted=kvkk_accepted,
        gizlilik_accepted=gizlilik_accepted,
        uyelik_accepted=uyelik_accepted,
        bildirim_izni=bildirim_izni
    )
    
    try:
        db.add(new_user)
        db.commit()
        
        # E-posta doğrulama gönder
        verification_token = create_email_token(email)
        verification_link = f"http://localhost:8000/verify-email?token={verification_token}"
        
        try:
            send_custom_email(email, verification_link, type="verification")
        except Exception as e:
            print(f"E-posta gönderme hatası: {e}")
        
        # Captcha'yı temizle
        request.session.pop("captcha_answer", None)
        
        return templates.TemplateResponse("register.html", {
            "request": request,
            "success": "Kayıt başarılı! Lütfen e-posta adresinizi doğrulayın."
        })
        
    except Exception as e:
        db.rollback()
        return templates.TemplateResponse("register.html", {
            "request": request,
            "error": f"Kayıt sırasında hata oluştu: {str(e)}"
        })

# Register sayfası (GET) - Captcha ile (DÜZELTİLMİŞ)
@router.get("/register", response_class=HTMLResponse)
def register_form(request: Request):
    # Captcha oluştur ve session'a kaydet
    import random
    import time
    import uuid
    
    # Daha iyi rastgelelik için UUID ve timestamp kombinasyonu kullan
    unique_seed = str(uuid.uuid4()) + str(int(time.time() * 1000))  # milisaniye hassasiyeti
    random.seed(unique_seed)
    
    # Daha geniş sayı aralığı ve operatör çeşitliliği
    num1 = random.randint(1, 20)
    num2 = random.randint(1, 20)
    operator = random.choice(['+', '-', '*'])
    
    # Negatif sonuçları önlemek için çıkarma işleminde büyük sayıyı önce koy
    if operator == '-' and num1 < num2:
        num1, num2 = num2, num1
    
    if operator == '+':
        answer = num1 + num2
        question = f"{num1} + {num2}"
    elif operator == '-':
        answer = num1 - num2
        question = f"{num1} - {num2}"
    else:  # *
        answer = num1 * num2
        question = f"{num1} × {num2}"
    
    # Session'a captcha bilgilerini kaydet
    request.session["captcha_answer"] = answer
    request.session["captcha_question"] = question
    request.session["captcha_created"] = time.time()
    
    return templates.TemplateResponse("register.html", {
        "request": request,
        "error": None,
        "success": None,
        "captcha_question": question
    })

# Captcha yenileme endpoint'i ekle
@router.post("/refresh-captcha")
def refresh_captcha(request: Request):
    """Captcha'yı yenile"""
    import random
    import time
    import uuid
    
    # Yeni captcha oluştur
    unique_seed = str(uuid.uuid4()) + str(int(time.time() * 1000))
    random.seed(unique_seed)
    
    num1 = random.randint(1, 20)
    num2 = random.randint(1, 20)
    operator = random.choice(['+', '-', '*'])
    
    if operator == '-' and num1 < num2:
        num1, num2 = num2, num1
    
    if operator == '+':
        answer = num1 + num2
        question = f"{num1} + {num2}"
    elif operator == '-':
        answer = num1 - num2
        question = f"{num1} - {num2}"
    else:
        answer = num1 * num2
        question = f"{num1} × {num2}"
    
    # Session'ı güncelle
    request.session["captcha_answer"] = answer
    request.session["captcha_question"] = question
    request.session["captcha_created"] = time.time()
    
    return {"question": question, "success": True}

# Giriş Formu (GET)
@router.get("/login", response_class=HTMLResponse)
def login_form(request: Request):
    return templates.TemplateResponse("login.html", {"request": request, "uye_error": None, "muderris_error": None})

# Üye Girişi (POST) - DÜZELTİLMİŞ
@router.post("/login", response_class=HTMLResponse)
def login_user(
    request: Request,
    email: str = Form(...),
    password: str = Form(...),
    captcha_answer: str = Form(None),
    db: Session = Depends(get_db)
):
    # Session'dan login denemelerini al
    login_attempts = request.session.get("login_attempts", 0)
    
    # Captcha kontrolü (3 denemeden sonra)
    if login_attempts >= 3:
        if not captcha_answer:
            # Captcha oluştur ve göster
            question, answer = generate_captcha()
            request.session["captcha_answer"] = answer
            
            return templates.TemplateResponse("login.html", {
                "request": request, 
                "uye_error": "Lütfen captcha sorusunu cevaplayın.", 
                "muderris_error": None,
                "captcha_question": question,
                "show_captcha": True
            })
        
        # Captcha cevabını session'dan al
        expected_answer = request.session.get("captcha_answer")
        if not expected_answer or str(captcha_answer) != str(expected_answer):
            # Yeni captcha oluştur
            question, answer = generate_captcha()
            request.session["captcha_answer"] = answer
            
            return templates.TemplateResponse("login.html", {
                "request": request, 
                "uye_error": "Captcha cevabı yanlış. Lütfen tekrar deneyin.", 
                "muderris_error": None,
                "captcha_question": question,
                "show_captcha": True
            })
    
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user or not verify_password(password, user.password_hash):
        # Login denemelerini artır
        login_attempts += 1
        request.session["login_attempts"] = login_attempts
        
        # 3 denemeden sonra captcha göster
        if login_attempts >= 3:
            question, answer = generate_captcha()
            request.session["captcha_answer"] = answer
            
            return templates.TemplateResponse("login.html", {
                "request": request, 
                "uye_error": f"Geçersiz e-posta veya şifre. 3 deneme hakkınız doldu, captcha çözün.", 
                "muderris_error": None,
                "captcha_question": question,
                "show_captcha": True
            })
        else:
            return templates.TemplateResponse("login.html", {
                "request": request, 
                "uye_error": f"Geçersiz e-posta veya şifre. Kalan deneme: {3 - login_attempts}", 
                "muderris_error": None,
                "show_captcha": False
            })

    # Başarılı girişten önce e-posta doğrulamasını kontrol et
    if not user.email_verified:
        return templates.TemplateResponse("login.html", {
            "request": request, 
            "uye_error": "Lütfen e-posta adresinizi doğrulayın.", 
            "muderris_error": None,
            "show_captcha": False
        })

    # Başarılı giriş - session'ı temizle
    request.session.clear()
    request.session["user_id"] = user.id
    request.session["user_first_name"] = user.first_name
    request.session["user_last_name"] = user.last_name

    return RedirectResponse(url="/", status_code=302)

# Captcha oluşturma fonksiyonu
def generate_captcha():
    import random
    import time
    import uuid
    
    unique_seed = str(uuid.uuid4()) + str(int(time.time() * 1000))
    random.seed(unique_seed)
    
    num1 = random.randint(1, 20)
    num2 = random.randint(1, 20)
    operator = random.choice(['+', '-', '*'])
    
    if operator == '-' and num1 < num2:
        num1, num2 = num2, num1
    
    if operator == '+':
        answer = num1 + num2
        question = f"{num1} + {num2}"
    elif operator == '-':
        answer = num1 - num2
        question = f"{num1} - {num2}"
    else:
        answer = num1 * num2
        question = f"{num1} × {num2}"
    
    return question, answer

# Müderris Girişi (POST)
@router.post("/muderris-login", response_class=HTMLResponse)
def muderris_login(
    request: Request,
    username: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    muderris = db.query(models.Muderris).filter(models.Muderris.username == username).first()
    if not muderris or not verify_password(password, muderris.password_hash):
        return templates.TemplateResponse("login.html", {"request": request, "uye_error": None, "muderris_error": "Kullanıcı adı veya şifre hatalı."})

    request.session.clear()
    request.session["muderris_id"] = muderris.id
    request.session["muderris_first_name"] = muderris.first_name
    request.session["muderris_last_name"] = muderris.last_name

    return RedirectResponse(url="/", status_code=302)

# Şifremi Unuttum (GET)
@router.get("/forgot-password", response_class=HTMLResponse)
def forgot_password_form(request: Request):
    return templates.TemplateResponse("forgot-password.html", {"request": request, "error": None})

# Şifremi Unuttum (POST)
@router.post("/forgot-password", response_class=HTMLResponse)
def forgot_password_post(
    request: Request,
    email: str = Form(...),
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        return templates.TemplateResponse("forgot-password.html", {"request": request, "error": "E-posta bulunamadı."})

    reset_token = create_email_token(email)
    reset_link = f"http://localhost:8000/reset-password?token={reset_token}"

    try:
        send_custom_email(email, reset_link, type="reset")
    except Exception as e:
        return templates.TemplateResponse("forgot-password.html", {
            "request": request,
            "error": f"E-posta gönderilemedi: {str(e)}"
        })

    return templates.TemplateResponse("forgot-password.html", {
        "request": request,
        "error": "Sıfırlama bağlantısı e-posta adresinize gönderildi."
    })

# Şifre Sıfırlama Formu (GET)
@router.get("/reset-password", response_class=HTMLResponse)
def reset_password_form(request: Request, token: str = ""):
    return templates.TemplateResponse("reset-password.html", {
        "request": request,
        "token": token,
        "error": None,
        "success": None,
    })

# Şifre Sıfırlama İşlemi (POST) - DÜZELTİLMİŞ
@router.post("/reset-password", response_class=HTMLResponse)
def reset_password(
    request: Request,
    password: str = Form(...),
    confirm_password: str = Form(...),
    token: str = Form(""),  # Boş string default değeri
    db: Session = Depends(get_db)
):
    # Token yoksa hata ver
    if not token:
        return templates.TemplateResponse("reset-password.html", {
            "request": request,
            "token": "",
            "error": "Geçersiz sıfırlama bağlantısı. Lütfen e-posta adresinizi kontrol edin.",
            "success": None,
        })
    
    email = verify_email_token(token)
    if not email:
        return templates.TemplateResponse("reset-password.html", {
            "request": request,
            "token": token,
            "error": "Geçersiz veya süresi dolmuş bağlantı.",
            "success": None,
        })

    if password != confirm_password:
        return templates.TemplateResponse("reset-password.html", {
            "request": request,
            "token": token,
            "error": "Şifreler uyuşmuyor.",
            "success": None,
        })

    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        return templates.TemplateResponse("reset-password.html", {
            "request": request,
            "token": token,
            "error": "Kullanıcı bulunamadı.",
            "success": None,
        })

    user.password_hash = hash_password(password)
    db.commit()
    return templates.TemplateResponse("reset-password.html", {
        "request": request,
        "token": token,
        "error": None,
        "success": "Şifreniz başarıyla değiştirildi. Artık giriş yapabilirsiniz.",
    })

# E-posta Doğrulama (GET)
@router.get("/verify-email")
def verify_email(token: str, db: Session = Depends(get_db)):
    email = verify_email_token(token)
    if not email:
        return HTMLResponse("<h3>❌ Geçersiz veya süresi dolmuş doğrulama bağlantısı.</h3>")

    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        return HTMLResponse("<h3>❌ Kullanıcı bulunamadı.</h3>")

    if user.email_verified:
        return HTMLResponse("<h3>✅ E-posta zaten doğrulanmış.</h3>")

    user.email_verified = True
    db.commit()
    return HTMLResponse("<h3>✅ E-posta başarıyla doğrulandı. Artık giriş yapabilirsiniz.</h3>")

# KVKK, Gizlilik, Üyelik, Bildirim Sayfaları
@router.get("/kvkk", response_class=HTMLResponse)
def kvkk_page(request: Request):
    return templates.TemplateResponse("kvkk.html", {"request": request})

@router.get("/gizlilik", response_class=HTMLResponse)
def gizlilik_page(request: Request):
    return templates.TemplateResponse("gizlilik.html", {"request": request})

@router.get("/uyelik-sartlari", response_class=HTMLResponse)
def uyelik_page(request: Request):
    return templates.TemplateResponse("uyelik-sartlari.html", {"request": request})

@router.get("/bildirim-izinleri", response_class=HTMLResponse)
def bildirim_page(request: Request):
    return templates.TemplateResponse("bildirim-izinleri.html", {"request": request})

# Çıkış Yap — DÜZELTİLMİŞ
@router.get("/logout")
@router.post("/logout")
def logout(request: Request):
    request.session.clear()
    return RedirectResponse(url="/", status_code=302)

# ---------- MODERN API (KOD İLE İŞLEMLER, AJAX/SPA İÇİN) ----------

# Şifre Sıfırlama: 6 Haneli Kod Gönderme (API)
@router.post("/send-reset-code")
def send_reset_code(email: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        return JSONResponse({"error": "Kullanıcı bulunamadı."}, status_code=404)
    code = str(random.randint(100000, 999999))
    vc = models.VerificationCode(
        email=email,
        code=code,
        purpose="password_reset",
        created_at=datetime.utcnow(),
        expires_in=600
    )
    db.add(vc)
    db.commit()
    send_verification_code(email, code, "password_reset")
    return {"status": "success", "message": "Doğrulama kodu e-posta adresinize gönderildi."}

# Şifreyi 6 Haneli Kod ile Güncelle (API)
@router.post("/reset-password-code")
def reset_password_code(email: str, code: str, new_password: str, db: Session = Depends(get_db)):
    record = db.query(models.VerificationCode).filter_by(email=email, code=code, purpose="password_reset").order_by(models.VerificationCode.created_at.desc()).first()
    if not record or (datetime.utcnow() - record.created_at).total_seconds() > record.expires_in:
        raise HTTPException(status_code=400, detail="Kod geçersiz veya süresi doldu.")
    user = db.query(models.User).filter_by(email=email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı.")
    user.password_hash = hash_password(new_password)
    db.commit()
    return {"status": "success", "message": "Şifreniz başarıyla değiştirildi."}

# Hesap Silme: Kod Gönderme ve Silme API'si settings.py'deki ile aynıdır (orada tekrar etmeye gerek yok).

# Şifre Değiştirme Formu (GET) - DÜZELTİLMİŞ
@router.get("/change-password", response_class=HTMLResponse)
def change_password_form(request: Request):
    # Session kontrolü
    user_id = request.session.get("user_id")
    if not user_id:
        return RedirectResponse(url="/login", status_code=302)
    
    return templates.TemplateResponse("change-password.html", {
        "request": request,
        "error": None,
        "success": None
    })

# Şifre Değiştirme İşlemi (POST) - DÜZELTİLMİŞ
@router.post("/change-password", response_class=HTMLResponse)
def change_password(
    request: Request,
    current_password: str = Form(...),
    new_password: str = Form(...),
    confirm_password: str = Form(...),
    db: Session = Depends(get_db)
):
    # Session kontrolü
    user_id = request.session.get("user_id")
    if not user_id:
        return RedirectResponse(url="/login", status_code=302)
    
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        return RedirectResponse(url="/login", status_code=302)
    
    # Mevcut şifre kontrolü
    if not verify_password(current_password, user.password_hash):
        return templates.TemplateResponse("change-password.html", {
            "request": request,
            "error": "Mevcut şifre hatalı.",
            "success": None
        })
    
    # Yeni şifre kontrolü
    if new_password != confirm_password:
        return templates.TemplateResponse("change-password.html", {
            "request": request,
            "error": "Yeni şifreler uyuşmuyor.",
            "success": None
        })
    
    # Şifreyi güncelle
    user.password_hash = hash_password(new_password)
    db.commit()
    
    return templates.TemplateResponse("change-password.html", {
        "request": request,
        "error": None,
        "success": "Şifreniz başarıyla değiştirildi."
    })

# Profil Silme İşlemi (POST) - YENİ EKLENDİ
@router.post("/delete-profile", response_class=HTMLResponse)
def delete_profile(
    request: Request,
    db: Session = Depends(get_db)
):
    # Session kontrolü
    user_id = request.session.get("user_id")
    if not user_id:
        return RedirectResponse(url="/login", status_code=302)
    
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        return RedirectResponse(url="/login", status_code=302)
    
    try:
        # Kullanıcıyı veritabanından sil
        db.delete(user)
        db.commit()
        
        # Session'ı temizle
        request.session.clear()
        
        return RedirectResponse(url="/", status_code=302)
        
    except Exception as e:
        db.rollback()
        return templates.TemplateResponse("settings.html", {
            "request": request,
            "error": f"Profil silinirken hata oluştu: {str(e)}"
        })

