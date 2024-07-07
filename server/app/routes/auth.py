from fastapi import status, APIRouter,HTTPException
from ..schemas import  PatientLogin,AdminLogin
from ..database import patient_collection, admin_collection
from ..utils import hash, verify
from ..oath2 import create_access_token, create_admin_access_token

router = APIRouter(
    tags=["Authentication"]
)

@router.post('/login')
def login(patient_credentials: PatientLogin):
    patient = patient_collection.find_one({"email": patient_credentials.email})


    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Patient does not exist")

    if not verify(patient_credentials.password, patient["password"]):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials")

    access_token = create_access_token(data={"patient_id": str(patient["_id"])})

    return {"access_token": access_token, "token_type": "bearer"}



@router.post('/admin/login')
def login(admin_credentials: AdminLogin):
    admin = admin_collection.find_one({"username": admin_credentials.username})

    if not admin:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Admin not found")

    if not verify(admin_credentials.password, admin["password"]):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials")

    admin_access_token = create_admin_access_token(data={"admin_id": admin["_id"], "role": admin["role"]})

    return {"access_token": admin_access_token, "token_type": "bearer"}


