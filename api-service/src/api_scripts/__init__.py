import asyncio
import datetime
import json
import random

import httpx
import pydantic
import pydantic_settings
from sqlalchemy import select

from api_service import models
from api_service import database

try:
    from itertools import batched
except ImportError:
    from itertools import islice

    def batched(iterable, n):
        # batched('ABCDEFG', 3) → ABC DEF G
        if n < 1:
            raise ValueError('n must be at least one')
        it = iter(iterable)
        while batch := tuple(islice(it, n)):
            yield batch


class BaseConfig(pydantic_settings.BaseSettings):

    model_config = pydantic_settings.SettingsConfigDict(
        env_file=('.env', '.env.prod')
    )

    vk_token: pydantic.SecretStr


class GrabPublicationsConfig(BaseConfig):
    publisher: pydantic.StrictStr
    vk_group: pydantic.StrictStr


class GrabUsersConfig(BaseConfig):
    vk_group: pydantic.StrictStr
    keycloak_token: pydantic.SecretStr
    keycloak_realm: pydantic.StrictStr
    keycloak_url: pydantic.AnyHttpUrl = 'http://keycloak:8080/auth'


class GrabUniversitiesConfig(BaseConfig):
    vk_group: pydantic.StrictStr


class BearerAuth(httpx.Auth):
    def __init__(self, token):
        self.token = token

    def auth_flow(self, request):
        request.headers['Authorization'] = f"Bearer {self.token}"
        yield request


async def grab_publications(config: GrabPublicationsConfig) -> None:

    event_types = database.session.scalars(select(models.EventType)).all()
    if not event_types:
        raise RuntimeError('Has no event types')

    async with httpx.AsyncClient(auth=BearerAuth(config.vk_token.get_secret_value()), params={'v': 5.199, 'lang': 'ru'}) as client:
        response = await client.post('https://api.vk.com/method/wall.get', params={'domain': config.vk_group})
        data = json.loads(response.content)
        items = data['response']['items']

        for item in items:
            if '\n\n' not in item['text']:
                continue
            title, description = item['text'].split('\n\n', maxsplit=1)
            date = datetime.datetime.fromtimestamp(item['date'])
            publication = models.Publication(
                title=title,
                description=description,
                event_type=random.choice(event_types),
                date=date,
                uid_keycloak_user=config.publisher,
            )

            database.session.add(publication)
            database.session.commit()


async def grab_users(config: GrabUsersConfig) -> None:
    async with (
        httpx.AsyncClient(auth=BearerAuth(config.vk_token.get_secret_value()), params={'v': 5.199, 'lang': 'ru'}) as vk_client,
        httpx.AsyncClient(auth=BearerAuth(config.keycloak_token.get_secret_value())) as keycloak_client,
    ):
        response = await vk_client.post('https://api.vk.com/method/groups.getMembers', params={'group_id': config.vk_group})
        data = json.loads(response.content)
        user_ids = data['response']['items']

        for batch in batched(user_ids, 500):
            response = await vk_client.post('https://api.vk.com/method/users.get', params={
                'fields': 'nickname,first_name,last_name,city,universities',
                'user_ids': ','.join(map(str, batch))
            })
            data = json.loads(response.content)
            users = data['response']
            for user in users:
                user = {
                    'enabled': True,
                    'username': user['nickname'] if user.get('nickname') else '.'.join(filter(None, (user['first_name'], user['last_name']))),
                    'firstName': user['first_name'],
                    'lastName': user['last_name'],
                    'realmRoles': ['student'] if user.get('universities') else [],
                    'attributes': {
                        'city': user['city']['title'] if user.get('city') else None,
                        'universities': [
                            {'name': it['name'], 'faculty_name': it.get('faculty_name'), 'chair_name': it.get('chair_name')}
                            for it in user.get('universities', [])
                        ]
                    }
                }
                response = await keycloak_client.post(f"{str(config.keycloak_url).removeprefix('/')}/admin/realms/{config.keycloak_realm}/users", json=user)
                # response.raise_for_status()


async def grab_universities(config: GrabUniversitiesConfig) -> None:
    async with httpx.AsyncClient(auth=BearerAuth(config.vk_token.get_secret_value()), params={'v': 5.199, 'lang': 'ru'}) as vk_client:
        response = await vk_client.post('https://api.vk.com/method/groups.getMembers', params={'group_id': config.vk_group})
        data = json.loads(response.content)
        user_ids = data['response']['items']

        with open('/tmp/osu.png', 'rb') as _f:
            image = _f.read()

        known_cities = {
            it.name: it
            for it in database.session.scalars(select(models.City)).all()
        }

        known_universities = {
            it.title: it
            for it in database.session.scalars(select(models.University)).all()
        }

        known_faculties = {
            it.title: it
            for it in database.session.scalars(select(models.Faculty)).all()
        }

        cities = {}
        for batch in batched(user_ids, 500):
            response = await vk_client.post('https://api.vk.com/method/users.get', params={
                'fields': 'city',
                'user_ids': ','.join(map(str, batch))
            })
            data = json.loads(response.content)
            users = data['response']
            for user in users:
                if city := user.get('city'):
                    title = city['title']
                    cities[title] = city['id']
                    if title not in known_cities:
                        city = models.City(name=title)
                        database.session.add(city)
                        database.session.commit()
                        known_cities[city.name] = city

        for title, city_id in cities.items():
            city = known_cities[title]
            response = await vk_client.post('https://api.vk.com/method/database.getUniversities', params={
                'q': '*',
                'country_id': 1,  # Russia
                'city_id': city_id,
            })
            data = json.loads(response.content)
            universities = data['response']['items']
            for university in universities:
                university_id = university['id']
                title = university['title']
                if title not in known_universities:
                    university = models.University(
                        title=title,
                        city=city,
                        image=image,
                    )
                    database.session.add(university)
                    database.session.commit()
                    known_universities[university.title] = university
                else:
                    university = known_universities[title]

                response = await vk_client.post('https://api.vk.com/method/database.getFaculties', params={
                    'university_id': university_id,
                })
                data = json.loads(response.content)
                faculties = data['response']['items']
                for faculty in faculties:
                    title = faculty['title']
                    if title not in known_faculties:
                        faculty = models.Faculty(
                            title=title,
                            university=university
                        )
                        database.session.add(faculty)
                        database.session.commit()
                        known_faculties[faculty.title] = faculty


def grab_publications_cli():
    config = GrabPublicationsConfig(
        publisher='d91f68ee-7d80-448b-ac85-0c1609ce83fc',  # admin с demo стенда
        vk_group='orenburg_university',  # группа ОГУ в VK (https://vk.com/orenburg_university)
    )
    asyncio.run(grab_publications(config))


def grab_users_cli():
    config = GrabUsersConfig(
        keycloak_realm='master',
        vk_group='orenburg_university',  # группа ОГУ в VK (https://vk.com/orenburg_university)
    )
    asyncio.run(grab_users(config))


def grab_universities_cli():
    config = GrabUniversitiesConfig(
        vk_group='orenburg_university',  # группа ОГУ в VK (https://vk.com/orenburg_university)
    )
    asyncio.run(grab_universities(config))


if __name__ == '__main__':
    grab_publications_cli()
    grab_universities_cli()
    grab_users_cli()
