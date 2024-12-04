from fastapi import APIRouter, Depends, Security
from fastapi.security import HTTPAuthorizationCredentials

from app.repository.auth_repo import JWTBearer, JWTRepo
from app.schema import SchemaRespuesta
from app.service.Administradores import ServicioAdministrador
from app.service.Cliente import ServicioCliente
from app.service.Entrenadores import ServicioEntrenador
from app.service.Usuario import ServicioUsuario

router = APIRouter(prefix="/usuario",
                   tags=['Usuario'],
                   dependencies=[Depends(JWTBearer(rangos_requeridos="Administrador-Entrenador-Cliente"))])


@router.get("/", response_model=SchemaRespuesta, response_model_exclude_none=True)
async def conseguir_perfil_usuario(credenciales: HTTPAuthorizationCredentials =
                                   Security(JWTBearer("Administrador-Entrenador-Cliente"))):
    token_usuario = JWTRepo.extraer_token(credenciales)
    if token_usuario['Rango'] == "Cliente":
        resultado = await ServicioCliente.buscar_perfil_de_cliente(token_usuario['ID'])
    elif token_usuario['Rango'] == "Entrenador":
        resultado = await ServicioEntrenador.buscar_perfil_de_entrenador(token_usuario['ID'])
    else:
        resultado = await ServicioAdministrador.buscar_perfil_de_administrador(token_usuario['ID'])
    return SchemaRespuesta(detalles="Recuperación de datos exitosa", resultado={"rango_usuario": token_usuario['Rango'],
                                                                                "info_usuario": resultado})


@router.get("/info_membresia/{id_membresia}", response_model=SchemaRespuesta)
async def buscar_info_de_membresia(id_membresia: str, credenciales: HTTPAuthorizationCredentials =
                                   Security(JWTBearer("Administrador-Entrenador-Cliente"))):
    token_usuario = JWTRepo.extraer_token(credenciales)
    info_membresia = await ServicioUsuario.consultar_info_de_membresia(id_membresia, token_usuario)
    return SchemaRespuesta(detalles="Información recuperada con éxito",
                           resultado=info_membresia)
