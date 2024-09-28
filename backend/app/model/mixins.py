from datetime import datetime
from pydantic import BaseModel
from sqlmodel import Field


class TimeMixin(BaseModel):
    """Aquí el datatime indica cuándo se creó la entidad y cuándo se modificó por última vez."""

    creado_en: datetime = Field(default_factory=datetime.now)
    modificado_en: datetime = Field(default_factory=datetime.now,
                                    sa_column_kwargs={"onupdate": datetime.now, "nullable": False})
