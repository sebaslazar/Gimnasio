from fastapi import APIRouter, Depends, Security
from fastapi.security import HTTPAuthorizationCredentials

from app.repository.auth_repo import JWTBearer, JWTRepo
from app.schema import SchemaRespuesta, SchemaRegistrar
from app.service.auth_service import AuthService
from app.service.Cliente import ServicioCliente

router = APIRouter(prefix="/cliente",
                   tags=['Cliente'],
                   dependencies=[Depends(JWTBearer(rango_requerido="Cliente"))])


@router.post("/actualizar_cliente", response_model=SchemaRespuesta)
async def actualizar_cliente(cuerpo_de_solicitud: SchemaRegistrar):
    await AuthService.actualizar_perfil_de_cliente(cuerpo_de_solicitud)
    return SchemaRespuesta(detalles="Cuenta actualizada")


@router.get("/membresias_compradas", response_model=SchemaRespuesta)
async def lista_membresias_compradas(credenciales: HTTPAuthorizationCredentials = Security(JWTBearer())):
    token_cliente = JWTRepo.extraer_token(credenciales)
    membresias_compradas = await ServicioCliente.consultar_lista_de_membresias_compradas(token_cliente["ID"])
    return SchemaRespuesta(detalles="Lista de membresías compradas accedida exitosamente",
                           resultado=membresias_compradas)


@router.post("/comprar_membresia", response_model=SchemaRespuesta)
async def comprar_membresia(id_membresia: str, credenciales: HTTPAuthorizationCredentials = Security(JWTBearer())):
    token_cliente = JWTRepo.extraer_token(credenciales)
    await ServicioCliente.comprar_membresia(id_cliente=token_cliente["ID"], id_membresia=id_membresia)
    return SchemaRespuesta(detalles="Compra realizada exitosamente")

