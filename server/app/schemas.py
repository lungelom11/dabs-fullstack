from pydantic import BaseModel, Field, EmailStr
from typing import Optional

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

class TokenData(BaseModel):
    access_token: str
    token_type: str