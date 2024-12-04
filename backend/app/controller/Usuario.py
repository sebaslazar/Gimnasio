from fastapi import APIRouter, Depends, Security
from fastapi.security import HTTPAuthorizationCredentials

from app.repository.auth_repo import JWTBearer, JWTRepo
from app.schema import SchemaRespuesta
from app.service.auth_service import AuthService


router = APIRouter(prefix="/usuario",
                   tags=['Uso general'],
                   dependencies=[Depends(JWTBearer(rangos_requeridos="Administrador-Entrenador-Cliente"))])


@router.get("/", response_model=SchemaRespuesta, response_model_exclude_none=True)
async def conseguir_perfil_usuario(credenciales: HTTPAuthorizationCredentials =
                                   Security(JWTBearer("Administrador-Entrenador-Cliente"))):
    token_usuario = JWTRepo.extraer_token(credenciales)
    if token_usuario['Rango'] == "Cliente":
        resultado = await AuthService.conseguir_info_de_cliente(token_usuario['ID'])
    elif token_usuario['Rango'] == "Entrenador":
        resultado = await AuthService.conseguir_info_de_entrenador(token_usuario['ID'])
    else:
        resultado = await AuthService.conseguir_info_de_administrador(token_usuario['ID'])
    return SchemaRespuesta(detalles="Recuperación de datos exitosa", resultado={"rango_usuario": token_usuario['Rango'],
                                                                                "info_usuario": resultado})
