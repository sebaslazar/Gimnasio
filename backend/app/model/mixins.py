from pydantic import BaseModel, Field
from datetime import datetime
from sqlalchemy import DateTime, Column
from sqlmodel import Field


"""La clase mixin se utilizan en la herencia múltiple para añadir funcionalidad a una subclase sin añadir 
problemas de herencia."""


class TimeMixin(BaseModel):
    """Aquí el datatime indica cuándo se creó la entidad y cuándo se modificó por última vez."""
    created_at: datetime = Field(default_factory=datetime.now)
    modified_at: datetime = Field(
        sa_column=Column(DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)
    )
