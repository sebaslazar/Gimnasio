from sqlalchemy.future import select
from sqlalchemy.orm import defer, load_only
from app.model.Entrenadores import Entrenador
from app.config import db
from fastapi import HTTPException

from app.model.Cliente import Cliente


class ServicioEntrenador:

    @staticmethod
    async def consultar_lista_clientes_activos():
        query = (select(Cliente).where(Cliente.activo == True).order_by(Cliente.nombre).
                 options(load_only(Cliente.ID_cliente, Cliente.nombre, Cliente.telefono, Cliente.sexo)))
        resultado = (await db.execute(query)).scalars()
        resultado_lista = list(resultado)
        if not resultado_lista:
            raise HTTPException(status_code=404, detail="No existen clientes activos")
        else:
            return resultado_lista
