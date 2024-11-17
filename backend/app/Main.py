import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import db
from app.service.auth_service import generar_administrador_principal
from app.controller import authentication, Cliente, Administradores, Usuario, Entrenadores

origins = [
    "http://localhost:3000",
    "http://localhost:3001"  # A veces el 3000 por alguna razón me aparece ocupado
]


def init_app():
    db.init()

    app = FastAPI(
        title="Gymcontrol",
        description="Control of a Gym",
        version="1"
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
    )

    @app.on_event("startup")
    async def startup():
        await db.create_all()
        await generar_administrador_principal()

    @app.on_event("shutdown")
    async def shutdown():
        await db.close()

    app.include_router(authentication.router)
    app.include_router(Cliente.router)
    app.include_router(Administradores.router)
    app.include_router(Usuario.router)
    app.include_router(Entrenadores.router)

    return app


app = init_app()


def start():
    """El parámetro 'reload' da problemas con PyCharm"""
    uvicorn.run(app="app.Main:app", host="localhost", port=8888)
