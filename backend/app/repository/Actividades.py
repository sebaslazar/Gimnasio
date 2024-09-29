from typing import List
from sqlalchemy.future import select

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
    async def encontrar_por_lista_nombre(nombre: List[str]):
        query = select(Actividad).where(Actividad.nombre.in_(nombre))
        return (await db.execute(query)).scalars().all()

    @staticmethod
    async def crear_lista(nombre: List[Actividad]):
        db.add_all(nombre)
        await commit_rollback()
