from fastapi import APIRouter, Depends, Security
from fastapi.security import HTTPAuthorizationCredentials

from app.repository.auth_repo import JWTBearer, JWTRepo
from app.schema import SchemaRespuesta, SchemaProveedor
from app.service.Administradores import ServicioAdministrador

router = APIRouter(prefix="/admin", tags=['Administrador'], dependencies=[Depends(JWTBearer())])


@router.post("/agregar_proveedor", response_model=SchemaRespuesta)
async def agregar_proveedor(cuerpo_de_solicitud: SchemaProveedor):
    await ServicioAdministrador.agregar_proveedor(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Proveedor agregado exitosamente")
