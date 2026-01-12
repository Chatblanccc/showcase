from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.routers import projects
import os
import traceback

app = FastAPI(title=settings.PROJECT_NAME)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Should be specific in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 全局异常处理器 - 打印详细错误
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    error_msg = f"Error: {str(exc)}\n{traceback.format_exc()}"
    print(error_msg)  # 打印到控制台/日志
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc), "traceback": traceback.format_exc()}
    )

# Ensure static directories exist
os.makedirs("static/games", exist_ok=True)
os.makedirs("static/uploads", exist_ok=True)

app.mount("/static", StaticFiles(directory="static", html=True), name="static")

app.include_router(projects.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to Showcase Platform API"}
