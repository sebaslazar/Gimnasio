from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List


from app.model.mixins import TimeMixin
from app.model.compra_membresia import CompraMembresia


class Membresia(SQLModel, TimeMixin, table=True):
    __tablename__ = "membresia"

    ID_membresia: Optional[int] = Field(default=None, primary_key=True, nullable=False)
    nombre: str
    descripcion: str

    ID_admin_creador: Optional[str] = Field(default=None, foreign_key="administrador.ID_admin", ondelete="SET NULL")
    administrador: Optional["Administrador"] = Relationship(back_populates="membresias")

    cliente: List["Cliente"] = Relationship(back_populates="membresias", link_model=CompraMembresia)

