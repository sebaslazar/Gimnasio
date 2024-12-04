from fastapi import APIRouter, Depends

from app.repository.auth_repo import JWTBearer
from app.schema import SchemaRespuesta
from app.service.Administradores import ServicioAdministrador

router = APIRouter(prefix="/info_membresia",
                   tags=['Administrador-Entrenador'],
                   dependencies=[Depends(JWTBearer(rangos_requeridos="Administrador-Entrenador"))])


@router.get("/{id_membresia}", response_model=SchemaRespuesta)
async def buscar_info_de_membresia(id_membresia: str):
    info_membresia = await ServicioAdministrador.consultar_info_de_membresia(id_membresia)
    return SchemaRespuesta(detalles="Información recuperada con éxito",
                           resultado=info_membresia)