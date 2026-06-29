from sqlalchemy import Column, Integer, String,ForeignKey
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, unique=True, nullable=False)

    password = Column(String, nullable=False)

class File(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True)

    filename = Column(String)

    filepath = Column(String)

    filesize = Column(Integer)

    content_type = Column(String)

    owner_id = Column(
        Integer,
        ForeignKey("users.id")
    )