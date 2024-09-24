from sqlmodel import SQLModel, Field, Relationship
from typing import Optional


from app.model.mixins import TimeMixin


class Proveedor(SQLModel, TimeMixin, table=True):
    __tablename__ = "proveedor"

    ID_proveedor: Optional[str] = Field(default=None, primary_key=True, nullable=False)
    nombre: str

    ID_admin: Optional[str] = Field(default=None, foreign_key="administrador.ID_admin")
    administrador: Optional["Administrador"] = Relationship(back_populates="proveedores")
