import logging
import re
from typing import TypeVar, Optional
from fastapi import HTTPException

from pydantic import BaseModel, field_validator
from app.model.Cliente import Sexo

T = TypeVar('T')

logger = logging.getLogger(__name__)


class SchemaRegistrar(BaseModel):
    ID: str
    password: str
    sexo: str
    nombre: str
    segundo_nombre: Optional[str] = None
    apellido: str
    segundo_apellido: Optional[str] = None
    fecha_nacimiento: str
    correo: str
    telefono: str
    direccion: str
    peso: Optional[float] = None
    altura: Optional[float] = None
    especialidad: Optional[str] = None
    activo: Optional[bool] = None

    # Validación de número de cédula
    @field_validator("ID")
    def check_id(cls, id_para_validar):
        logger.debug(f"Cédula en validación: {id_para_validar}")
        if validar_identificacion(id_para_validar, "Tipo de cédula inválida"):
            return id_para_validar

    # Validación de número de teléfono
    @field_validator("telefono")
    def check_telefono(cls, numero_para_validar):
        logger.debug(f"Teléfono en validación: {numero_para_validar}")
        if validar_telefono(numero_para_validar, "Número de teléfono inválido"):
            return numero_para_validar

    @field_validator("sexo")
    def check_sexo(cls, sexo_para_validar):
        if hasattr(Sexo, sexo_para_validar) is False:
            raise HTTPException(status_code=400, detail="Género inválido")
        return sexo_para_validar


class SchemaLogin(BaseModel):
    correo: str
    password: str
    rango: str


class SchemaEliminar(BaseModel):
    ID: str


class SchemaProveedor(BaseModel):
    ID_proveedor: str
    ID_admin_creador: str
    nombre: str
    telefono: str
    direccion: str
    correo: str
    producto: str

    @field_validator("ID_proveedor")
    def check_id_proveedor(cls, id_para_validar):
        logger.debug(f"Cédula en validación: {id_para_validar}")
        if validar_identificacion(id_para_validar, "Cédula de proveedor inválida"):
            return id_para_validar

    @field_validator("ID_admin_creador")
    def check_id_admin(cls, id_para_validar):
        logger.debug(f"Cédula en validación: {id_para_validar}")
        if validar_identificacion(id_para_validar, "Cédula de administrador inválida"):
            return id_para_validar

    @field_validator("telefono")
    def check_telefono(cls, numero_para_validar, mensaje_de_error):
        logger.debug(f"Teléfono en validación: {numero_para_validar}")
        if validar_telefono(numero_para_validar, "Teléfono de proveedor inválido"):
            return numero_para_validar


class SchemaDetallado(BaseModel):
    estado: str
    mensaje: str
    resultado: Optional[T] = None


class SchemaRespuesta(BaseModel):
    detalles: str
    resultado: Optional[T] = None


def validar_identificacion(id_para_validar, mensaje_de_error):
    regex_cedula_10_digitos = r"\b[0-9]\.{0,1}[0-9]{3}\.{0,1}[0-9]{3}\.{0,1}[0-9]{3}\b"
    regex_cedula_8_digitos = r"\b[0-9]{2}\.{0,1}[0-9]{3}\.{0,1}[0-9]{3}\b"
    if (id_para_validar and not re.search(regex_cedula_10_digitos, id_para_validar, re.I)
            and not re.search(regex_cedula_8_digitos, id_para_validar, re.I)):
        raise HTTPException(status_code=400, detail=mensaje_de_error)
    return True


def validar_telefono(numero_para_validar, mensaje_de_error):
    regex = (r"^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d]["
             r"\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$")
    if numero_para_validar and not re.search(regex, numero_para_validar, re.I):
        raise HTTPException(status_code=400, detail=mensaje_de_error)
    return True
