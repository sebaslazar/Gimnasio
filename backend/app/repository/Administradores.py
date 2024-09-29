from app.model.Administradores import Administrador
from app.repository.base_repo import BaseRepo


class AdministradorRepository(BaseRepo):
    model = Administrador
