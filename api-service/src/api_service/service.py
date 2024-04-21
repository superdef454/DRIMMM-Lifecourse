from typing import Optional
from sqlalchemy.orm import Session
from .models import City, Department, Faculty, Group, Publication, Like, EventType, University
from .schemas import CityResponse, CreatePostModel, DepartmentResponse, EventTypeResponse, FacultyResponse, GroupResponse, PublicationModel, CreatedModel, UniversityResponse, User
from datetime import datetime
from random import randint


# def get_publications(session: Session, user: User) -> list[PublicationModel]:
#     # publications = session.query(Publication).all()
#     publications = session.query(
#         Publication,
#         EventType
#     ).filter(
#         Publication.event_type_id == EventType.title,
#     ).all()
#     return [PublicationModel(
#         id=publication.id,
#         title=publication.title,
#         description=publication.description,
#         event_type=[str(publication.event_type)],
#         created_at=publication.date,
#         author=user.username, # todo fix
#         likes=["qwe"],
#     ) for publication in publications]
def get_publications(session: Session, group_id: int) -> list[PublicationModel]:
    args_filters = []
    # if group_id:
    #     args_filters.append[~Publication.uid_keycloak_user]
    publications = session.query(
        Publication,
        EventType
    ).filter(
        Publication.event_type_id == EventType.title, *args_filters
    ).all()
    return [PublicationModel(
        id=publication.Publication.id,
        title=publication.Publication.title,
        description=publication.Publication.description,
        event_type_title=publication.EventType.title,
        created_at=publication.Publication.date,
        author=publication.Publication.uid_keycloak_user,
        likes=randint(0, 100),
    ) for publication in publications]


def create_post(post: CreatePostModel, session: Session, user: User):
    publication = PublicationModel(
        title=post.title,
        description=post.description,
        event_type_id=post.event_type_id,
        uid_keycloak_user=user.id,
        created_at=datetime.now().timestamp(),
    )
    try:
        session.add(publication)
        session.commit()
    except Exception as e:
        print(e)
    return CreatedModel(
        id=publication.id,
    )


def get_event_type(session: Session) -> list[EventTypeResponse]:
    EventTypes = session.query(
        EventType
    ).all()
    response = [EventTypeResponse(title=event_type.title) for event_type in EventTypes]
    return response


def get_city(session: Session) -> list[CityResponse]:
    citys = session.query(
        City
    ).all()
    response = [
        CityResponse(
            id=city.id,
            name=city.name,
            )
        for city in citys]
    return response


def get_university(session: Session, city_id: Optional[int]) -> list[UniversityResponse]:
    args_filters = []
    if city_id:
        args_filters.append(~University.city_id.is_(city_id))
    universitys = session.query(
        University
    ).filter(*args_filters)
    response = [
        UniversityResponse(
            id=university.id,
            title=university.title,
            description=university.description,
            rating=randint(0, 100),
            )
        for university in universitys]
    response = response.sort(lambda UniversityResponse: UniversityResponse.rating)
    return response


def get_faculty(session: Session, university_id: Optional[int]) -> list[FacultyResponse]:
    kwargs_filters = {}
    if university_id:
        kwargs_filters.update({
            Faculty.university_id: university_id
        })
    facultys = session.query(
        Faculty
    ).filter(**kwargs_filters)
    response = [
        FacultyResponse(
            id=faculty.id,
            title=faculty.title,
            description=faculty.description
            )
        for faculty in facultys]
    return response


def get_department(session: Session, faculty_id: Optional[int]) -> list[DepartmentResponse]:
    kwargs_filters = {}
    if faculty_id:
        kwargs_filters.update({
            Department.faculty_id: faculty_id
        })
    departments = session.query(
        Department
    ).filter(**kwargs_filters)
    response = [
        DepartmentResponse(
            id=department.id,
            title=department.title,
            description=department.description
            )
        for department in departments]
    return response


def get_group(session: Session, department_id: Optional[int]) -> list[GroupResponse]:
    kwargs_filters = {}
    if department_id:
        kwargs_filters.update({
            Group.department_id: department_id
        })
    groups = session.query(
        Group
    ).filter(**kwargs_filters)
    response = [
        GroupResponse(
            id=group.id,
            title=group.title,
            description=group.description
            )
        for group in groups]
    return response
