from typing import TypeVar, Generic
from sqlalchemy import update as sql_update, delete as sql_delete
from sqlalchemy.future import select
from app.config import db, commit_rollback

T = TypeVar('T')


class BaseRepo:
    model = Generic[T]

    @classmethod
    async def crear(cls, **kwargs):
        model = cls.model(**kwargs)
        db.add(model)
        await commit_rollback()
        return model

    @classmethod
    async def buscar_todo(cls):
        query = select(cls.model)
        return (await db.execute(query)).scalars().all

    @classmethod
    async def buscar_por_id(cls, model_id: str, name_id: str):
        query = select(cls.model).where(getattr(cls.model, name_id) == model_id)
        return (await db.execute(query)).scalar_one_or_none()

    @classmethod
    async def actualizar_por_id(cls, model_id: str, name_id: str, **kwargs):
        query = sql_update(cls.model).where(getattr(cls.model, name_id) == model_id).values(**kwargs).execution_options(
            synchronize_session="fetch")
        await db.execute(query)
        await commit_rollback()

    @classmethod
    async def eliminar_por_id(cls, model_id: str):
        query = sql_delete(cls.model).where(cls.model.id == model_id)
        await db.execute(query)
        await commit_rollback()
