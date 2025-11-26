from pydantic import BaseModel, HttpUrl
from typing import Literal

class DownloadRequest(BaseModel):
    url: HttpUrl
    platform: Literal["youtube", "tiktok", "instagram", "douyin", "facebook"] = "youtube"
    quality: Literal["best", "4k", "1080p", "720p", "audio_only"] = "best"
    add_watermark: bool = False

class DownloadResponse(BaseModel):
    task_id: str
    status: str
    message: str = "Đã nhận yêu cầu, đang xử lý..."