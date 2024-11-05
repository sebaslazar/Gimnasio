from uuid import uuid4
from datetime import datetime
from fastapi import HTTPException

from passlib.context import CryptContext
from app.schema import SchemaRegistrar, SchemaLogin
from app.model import Cliente, Administrador
from app.repository.Cliente import ClienteRepository
from app.repository.Administradores import AdministradorRepository
from app.repository.auth_repo import JWTRepo

# Contraseña encriptada
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthService:

    @staticmethod
    async def servicio_de_registro_de_cliente(registro: SchemaRegistrar):

        # Convertir fecha de nacimiento de str a date
        fecha_nacimiento_con_date = datetime.strptime(registro.fecha_nacimiento, '%d-%m-%Y')

        # Asigna datos para realizar la solicitud a la tabla
        _cliente = Cliente(ID_cliente=registro.ID_cliente, password=pwd_context.hash(registro.password),
                           sexo=registro.sexo, nombre=registro.nombre, segundo_nombre=registro.segundo_nombre,
                           apellido=registro.apellido, segundo_apellido=registro.segundo_apellido,
                           fecha_nacimiento=fecha_nacimiento_con_date, correo=registro.correo,
                           telefono=registro.telefono, direccion=registro.direccion, activo=True,
                           peso=registro.peso, altura=registro.altura, ID_titular=None)

        # Verifica si el ID ya está registrado
        _ID_cliente = await ClienteRepository.buscar_por_id(registro.ID_cliente)
        if _ID_cliente:
            raise HTTPException(status_code=400, detail="El usuario ya existe")

        # Verifica si el correo ya está registrado
        _correo = await ClienteRepository.buscar_por_correo(registro.correo)
        if _correo:
            raise HTTPException(status_code=400, detail="El correo ya existe")
        else:
            await ClienteRepository.crear(**_cliente.model_dump())

    @staticmethod
    async def servicio_de_login(login: SchemaLogin):
        _cliente = await ClienteRepository.buscar_por_correo(login.correo)
        if _cliente is not None:
            if not pwd_context.verify(login.password, _cliente.password):
                raise HTTPException(status_code=400, detail="Contraseña inválida")
            return JWTRepo(data={"ID_cliente": _cliente.ID_cliente}).generar_token()
        raise HTTPException(status_code=400, detail="El cliente no existe")


# Genera el administrador principal
async def generar_administrador_principal():
    _admin = await AdministradorRepository.buscar_id("0000000000")
    if not _admin:
        _main_admin = Administrador(ID_admin="0000000000", password=pwd_context.hash("Password_principal"),
                                    sexo="MASCULINO", nombre="Nombre_principal",
                                    segundo_nombre="Segundo_nombre_principal", apellido="Apellido_principal",
                                    segundo_apellido="Segundo_apellido_principal",
                                    fecha_nacimiento=datetime.strptime("28-01-2023", '%d-%m-%Y'),
                                    correo="Principal_correo@gmail.com", direccion="Cra. 27 #10-02",
                                    telefono="1000000000")
        await AdministradorRepository.crear(**_main_admin.model_dump())
