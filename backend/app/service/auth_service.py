from datetime import datetime
from sqlalchemy.future import select
from sqlalchemy.orm import defer
from passlib.context import CryptContext
from fastapi import HTTPException
from app.config import db

from app.schema import SchemaRegistrar, SchemaLogin, SchemaEliminar
from app.model import Cliente, Administrador, Entrenador
from app.repository.Cliente import ClienteRepository
from app.repository.Administradores import AdministradorRepository
from app.repository.Entrenadores import EntrenadorRepository
from app.repository.auth_repo import JWTRepo

# Contraseña encriptada
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthService:

    @staticmethod
    async def servicio_de_login(login: SchemaLogin):
        if login.rango == "Cliente":
            _cliente = await ClienteRepository.buscar_por_correo(login.correo)
            if _cliente is not None:
                if not pwd_context.verify(login.password, _cliente.password):
                    raise HTTPException(status_code=400, detail="Contraseña inválida")
                return JWTRepo(data={"ID": _cliente.ID_cliente, "Rango": _cliente.rango}).generar_token()
            raise HTTPException(status_code=404, detail="El cliente no existe")
        elif login.rango == "Administrador":
            _administrador = await AdministradorRepository.buscar_por_correo(login.correo)
            if _administrador is not None:
                if not pwd_context.verify(login.password, _administrador.password):
                    raise HTTPException(status_code=400, detail="Contraseña inválida")
                return JWTRepo(data={"ID": _administrador.ID_admin, "Rango": _administrador.rango}).generar_token()
            raise HTTPException(status_code=404, detail="El administrador no existe")
        elif login.rango == "Entrenador":
            _entrenador = await EntrenadorRepository.buscar_por_correo(login.correo)
            if _entrenador is not None:
                if not pwd_context.verify(login.password, _entrenador.password):
                    raise HTTPException(status_code=400, detail="Contraseña inválida")
                return JWTRepo(data={"ID": _entrenador.ID_entrenador, "Rango": _entrenador.rango}).generar_token()
            raise HTTPException(status_code=404, detail="El entrenador no existe")
        else:
            raise HTTPException(status_code=404, detail="Rango inválido")

    @staticmethod
    async def servicio_de_registro_de_cliente(registro: SchemaRegistrar):

        # Convierte fecha de nacimiento de str a date
        fecha_nacimiento_con_date = datetime.strptime(registro.fecha_nacimiento, '%d-%m-%Y')

        # Asigna datos para realizar la solicitud a la tabla
        _cliente = Cliente(ID_cliente=registro.ID, password=pwd_context.hash(registro.password),
                           sexo=registro.sexo, nombre=registro.nombre, segundo_nombre=registro.segundo_nombre,
                           apellido=registro.apellido, segundo_apellido=registro.segundo_apellido,
                           fecha_nacimiento=fecha_nacimiento_con_date, correo=registro.correo,
                           telefono=registro.telefono, direccion=registro.direccion, activo=True,
                           peso=registro.peso, altura=registro.altura, ID_titular=None, rango="Cliente")

        no_existe_usuario = await verificacion_pre_registro(registro.ID, registro.correo)

        if no_existe_usuario:
            await ClienteRepository.crear(**_cliente.model_dump())

    @staticmethod
    async def servicio_de_registro_de_entrenador(registro: SchemaRegistrar):

        # Convierte fecha de nacimiento de str a date
        fecha_nacimiento_con_date = datetime.strptime(registro.fecha_nacimiento, '%d-%m-%Y')

        # Asigna datos para realizar la solicitud a la tabla
        _entrenador = Entrenador(ID_entrenador=registro.ID, password=pwd_context.hash(registro.password),
                                 sexo=registro.sexo, nombre=registro.nombre, segundo_nombre=registro.segundo_nombre,
                                 apellido=registro.apellido, segundo_apellido=registro.segundo_apellido,
                                 fecha_nacimiento=fecha_nacimiento_con_date, correo=registro.correo,
                                 telefono=registro.telefono, direccion=registro.direccion,
                                 especialidad=registro.especialidad, activo=True, rango="Entrenador")

        no_existe_usuario = await verificacion_pre_registro(registro.ID, registro.correo)

        if no_existe_usuario:
            await EntrenadorRepository.crear(**_entrenador.model_dump())

    @staticmethod
    async def servicio_de_registro_de_administrador(registro: SchemaRegistrar):

        # Convierte fecha de nacimiento de str a date
        fecha_nacimiento_con_date = datetime.strptime(registro.fecha_nacimiento, '%d-%m-%Y')

        # Asigna datos para realizar la solicitud a la tabla
        _administrador = Administrador(ID_admin=registro.ID, password=pwd_context.hash(registro.password),
                                       sexo=registro.sexo, nombre=registro.nombre,
                                       segundo_nombre=registro.segundo_nombre, apellido=registro.apellido,
                                       segundo_apellido=registro.segundo_apellido,
                                       fecha_nacimiento=fecha_nacimiento_con_date, correo=registro.correo,
                                       direccion=registro.direccion, telefono=registro.telefono, rango="Administrador")

        no_existe_usuario = await verificacion_pre_registro(registro.ID, registro.correo)

        if no_existe_usuario:
            await AdministradorRepository.crear(**_administrador.model_dump())

    @staticmethod
    async def conseguir_info_de_cliente(id_cliente: str):
        query = select(Cliente).where(Cliente.ID_cliente == id_cliente).options(defer(Cliente.password))
        _cliente = (await db.execute(query)).scalar_one_or_none()
        if _cliente:
            return _cliente
        else:
            raise HTTPException(status_code=404, detail="El cliente no existe")

    @staticmethod
    async def conseguir_info_de_entrenador(id_entrenador: str):
        query = select(Entrenador).where(Entrenador.ID_entrenador == id_entrenador).options(defer(Entrenador.password))
        _entrenador = (await db.execute(query)).scalar_one_or_none()
        if _entrenador:
            return _entrenador
        else:
            raise HTTPException(status_code=404, detail="El entrenador no existe")

    @staticmethod
    async def conseguir_info_de_administrador(id_admin: str):
        query = select(Administrador).where(Administrador.ID_admin == id_admin).options(defer(Administrador.password))
        _admin = (await db.execute(query)).scalar_one_or_none()
        if _admin:
            return _admin
        else:
            raise HTTPException(status_code=404, detail="El administrador no existe")

    @staticmethod
    async def actualizar_perfil_de_cliente(cliente: SchemaRegistrar):
        _cliente = await ClienteRepository.buscar_por_id(cliente.ID, "ID_cliente")
        if _cliente:
            info_cliente = dict(cliente)
            info_cliente["password"] = pwd_context.hash(info_cliente["password"])
            del info_cliente['activo']
            del info_cliente['especialidad']
            del info_cliente['fecha_nacimiento']
            del info_cliente['ID']
            await ClienteRepository.actualizar_por_id(model_id=cliente.ID, name_id="ID_cliente", **info_cliente)
        else:
            raise HTTPException(status_code=404, detail="El cliente no existe")

    @staticmethod
    async def actualizar_perfil_de_entrenador(entrenador: SchemaRegistrar):
        _entrenador = await EntrenadorRepository.buscar_por_id(entrenador.ID, "ID_entrenador")
        if _entrenador:
            info_entrenador = dict(entrenador)
            info_entrenador['password'] = pwd_context.hash(info_entrenador['password'])
            del info_entrenador['peso']
            del info_entrenador['altura']
            del info_entrenador['fecha_nacimiento']
            del info_entrenador['ID']
            await EntrenadorRepository.actualizar_por_id(model_id=entrenador.ID, name_id="ID_entrenador", **info_entrenador)
        else:
            raise HTTPException(status_code=404, detail="El entrenador no existe")

    @staticmethod
    async def actualizar_perfil_de_administrador(administrador: SchemaRegistrar):
        _administrador = await AdministradorRepository.buscar_por_id(administrador.ID, "ID_admin")
        if _administrador:
            info_administrador = dict(administrador)
            info_administrador['password'] = pwd_context.hash(info_administrador['password'])
            del info_administrador['especialidad']
            del info_administrador['peso']
            del info_administrador['altura']
            del info_administrador['activo']
            del info_administrador['fecha_nacimiento']
            del info_administrador['ID']
            await AdministradorRepository.actualizar_por_id(model_id=administrador.ID, name_id="ID_admin", **info_administrador)
        else:
            raise HTTPException(status_code=404, detail="El administrador no existe")

    @staticmethod
    async def eliminar_perfil_de_cliente(cliente: SchemaEliminar):
        _cliente = await ClienteRepository.buscar_por_id(cliente.ID, "ID_cliente")
        if _cliente:
            await ClienteRepository.eliminar_por_id(model_id=cliente.ID, name_id="ID_cliente")
        else:
            raise HTTPException(status_code=404, detail="El cliente no existe")

    @staticmethod
    async def eliminar_perfil_de_entrenador(entrenador: SchemaEliminar):
        _entrenador = await EntrenadorRepository.buscar_por_id(entrenador.ID, "ID_entrenador")
        if _entrenador:
            await EntrenadorRepository.eliminar_por_id(model_id=entrenador.ID, name_id="ID_entrenador")
        else:
            raise HTTPException(status_code=404, detail="El entrenador no existe")

    @staticmethod
    async def eliminar_perfil_de_administrador(administrador: SchemaEliminar):
        _administrador = await AdministradorRepository.buscar_por_id(administrador.ID, "ID_admin")
        if _administrador:
            await AdministradorRepository.eliminar_por_id(model_id=administrador.ID, name_id="ID_admin")
        else:
            raise HTTPException(status_code=404, detail="El administrador no existe")


# Genera el administrador principal
async def generar_administrador_principal():
    _admin = await AdministradorRepository.buscar_por_id("0000000000", "ID_admin")
    if not _admin:
        _main_admin = Administrador(ID_admin="0000000000", password=pwd_context.hash("Password_principal"),
                                    sexo="MASCULINO", nombre="Nombre_principal",
                                    segundo_nombre="Segundo_nombre_principal", apellido="Apellido_principal",
                                    segundo_apellido="Segundo_apellido_principal",
                                    fecha_nacimiento=datetime.strptime("28-01-2023", '%d-%m-%Y'),
                                    correo="Principal_correo@gmail.com", direccion="Cra. 27 #10-02",
                                    telefono="1000000000", rango="Administrador")
        await AdministradorRepository.crear(**_main_admin.model_dump())


async def verificacion_pre_registro(registro_id: str, registro_correo: str):

    # Verifica si el ID ya está registrado
    _ID_usuario = await ClienteRepository.buscar_por_id(registro_id, "ID_cliente")
    if not _ID_usuario:
        _ID_usuario = await EntrenadorRepository.buscar_por_id(registro_id, "ID_entrenador")
        if not _ID_usuario:
            _ID_usuario = await AdministradorRepository.buscar_por_id(registro_id, "ID_admin")
            if _ID_usuario:
                raise HTTPException(status_code=400, detail="Ya hay un administrador registrado con esa cédula")
        else:
            raise HTTPException(status_code=400, detail="Ya hay un entrenador registrado con esa cédula")
    else:
        raise HTTPException(status_code=400, detail="Ya hay un cliente registrado con esa cédula")

    # Verifica si el correo ya está registrado
    _correo_usuario = await ClienteRepository.buscar_por_correo(registro_correo)
    if not _correo_usuario:
        _correo_usuario = await EntrenadorRepository.buscar_por_correo(registro_correo)
        if not _correo_usuario:
            _correo_usuario = await AdministradorRepository.buscar_por_correo(registro_correo)
            if _correo_usuario:
                raise HTTPException(status_code=400, detail="Ya hay un administrador registrado con ese correo")
            else:
                return True
        else:
            raise HTTPException(status_code=400, detail="Ya hay un entrenador registrado con ese correo")
    else:
        raise HTTPException(status_code=400, detail="Ya hay un cliente registrado con ese correo")
