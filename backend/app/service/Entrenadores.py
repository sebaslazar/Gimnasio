from sqlalchemy.future import select
from sqlalchemy.orm import defer
from app.model.Entrenadores import Entrenador
from app.config import db
from fastapi import HTTPException

from app.model.Cliente import Cliente


class ServicioEntrenador:

    @staticmethod
    async def buscar_perfil_de_entrenador(id_entrenador: str):
        query = select(Entrenador).where(Entrenador.ID_entrenador == id_entrenador).options(defer(Entrenador.password))
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def consultar_lista_clientes_activos():
        query = select(Cliente).where(Cliente.activo == True).order_by(Cliente.nombre)
        resultado = (await db.execute(query)).scalars()
        resultado_lista = list(resultado)
        if not resultado_lista:
            raise HTTPException(status_code=404, detail="No existen clientes activos")
        else:
            return resultado_lista
