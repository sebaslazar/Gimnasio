from sqlmodel import SQLModel, Field, Relationship
from typing import Optional


class Proveedor(SQLModel, table=True):
    __tablename__ = "proveedor"

    ID_proveedor: Optional[str] = Field(default=None, primary_key=True, nullable=False)
    nombre: str

    ID_admin_creador: Optional[str] = Field(default=None, foreign_key="administrador.ID_admin", ondelete="SET NULL")
    administrador: Optional["Administrador"] = Relationship(back_populates="proveedores")