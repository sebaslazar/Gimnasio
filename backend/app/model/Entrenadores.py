import enum
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import table, Enum, Column, String
from typing import Optional, List
from datetime import date

from app.model.mixins import TimeMixin


class Sexo(enum.Enum):
    MASCULINO = "MASCULINO"
    FEMENINO = "FEMENINO"


class Entrenador(SQLModel, TimeMixin, table=True):
    __tablename__ = "entrenador"

    ID_entrenador: Optional[str] = Field(default=None, primary_key=True, nullable=False)
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
    especialidad: str
    activo: bool = True
    rango: str

    actividad: List["Actividad"] = Relationship(back_populates="entrenador")

    entrenamientos: List["Entrenamiento"] = Relationship(back_populates="entrenador", cascade_delete=True)
