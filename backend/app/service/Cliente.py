from sqlalchemy.future import select
from sqlalchemy.orm import defer
from app.model import Cliente, Membresia, CompraMembresia
from app.repository.Cliente import ClienteRepository
from app.repository.Membresias import MembresiaRepository
from app.repository.compra_membresia import CompraMembresiaRepository
from app.config import db
from fastapi import HTTPException


class ServicioCliente:

    @staticmethod
    async def buscar_perfil_de_cliente(id_cliente: str):
        query = select(Cliente).where(Cliente.ID_cliente == id_cliente).options(defer(Cliente.password))
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def consultar_lista_de_membresias_compradas(id_cliente: str):
        _cliente = await ClienteRepository.buscar_por_id(model_id=id_cliente, name_id="ID_cliente")
        if not _cliente:
            raise HTTPException(status_code=404, detail="El cliente no existe")

        resultado = await ClienteRepository.generar_lista_de_membresias_compradas(id_cliente)

        resultado_lista = list(resultado)
        if not resultado_lista:
            raise HTTPException(status_code=404, detail="No hay membresías compradas")
        else:
            return resultado_lista

    @staticmethod
    async def comprar_membresia(id_cliente: str, id_membresia: str):
        _membresia = await MembresiaRepository.buscar_por_id(model_id=id_membresia, name_id="ID_membresia")
        if not _membresia:
            raise HTTPException(status_code=404, detail="La membresía no existe")

        _cliente = await ClienteRepository.buscar_por_id(model_id=id_cliente, name_id="ID_cliente")
        if not _cliente:
            raise HTTPException(status_code=404, detail="El cliente no existe")

        _registro_compra = await ClienteRepository.consultar_membresia_comprada(id_cliente=id_cliente,
                                                                                id_membresia=id_membresia)
        if _registro_compra:
            raise HTTPException(status_code=404, detail="El cliente ya compró está membresía")

        _registro_compra = CompraMembresia(ID_comprador=id_cliente, ID_membresia=id_membresia,
                                           metodo_pago="Efectivo", tipo_compra=True)
        await CompraMembresiaRepository.crear(**_registro_compra.model_dump())
