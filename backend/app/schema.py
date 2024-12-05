import logging
import re
from typing import TypeVar, Optional
from fastapi import HTTPException

from pydantic import BaseModel, field_validator
from app.model.Cliente import Sexo

T = TypeVar('T')

logger = logging.getLogger(__name__)


def validar_identificacion(id_para_validar: str, mensaje_de_error: str):
    logger.debug(f"Cédula en validación: {id_para_validar}")
    regex_cedula_10_digitos = r"\b[0-9]\.{0,1}[0-9]{3}\.{0,1}[0-9]{3}\.{0,1}[0-9]{3}\b"
    regex_cedula_8_digitos = r"\b[0-9]{2}\.{0,1}[0-9]{3}\.{0,1}[0-9]{3}\b"
    if (id_para_validar and not re.fullmatch(regex_cedula_10_digitos, id_para_validar)
            and not re.fullmatch(regex_cedula_8_digitos, id_para_validar)):
        raise HTTPException(status_code=400, detail=mensaje_de_error)
    return id_para_validar


def validar_telefono(numero_para_validar, mensaje_de_error):
    logger.debug(f"Teléfono en validación: {numero_para_validar}")
    regex = (r"^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d]["
             r"\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$")
    if numero_para_validar and not re.fullmatch(regex, numero_para_validar):
        raise HTTPException(status_code=400, detail=mensaje_de_error)
    return numero_para_validar


def validar_correo(correo_para_validar, mensaje_de_error):
    logger.debug(f"Correo en validación: {correo_para_validar}")
    regex = (r"^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*["
             r"a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")
    if correo_para_validar and not re.fullmatch(regex, correo_para_validar, re.I):
        raise HTTPException(status_code=400, detail=mensaje_de_error)
    return correo_para_validar


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
    def check_id(cls, id_usuario):
        return validar_identificacion(id_para_validar=id_usuario,
                                      mensaje_de_error="Tipo de cédula inválida")

    # Validación de número de teléfono
    @field_validator("telefono")
    def check_telefono(cls, telefono):
        return validar_telefono(numero_para_validar=telefono,
                                mensaje_de_error="Número de teléfono inválido")

    # Validación de correo
    @field_validator("correo")
    def check_correo(cls, correo):
        return validar_correo(correo_para_validar=correo,
                              mensaje_de_error="Correo inválido")

    @field_validator("sexo")
    def check_sexo(cls, sexo_usuario):
        if hasattr(Sexo, sexo_usuario) is False:
            raise HTTPException(status_code=400, detail="Género inválido")
        return sexo_usuario


class SchemaLogin(BaseModel):
    correo: str
    password: str
    rango: str

    @field_validator("correo")
    def check_correo(cls, correo_usuario):
        return validar_correo(correo_para_validar=correo_usuario,
                              mensaje_de_error="Correo inválido")

    @field_validator("rango")
    def check_rango(cls, rango_usuario):
        if rango_usuario in {"Cliente", "Administrador", "Entrenador"}:
            return rango_usuario
        else:
            raise HTTPException(status_code=400, detail="Rango inválido")


class SchemaEliminar(BaseModel):
    ID: str

    @field_validator("ID")
    def check_id(cls, id_usuario):
        return validar_identificacion(id_para_validar=id_usuario,
                                      mensaje_de_error="Número de cédula inválido")


class SchemaEstado(BaseModel):
    ID: str
    activo: bool

    @field_validator("ID")
    def check_id(cls, id_usuario):
        return validar_identificacion(id_para_validar=id_usuario,
                                      mensaje_de_error="Cédula inválida")


class SchemaProveedor(BaseModel):
    ID_proveedor: str
    ID_admin_creador: str
    nombre: str
    telefono: str
    direccion: str
    correo: str
    producto: str

    @field_validator("ID_proveedor", "ID_admin_creador")
    def check_id(cls, id_usuario, info):
        mensaje_de_error = {
            "ID_proveedor": "Cédula de proveedor inválida",
            "ID_admin_creador": "Cédula de administrador inválida"
        }
        return validar_identificacion(id_para_validar=id_usuario,
                                      mensaje_de_error=mensaje_de_error[info.field_name])

    @field_validator("telefono")
    def check_telefono(cls, telefono_usuario):
        return validar_telefono(numero_para_validar=telefono_usuario,
                                mensaje_de_error="Teléfono de proveedor inválido")

    @field_validator("correo")
    def check_correo(cls, correo_usuario):
        return validar_correo(correo_para_validar=correo_usuario,
                              mensaje_de_error="Correo de proveedor inválido")


class SchemaMembresia(BaseModel):
    nombre: str
    descripcion: str
    descuento: float
    max_miembros: int
    precio: int
    duracion_meses: int

    @field_validator("descuento")
    def check_descuento(cls, descuento_para_validar):
        logger.debug(f"Descuento en validación: {descuento_para_validar}")
        if descuento_para_validar > 1:
            raise HTTPException(status_code=400, detail="Descuento inválido")
        else:
            return descuento_para_validar


class SchemaDetallado(BaseModel):
    estado: str
    mensaje: str
    resultado: Optional[T] = None


class SchemaRespuesta(BaseModel):
    detalles: str
    resultado: Optional[T] = None
