from jose import jwt
from typing import Optional
from datetime import datetime, timedelta

from app.config import SECRET_KEY, ALGORITHM

from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials


class JWTRepo:

    def __init__(self, data: dict = {}, token: str = None) -> None:
        self.data = data
        self.token = token

    def generar_token(self, expires_delta: Optional[timedelta] = None):
        to_encode = self.data.copy()

        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=60)

        to_encode.update({"exp": expire})
        encode_jwt = jwt.encode(claims=to_encode, key=SECRET_KEY, algorithm=ALGORITHM)

        return encode_jwt

    def decodificar_token(self):
        try:
            decode_token = jwt.decode(token=self.token, key=SECRET_KEY, algorithms=[ALGORITHM])
            if decode_token["expires"] >= datetime.time():
                return decode_token
            else:
                return None
        except:
            return {}

    @staticmethod
    def extraer_token(token: str):
        return jwt.decode(token=token, key=SECRET_KEY, algorithms=[ALGORITHM])


class JWTBearer(HTTPBearer):

    def __init__(self, rangos_requeridos: str = "Usuario", auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)
        self.rangos_requeridos = rangos_requeridos

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if not credentials:
            raise HTTPException(status_code=403,
                                detail={"status": "Forbidden", "message": "Código de autorización inválido"})

        if not credentials.scheme == "Bearer":
            raise HTTPException(status_code=403,
                                detail={"status": "Forbidden", "message": "Esquema de autenticación inválido"})

        rango_token = self.verificar_jwt(credentials.credentials)
        if rango_token is None:
            raise HTTPException(status_code=403,
                                detail={"status": "Forbidden", "message": "Token inválido o expirado"})
        else:
            if not rango_token in self.rangos_requeridos.split("-"):
                raise HTTPException(status_code=403,
                                    detail={"status": "Forbidden", "message": "Rango inválido"})
        return credentials.credentials

    @staticmethod
    def verificar_jwt(jwt_token: str):
        try:
            token_decodificado = jwt.decode(token=jwt_token, key=SECRET_KEY, algorithms=[ALGORITHM])
            if token_decodificado is not None:
                return token_decodificado["Rango"]
            else:
                return None
        except:
            return None
