from fastapi import APIRouter, Depends, Security
from fastapi.security import HTTPAuthorizationCredentials

from app.repository.auth_repo import JWTBearer, JWTRepo
from app.schema import SchemaRespuesta, SchemaProveedor, SchemaEliminar, SchemaRegistrar
from app.service.Administradores import ServicioAdministrador
from app.service.auth_service import AuthService

router = APIRouter(prefix="/admin", tags=['Administrador'], dependencies=[Depends(JWTBearer())])


@router.post("/registro_entrenador", response_model=SchemaRespuesta, response_model_exclude_none=True)
async def registro_entrenador(cuerpo_de_solicitud: SchemaRegistrar):
    await AuthService.servicio_de_registro_de_entrenador(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Entrenador creado exitosamente")


@router.post("/registro_administrador", response_model=SchemaRespuesta, response_model_exclude_none=True)
async def registro_administrador(cuerpo_de_solicitud: SchemaRegistrar):
    await AuthService.servicio_de_registro_de_administrador(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Administrador creado exitosamente")


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


@router.post("/agregar_proveedor", response_model=SchemaRespuesta)
async def agregar_proveedor(cuerpo_de_solicitud: SchemaProveedor):
    await ServicioAdministrador.agregar_proveedor(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Proveedor agregado exitosamente")


@router.post("/modificar_proveedor", response_model=SchemaRespuesta)
async def modificar_proveedor(cuerpo_de_solicitud: SchemaProveedor):
    await ServicioAdministrador.modificar_proveedor(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Proveedor modificado exitosamente")


@router.post("/eliminar_proveedor", response_model=SchemaRespuesta)
async def eliminar_proveedor(cuerpo_de_solicitud: SchemaEliminar):
    await ServicioAdministrador.eliminar_proveedor(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Proveedor eliminado exitosamente")


@router.post("/proveedores", response_model=SchemaRespuesta)
async def lista_proveedores():
    proveedores = await ServicioAdministrador.consultar_lista_de_proveedores()
    return SchemaRespuesta(detalles="Proveedores accedidos correctamente",
                           resultado=proveedores)
