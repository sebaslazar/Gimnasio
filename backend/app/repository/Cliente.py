from app.model.Cliente import Cliente
from app.repository.base_repo import BaseRepo


class ClienteRepository(BaseRepo):
    model = Cliente
