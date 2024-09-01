import uvicorn
from fastapi import FastAPI, APIRouter

app = FastAPI()

router = APIRouter()


@router.get("/")
async def home():
    return "Bienvenido"


app.include_router(router)


def start():
    """El parámetro 'reload' da problemas con PyCharm"""
    uvicorn.run(app="app.Main:app", host="localhost", port=8888)
