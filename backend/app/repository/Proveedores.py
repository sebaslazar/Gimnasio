from app.model.Proveedores import Proveedor
from app.repository.base_repo import BaseRepo


class ProveedorRepository(BaseRepo):
    model = Proveedor
