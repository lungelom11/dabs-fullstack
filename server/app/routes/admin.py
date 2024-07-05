from fastapi import APIRouter, status, HTTPException
from ..schemas import Admin
from ..database import admin_collection
from ..utils import generate_admin_id, hash

router = APIRouter(
    prefix= "/admin",
    tags = ["Admin"]
)

#Get all registered admins
@router.get("/")
def get_admins():
    return {"message":"List of registered admins"}

#Returning single admin
@router.get("/{id}")
def get_admin(id: str):
    return {"message":"Returning single admin"}

#Registering new admin
@router.post("/", status_code=status.HTTP_201_CREATED)
def create_admin(new_admin: Admin):
        # Check if a admin with the given username already exists
        if admin_collection.find_one({"username": new_admin.email}):
            raise HTTPException(status_code=409, detail="Username already exists")

        # Convert new_admin to dictionary and add custom _id
        admin_data = new_admin.dict()
        admin_data["_id"] = generate_admin_id()
        admin_data["password"] = hash(admin_data["password"])

        # Insert into the collection
        resp = admin_collection.insert_one(admin_data)

    #     # Create access token
    #     access_token = create_access_token(data={"patient_id": str(patient_data["_id"])})
        return {"status": 201, "message": "admin created successfully", "data": admin_data}

#Delete admin
@router.delete("/{id}")
def delete_admin(id: str):
    return {"message":"Deleting admin"}