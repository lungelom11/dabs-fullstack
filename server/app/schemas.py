from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List

class Address(BaseModel):
    street: str
    suburb: str
    city: str
    code: str

class Patient(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    idNumber: str
    phone: str
    password: str
    address: Address
    currentMedications: Optional[str]
    medicalHistory: Optional[str]
    emergencyContactName: str
    emergencyContactPhone: str

class PatientLogin(BaseModel):
    email:EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: Optional[str] = None

class UpdatePatient(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    idNumber: str
    phone: str
    currentMedications: Optional[str]
    medicalHistory: Optional[str]
    emergencyContactName: str
    emergencyContactPhone: str


class Appointment(BaseModel):
    patient_id: str
    doc_id: str
    appointment_date: str
    appointment_time: str
    reason: str
    status: str
    notes: Optional[str] = None

class AppointmentUpdate(BaseModel):
    appointment_date: str
    appointment_time: str
    reason: str
    status: str
    notes: Optional[str] = None

class Admin(BaseModel):
    firstname: str
    lastname: str
    username: str
    email: Optional[str] = None
    password: str
    role: str
    branches: List[str]
    image_url: Optional[str] = None  # Field to store the admin's image URL

class AdminLogin(BaseModel):
    username: str
    password: str