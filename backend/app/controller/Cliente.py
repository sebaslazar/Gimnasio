from fastapi import APIRouter, Depends, Security
from fastapi.security import HTTPAuthorizationCredentials

from app.repository.auth_repo import JWTBearer, JWTRepo
from app.schema import SchemaRespuesta, SchemaRegistrar
from app.service.auth_service import AuthService
from app.service.Cliente import ServicioCliente

router = APIRouter(prefix="/cliente", tags=['Cliente'], dependencies=[Depends(JWTBearer())])


@router.post("/actualizar_mi_cuenta", response_model=SchemaRespuesta, response_model_exclude_none=True)
async def actualizar_mi_cuenta(cuerpo_de_solicitud: SchemaRegistrar):
    await AuthService.actualizar_perfil_de_cliente(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Cuenta actualizada")
