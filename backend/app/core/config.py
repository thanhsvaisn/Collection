# app/core/config.py
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Hyper Downloader"
    SECRET_KEY: str
    DATABASE_URL: str = "postgresql+asyncpg://user:pass@localhost/db"
    REDIS_URL: str = "redis://localhost:6379/0"
    
    ALLOWED_HOSTS: List[str] = ["http://localhost:3000", "https://yourdomain.com"]
    
    class Config:
        env_file = ".env"

settings = Settings()