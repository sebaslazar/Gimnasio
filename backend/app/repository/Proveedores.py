from sqlalchemy.future import select


from app.model.Proveedores import Proveedor
from app.repository.base_repo import BaseRepo
from app.config import db, commit_rollback


class ProveedorRepository(BaseRepo):
    model = Proveedor

    @staticmethod
    async def buscar_por_nombre(nombre: str):
        query = select(Proveedor).where(Proveedor.nombre == nombre)
        return (await db.execute(query)).scalars().all()

    @staticmethod
    async def buscar_por_id_creador(id_admin: str):
        query = select(Proveedor).where(Proveedor.ID_admin_creador == id_admin)
        return (await db.execute(query)).scalar_one_or_none()
