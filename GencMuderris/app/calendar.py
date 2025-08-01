from datetime import date, datetime, timedelta
from fastapi import APIRouter, Request, Form, Depends
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from app.database import get_db
from app import models
import json
import requests

templates = Jinja2Templates(directory="templates")
router = APIRouter()

# HİCRİ-MİLADİ TAKVİM DÖNÜŞÜMÜ
def hijri_to_gregorian(hijri_year, hijri_month, hijri_day):
    """Hicri tarihi miladi tarihe çevirir"""
    try:
        # Hicri takvim API'si (ücretsiz)
        url = f"http://api.aladhan.com/v1/hToG/{hijri_day}-{hijri_month}-{hijri_year}"
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            data = response.json()
            gregorian_date = data['data']['gregorian']['date']
            return datetime.strptime(gregorian_date, "%d-%m-%Y").strftime("%Y-%m-%d")
    except:
        pass
    
    # Fallback: Basit dönüşüm (yaklaşık)
    hijri_epoch = 1948086
    gregorian_epoch = 1721426
    julian_day = hijri_day + (hijri_month - 1) * 29.5 + (hijri_year - 1) * 354 + hijri_epoch
    gregorian_day = julian_day - gregorian_epoch
    year = int((gregorian_day - 1) / 365.25)
    day_of_year = int(gregorian_day - year * 365.25)
    return date(year + 1, 1, 1).replace(day=day_of_year).strftime("%Y-%m-%d")

def get_national_days(year):
    """Milli günleri döndürür"""
    return [
        {"date": f"{year}-01-01", "title": "Yılbaşı", "type": "national"},
        {"date": f"{year}-04-23", "title": "Ulusal Egemenlik ve Çocuk Bayramı", "type": "national"},
        {"date": f"{year}-05-01", "title": "İşçi Bayramı", "type": "national"},
        {"date": f"{year}-05-19", "title": "Gençlik ve Spor Bayramı", "type": "national"},
        {"date": f"{year}-07-15", "title": "Demokrasi ve Milli Birlik Günü", "type": "national"},
        {"date": f"{year}-08-30", "title": "Zafer Bayramı", "type": "national"},
        {"date": f"{year}-10-29", "title": "Cumhuriyet Bayramı", "type": "national"}
    ]

def get_religious_days(year):
    """Dini günleri döndürür (hicri-miladi dönüşümü ile)"""
    # Hicri yıl hesaplama (yaklaşık)
    hijri_year = year - 622 + (year - 622) // 33
    
    religious_days = [
        # Kurban Bayramı (10-13 Zilhicce)
        {"hijri_date": f"{hijri_year}-12-10", "title": "Kurban Bayramı (1.Gün)", "type": "religious"},
        {"hijri_date": f"{hijri_year}-12-11", "title": "Kurban Bayramı (2.Gün)", "type": "religious"},
        {"hijri_date": f"{hijri_year}-12-12", "title": "Kurban Bayramı (3.Gün)", "type": "religious"},
        {"hijri_date": f"{hijri_year}-12-13", "title": "Kurban Bayramı (4.Gün)", "type": "religious"},
        
        # Ramazan Bayramı (1-3 Şevval)
        {"hijri_date": f"{hijri_year+1}-10-01", "title": "Ramazan Bayramı (1.Gün)", "type": "religious"},
        {"hijri_date": f"{hijri_year+1}-10-02", "title": "Ramazan Bayramı (2.Gün)", "type": "religious"},
        {"hijri_date": f"{hijri_year+1}-10-03", "title": "Ramazan Bayramı (3.Gün)", "type": "religious"},
        
        # Kandiller
        {"hijri_date": f"{hijri_year}-07-27", "title": "Miraç Kandili", "type": "religious"},
        {"hijri_date": f"{hijri_year}-08-15", "title": "Berat Kandili", "type": "religious"},
        {"hijri_date": f"{hijri_year+1}-09-01", "title": "Ramazan Başlangıcı", "type": "religious"},
        {"hijri_date": f"{hijri_year+1}-09-27", "title": "Kadir Gecesi", "type": "religious"},
        {"hijri_date": f"{hijri_year+1}-03-12", "title": "Mevlid Kandili", "type": "religious"},
        {"hijri_date": f"{hijri_year+1}-01-10", "title": "Aşure Günü", "type": "religious"},
        
        # Hicri Yılbaşı
        {"hijri_date": f"{hijri_year+1}-01-01", "title": "Hicri Yılbaşı", "type": "religious"},
        
        # Diğer önemli günler
        {"hijri_date": f"{hijri_year+1}-01-12", "title": "Mevlid Kandili", "type": "religious"},
        {"hijri_date": f"{hijri_year+1}-07-27", "title": "Miraç Kandili", "type": "religious"},
        {"hijri_date": f"{hijri_year+1}-08-15", "title": "Berat Kandili", "type": "religious"},
    ]
    
    # Hicri tarihleri miladi tarihe çevir
    converted_days = []
    for day in religious_days:
        hijri_year, hijri_month, hijri_day = map(int, day["hijri_date"].split("-"))
        gregorian_date = hijri_to_gregorian(hijri_year, hijri_month, hijri_day)
        converted_days.append({
            "date": gregorian_date,
            "title": day["title"],
            "type": day["type"]
        })
    
    return converted_days

def get_islamic_historical_events(year):
    """İslami tarihi olayları döndürür"""
    # Hicri yıl hesaplama
    hijri_year = year - 622 + (year - 622) // 33
    
    historical_events = [
        # Mekke'nin Fethi (20 Ramazan 8 Hicri)
        {"hijri_date": f"{hijri_year}-09-20", "title": "Mekke'nin Fethi", "type": "historical", "year": "8 Hicri"},
        
        # Bedir Savaşı (17 Ramazan 2 Hicri)
        {"hijri_date": f"{hijri_year-6}-09-17", "title": "Bedir Savaşı", "type": "historical", "year": "2 Hicri"},
        
        # Uhud Savaşı (7 Şevval 3 Hicri)
        {"hijri_date": f"{hijri_year-5}-10-07", "title": "Uhud Savaşı", "type": "historical", "year": "3 Hicri"},
        
        # Hendek Savaşı (5 Şevval 5 Hicri)
        {"hijri_date": f"{hijri_year-3}-10-05", "title": "Hendek Savaşı", "type": "historical", "year": "5 Hicri"},
        
        # Hudeybiye Antlaşması (Zilkade 6 Hicri)
        {"hijri_date": f"{hijri_year-2}-11-01", "title": "Hudeybiye Antlaşması", "type": "historical", "year": "6 Hicri"},
        
        # Hayber'in Fethi (Muharrem 7 Hicri)
        {"hijri_date": f"{hijri_year-1}-01-15", "title": "Hayber'in Fethi", "type": "historical", "year": "7 Hicri"},
        
        # Huneyn Savaşı (Şevval 8 Hicri)
        {"hijri_date": f"{hijri_year}-10-01", "title": "Huneyn Savaşı", "type": "historical", "year": "8 Hicri"},
        
        # Tebük Seferi (Receb 9 Hicri)
        {"hijri_date": f"{hijri_year+1}-07-01", "title": "Tebük Seferi", "type": "historical", "year": "9 Hicri"},
        
        # Veda Haccı (Zilhicce 10 Hicri)
        {"hijri_date": f"{hijri_year+2}-12-01", "title": "Veda Haccı", "type": "historical", "year": "10 Hicri"},
        
        # Hz. Muhammed'in Vefatı (12 Rebiülevvel 11 Hicri)
        {"hijri_date": f"{hijri_year+3}-03-12", "title": "Hz. Muhammed'in Vefatı", "type": "historical", "year": "11 Hicri"},
        
        # Hz. Ebubekir'in Halifeliği (12 Rebiülevvel 11 Hicri)
        {"hijri_date": f"{hijri_year+3}-03-13", "title": "Hz. Ebubekir'in Halifeliği", "type": "historical", "year": "11 Hicri"},
        
        # Hz. Ömer'in Halifeliği (22 Cemaziyelahir 13 Hicri)
        {"hijri_date": f"{hijri_year+5}-06-22", "title": "Hz. Ömer'in Halifeliği", "type": "historical", "year": "13 Hicri"},
        
        # Hz. Osman'ın Halifeliği (1 Muharrem 24 Hicri)
        {"hijri_date": f"{hijri_year+16}-01-01", "title": "Hz. Osman'ın Halifeliği", "type": "historical", "year": "24 Hicri"},
        
        # Hz. Ali'nin Halifeliği (25 Zilhicce 35 Hicri)
        {"hijri_date": f"{hijri_year+27}-12-25", "title": "Hz. Ali'nin Halifeliği", "type": "historical", "year": "35 Hicri"},
    ]
    
    # Hicri tarihleri miladi tarihe çevir
    converted_events = []
    for event in historical_events:
        try:
            hijri_year, hijri_month, hijri_day = map(int, event["hijri_date"].split("-"))
            gregorian_date = hijri_to_gregorian(hijri_year, hijri_month, hijri_day)
            converted_events.append({
                "date": gregorian_date,
                "title": event["title"],
                "type": event["type"],
                "year": event["year"]
            })
        except:
            continue
    
    return converted_events

# Takvim anasayfası (HTML)
@router.get("/calendar", response_class=HTMLResponse)
def calendar_page(request: Request, db: Session = Depends(get_db)):
    user_id = request.session.get("user_id")
    events = []
    if user_id:
        events = db.query(models.CalendarEvent).filter(models.CalendarEvent.user_id == user_id).all()
    return templates.TemplateResponse("calendar.html", {
        "request": request,
        "events": events
    })

# Takvim olaylarını JSON olarak getir (AJAX için)
@router.get("/calendar/events")
def get_events(request: Request, db: Session = Depends(get_db)):
    user_id = request.session.get("user_id")
    events = []
    if user_id:
        events = db.query(models.CalendarEvent).filter(models.CalendarEvent.user_id == user_id).all()
    result = [
        {
            "id": e.id,
            "title": e.title,
            "description": e.description,
            "date": e.date.isoformat(),
            "is_hijri": e.is_hijri
        } for e in events
    ]
    return JSONResponse(content={"events": result})

# Takvime yeni not/olay ekle - DÜZELTİLMİŞ
@router.post("/calendar/add")
def add_event(
    request: Request,
    title: str = Form(...),
    description: str = Form(""),
    date: str = Form(...),
    is_hijri: bool = Form(False),
    db: Session = Depends(get_db)
):
    # Session kontrolü
    user_id = request.session.get("user_id")
    if not user_id:
        return JSONResponse({"error": "Giriş yapmanız gerekiyor"}, status_code=401)
    
    try:
        # Tarih kontrolü
        event_date = datetime.strptime(date, "%Y-%m-%d").date()
        
        # Yeni olay oluştur
        new_event = models.CalendarEvent(
            user_id=user_id,
            title=title,
            description=description,
            date=event_date,
            is_hijri=is_hijri
        )
        
        db.add(new_event)
        db.commit()
        
        return JSONResponse({
            "success": True,
            "message": "Olay başarıyla eklendi",
            "event_id": new_event.id
        })
        
    except ValueError:
        return JSONResponse({"error": "Geçersiz tarih formatı"}, status_code=400)
    except Exception as e:
        db.rollback()
        return JSONResponse({"error": f"Olay eklenirken hata oluştu: {str(e)}"}, status_code=500)

# Takvimden not/olay sil
@router.post("/calendar/delete")
def delete_event(request: Request, event_id: int = Form(...), db: Session = Depends(get_db)):
    user_id = request.session.get("user_id")
    event = db.query(models.CalendarEvent).filter(models.CalendarEvent.id == event_id).first()
    if not event:
        return JSONResponse({"error": "Olay bulunamadı"}, status_code=404)
    if user_id and event.user_id == user_id:
        db.delete(event)
        db.commit()
        return JSONResponse({"status": "deleted"})
    return JSONResponse({"error": "Yetkisiz"}, status_code=403)

# ÖZEL GÜNLER API ENDPOINT'İ
@router.get("/api/calendar/special-days/{year}")
def get_special_days(year: int):
    """Belirli bir yıl için tüm özel günleri döndürür"""
    try:
        national_days = get_national_days(year)
        religious_days = get_religious_days(year)
        historical_events = get_islamic_historical_events(year)
        
        all_days = national_days + religious_days + historical_events
        
        return JSONResponse({
            "success": True,
            "year": year,
            "national_days": national_days,
            "religious_days": religious_days,
            "historical_events": historical_events,
            "all_days": all_days
        })
    except Exception as e:
        return JSONResponse({
            "success": False,
            "error": str(e)
        }, status_code=500)

# AYIN ÖZEL GÜNLERİNİ GETİR
@router.get("/api/calendar/special-days/{year}/{month}")
def get_month_special_days(year: int, month: int):
    """Belirli bir ay için özel günleri döndürür"""
    try:
        national_days = get_national_days(year)
        religious_days = get_religious_days(year)
        historical_events = get_islamic_historical_events(year)
        
        all_days = national_days + religious_days + historical_events
        
        # Sadece belirtilen ayın günlerini filtrele
        month_days = []
        for day in all_days:
            day_date = datetime.strptime(day["date"], "%Y-%m-%d")
            if day_date.year == year and day_date.month == month:
                month_days.append(day)
        
        return JSONResponse({
            "success": True,
            "year": year,
            "month": month,
            "days": month_days
        })
    except Exception as e:
        return JSONResponse({
            "success": False,
            "error": str(e)
        }, status_code=500)

# BUGÜNÜN ÖZEL GÜNLERİNİ GETİR
@router.get("/api/calendar/today-special")
def get_today_special_days():
    """Bugünün özel günlerini döndürür"""
    try:
        today = datetime.now()
        year = today.year
        month = today.month
        day = today.day
        
        national_days = get_national_days(year)
        religious_days = get_religious_days(year)
        historical_events = get_islamic_historical_events(year)
        
        all_days = national_days + religious_days + historical_events
        
        # Bugünün günlerini filtrele
        today_days = []
        for special_day in all_days:
            day_date = datetime.strptime(special_day["date"], "%Y-%m-%d")
            if day_date.year == year and day_date.month == month and day_date.day == day:
                today_days.append(special_day)
        
        return JSONResponse({
            "success": True,
            "date": today.strftime("%Y-%m-%d"),
            "days": today_days
        })
    except Exception as e:
        return JSONResponse({
            "success": False,
            "error": str(e)
        }, status_code=500)