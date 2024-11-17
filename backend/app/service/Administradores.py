from sqlalchemy.future import select
from sqlalchemy.orm import defer
from app.model import Administrador
from app.config import db
from fastapi import HTTPException

from app.schema import SchemaProveedor
from app.model.Proveedores import Proveedor
from app.repository.Administradores import AdministradorRepository
from app.repository.Proveedores import ProveedorRepository


class ServicioAdministrador:

    @staticmethod
    async def buscar_perfil_de_administrador(id_admin: str):
        query = select(Administrador).where(Administrador.ID_admin == id_admin).options(defer(Administrador.password))
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def agregar_proveedor(registro: SchemaProveedor):
        _admin = await AdministradorRepository.buscar_por_id(model_id=registro.ID_admin_creador, name_id="ID_admin")
        if _admin:
            _id_proveedor = await ProveedorRepository.buscar_por_id(model_id=registro.ID_proveedor,
                                                                    name_id="ID_proveedor")
            if not _id_proveedor:
                _proveedor = Proveedor(ID_proveedor=registro.ID_proveedor, ID_admin_creador=registro.ID_admin_creador,
                                       nombre=registro.nombre, telefono=registro.telefono, direccion=registro.direccion,
                                       correo=registro.correo, producto=registro.producto)
                await ProveedorRepository.crear(**_proveedor.model_dump())
            else:
                raise HTTPException(status_code=404, detail="El proveedor ya existe")
        else:
            raise HTTPException(status_code=404, detail="El administrador no existe")
