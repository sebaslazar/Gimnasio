from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import table, Column, String
from typing import Optional, List
from datetime import date, time


from app.model.mixins import TimeMixin


class Actividad(SQLModel, TimeMixin, table=True):
    __tablename__ = "actividad"

    ID_actividad: Optional[int] = Field(default=None, primary_key=True, nullable=False)
    nombre: str
    descripcion: str
    precio: int
    fecha: date
    hora: time
    duracion_minutos: int
    lugar: str

    citas_actividad: List["Cita"] = Relationship(back_populates="actividad", cascade_delete=True)

    ID_entrenador: Optional[str] = Field(default=None, foreign_key="entrenador.ID_entrenador", ondelete="SET NULL")
    entrenador: Optional["Entrenador"] = Relationship(back_populates="actividad")
