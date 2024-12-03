from sqlalchemy.future import select
from sqlalchemy import update as sql_update
from sqlalchemy.orm import load_only


from app.model import Cliente, Membresia, CompraMembresia
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

    @staticmethod
    async def generar_lista_de_membresias_compradas(id_cliente: str):
        query = (select(Membresia)
                 .join(CompraMembresia, Membresia.ID_membresia == CompraMembresia.ID_membresia)
                 .join(Cliente, CompraMembresia.ID_comprador == Cliente.ID_cliente)
                 .where(Cliente.ID_cliente == id_cliente)
                 .options(load_only(Membresia.nombre,
                                    Membresia.descripcion,
                                    Membresia.max_miembros,
                                    Membresia.duracion_meses,
                                    Membresia.descuento)))
        return (await db.execute(query)).scalars().all()

    @staticmethod
    async def consultar_membresia_comprada(id_cliente: str, id_membresia: str):
        query = (select(CompraMembresia)
                 .join(Cliente, CompraMembresia.ID_comprador == Cliente.ID_cliente)
                 .join(Membresia, CompraMembresia.ID_membresia == Membresia.ID_membresia)
                 .where(Cliente.ID_cliente == id_cliente, Membresia.ID_membresia == id_membresia))
        return (await db.execute(query)).scalars().all()

