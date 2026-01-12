from pydantic import BaseModel, ConfigDict
from uuid import UUID
from datetime import datetime
from typing import Optional

class ProjectBase(BaseModel):
    title: str
    description: Optional[str] = None
    slug: str

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: UUID
    entry_point: str
    cover_image: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
