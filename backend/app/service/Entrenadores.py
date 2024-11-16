from sqlalchemy.future import select
from sqlalchemy.orm import defer
from app.model.Entrenadores import Entrenador
from app.config import db


class ServicioEntrenador:

    @staticmethod
    async def buscar_perfil_de_entrenador(id_entrenador: str):
        query = select(Entrenador).where(Entrenador.ID_entrenador == id_entrenador).options(defer(Entrenador.password))
        return (await db.execute(query)).scalar_one_or_none()
