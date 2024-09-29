from app.model.Entrenamientos import Entrenamiento
from app.repository.base_repo import BaseRepo


class EntrenamientoRepository(BaseRepo):
    model = Entrenamiento
