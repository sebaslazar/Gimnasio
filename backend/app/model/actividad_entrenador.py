from sqlmodel import SQLModel, Field
from typing import Optional


class ActividadEntrenador(SQLModel, table=True):
    __tablename__ = "actividad_entrenador"

    ID_actividad: Optional[int] = Field(default=None, foreign_key="actividad.ID_actividad", primary_key=True)
    ID_entrenador: Optional[str] = Field(default=None, foreign_key="entrenador.ID_entrenador", primary_key=True)
