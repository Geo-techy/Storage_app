import os
import shutil
from sqlalchemy import func
from fastapi import APIRouter, UploadFile, File, Depends,HTTPException
from sqlalchemy.orm import Session
import uuid
from app.database import get_db
from fastapi.responses import FileResponse
from app.models import File as FileModel
from app.routes.dependencies import get_current_user

router = APIRouter()
@router.post("/upload")
def upload_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    upload_dir = "uploads"

    os.makedirs(upload_dir, exist_ok=True)

    unique_name = f"{uuid.uuid4()}_{file.filename}"
    file_path = os.path.join(
        upload_dir,
        unique_name
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )
    file_data = FileModel(
        filename=file.filename,
        filepath=file_path,
        filesize=os.path.getsize(file_path),
        content_type=file.content_type,
        owner_id=current_user["id"]
    )

    db.add(file_data)
    db.commit()
    db.refresh(file_data)

    return {
    "id": file_data.id,
    "filename": file_data.filename,
    "size": file_data.filesize,
    "content_type": file_data.content_type,
    "message": "Upload successful"
    }

@router.get("/files")
def get_files(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    files = (
        db.query(FileModel)
        .filter(FileModel.owner_id == current_user["id"])
        .all()
    )

    return files

@router.delete("/files/{id}")
def delete_file(
    id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    file = (
        db.query(FileModel)
        .filter(
            FileModel.id == id,
            FileModel.owner_id == current_user["id"]
        )
        .first()
    )

    if file is None:
        raise HTTPException(
            status_code=404,
            detail="File not found"
        )
    try:
        os.remove(file.filepath)
    except:
        raise HTTPException(
            status_code=404,
            detail="File not found"
        )
    

    db.delete(file)

    db.commit()

    return {
        "message":"Deleted"
    }

@router.get("/download/{id}")
def download_file(
    id:int,
    db:Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    file = (
        db.query(FileModel)
        .filter(
            FileModel.id==id,
            FileModel.owner_id==current_user["id"]
        )
        .first()
    )

    if file is None:
        raise HTTPException(
            status_code=404,
            detail="File not found"
        )
    if  not os.path.exists(file.filepath):
        raise HTTPException(
            status_code=404,
            detail="File not exists"
        )
    
    return FileResponse(
        path=file.filepath,
        filename=file.filename
    )
@router.get("/me")
def get_me(
    current_user=Depends(get_current_user)
):
    return {
        "id": current_user["id"],
        "email": current_user["sub"]
    }

@router.get("/storage")
def get_storage(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    total = (
        db.query(func.sum(FileModel.filesize))
        .filter(FileModel.owner_id == current_user["id"])
        .scalar()
    )

    if total is None:
        total = 0

    STORAGE_LIMIT = 10 * 1024 * 1024 * 1024  # 10 GB

    return {
        "used": total,
        "limit": STORAGE_LIMIT
    }