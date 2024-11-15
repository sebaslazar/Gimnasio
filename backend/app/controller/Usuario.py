from fastapi import APIRouter, Depends, Security
from fastapi.security import HTTPAuthorizationCredentials

from app.repository.auth_repo import JWTBearer, JWTRepo
from app.schema import SchemaRespuesta
from app.service.Administradores import ServicioAdministrador
from app.service.Cliente import ServicioCliente

router = APIRouter(prefix="/usuario", tags=['Usuario'], dependencies=[Depends(JWTBearer())])


@router.get("/", response_model=SchemaRespuesta, response_model_exclude_none=True)
async def conseguir_perfil_cliente(credenciales: HTTPAuthorizationCredentials = Security(JWTBearer())):
    token_usuario = JWTRepo.extraer_token(credenciales)
    if token_usuario['Rango'] == "Cliente":
        resultado = await ServicioCliente.buscar_perfil_de_cliente(token_usuario['ID'])
    else:
        resultado = await ServicioAdministrador.buscar_perfil_de_administrador(token_usuario['ID'])
    return SchemaRespuesta(detalles="Recuperación de datos exitosa", resultado={"rango_usuario": token_usuario['Rango'],
                                                                                "info_usuario": resultado})
