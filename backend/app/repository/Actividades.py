from sqlalchemy.future import select
from sqlalchemy import update as sql_update, delete as sql_delete

from app.model.Actividades import Actividad
from app.repository.base_repo import BaseRepo
from app.config import db, commit_rollback


class ActividadRepositorio(BaseRepo):
    model = Actividad

    @staticmethod
    async def encontrar_por_nombre(nombre: str):
        query = select(Actividad).where(Actividad.nombre == nombre)
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def actualizar_datos_por_nombre(nombre: str, descripcion: str, precio: int):
        query = (sql_update(Actividad).where(Actividad.nombre == nombre).
                 values(nombre=nombre, descripcion=descripcion, precio=precio).
                 execution_options(synchronize_session="fetch"))
        await db.execute(query)
        await commit_rollback()

    @staticmethod
    async def eliminar_por_nombre(nombre: str):
        query = sql_delete(Actividad).where(Actividad.nombre == nombre)
        await db.execute(query)
        await commit_rollback()
