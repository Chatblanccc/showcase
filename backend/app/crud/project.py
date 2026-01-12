from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.project import Project
from app.schemas.project import ProjectCreate

async def create_project(db: AsyncSession, project: ProjectCreate, entry_point: str, cover_image: str | None = None) -> Project:
    db_project = Project(
        title=project.title,
        slug=project.slug,
        description=project.description,
        entry_point=entry_point,
        cover_image=cover_image
    )
    db.add(db_project)
    await db.commit()
    await db.refresh(db_project)
    return db_project

async def get_projects(db: AsyncSession, skip: int = 0, limit: int = 100):
    result = await db.execute(select(Project).offset(skip).limit(limit))
    return result.scalars().all()

async def get_project_by_slug(db: AsyncSession, slug: str):
    result = await db.execute(select(Project).filter(Project.slug == slug))
    return result.scalars().first()
