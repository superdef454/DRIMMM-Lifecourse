from django.db import models


# приложение Lifecourse


# university (Университет)
# title: str
# description: str null=true
# image: image
# images: image
# city: f-key

# faculty (факультет)
# university: f-key
# title: str
# description null=true

# department (кафедрa)
# faculty: f-key
# title: str
# description: str null=true

# group (группа)
# department f-key
# title: str
# description: str null=true
# course: int (курс)

# city (город)
# name: str



# student (Студент)
# uid_keycloak_user: str
# group: f-key null=true
# city: f-key
# image: image
# description null=true

# section (разделы: наука; спорт; творчество; волонтерство.)
# title: str

# achievement (рейтинг студента)
# date: date (дата присвоения)
# event: f-key
# stars_count: int (0-100)
# description: str (фича: писать номер места, или типа (ты был чууууууть-чуть близко к победе и т.п.))

# LegalDocument (Документы)
# document_type: str (authorisation, registration, ...)
# enabled: bool (включен или нет)
# version: str (версия документа)
# word_file: file (сам файл документа для подписания)

# LegalDocumentAcceptance (согласования факта участия в мероприятии)
# LegalDocument: f-key
# accepted_at: date
# uid_keycloak_user: str

# filter (фильтры пользователей)
# uid_keycloak_user: str
# filter_json: jsonfield



# organization
# name: str
# logo: image
# description: str null=true

# agent (представитель)
# uid_keycloak_user: str
# city: f-key
# organization: f-key
# image: image
# post: str (должность)
# description: str null=true



# event_type (TODO назвать по-другому (раздел достижений))
# title: str (спортивные, творческие, научная, волонтерская)
# value: int (ценность)

# event (мероприятие)
# event_types: f-key
# date: date
# name: str
# description: str null=true
# university: f-key null=true

# statement (заявления на на добавление рейтинга с выбором конкретного мероприятия из списка.)
# date: date
# uid_keycloak_user_create: str
# uid_keycloak_user_target: str
# status: int choices=[(1, 'create'), (2, 'canceled'), (3, 'accepted')]
# comment: str null=true
# event: f-key



# Приложение Newsline


# Publication
# uid_keycloak_user: str (кто опубликовал)
# datetime: datetime
# description: str

# like
# Publication: f-key
# id_keycloak_user: int

# UserFavorite (Избранное пользователя)
# uid_keycloak_user: str
# ids_keycloak_favorites: list[int]
