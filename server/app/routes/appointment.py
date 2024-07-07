from fastapi import APIRouter, status, HTTPException
from ..schemas import Appointment, AppointmentUpdate
from ..database import appointment_collection
from ..utils import generate_appointment_id

router = APIRouter(
    prefix="/appointments",
    tags=["Appointments"]
)

# Get all appointments
@router.get("/")
def get_appointments():
    appointments = list(appointment_collection.find())

    return appointments

# Get one appointment
@router.get("/{id}")
def get_appointment(id: str):
    appointment = appointment_collection.find_one({"patient_id": id})
    if appointment:
        return appointment
    else:
        raise HTTPException(status_code=404, detail=f"appointment not found")

# Create/Book appointment
@router.post("/", status_code=status.HTTP_201_CREATED)
def create_appointment(new_appointment: Appointment):
    try:
        # Convert new_appointment to dictionary and add custom _id
        appointment_data = new_appointment.dict()
        appointment_data["_id"] = generate_appointment_id()
        # Insert into the collection
        resp = appointment_collection.insert_one(appointment_data)

        return {"status": 201, "message": "appointment booked successfully"}

    except HTTPException as http_exc:
        raise http_exc  # Re-raise HTTP exceptions
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Some error occurred: {e}")



# Update appointment
@router.put("/{id}")
def update_appointment(id: int, updated_appointment: AppointmentUpdate):
    result = appointment_collection.update_one(
        {"_id": id}, {"$set": dict(updated_appointment)}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Client not found")
    else:
        return {"message":"Client Updated Successfullt"}

# Delete/Cancel appointment
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_appointment(id: int):
    result = appointment_collection.delete_one({"_id": id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Client not found")
        
    return 


