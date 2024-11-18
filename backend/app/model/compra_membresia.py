from sqlmodel import SQLModel, Field
from typing import Optional


from app.model.mixins import TimeMixin


class CompraMembresia(SQLModel, TimeMixin, table=True):
    __tablename__ = "compra_membresia"

    ID_comprador: Optional[str] = Field(default=None, foreign_key="cliente.ID_cliente", primary_key=True)
    ID_membresia: Optional[str] = Field(default=None, foreign_key="membresia.ID_membresia", primary_key=True)
    metodo_pago: str
    tipo_compra: bool
