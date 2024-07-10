from fastapi import APIRouter, status, HTTPException, Depends
from ..database import patient_collection
from ..schemas import Patient, UpdatePatient
from ..utils import generate_id, hash
from .auth import create_access_token
from ..oauth2 import get_current_user

router = APIRouter(
    prefix="/patients",
    tags=["Patients"]
)

# Retrieve all patients
@router.get("/", response_model=dict)
async def get_patients():
    patients = await patient_collection.find().to_list(None)
    return {"patients": patients}

# Get Single patient
@router.get("/{id}", response_model=dict)
async def get_patient(id: str, current_patient: dict = Depends(get_current_user)):
    patient = await patient_collection.find_one({"_id": id})
    
    if patient:
        return patient
    else:
        raise HTTPException(status_code=404, detail=f"Patient with id {id} not found")

# Create new Patient
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=dict)
async def create_patient(new_patient: Patient):
    try:
        # Check if a patient with the given email already exists
        if await patient_collection.find_one({"email": new_patient.email}):
            raise HTTPException(status_code=409, detail="Email already exists")

        # Convert new_patient to dictionary and add custom _id
        patient_data = new_patient.dict()
        patient_data["_id"] = generate_id()
        patient_data["password"] = hash(patient_data["password"])

        # Insert into the collection
        resp = await patient_collection.insert_one(patient_data)

        # Create access token
        access_token = create_access_token(data={"patient_id": str(patient_data["_id"])})

        return {"status": 201, "message": "Patient created successfully", "access_token": access_token}

    except HTTPException as http_exc:
        raise http_exc  # Re-raise HTTP exceptions
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Some error occurred: {e}")

# Update patient route
@router.put("/{id}", response_model=dict)
async def update_patient(id: str, updated_patient: UpdatePatient, current_patient: dict = Depends(get_current_user)):
    result = await patient_collection.update_one(
        {"_id": current_patient["_id"]}, {"$set": updated_patient.dict()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Patient not found")
    else:
        return {"message": "Patient updated successfully"}

# Delete patient route
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_patient(id: str):
    result = await patient_collection.delete_one({"_id": id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Patient not found")
        
    return
