from sqlalchemy.future import select


from app.model.Entrenamientos import Entrenamiento
from app.repository.base_repo import BaseRepo
from app.config import db, commit_rollback


class EntrenamientoRepository(BaseRepo):
    model = Entrenamiento

    @staticmethod
    async def buscar_por_tipo(tipo: str):
        query = select(Entrenamiento).where(Entrenamiento.tipo == tipo)
        return (await db.execute(query)).scalars().all()

    @staticmethod
    async def buscar_por_id_cliente(id_cliente: str):
        query = select(Entrenamiento).where(Entrenamiento.ID_cliente == id_cliente)
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def buscar_por_id_entrenador(id_entrenador: str):
        query = select(Entrenamiento).where(Entrenamiento.ID_entrenador == id_entrenador)
        return (await db.execute(query)).scalars().all()
