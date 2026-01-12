import zipfile
import os
import shutil
from fastapi import UploadFile, HTTPException

async def save_upload_file(upload_file: UploadFile, destination: str):
    try:
        with open(destination, "wb") as buffer:
            shutil.copyfileobj(upload_file.file, buffer)
    finally:
        upload_file.file.close()

def extract_game_zip(zip_path: str, extract_to: str):
    if not os.path.exists(extract_to):
        os.makedirs(extract_to)
    
    try:
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            # Security check: prevent directory traversal
            for member in zip_ref.namelist():
                if member.startswith("/") or ".." in member:
                    raise HTTPException(status_code=400, detail="Zip file contains unsafe paths")
            zip_ref.extractall(extract_to)
    except zipfile.BadZipFile:
         raise HTTPException(status_code=400, detail="Invalid zip file")
