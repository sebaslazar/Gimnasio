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

        else:
            _cliente = await ClienteRepository.buscar_por_id(model_id=token_usuario['ID'], name_id="ID_cliente")
            if not _cliente:
                raise HTTPException(status_code=404, detail="El cliente no existe")

            _registro_compra = await ClienteRepository.consultar_membresia_comprada(id_cliente=token_usuario['ID'],
                                                                                    id_membresia=id_membresia)

            return {"Membresia_comprada": False if not _registro_compra else True,
                    "Info_membresia": _membresia}

    @staticmethod
    async def consultar_lista_de_membresias(token_usuario: dict):
        if token_usuario["Rango"] == "Administrador":
            resultado = list(await MembresiaRepository.buscar_todo("nombre", ["nombre", "ID_membresia",
                                                                         "precio", "duracion_meses"]))
            if not resultado:
                raise HTTPException(status_code=404, detail="No existen membresias en la base de datos")
        else:
            resultado = list(await ClienteRepository.generar_lista_de_membresias_no_compradas(token_usuario['ID']))
            if not resultado:
                raise HTTPException(status_code=404, detail="No hay membresías disponibles para la compra")

        return resultado
