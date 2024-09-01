import uvicorn
from fastapi import FastAPI, APIRouter
from app.config import db


def init_app():
    db.init()

    app = FastAPI(
        title="Gymcontrol",
        description="Control of a Gym",
        version="1"
    )

    @app.on_event("startup")
    async def startup():
        await db.create_all()

    @app.on_event("shutdown")
    async def shutdown():
        await db.close()

    return app


app = init_app()


def start():
    """El parámetro 'reload' da problemas con PyCharm"""
    uvicorn.run(app="app.Main:app", host="localhost", port=8888)
