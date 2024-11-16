from fastapi import APIRouter

from app.schema import SchemaRespuesta, SchemaRegistrar, SchemaLogin, SchemaEliminar
from app.service.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=['Autenticación'])


@router.post("/registro_cliente", response_model=SchemaRespuesta, response_model_exclude_none=True)
async def registro_cliente(cuerpo_de_solicitud: SchemaRegistrar):
    await AuthService.servicio_de_registro_de_cliente(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Cuenta creada exitosamente")


@router.post("/registro_entrenador", response_model=SchemaRespuesta, response_model_exclude_none=True)
async def registro_entrenador(cuerpo_de_solicitud: SchemaRegistrar):
    await AuthService.servicio_de_registro_de_entrenador(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Entrenador creado exitosamente")


@router.post("/registro_administrador", response_model=SchemaRespuesta, response_model_exclude_none=True)
async def registro_administrador(cuerpo_de_solicitud: SchemaRegistrar):
    await AuthService.servicio_de_registro_de_administrador(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Administrador creado exitosamente")


@router.post("/login", response_model=SchemaRespuesta)
async def login(cuerpo_de_solicitud: SchemaLogin):
    token_usuario = await AuthService.servicio_de_login(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Sesión iniciada",
                           resultado={"tipo_de_token": "Bearer", "token_de_acceso": token_usuario})


@router.post("/actualizar_cliente", response_model=SchemaRespuesta, response_model_exclude_none=True)
async def actualizar_cliente(cuerpo_de_solicitud: SchemaRegistrar):
    await AuthService.actualizar_perfil_de_cliente(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Perfil de cliente actualizado exitosamente")


@router.post("/actualizar_entrenador", response_model=SchemaRespuesta, response_model_exclude_none=True)
async def actualizar_entrenador(cuerpo_de_solicitud: SchemaRegistrar):
    await AuthService.actualizar_perfil_de_entrenador(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Perfil de entrenador actualizado exitosamente")


@router.post("/actualizar_administrador", response_model=SchemaRespuesta, response_model_exclude_none=True)
async def actualizar_administrador(cuerpo_de_solicitud: SchemaRegistrar):
    await AuthService.actualizar_perfil_de_administrador(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Perfil de administrador actualizado exitosamente")


@router.post("/eliminar_cliente", response_model=SchemaRespuesta)
async def eliminar_cliente(cuerpo_de_solicitud: SchemaEliminar):
    await AuthService.eliminar_perfil_de_cliente(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Perfil de cliente eliminado exitosamente")


@router.post("/eliminar_entrenador", response_model=SchemaRespuesta)
async def eliminar_entrenador(cuerpo_de_solicitud: SchemaEliminar):
    await AuthService.eliminar_perfil_de_entrenador(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Perfil de entrenador eliminado exitosamente")


@router.post("/eliminar_administrador", response_model=SchemaRespuesta)
async def eliminar_administrador(cuerpo_de_solicitud: SchemaEliminar):
    await AuthService.eliminar_perfil_de_administrador(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Perfil de administrador eliminado exitosamente")
