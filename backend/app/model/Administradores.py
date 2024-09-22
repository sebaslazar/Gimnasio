from app.model.mixins import TimeMixin
from sqlmodel import SQLModel, Field
from sqlalchemy import table, Enum
from typing import Optional
from datetime import date


class Sexo(str, Enum):
    MASCULINO = "MASCULINO"
    FEMENINO = "FEMENINO"


class Administradores(SQLModel, TimeMixin, table=True):
    __tablename__ = "Administradores"

    ID_admin: Optional[str] = Field(default=None, primary_key=True, nullable=False)
    nombre: str
    segundo_nombre: Optional[str] = None
    apellido: str
    segundo_apellido: Optional[str] = None
    fecha_nacimiento: date
    correo: str
    telefono: str
