from sqlalchemy.future import select
from typing import List


from app.model.Administradores import Administrador
from app.repository.base_repo import BaseRepo
from app.config import db, commit_rollback


class AdministradorRepository(BaseRepo):
    model = Administrador

    @staticmethod
    async def encontrar_por_correo(correo: str):
        query = select(Administrador).where(Administrador.correo == correo)
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def encontrar_por_nombre(nombre: str):
        query = select(Administrador).where(Administrador.nombre == nombre)
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def crear_administradores_por_defecto(admins: List[Administrador]):
        db.add_all(admins)
        await commit_rollback()
