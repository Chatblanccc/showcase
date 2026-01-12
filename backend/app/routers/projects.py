from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.crud import project as crud_project
from app.schemas import project as schema_project
from app.utils.file_ops import extract_game_zip, save_upload_file
import os
import shutil

router = APIRouter(prefix="/projects", tags=["projects"])

@router.post("/", response_model=schema_project.Project)
async def create_project(
    title: str = Form(...),
    slug: str = Form(...),
    description: str = Form(None),
    file: UploadFile = File(...),
    cover: UploadFile = File(None),
    db: AsyncSession = Depends(get_db)
):
    # Check if slug exists
    if await crud_project.get_project_by_slug(db, slug):
        raise HTTPException(status_code=400, detail="Slug already registered")

    # Define paths
    base_static = "static"
    game_dir = os.path.join(base_static, "games", slug)
    
    # Save Zip temporarily
    temp_zip = f"{slug}.zip"
    await save_upload_file(file, temp_zip)

    # Extract
    try:
        extract_game_zip(temp_zip, game_dir)
    finally:
        if os.path.exists(temp_zip):
            os.remove(temp_zip)

    # Check entry point (assume index.html for now or search)
    entry_point = "index.html"
    if not os.path.exists(os.path.join(game_dir, entry_point)):
        # Try to find an index.html in subfolders if not in root
        found = False
        for root, dirs, files in os.walk(game_dir):
            if "index.html" in files:
                # relative path
                rel_dir = os.path.relpath(root, game_dir)
                if rel_dir == ".":
                    entry_point = "index.html"
                else:
                    entry_point = os.path.join(rel_dir, "index.html").replace("\\", "/")
                found = True
                break
        if not found:
             # Clean up if invalid
             shutil.rmtree(game_dir)
             raise HTTPException(status_code=400, detail="index.html not found in zip")

    # Handle cover image
    cover_image_path = None
    if cover:
        cover_filename = f"{slug}_{cover.filename}"
        cover_dest = os.path.join(base_static, "uploads", cover_filename)
        await save_upload_file(cover, cover_dest)
        cover_image_path = f"/static/uploads/{cover_filename}"

    # Create DB Record
    project_in = schema_project.ProjectCreate(title=title, slug=slug, description=description)
    return await crud_project.create_project(db, project_in, entry_point, cover_image_path)

@router.get("/", response_model=list[schema_project.Project])
async def read_projects(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    return await crud_project.get_projects(db, skip=skip, limit=limit)

@router.get("/{slug}", response_model=schema_project.Project)
async def read_project(slug: str, db: AsyncSession = Depends(get_db)):
    project = await crud_project.get_project_by_slug(db, slug)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project
