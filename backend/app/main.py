from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app.models import Base, User

from fastapi import FastAPI

from app.routes.Register_endpoint import router as register_router
from app.routes.Login_endpoint import router as login_router
from app.routes.file_endpoint import router as file_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(register_router)
app.include_router(login_router)
app.include_router(file_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
