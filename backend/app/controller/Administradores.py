from fastapi import APIRouter, Depends

from app.repository.auth_repo import JWTBearer
from app.schema import SchemaRespuesta, SchemaProveedor, SchemaEliminar, SchemaRegistrar, SchemaEstado, SchemaMembresia
from app.service.Administradores import ServicioAdministrador
from app.service.auth_service import AuthService

router = APIRouter(prefix="/admin",
                   tags=['Administrador'],
                   dependencies=[Depends(JWTBearer(rango_requerido="Administrador"))])


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


@router.delete("/eliminar_cliente", response_model=SchemaRespuesta)
async def eliminar_cliente(cuerpo_de_solicitud: SchemaEliminar):
    await AuthService.eliminar_perfil_de_cliente(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Perfil de cliente eliminado exitosamente")


@router.delete("/eliminar_entrenador", response_model=SchemaRespuesta)
async def eliminar_entrenador(cuerpo_de_solicitud: SchemaEliminar):
    await AuthService.eliminar_perfil_de_entrenador(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Perfil de entrenador eliminado exitosamente")


@router.delete("/eliminar_administrador", response_model=SchemaRespuesta)
async def eliminar_administrador(cuerpo_de_solicitud: SchemaEliminar):
    await AuthService.eliminar_perfil_de_administrador(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Perfil de administrador eliminado exitosamente")


@router.get("/clientes", response_model=SchemaRespuesta)
async def lista_de_clientes():
    clientes = await ServicioAdministrador.consultar_lista_de_clientes()
    return SchemaRespuesta(detalles="Clientes accedidos correctamente",
                           resultado=clientes)


@router.post("/agregar_proveedor", response_model=SchemaRespuesta)
async def agregar_proveedor(cuerpo_de_solicitud: SchemaProveedor):
    await ServicioAdministrador.agregar_proveedor(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Proveedor agregado exitosamente")


@router.post("/modificar_proveedor", response_model=SchemaRespuesta)
async def modificar_proveedor(cuerpo_de_solicitud: SchemaProveedor):
    await ServicioAdministrador.modificar_proveedor(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Proveedor modificado exitosamente")


@router.delete("/eliminar_proveedor", response_model=SchemaRespuesta)
async def eliminar_proveedor(cuerpo_de_solicitud: SchemaEliminar):
    await ServicioAdministrador.eliminar_proveedor(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Proveedor eliminado exitosamente")


@router.get("/proveedores", response_model=SchemaRespuesta)
async def lista_de_proveedores():
    proveedores = await ServicioAdministrador.consultar_lista_de_proveedores()
    return SchemaRespuesta(detalles="Proveedores accedidos correctamente",
                           resultado=proveedores)


@router.get("/entrenadores", response_model=SchemaRespuesta)
async def lista_de_entrenadores():
    entrenadores = await ServicioAdministrador.consultar_lista_de_entrenadores()
    return SchemaRespuesta(detalles="Entrenadores accedidos correctamente",
                           resultado=entrenadores)


@router.get("/administradores", response_model=SchemaRespuesta)
async def lista_de_administradores():
    administradores = await ServicioAdministrador.consultar_lista_de_administradores()
    return SchemaRespuesta(detalles="Administradores accedidos correctamente",
                           resultado=administradores)


@router.post("/modificar_estado_cliente", response_model=SchemaRespuesta)
async def modificar_estado_de_cliente(cuerpo_de_solicitud: SchemaEstado):
    await ServicioAdministrador.actualizar_estado_cliente(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Estado de cliente actualizado")


@router.post("/modificar_estado_entrenador", response_model=SchemaRespuesta)
async def modificar_estado_de_entrenador(cuerpo_de_solicitud: SchemaEstado):
    await ServicioAdministrador.actualizar_estado_entrenador(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Estado de entrenador actualizado")


@router.patch("/info_cliente/{id_cliente}", response_model=SchemaRespuesta, response_model_exclude_none=True)
async def buscar_info_de_cliente(id_cliente: str):
    info_cliente = await ServicioAdministrador.conseguir_info_de_cliente(id_cliente)
    return SchemaRespuesta(detalles="Información recuperada con éxito",
                           resultado=info_cliente)


@router.patch("/info_entrenador/{id_entrenador}", response_model=SchemaRespuesta, response_model_exclude_none=True)
async def buscar_info_de_entrenador(id_entrenador: str):
    info_entrenador = await ServicioAdministrador.conseguir_info_de_entrenador(id_entrenador)
    return SchemaRespuesta(detalles="Información recuperada con éxito",
                           resultado=info_entrenador)


@router.patch("/info_proveedor/{id_proveedor}", response_model=SchemaRespuesta, response_model_exclude_none=True)
async def buscar_info_de_proveedor(id_proveedor: str):
    info_proveedor = await ServicioAdministrador.conseguir_info_de_proveedor(id_proveedor)
    return SchemaRespuesta(detalles="Información recuperada con éxito",
                           resultado=info_proveedor)


@router.post("/agregar_membresia", response_model=SchemaRespuesta)
async def agregar_membresia(cuerpo_de_solicitud: SchemaMembresia):
    await ServicioAdministrador.agregar_membresia(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Membresía agregada exitosamente")


@router.get("/membresias", response_model=SchemaRespuesta)
async def lista_de_membresias():
    membresias = await ServicioAdministrador.consultar_lista_de_membresias()
    return SchemaRespuesta(detalles="Membresías accedidas correctamente",
                           resultado=membresias)


@router.get("/info_membresia/{id_membresia}", response_model=SchemaRespuesta)
async def buscar_info_de_membresia(id_membresia: str):
    info_membresia = await ServicioAdministrador.consultar_info_de_membresia(id_membresia)
    return SchemaRespuesta(detalles="Información recuperada con éxito",
                           resultado=info_membresia)

