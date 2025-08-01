from sqlalchemy import (
    Column, Integer, String, Boolean, Date, DateTime, ForeignKey, Text
)
from sqlalchemy.orm import relationship, declarative_base
import uuid
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    phone = Column(String(40), nullable=True)
    birth_date = Column(Date, nullable=False)
    email_verified = Column(Boolean, default=False)
    theme_preference = Column(String(50), default="dark")
    two_factor_enabled = Column(Boolean, default=False)
    login_notify_enabled = Column(Boolean, default=True)
    voice_enabled = Column(Boolean, default=False)
    last_login = Column(DateTime, default=None)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    
    # Profil resmi alanı eklendi
    profile_image = Column(String(255), nullable=True)  # Dosya yolu saklanacak
    
    # KVKK ve izin alanları
    kvkk_accepted = Column(Boolean, default=False)
    gizlilik_accepted = Column(Boolean, default=False)
    uyelik_accepted = Column(Boolean, default=False)
    bildirim_izni = Column(Boolean, default=False)

    # İlişkiler
    muderrisler = relationship('Muderris', back_populates='parent', cascade='all, delete-orphan')
    calendar_events = relationship('CalendarEvent', back_populates='user', cascade='all, delete-orphan')
    messages = relationship('Message', back_populates='user', cascade='all, delete-orphan')

class Muderris(Base):
    __tablename__ = 'muderris'
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    parent_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    username = Column(String(50), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    gender = Column(String(20), nullable=True)
    birth_date = Column(Date, nullable=False)
    interests = Column(Text, nullable=True)
    is_archived = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # İlişkiler
    parent = relationship('User', back_populates='muderrisler')
    messages = relationship('Message', back_populates='muderris', cascade='all, delete-orphan')

class CalendarEvent(Base):
    __tablename__ = 'calendar_events'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    date = Column(Date, nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    is_hijri = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # İlişkiler
    user = relationship('User', back_populates='calendar_events')

class Message(Base):
    __tablename__ = 'messages'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=True)
    muderris_id = Column(String(36), ForeignKey('muderris.id'), nullable=True)
    sender = Column(String(20), nullable=False)  # "user" veya "muderris"
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # İlişkiler
    user = relationship('User', back_populates='messages')
    muderris = relationship('Muderris', back_populates='messages')

class VerificationCode(Base):
    __tablename__ = 'verification_codes'
    id = Column(Integer, primary_key=True)
    email = Column(String(255), nullable=False)
    code = Column(String(8), nullable=False)
    purpose = Column(String(32), nullable=False)  # "password_reset", "account_delete", ...
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_in = Column(Integer, default=600)  # saniye cinsinden, ör: 600 = 10dk

class DeviceLog(Base):
    __tablename__ = 'device_logs'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    device_info = Column(String(255), nullable=True)
    ip_address = Column(String(45), nullable=True)
    login_at = Column(DateTime, default=datetime.utcnow)

class DeletedUserLog(Base):
    __tablename__ = 'deleted_users_log'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)  # Foreign key eklendi
    email = Column(String(255))
    deleted_at = Column(DateTime, default=datetime.utcnow)
    ip_address = Column(String(45))
    reason = Column(String(64))
    
    # İlişki ekle
    user = relationship('User')