from fastapi import HTTPException

from app.repository.Administradores import AdministradorRepository
from app.repository.Entrenadores import EntrenadorRepository
from app.repository.Cliente import ClienteRepository
from app.repository.Membresias import MembresiaRepository


class ServicioUsuario:

    @staticmethod
    async def consultar_info_de_membresia(id_membresia: str, token_usuario: dict):
        _membresia = await MembresiaRepository.buscar_por_id(model_id=id_membresia, name_id="ID_membresia")
        if not _membresia:
            raise HTTPException(status_code=404, detail="La membresía especificada no existe")

        if token_usuario["Rango"] in "Administrador":
            _admin = await AdministradorRepository.buscar_por_id(model_id=token_usuario['ID'], name_id="ID_admin")
            if not _admin:
                raise HTTPException(status_code=404, detail="El administrador no existe")

            return {"Membresia_comprada": False,
                    "Info_membresia": _membresia}

        elif token_usuario["Rango"] in "Entrenador":
            _entrenador = await EntrenadorRepository.buscar_por_id(model_id=token_usuario['ID'],
                                                                   name_id="ID_entrenador")
            if not _entrenador:
                raise HTTPException(status_code=404, detail="El entrenador no existe")

            return {"Membresia_comprada": False,
                    "Info_membresia": _membresia}

        else:
            _cliente = await ClienteRepository.buscar_por_id(model_id=token_usuario['ID'], name_id="ID_cliente")
            if not _cliente:
                raise HTTPException(status_code=404, detail="El cliente no existe")

            _registro_compra = await ClienteRepository.consultar_membresia_comprada(id_cliente=token_usuario['ID'],
                                                                                    id_membresia=id_membresia)

            return {"Membresia_comprada": False if not _registro_compra else True,
                    "Info_membresia": _membresia}

