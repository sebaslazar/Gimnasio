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
            expire = datetime.utcnow() + timedelta(minutes=15)

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

    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403,
                                    detail={"status": "Forbidden", "message": "Esquema de autenticación inválido."})
            if not self.verificar_jwt(credentials.credentials):
                raise HTTPException(status_code=403,
                                    detail={"status": "Forbidden", "message": "Token inválido o expirado."})
            return credentials.credentials
        else:
            raise HTTPException(status_code=403,
                                detail={"status": "Forbidden", "message": "Código de autorización inválido."})

    @staticmethod
    def verificar_jwt(jwt_token: str):
        if jwt.decode(token=jwt_token, key=SECRET_KEY, algorithms=[ALGORITHM]) is not None:
            return True
        else:
            return False
