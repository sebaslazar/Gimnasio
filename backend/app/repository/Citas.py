from sqlalchemy.future import select


from app.model.Citas import Cita
from app.repository.base_repo import BaseRepo
from app.config import db, commit_rollback


class CitaRepository(BaseRepo):
    model = Cita

    @staticmethod
    async def encontrar_id_cliente(id_cliente: str):
        query = select(Cita).where(Cita.ID_cliente == id_cliente)
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def encontrar_id_actividad(id_actividad: str):
        query = select(Cita).where(Cita.ID_actividad == id_actividad)
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def encontrar_id_entrenador(id_entrenador: str):
        query = select(Cita).where(Cita.ID_entrenador == id_entrenador)
        return (await db.execute(query)).scalar_one_or_none()
