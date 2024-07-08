from fastapi import APIRouter, status, HTTPException,Query
from ..schemas import Admin
from ..database import admin_collection
from ..utils import generate_admin_id, hash
from typing import Optional

router = APIRouter(
    prefix= "/admin",
    tags = ["Admin"]
)

#Get all registered admins
@router.get("/")
def get_admins(role: Optional[str] = Query(None, description="Role to filter admins by")):
    query = {}
    if role:
        query['role'] = role
    
    admins = list(admin_collection.find(query))
    return admins

#Returning single admin
@router.get("/{id}")
def get_admin(id: int):
    admin = admin_collection.find_one({"_id": id})
    if admin:
        return admin
    else:
        raise HTTPException(status_code=404, detail=f"admin with id {id} not found")


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
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_admin(id: int):
    result = admin_collection.delete_one({"_id": id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Client not found")
        
    return 