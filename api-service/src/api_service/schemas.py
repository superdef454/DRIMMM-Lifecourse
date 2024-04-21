from datetime import datetime

from pydantic import (
    BaseModel,
    Field,
)

from typing import List, Optional
from uuid import UUID


class VersionModel(BaseModel):
    """Версия API"""
    version: str = Field(default=None, title='Версия', description='Номер версии в виде X.Y[.Z]')


class User(BaseModel):
    id: Optional[str]
    username: Optional[str] = None
    email: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    realm_roles: Optional[list] = None
    client_roles: Optional[list] = None


class CategorySchema(BaseModel):
    id: Optional[int] = Field(default=None, primary_key=True, nullable=False)
    name: str = Field(title="CategoryName")
    description: str = Field(default="", title="CategoryDescription")

    class Config:
        from_attributes = True


class PublicationModel(BaseModel):
    id: Optional[int] = Field(default=None, primary_key=True, nullable=False)
    title: str = Field(title="PublicationTitle", default=None)
    description: Optional[str] = Field(default="", title="PublicationDescription")
    created_at: datetime = Field(title="PublicationDate")
    event_type_title: str = Field(default=None, title="PublicationEventType")
    author: Optional[UUID] = Field(default=None, title="PublicationAuthor") #uid_keycloak_user: Mapped[UUID]
    likes: int = Field(default=None, title="PublicationLikes") # likes: Mapped[list["Like"]]\


class CreatedModel(BaseModel):
    id: int


class EventTypeResponse(BaseModel):
    title: str


class CityResponse(BaseModel):
    id: int
    name: str


class UniversityResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    rating: int
    # facults: Optional[list["FacultyResponse"]]


class FacultyResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    # rating: int


class DepartmentResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]


class GroupResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]


class CreatePostModel(BaseModel):
    title: str = Field(title="Title")
    description: str = Field(title="Description")
    event_type_id: str = Field(default="Наука")
