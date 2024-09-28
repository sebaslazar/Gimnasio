from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, String
from typing import Optional


from app.model.mixins import TimeMixin


class Proveedor(SQLModel, TimeMixin, table=True):
    __tablename__ = "proveedor"

    ID_proveedor: Optional[str] = Field(default=None, primary_key=True, nullable=False)
    nombre: str
    telefono: str
    direccion: str
    correo: str = Field(sa_column=Column("correo", String, unique=True))
    producto: str

    ID_admin_creador: Optional[str] = Field(default=None, foreign_key="administrador.ID_admin", ondelete="SET NULL")
    administrador: Optional["Administrador"] = Relationship(back_populates="proveedores")
