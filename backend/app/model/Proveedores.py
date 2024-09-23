from app.model.mixins import TimeMixin
from sqlmodel import SQLModel, Field
from typing import Optional


class Proveedores(SQLModel, TimeMixin, table=True):
    __tablename__ = "proveedores"

    ID_proveedor: Optional[str] = Field(default=None, primary_key=True, nullable=False)
    nombre: str

    ID_admin: Optional[str] = Field(default=None, foreign_key="administradores.ID_admin")

