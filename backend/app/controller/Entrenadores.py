from fastapi import APIRouter, Depends

from app.repository.auth_repo import JWTBearer
from app.schema import SchemaRespuesta
from app.service.Entrenadores import ServicioEntrenador

router = APIRouter(prefix="/entrenador", tags=['Entrenador'], dependencies=[Depends(JWTBearer())])


@router.get("/clientes_activos", response_model=SchemaRespuesta, response_model_exclude_none=True)
async def list_de_clientes_activos():
    clientes_activos = await ServicioEntrenador.consultar_lista_clientes_activos()
    return SchemaRespuesta(detalles="Clientes activos accedidos correctamente",
                           resultado=clientes_activos)
