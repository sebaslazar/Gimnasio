import enum
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import table, Enum, Column, String
from typing import Optional, List
from datetime import date

from app.model.compra_membresia import CompraMembresia


class Sexo(enum.Enum):
    MASCULINO = "MASCULINO"
    FEMENINO = "FEMENINO"


class Cliente(SQLModel, table=True):
    __tablename__ = "cliente"

    ID_cliente: Optional[str] = Field(default=None, primary_key=True, nullable=False)
    password: str
    sexo: str = Field(sa_column=Column("sexo", String, Enum(Sexo)))
    nombre: str
    segundo_nombre: Optional[str] = None
    apellido: str
    segundo_apellido: Optional[str] = None
    fecha_nacimiento: date
    correo: str = Field(sa_column=Column("correo", String, unique=True))
    telefono: str
    direccion: str
    activo: bool = True

    membresias: List["Membresia"] = Relationship(back_populates="cliente", link_model=CompraMembresia)

    ID_titular: Optional[str] = Field(default=None, foreign_key="cliente.ID_cliente", ondelete="SET NULL")
    titular: Optional["Cliente"] = Relationship(back_populates="beneficiario",
                                                sa_relationship_kwargs={"remote_side": "Cliente.ID_cliente"})
    beneficiario: List["Cliente"] = Relationship(back_populates="titular")

    citas: List["Cita"] = Relationship(back_populates="cliente")

    entrenamientos: Optional["Entrenamiento"] = Relationship(back_populates="cliente",
                                                             sa_relationship_kwargs={'uselist': False},
                                                             cascade_delete=True)
