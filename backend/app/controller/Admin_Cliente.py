from fastapi import APIRouter, Depends, Security
from fastapi.security import HTTPAuthorizationCredentials

from app.repository.auth_repo import JWTBearer, JWTRepo
from app.schema import SchemaRespuesta
from app.service.Usuario import ServicioUsuario


router = APIRouter(prefix="/info",
                   tags=['Sólo administrador y cliente'],
                   dependencies=[Depends(JWTBearer(rangos_requeridos="Administrador-Cliente"))])

@router.get("/membresias", response_model=SchemaRespuesta)
async def lista_de_membresias(credenciales: HTTPAuthorizationCredentials =
                              Security(JWTBearer("Administrador-Cliente"))):
    membresias = await ServicioUsuario.consultar_lista_de_membresias(JWTRepo.extraer_token(credenciales))
    return SchemaRespuesta(detalles="Membresías accedidas correctamente",
                           resultado=membresias)

@router.get("/membresia/{id_membresia}", response_model=SchemaRespuesta)
async def buscar_info_de_membresia(id_membresia: str, credenciales: HTTPAuthorizationCredentials =
                                   Security(JWTBearer("Administrador-Cliente"))):
    token_usuario = JWTRepo.extraer_token(credenciales)
    info_membresia = await ServicioUsuario.consultar_info_de_membresia(id_membresia, token_usuario)
    return SchemaRespuesta(detalles="Información recuperada con éxito",
                           resultado=info_membresia)
