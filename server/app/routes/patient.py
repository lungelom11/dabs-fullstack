from fastapi import APIRouter, status, HTTPException
from ..database import patient_collection
from ..schemas import Patient
from ..utils import generate_id, hash
from .auth import create_access_token


router = APIRouter(
    prefix="/patients",
    tags=["Patients"]
)

#Retrieve all patients
@router.get("/")
def get_patients():
    patients = list(patient_collection.find())

    return {"patients": patients}

    return {"message": "returning all patients"}

#Get Single patient
@router.get("/{id}")
def get_patient(id: str):

    patient = patient_collection.find_one({"_id": id})

    if patient:
        patient["_id"] = str(patient["_id"])
        return {"patient": patient}
    else:
        raise HTTPException(status_code=404, detail=f"patient with id {id} not found")

#Create new Patient
@router.post("/", status_code=status.HTTP_201_CREATED)
def create_patient(new_patient: Patient):
    try:
        # Check if a patient with the given email already exists
        if patient_collection.find_one({"email": new_patient.email}):
            raise HTTPException(status_code=409, detail="Email already exists")

        # Convert new_patient to dictionary and add custom _id
        patient_data = new_patient.dict()
        patient_data["_id"] = generate_id()
        patient_data["password"] = hash(patient_data["password"])

        # Insert into the collection
        resp = patient_collection.insert_one(patient_data)

        # Create access token
        access_token = create_access_token(data={"patient_id": str(patient_data["_id"])})

        return {"status": 201, "message": "patient created successfully", "access_token": access_token}

    except HTTPException as http_exc:
        raise http_exc  # Re-raise HTTP exceptions
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Some error occurred: {e}")




#Update patient route
@router.put("/{id}")
def update_patient(id: str, updated_patient: Patient):
 
    result = patient_collection.update_one(
        {"_id": id}, {"$set": dict(updated_patient)}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Client not found")
    else:
        return {"message":"Client Updated Successfullt"}

#Delete patient route
@router.delete("/{id}",status_code= status.HTTP_204_NO_CONTENT)
def delete_patient(id: str):

    result = patient_collection.delete_one({"_id": id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Client not found")
        
    return 