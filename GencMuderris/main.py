import os
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, HTMLResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv

# .env dosyasını yükle
load_dotenv()

# FastAPI uygulaması oluştur
app = FastAPI(title="Genç Müderris", version="1.0.0")

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Session middleware
SESSION_SECRET_KEY = os.getenv("SESSION_SECRET_KEY", "gencmuderris-secret")
app.add_middleware(SessionMiddleware, secret_key=SESSION_SECRET_KEY)

# Statik dosyaları bağla
app.mount("/static", StaticFiles(directory="static"), name="static")

# Template klasörü
templates = Jinja2Templates(directory="templates")

# Favicon route'u ekle
@app.get("/favicon.ico")
async def get_favicon():
    return FileResponse("static/favicon.ico")

# Ana sayfa
@app.get("/", response_class=HTMLResponse)
async def get_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Giriş sayfası
@app.get("/login", response_class=HTMLResponse)
async def get_login(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

# Şifremi unuttum sayfası
@app.get("/forgot-password.html", response_class=HTMLResponse)
async def forgot_password_page(request: Request):
    return templates.TemplateResponse("forgot-password.html", {"request": request})

# Şifre sıfırlama sayfası
@app.get("/reset-password.html", response_class=HTMLResponse)
async def reset_password_page(request: Request):
    return templates.TemplateResponse("reset-password.html", {"request": request})

# Üye kayıt sayfası
@app.get("/register.html", response_class=HTMLResponse)
async def register_page(request: Request):
    return templates.TemplateResponse("register.html", {"request": request})

# Hata yakalayıcı (örnek)
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(status_code=500, content={"error": str(exc)})

# Diğer yönlendiriciler buraya dahil edilebilir
from app.settings import router as settings_router
app.include_router(settings_router, prefix="/api/settings")

# from app.auth import router as auth_router
# app.include_router(auth_router, prefix="/api/auth")
