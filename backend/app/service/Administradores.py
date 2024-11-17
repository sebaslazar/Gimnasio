from sqlalchemy.future import select
from sqlalchemy.orm import defer
from app.model import Administrador
from app.config import db
from fastapi import HTTPException

from app.schema import SchemaProveedor, SchemaEliminar
from app.model.Proveedores import Proveedor
from app.repository.Administradores import AdministradorRepository
from app.repository.Cliente import ClienteRepository
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

    @staticmethod
    async def modificar_proveedor(registro: SchemaProveedor):
        _proveedor = await ProveedorRepository.buscar_por_id(model_id=registro.ID_proveedor, name_id="ID_proveedor")
        if _proveedor:
            _admin = await AdministradorRepository.buscar_por_id(model_id=registro.ID_admin_creador, name_id="ID_admin")
            if _admin:
                info_proveedor = dict(registro)
                del info_proveedor['ID_proveedor']
                del info_proveedor['ID_admin_creador']
                await ProveedorRepository.actualizar_por_id(model_id=registro.ID_proveedor, name_id="ID_proveedor",
                                                            **info_proveedor)
            else:
                raise HTTPException(status_code=404, detail="El administrador no existe")
        else:
            raise HTTPException(status_code=404, detail="El proveedor no existe")

    @staticmethod
    async def eliminar_proveedor(registro: SchemaEliminar):
        _proveedor = await ProveedorRepository.buscar_por_id(model_id=registro.ID, name_id="ID_proveedor")
        if _proveedor:
            await ProveedorRepository.eliminar_por_id(model_id=registro.ID, name_id="ID_proveedor")
        else:
            raise HTTPException(status_code=404, detail="El proveedor no existe")

    @staticmethod
    async def consultar_lista_de_proveedores():
        resultado = await ProveedorRepository.buscar_todo("nombre")
        resultado_lista = list(resultado)
        if not resultado_lista:
            raise HTTPException(status_code=404, detail="No existen proveedores")
        else:
            return resultado_lista

    @staticmethod
    async def consultar_lista_de_clientes():
        resultado = await ClienteRepository.buscar_todo("nombre")
        resultado_lista = list(resultado)
        if not resultado_lista:
            raise HTTPException(status_code=404, detail="No existen clientes")
        else:
            return resultado_lista
