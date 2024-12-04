from sqlalchemy.future import select
from sqlalchemy.orm import defer
from app.model import Administrador
from app.config import db
from uuid import uuid4
from fastapi import HTTPException

from app.schema import SchemaProveedor, SchemaEliminar, SchemaEstado, SchemaMembresia
from app.model.Proveedores import Proveedor
from app.model.Membresias import Membresia
from app.repository.Administradores import AdministradorRepository
from app.repository.Cliente import ClienteRepository
from app.repository.Entrenadores import EntrenadorRepository
from app.repository.Proveedores import ProveedorRepository
from app.repository.Membresias import MembresiaRepository
from app.service.Cliente import ServicioCliente
from app.service.Entrenadores import ServicioEntrenador


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
        resultado = await ProveedorRepository.buscar_todo("nombre", ['ID_proveedor', 'nombre',
                                                                     'telefono', 'direccion'])
        resultado_lista = list(resultado)
        if not resultado_lista:
            raise HTTPException(status_code=404, detail="No existen proveedores")
        else:
            return resultado_lista

    @staticmethod
    async def consultar_lista_de_clientes():
        resultado = await ClienteRepository.buscar_todo("nombre", ['ID_cliente', 'nombre',
                                                                   'telefono', 'sexo'])
        resultado_lista = list(resultado)
        if not resultado_lista:
            raise HTTPException(status_code=404, detail="No existen clientes")
        else:
            return resultado_lista

    @staticmethod
    async def consultar_lista_de_entrenadores():
        resultado = await EntrenadorRepository.buscar_todo("nombre", ['ID_entrenador',
                                                                      'nombre', 'telefono', 'sexo'])
        resultado_lista = list(resultado)
        if not resultado_lista:
            raise HTTPException(status_code=404, detail="No existen entrenadores")
        else:
            return resultado_lista

    @staticmethod
    async def consultar_lista_de_administradores():
        resultado = await AdministradorRepository.buscar_todo("nombre", ['ID_admin', 'nombre',
                                                                         'telefono', 'sexo'])
        resultado_lista = list(resultado)
        if not resultado_lista:
            raise HTTPException(status_code=404, detail="No existen administradores")
        else:
            return resultado_lista

    @staticmethod
    async def actualizar_estado_cliente(nuevo_estado: SchemaEstado):
        _cliente = await ClienteRepository.buscar_por_id(model_id=nuevo_estado.ID, name_id="ID_cliente")
        if _cliente:
            resultado_lista = dict(nuevo_estado)
            del resultado_lista['ID']
            await ClienteRepository.actualizar_por_id(model_id=nuevo_estado.ID, name_id="ID_cliente",
                                                      **resultado_lista)
        else:
            raise HTTPException(status_code=404, detail="El cliente no existe")

    @staticmethod
    async def actualizar_estado_entrenador(nuevo_estado: SchemaEstado):
        _entrenador = await EntrenadorRepository.buscar_por_id(model_id=nuevo_estado.ID, name_id="ID_entrenador")
        if _entrenador:
            resultado_lista = dict(nuevo_estado)
            del resultado_lista['ID']
            await EntrenadorRepository.actualizar_por_id(model_id=nuevo_estado.ID, name_id="ID_entrenador",
                                                         **resultado_lista)
        else:
            raise HTTPException(status_code=404, detail="El entrenador no existe")

    @staticmethod
    async def conseguir_info_de_cliente(id_cliente: str):
        _cliente = await ServicioCliente.buscar_perfil_de_cliente(id_cliente)
        if _cliente:
            return _cliente
        else:
            raise HTTPException(status_code=404, detail="El cliente no existe")

    @staticmethod
    async def conseguir_info_de_entrenador(id_entrenador: str):
        _entrenador = await ServicioEntrenador.buscar_perfil_de_entrenador(id_entrenador)
        if _entrenador:
            return _entrenador
        else:
            raise HTTPException(status_code=404, detail="El entrenador no existe")

    @staticmethod
    async def conseguir_info_de_proveedor(id_proveedor: str):
        query = select(Proveedor).where(Proveedor.ID_proveedor == id_proveedor)
        resultado_consulta = (await db.execute(query)).scalar_one_or_none()
        if resultado_consulta is not None:
            return resultado_consulta
        else:
            raise HTTPException(status_code=404, detail="El proveedor no existe")

    @staticmethod
    async def agregar_membresia(registro: SchemaMembresia):
        _administrador = await AdministradorRepository.buscar_por_id(model_id=registro.ID_admin_creador,
                                                                     name_id="ID_admin")
        if _administrador:

            _nombre_membresia = await MembresiaRepository.buscar_por_nombre(registro.nombre)
            if not _nombre_membresia:

                _id_membresia = str(uuid4())

                _membresia = Membresia(ID_membresia=_id_membresia, ID_admin_creador=registro.ID_admin_creador,
                                       nombre=registro.nombre, descripcion=registro.descripcion,
                                       descuento=registro.descuento, max_miembros=registro.max_miembros,
                                       precio=registro.precio, duracion_meses=registro.duracion_meses)

                await MembresiaRepository.crear(**_membresia.model_dump())

            else:
                raise HTTPException(status_code=404, detail="Ya existe una membresía con ese nombre")

        else:
            raise HTTPException(status_code=404, detail="El administrador no existe")

    @staticmethod
    async def consultar_lista_de_membresias():
        resultado = await MembresiaRepository.buscar_todo("nombre", ["nombre", "ID_membresia",
                                                                     "precio", "duracion_meses"])
        resultado_lista = list(resultado)
        if not resultado_lista:
            raise HTTPException(status_code=404, detail="No existen membresias")
        else:
            return resultado_lista

