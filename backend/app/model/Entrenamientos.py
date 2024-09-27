from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import table, Column, String
from typing import Optional, List


from app.model.mixins import TimeMixin


class Entrenamiento(SQLModel, TimeMixin, table=True):
    __tablename__ = "entrenamiento"

    ID_entrenamiento: Optional[str] = Field(default=None, primary_key=True, nullable=False)
    detalles: Optional[str] = None

    ID_entrenador: Optional[str] = Field(default=None, foreign_key="entrenador.ID_entrenador", nullable=False)
    entrenador: Optional["Entrenador"] = Relationship(back_populates="entrenamientos")

    ID_cliente: Optional[str] = Field(default=None, foreign_key="cliente.ID_cliente")
    cliente: Optional["Cliente"] = Relationship(back_populates="entrenamientos")
