from sqlalchemy.future import select
from sqlalchemy import update as sql_update


from app.model.Entrenadores import Entrenador
from app.repository.base_repo import BaseRepo
from app.config import db, commit_rollback


class EntrenadorRepository(BaseRepo):
    model = Entrenador

    @staticmethod
    async def buscar_por_nombre(nombre: str):
        query = select(Entrenador).where(Entrenador.nombre == nombre)
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def buscar_por_correo(correo: str):
        query = select(Entrenador).where(Entrenador.correo == correo)
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def actualizar_password(correo: str, password: str):
        query = select(Entrenador).where(Entrenador.correo == correo).values(password=password). \
            execution_options(synchronize_session="fetch")
        await db.execute(query)
        await commit_rollback()
