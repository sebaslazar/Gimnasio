from fastapi import APIRouter

from app.schema import SchemaRespuesta, SchemaRegistrar, SchemaLogin
from app.service.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=['Autenticación'])


@router.post("/registro_cliente", response_model=SchemaRespuesta, response_model_exclude_none=True)
async def registro_cliente(cuerpo_de_solicitud: SchemaRegistrar):
    await AuthService.servicio_de_registro_de_cliente(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Cuenta creada exitosamente")


@router.post("/login", response_model=SchemaRespuesta)
async def login(cuerpo_de_solicitud: SchemaLogin):
    token_usuario = await AuthService.servicio_de_login(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Sesión iniciada",
                           resultado={"tipo_de_token": "Bearer", "token_de_acceso": token_usuario})




