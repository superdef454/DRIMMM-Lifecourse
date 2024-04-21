from typing import Optional
import uvicorn
from .schemas import (
    CityResponse,
    DepartmentResponse,
    EventTypeResponse,
    FacultyResponse,
    GroupResponse,
    UniversityResponse,
    VersionModel,
    User,
    CreatePostModel,
    PublicationModel,
)
from fastapi import (
    FastAPI,
    Depends
)
# from fastapi.responses import (
#     Response,
#     JSONResponse,
# )
from .auth import get_user_info
from sqladmin import Admin, ModelView
from .database import engine, get_session
from . import service
from .admin import (
    EventTypeAdmin,
    GroupAdmin,
    PublicationAdmin,
    StudentAdmin,
    CityAdmin,
    DepartmentAdmin,
    FacultyAdmin,
    UniversityAdmin
    )
from sqlalchemy.orm import Session


description = 'API для ФРОНТА'


app = FastAPI(
    title='API Service',
    version='0.1',
    description=description,
    root_path="/api"
)

admin = Admin(
    app,
    engine,
    )

admin.add_view(CityAdmin)
admin.add_view(StudentAdmin)
admin.add_view(UniversityAdmin)
admin.add_view(FacultyAdmin)
admin.add_view(DepartmentAdmin)
admin.add_view(GroupAdmin)
admin.add_view(EventTypeAdmin)
admin.add_view(PublicationAdmin)


@app.get(
    '/version',
    description='Возвращает версию API',
    responses={
        200: {'description': 'Версия API', 'content': {'application/json': {'example': '0.1.0'}}}
    }
)
async def get_version(
) -> VersionModel:
    return VersionModel(
        version=app.version
    )


@app.get("/secure")
async def root(user: User = Depends(get_user_info)):
    return {"message": f"Hello {user.username} you have the following service: {user.realm_roles}"}


@app.get(
    "/posts"
)
async def posts(
    group_id: Optional[int] = None,
    session: Session = Depends(get_session),
) -> list[PublicationModel]:
    return service.get_publications(session, group_id)


@app.post(
    "/create_post"
)
async def create_post(
        post: CreatePostModel,
        session: Session = Depends(get_session),
        user: User = Depends(get_user_info)
):
    return service.create_post(post, session)


@app.get(
    "/event_type"
)
async def get_event_type(
    session: Session = Depends(get_session),
) -> list[EventTypeResponse]:
    return service.get_event_type(session)


@app.get(
    "/city"
)
async def get_city(
    session: Session = Depends(get_session),
) -> list[CityResponse]:
    return service.get_city(session)


@app.get(
    "/university"
)
async def get_university(
    city_id: Optional[int] = None,
    session: Session = Depends(get_session),
) -> list[UniversityResponse]:
    return service.get_university(session, city_id)


@app.get(
    "/faculty"
)
async def get_faculty(
    university_id: Optional[int] = None,
    session: Session = Depends(get_session),
) -> list[FacultyResponse]:
    return service.get_faculty(session, university_id)


@app.get(
    "/department"
)
async def get_department(
    faculty_id: Optional[int] = None,
    session: Session = Depends(get_session),
) -> list[DepartmentResponse]:
    return service.get_department(session, faculty_id)


@app.get(
    "/group"
)
async def get_group(
    department_id: Optional[int] = None,
    session: Session = Depends(get_session),
) -> list[GroupResponse]:
    return service.get_group(session, department_id)


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8020)
