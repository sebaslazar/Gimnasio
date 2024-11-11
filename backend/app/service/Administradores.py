from sqlalchemy.future import select
from sqlalchemy.orm import defer
from app.model import Administrador
from app.config import db

class ServicioAdministrador:

    @staticmethod
    async def buscar_perfil_de_administrador(id_cliente: str):
        query = select(Administrador).where(Administrador.ID_admin == id_cliente).options(defer(Administrador.password))
        return (await db.execute(query)).scalar_one_or_none()