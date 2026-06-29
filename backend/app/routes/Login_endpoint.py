from fastapi import Depends, HTTPException,APIRouter
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.routes.auth import verify_password
from app.schemas import LoginRequest
from app.routes.jwt_handler import create_access_token

router = APIRouter()

@router.post("/login")
def login(user: LoginRequest, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if db_user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not verify_password(
        user.password,
        db_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    token = create_access_token(
        {
            "sub": db_user.email,
            "id": db_user.id
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }