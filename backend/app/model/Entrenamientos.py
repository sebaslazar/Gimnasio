from sqlmodel import SQLModel, Field, Relationship
from typing import Optional


class Entrenamiento(SQLModel, table=True):
    __tablename__ = "entrenamiento"

    ID_entrenamiento: Optional[str] = Field(default=None, primary_key=True, nullable=False)
    tipo: str
    descripcion: str

    ID_entrenador: Optional[str] = Field(default=None, foreign_key="entrenador.ID_entrenador", ondelete="CASCADE")
    entrenador: Optional["Entrenador"] = Relationship(back_populates="entrenamientos")

    ID_cliente: Optional[str] = Field(default=None, foreign_key="cliente.ID_cliente")
    cliente: Optional["Cliente"] = Relationship(back_populates="entrenamientos")
