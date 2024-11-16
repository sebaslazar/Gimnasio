from uuid import uuid4
from datetime import datetime
from fastapi import HTTPException

from passlib.context import CryptContext
from app.schema import SchemaRegistrar, SchemaLogin
from app.model import Cliente, Administrador, Entrenador
from app.repository.Cliente import ClienteRepository
from app.repository.Administradores import AdministradorRepository
from app.repository.Entrenadores import EntrenadorRepository
from app.repository.auth_repo import JWTRepo

# Contraseña encriptada
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthService:

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
        _administrador = Administrador(ID_admin=registro.ID, password=registro.password, sexo=registro.sexo,
                                       nombre=registro.nombre, segundo_nombre=registro.segundo_nombre,
                                       apellido=registro.apellido, segundo_apellido=registro.segundo_apellido,
                                       fecha_nacimiento=fecha_nacimiento_con_date, correo=registro.correo,
                                       direccion=registro.direccion, telefono=registro.telefono, rango="Administrador")

        no_existe_usuario = await verificacion_pre_registro(registro.ID, registro.correo)

        if no_existe_usuario:
            await AdministradorRepository.crear(**_administrador.model_dump())

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
