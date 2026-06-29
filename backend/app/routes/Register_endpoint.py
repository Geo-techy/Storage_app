from fastapi import Depends, HTTPException,APIRouter
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User

from app.schemas import RegisterRequest
from app.routes.auth import hash_password

from app.routes.jwt_handler import create_access_token

router = APIRouter()

@router.post("/register")
def register(user: RegisterRequest, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )
    
    hashed = hash_password(user.password)
    new_user = User(
        email=user.email,
        password=hashed
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    token = create_access_token(
        {
            "sub": user.email,
            "id": new_user.id
        }
    )
    

    return {
        "message": "User created successfully"
    }
