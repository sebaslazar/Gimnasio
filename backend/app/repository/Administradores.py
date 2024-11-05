from sqlalchemy.future import select
from sqlalchemy import update as sql_update
from typing import List

from app.model.Administradores import Administrador
from app.repository.base_repo import BaseRepo
from app.config import db, commit_rollback


class AdministradorRepository(BaseRepo):
    model = Administrador

    @staticmethod
    async def buscar_por_correo(correo: str):
        query = select(Administrador).where(Administrador.correo == correo)
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def buscar_id(id_admin: str):
        query = select(Administrador).where(Administrador.ID_admin == id_admin)
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def buscar_por_nombre(nombre: str):
        query = select(Administrador).where(Administrador.nombre == nombre)
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def actualizar_password(correo: str, password: str):
        query = sql_update(Administrador).where(Administrador.correo == correo).values(password=password).\
            execution_options(synchronize_session="fetch")
        await db.execute(query)
        await commit_rollback()

    @staticmethod
    async def buscar_por_lista_de_identificadores(identificadores: List[str]):
        query = select(Administrador).where(Administrador.nombre.in_(identificadores))
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def crear_lista_de_administradores(admins: List[Administrador]):
        db.add_all(admins)
        await commit_rollback()
