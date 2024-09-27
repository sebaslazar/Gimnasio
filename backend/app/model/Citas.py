from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import table, Column, String
from typing import Optional


from app.model.mixins import TimeMixin


class Cita(SQLModel, TimeMixin, table=True):
    __tablename__ = "cita"

    ID_cita: Optional[int] = Field(default=None, primary_key=True, nullable=False)
    descripcion: Optional[str] = None

    ID_cliente: Optional[str] = Field(default=None, foreign_key="cliente.ID_cliente", ondelete="SET NULL")
    cliente: Optional["Cliente"] = Relationship(back_populates="citas")

    ID_actividad: Optional[str] = Field(default=None, foreign_key="actividad.ID_actividad", ondelete="CASCADE")
    actividad: Optional["Actividad"] = Relationship(back_populates="citas_actividad")

