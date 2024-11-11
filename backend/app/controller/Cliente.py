from fastapi import APIRouter, Depends, Security
from fastapi.security import HTTPAuthorizationCredentials

from app.repository.auth_repo import JWTBearer, JWTRepo
from app.schema import SchemaRespuesta
from app.service.Cliente import ServicioCliente

router = APIRouter(prefix="/cliente", tags=['Cliente'], dependencies=[Depends(JWTBearer())])


@router.get("/", response_model=SchemaRespuesta, response_model_exclude_none=True)
async def conseguir_perfil_cliente(credenciales: HTTPAuthorizationCredentials = Security(JWTBearer())):
    token_usuario = JWTRepo.extraer_token(credenciales)
    resultado = await ServicioCliente.buscar_perfil_de_cliente(token_usuario['ID'])
    return SchemaRespuesta(detalles="Recuperación de datos exitosa", resultado=resultado)
