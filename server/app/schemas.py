from pydantic import BaseModel, Field, EmailStr
from typing import Optional

class Patient(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    address: str
    phone: str  # Represent phone as a string
    password: str
    id_number: Optional[str]
    medical_history: Optional[str]
    current_medications: Optional[str]
    emergency_contact_name: Optional[str]
    emergency_contact_phone: Optional[str]
    insurance_details: Optional[str]

class PatientLogin(BaseModel):
    email:EmailStr
    password: str

class TokenData(BaseModel):
    access_token: str
    token_type: str