#Patient Model
from pydantic import BaseModel

class Patient(BaseModel):
    firstname: str
    lastname: str
    email: str
    