from sqlalchemy.future import select
from sqlalchemy import update as sql_update, delete as sql_delete


from app.model.Membresias import Membresia
from app.repository.base_repo import BaseRepo
from app.config import db, commit_rollback


class MembresiaRepository(BaseRepo):
    model = Membresia

    @staticmethod
    async def buscar_por_nombre(nombre: str):
        query = select(Membresia).where(Membresia.nombre == nombre)
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def actualizar_por_nombre(nombre: str, **kwargs):
        query = sql_update(Membresia).where(Membresia.nombre == nombre).values(**kwargs).\
            execution_options(synchronize_session="fetch")
        await db.execute(query)
        await commit_rollback()

    @staticmethod
    async def eliminar_por_nombre(nombre: str):
        query = select(Membresia).where(Membresia.nombre == nombre)
        await db.execute(query)
        await commit_rollback()
