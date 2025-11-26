from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel, HttpUrl, validator
from typing import List, Optional, Literal
from enum import Enum
import yt_dlp
import uuid
import os
import redis

router = APIRouter()

# Redis để lưu progress
r = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)

# Thư mục tạm
TMP_DIR = os.path.expanduser("~/Downloads")
os.makedirs(TMP_DIR, exist_ok=True)

PROXY_POOL = []  # Thêm proxy sau: "http://user:pass@ip:port"

# ====================== PRESET CONFIG ======================
class Preset(str, Enum):
    normal      = "normal"
    the3utools  = "3utools"
    audio_only  = "audio_only"
    custom      = "custom"

PRESET_CONFIG = {
    Preset.normal: {
        "quality": "1080p",
        "format": "mp4",
        "ydl_format": "best[height<=1080][ext=mp4]+bestaudio/best",
        "max_height": 1080,
        "postprocessors": [],
        "extra_opts": {}
    },
    Preset.the3utools: {
        "quality": "1080p",
        "format": "mp4",
        "ydl_format": (
            "bestvideo[height<=1080][vcodec^=avc1][fps<=30]+bestaudio[acodec^=mp4a]/"
            "best[height<=1080][ext=mp4]"
        ),
        "max_height": 1080,
        "postprocessors": [
            {"key": "FFmpegVideoConvertor", "preferedformat": "mp4"},
            {"key": "FFmpegMetadata"},
        ],
        "extra_opts": {
            "remux_video": "mp4",
            "recode_video": "h264",
            "ffmpeg_args": "-movflags +faststart -c:v h264 -profile:v high -level 4.2",
            "merge_output_format": "mp4",
        }
    },
    Preset.audio_only: {
        "quality": "best",
        "format": "mp3",
        "ydl_format": "bestaudio",
        "max_height": None,
        "use_proxy": False,
        "postprocessors": [{
            "key": "FFmpegExtractAudio",
            "preferredcodec": "mp3",
            "preferredquality": "192",
        }],
        "extra_opts": {}
    },
    Preset.custom: {
        "quality": None,
        "format": None,
        "ydl_format": None,
        "max_height": None,
        "postprocessors": [],
        "extra_opts": {}
    }
}

    

class ChannelRequest(BaseModel):
    url: str
    max_videos: int = 50
    min_duration: int = 15
    max_duration: int = 300
    min_views: int = 0
    exclude_keywords: List[str] = None

# ====================== HELPER FUNCTIONS ======================
def get_proxy():
    if PROXY_POOL:
        import random
        return random.choice(PROXY_POOL)
    return None

def get_progress_key(task_id: str):
    return f"progress:{task_id}"

def update_progress(task_id: str, percent: int, status: str, data: dict = None):
    r.hset(get_progress_key(task_id), mapping={
        "percent": percent,
        "status": status,
        "data": str(data) if data else ""
    })
    r.expire(get_progress_key(task_id), 86400)  # 24h

# ====================== ENDPOINTS ======================
@router.get("/")
async def home():
    return {"message": "Downloader All Platform 2025 - Thầy Grok tự hào về con!"}

# 1. Tải video lẻ (cơ bản + xịn)
@router.post("/download")
async def download_single(request: VideoRequest):
    task_id = str(uuid.uuid4())
    update_progress(task_id, 0, "Đang quét thông tin...")

    ydl_opts = {
        'format': 'best[height<=1080]' if "4k" not in request.quality.lower() else 'best',
        'noplaylist': True,
        'quiet': True,
        'no_warnings': True,
    }

    # VIP mới được proxy + 4K
    if "vip" in request.quality.lower() or "4k" in request.quality.lower():
        proxy = get_proxy()
        if proxy:
            ydl_opts['proxy'] = proxy

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(request.url, download=False)
            update_progress(task_id, 50, "Đã lấy thông tin video")

            formats = []
            for f in info.get("formats", []):
                if request.format == "mp3" and f.get("acodec") == "none":
                    continue
                if f.get("height") and f.get("height") <= 1080 or request.quality == "best":
                    formats.append({
                        "quality": f"{f.get('height', 'audio')}p",
                        "url": f["url"],
                        "ext": f["ext"],
                        "filesize": f.get("filesize_approx") or "Unknown"
                    })

            result = {
                "task_id": task_id,
                "title": info.get("title", "Unknown"),
                "thumbnail": info.get("thumbnail"),
                "duration": info.get("duration", 0),
                "uploader": info.get("uploader"),
                "formats": formats[:15],
                "direct_url": formats[0]["url"] if formats else None
            }
            update_progress(task_id, 100, "Hoàn thành!", result)
            return result

    except Exception as e:
        update_progress(task_id, 0, f"Lỗi: {str(e)}")
        raise HTTPException(400, f"Không tải được: {str(e)}")

# 2. Tải cả kênh (VIP only)
@router.post("/download-channel")
async def download_channel(request: ChannelRequest):
    if not request.url:
        raise HTTPException(400, "Thiếu URL kênh")

    task_id = str(uuid.uuid4())
    update_progress(task_id, 0, "Đang quét kênh...")

    ydl_opts = {
        'quiet': True,
        'extract_flat': True,
        'skip_download': True,
        'noplaylist': False,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(request.url, download=False)
            entries = info.get('entries', [])

            filtered = []
            for entry in entries[:request.max_videos]:
                if not entry: continue
                duration = entry.get('duration', 0)
                views = entry.get('view_count', 0)
                title = entry.get('title', '').lower()

                # Áp dụng bộ lọc DHB-style
                if duration and (duration < request.min_duration or duration > request.max_duration):
                    continue
                if views < request.min_views:
                    continue
                if request.exclude_keywords:
                    if any(kw.lower() in title for kw in request.exclude_keywords):
                        continue

                filtered.append({
                    "id": entry['id'],
                    "title": entry['title'],
                    "duration": duration,
                    "views": views,
                    "url": entry['url']
                })

            update_progress(task_id, 100, f"Tìm thấy {len(filtered)} video sạch!", {"videos": filtered})
            return {"task_id": task_id, "total": len(filtered), "videos": filtered[:100]}

    except Exception as e:
        raise HTTPException(500, str(e))

# 3. Kiểm tra tiến độ
@router.get("/progress/{task_id}")
async def get_progress(task_id: str):
    data = r.hgetall(get_progress_key(task_id))
    if not data:
        return {"percent": 0, "status": "Không tìm thấy task"}
    return {
        "percent": int(data.get("percent", 0)),
        "status": data.get("status", "Đang xử lý..."),
        "data": eval(data.get("data", "{}")) if data.get("data") else {}
    }

# 4. Tải MP3 nhanh
@router.post("/mp3")
async def download_mp3(request: VideoRequest):
    ydl_opts = {
        'format': 'bestaudio',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'outtmpl': f'{TMP_DIR}/%(id)s.%(ext)s',
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(request.url, download=True)
        filename = ydl.prepare_filename(info).replace(".webm", ".mp3").replace(".m4a", ".mp3")
        return FileResponse(filename, media_type="audio/mpeg", filename=f"{info['title'][:50]}.mp3")

# Gắn vào app chính
app = FastAPI(title="Downloader All Platform 2025")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
app.include_router(router, prefix="/api/v1")