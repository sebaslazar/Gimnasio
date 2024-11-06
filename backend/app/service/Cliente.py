from sqlalchemy.future import select
from app.model import Cliente
from app.config import db


class ServicioCliente:

    @staticmethod
    async def buscar_perfil_de_cliente(id_cliente: str):
        query = select(Cliente).where(Cliente.ID_cliente == id_cliente)
        return (await db.execute(query)).scalar_one_or_none()
