import enum
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import table, Enum, Column, String
from typing import Optional, List
from datetime import date


class Sexo(enum.Enum):
    MASCULINO = "MASCULINO"
    FEMENINO = "FEMENINO"


class Administrador(SQLModel, table=True):
    __tablename__ = "administrador"

    ID_admin: Optional[str] = Field(default=None, primary_key=True, nullable=False)
    password: str
    sexo: str = Field(sa_column=Column("sexo", String, Enum(Sexo)))
    nombre: str
    segundo_nombre: Optional[str] = None
    apellido: str
    segundo_apellido: Optional[str] = None
    fecha_nacimiento: date
    correo: str = Field(sa_column=Column("correo", String, unique=True))
    direccion: str
    telefono: str

    proveedores: List["Proveedor"] = Relationship(back_populates="administrador")

    membresias: List["Membresia"] = Relationship(back_populates="administrador")

    entrenadores: List["Entrenador"] = Relationship(back_populates="administrador")
