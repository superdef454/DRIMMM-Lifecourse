from sqladmin import ModelView
from .models import Department, EventType, Faculty, Group, Publication, Student, City, University


def format_uid_keycloak_user(uid_keycloak_user, *args, **kwargs) -> str:
    print(args, kwargs)
    # TODO Поправить на создание ссылки для перехода в keycloak
    return f"{uid_keycloak_user}"


class StudentAdmin(ModelView, model=Student):
    name = "Студент"
    name_plural = "Студенты"
    form_include_pk = True
    column_list = [Student.uid_keycloak_user, Student.description, Student.image]
    column_searchable_list = [Student.uid_keycloak_user]
    column_formatters = {Student.uid_keycloak_user: format_uid_keycloak_user}


class CityAdmin(ModelView, model=City):
    name = "Город"
    name_plural = "Города"
    column_list = [City.id, City.name]
    column_sortable_list = [City.id, City.name]
    column_searchable_list = [City.id, City.name]
    column_default_sort = (City.id, False)


class UniversityAdmin(ModelView, model=University):
    name = "Университет"
    name_plural = "Университеты"
    column_list = [University.id, University.title]
    column_details_exclude_list = [University.image]
    column_sortable_list = [University.id, University.title]
    column_default_sort = (University.id, False)


class FacultyAdmin(ModelView, model=Faculty):
    name = "Факультет"
    name_plural = "Факультеты"
    column_list = [Faculty.id, Faculty.title]
    column_sortable_list = [Faculty.id, Faculty.title]
    column_default_sort = (Faculty.id, False)


class DepartmentAdmin(ModelView, model=Department):
    name = "Кафедрa"
    name_plural = "Кафедры"
    column_list = [Department.id, Department.title]
    column_sortable_list = [Department.id, Department.title]
    column_default_sort = (Department.id, False)


class GroupAdmin(ModelView, model=Group):
    name = "Группа"
    name_plural = "Группы"
    column_list = [Group.id, Group.title]
    column_sortable_list = [Group.id, Group.title]
    column_default_sort = (Group.id, False)


class EventTypeAdmin(ModelView, model=EventType):
    name = "Раздел достижений"
    name_plural = "Разделы достижений"
    column_list = "__all__"
    form_include_pk = True
    column_details_list = [EventType.title, EventType.value]
    column_sortable_list = [EventType.title, EventType.value]
    column_default_sort = (EventType.title, False)


class PublicationAdmin(ModelView, model=Publication):
    name = "Публикация"
    name_plural = "Публикации"
    column_list = "__all__"
    column_sortable_list = [Publication.id, Publication.title]
    column_default_sort = (Publication.id, True)
