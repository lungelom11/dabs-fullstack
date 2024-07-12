from fastapi import APIRouter, status, HTTPException, Query
from ..schemas import Appointment, AppointmentUpdate
from ..database import appointment_collection
from ..utils import generate_appointment_id
from typing import Optional

router = APIRouter(
    prefix="/appointments",
    tags=["Appointments"]
)

# Get all appointments
@router.get("/", response_model=list)
async def get_appointments(
    status: Optional[str] = Query(None, description="Filter appointments by status"),
    appointment_date: Optional[str] = Query(None, description="Filter appointments by date in 'dd MMM yyyy' format")
):
    query = {}
    if status:
        query['status'] = status
    if appointment_date:
        query['appointment_date'] = appointment_date
    
    appointments = await appointment_collection.find(query).to_list(None)
    return appointments

# Get one appointment
@router.get("/{id}", response_model=dict)
async def get_appointment(id: str):
    appointment = await appointment_collection.find_one({"patient_id": id})
    if appointment:
        return appointment
    else:
        raise HTTPException(status_code=404, detail=f"Appointment not found")

# Create/Book appointment
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=dict)
async def create_appointment(new_appointment: Appointment):
    try:
        # Convert new_appointment to dictionary and add custom _id
        appointment_data = new_appointment.dict()
        appointment_data["_id"] = generate_appointment_id()
        
        # Insert into the collection
        resp = await appointment_collection.insert_one(appointment_data)

        return {"status": 201, "message": "Appointment booked successfully"}

    except HTTPException as http_exc:
        raise http_exc  # Re-raise HTTP exceptions
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Some error occurred: {e}")

# Update appointment
@router.put("/{id}", response_model=dict)
async def update_appointment(id: int, updated_appointment: AppointmentUpdate):
    result = await appointment_collection.update_one(
        {"_id": id}, {"$set": updated_appointment.dict()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Appointment not found")
    else:
        return {"message": "Appointment updated successfully"}

# Delete/Cancel appointment
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_appointment(id: int):
    result = await appointment_collection.delete_one({"_id": id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Appointment not found")
        
    return
