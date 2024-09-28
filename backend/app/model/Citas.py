from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import table, Column, String
from typing import Optional
from datetime import date, time


class Cita(SQLModel, table=True):
    __tablename__ = "cita"

    ID_cita: Optional[int] = Field(default=None, primary_key=True, nullable=False)
    descripcion: str
    fecha: date
    hora: time
    duracion_minutos: int
    lugar: str

    ID_cliente: Optional[str] = Field(default=None, foreign_key="cliente.ID_cliente", ondelete="SET NULL")
    cliente: Optional["Cliente"] = Relationship(back_populates="citas")

    ID_actividad: Optional[int] = Field(default=None, foreign_key="actividad.ID_actividad", ondelete="CASCADE")
    actividad: Optional["Actividad"] = Relationship(back_populates="citas_actividad")

    ID_entrenador: Optional[str] = Field(default=None, foreign_key="entrenador.ID_entrenador", ondelete="CASCADE")
    entrenador: Optional["Entrenador"] = Relationship(back_populates="citas")

