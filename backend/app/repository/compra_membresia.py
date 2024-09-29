from app.model.compra_membresia import CompraMembresia
from app.repository.base_repo import BaseRepo


class CompraMembresiaRepository(BaseRepo):
    model = CompraMembresia
