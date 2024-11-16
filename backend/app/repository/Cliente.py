from sqlalchemy.future import select
from sqlalchemy import update as sql_update


from app.model.Cliente import Cliente
from app.repository.base_repo import BaseRepo
from app.config import db, commit_rollback


class ClienteRepository(BaseRepo):
    model = Cliente

    @staticmethod
    async def buscar_por_nombre(nombre: str):
        query = select(Cliente).where(Cliente.nombre == nombre)
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def buscar_por_correo(correo: str):
        query = select(Cliente).where(Cliente.correo == correo)
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def actualizar_password(correo: str, password: str):
        query = (sql_update(Cliente).where(Cliente.correo == correo).values(password=password).
                 execution_options(synchronize_session="fetch"))
        await db.execute(query)
        await commit_rollback()
