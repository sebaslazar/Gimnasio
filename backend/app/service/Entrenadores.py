from sqlalchemy.future import select
from sqlalchemy.orm import defer
from app.model import Entrenadores
from app.config import db


class ServicioEntrenador:

    @staticmethod
    async def buscar_perfil_de_entrenador(id_entrenador: str):
        query = (select(Entrenadores).where(Entrenadores.ID_entrenador == id_entrenador).
                 options(defer(Entrenadores.password)))
        return (await db.execute(query)).scalar_one_or_none()
