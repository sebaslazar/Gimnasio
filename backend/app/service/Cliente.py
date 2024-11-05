from sqlalchemy.future import select
from app.model import Cliente
from app.config import db


class ServicioCliente:

    @staticmethod
    async def buscar_perfil_de_cliente(correo: str):
        query = select(Cliente).where(Cliente.correo == correo)
        return (await db.execute(query)).mappings().one()
