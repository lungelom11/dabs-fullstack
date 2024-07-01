from fastapi import status, APIRouter,HTTPException
from ..schemas import  PatientLogin
from ..database import patient_collection
from ..utils import hash, verify
from ..oath2 import create_access_token

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





