from app.model.Entrenadores import Entrenador
from app.repository.base_repo import BaseRepo


class EntrenadorRepository(BaseRepo):
    model = Entrenador
