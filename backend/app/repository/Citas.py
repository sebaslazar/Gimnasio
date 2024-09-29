from app.model.Citas import Cita
from app.repository.base_repo import BaseRepo


class CitaRepository(BaseRepo):
    model = Cita
