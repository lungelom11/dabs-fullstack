from fastapi import FastAPI, APIRouter, HTTPException
from config import collection
from database.schemas import all_patients
from fastapi.middleware.cors import CORSMiddleware
from database.models import Patient

app = FastAPI()
router = APIRouter()

#Handling Cors
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
    "http://localhost:5173",  # Add your frontend URL here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#Creat patient API
@router.post("/api/patients")
def create_patient(new_patient: Patient):
    try:
        resp = collection.insert_one(dict(new_patient))
        return {"status":200, "id":str(resp.inserted_id)}
    except Exception as e:
        HTTPException(status_code=500, detail= f"Some error occured, {e}")


#Get all patients API
@router.get("/api/patients")
def get_all_patients():
    #Extract from the database
    data = collection.find()
    return all_patients(data)

app.include_router(router)
