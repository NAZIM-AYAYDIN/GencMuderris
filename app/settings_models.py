from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class ParentSettings(Base):
    __tablename__ = "parent_settings"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    theme = Column(String(20), default="dark")
    voice_enabled = Column(Boolean, default=False)
    voice_engine = Column(String(100), default="")
    app_notify = Column(Boolean, default=True)
    login_notify = Column(Boolean, default=True)
    email_notify = Column(Boolean, default=True)
    sms_notify = Column(Boolean, default=False)
    calendar_notify = Column(Boolean, default=True)
    chat_notify = Column(Boolean, default=True)
    two_fa = Column(Boolean, default=False)
    avatar_url = Column(String(255), default="")

class MuderrisSettings(Base):
    __tablename__ = "muderris_settings"
    id = Column(Integer, primary_key=True, index=True)
    muderris_id = Column(Integer, ForeignKey("muderris.id"), unique=True)
    theme = Column(String(20), default="dark")
    voice_enabled = Column(Boolean, default=False)
    voice_engine = Column(String(100), default="")
    app_notify = Column(Boolean, default=True)
    login_notify = Column(Boolean, default=True)
    email_notify = Column(Boolean, default=True)
    sms_notify = Column(Boolean, default=False)
    calendar_notify = Column(Boolean, default=True)
    chat_notify = Column(Boolean, default=True)
    two_fa = Column(Boolean, default=False)
    avatar_url = Column(String(255), default="")
