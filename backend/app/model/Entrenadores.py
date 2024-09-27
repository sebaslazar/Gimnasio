import enum
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import table, Enum, Column, String
from typing import Optional, List
from datetime import date

from app.model.actividad_entrenador import ActividadEntrenador


class Sexo(enum.Enum):
    MASCULINO = "MASCULINO"
    FEMENINO = "FEMENINO"


class Entrenador(SQLModel, table=True):
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

    actividad: List["Actividad"] = Relationship(back_populates="entrenador_actividad", link_model=ActividadEntrenador,
                                                cascade_delete=True)

    ID_admin_creador: Optional[str] = Field(default=None, foreign_key="administrador.ID_admin", ondelete="SET NULL")
    administrador: Optional["Administrador"] = Relationship(back_populates="entrenadores")

    entrenamientos: List["Entrenamiento"] = Relationship(back_populates="entrenador", cascade_delete=True)
