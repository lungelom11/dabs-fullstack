from fastapi import APIRouter, status, HTTPException, Query
from ..schemas import Admin
from ..database import admin_collection
from ..utils import generate_admin_id, hash
from typing import Optional
from ..config import settings
import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url

# Configuration       
cloudinary.config( 
    cloud_name = "daq9lqayi", 
    api_key = "198475924272853", 
    api_secret = "qIJjqBXJJGtb8FIwk8Iso02XlfI",
    secure=True
)

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)

# Get all registered admins
@router.get("/", response_model=list)
async def get_admins(role: Optional[str] = Query(None, description="Role to filter admins by")):
    query = {}
    if role:
        query['role'] = role
    
    admins = await admin_collection.find(query).to_list(None)
    return admins


@router.get("/{id}/{role}", response_model=dict)
async def get_admin_by_id_and_role(id: int, role: str):
    admin = await admin_collection.find_one({"_id": id, "role": role})
    if admin:
        return admin
    else:
        raise HTTPException(status_code=404, detail=f"Admin with id {id} and role {role} not found")



# Create new Admin
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=dict)
async def create_admin(new_admin: Admin):
    try:
        # Check if an admin with the given email already exists
        if await admin_collection.find_one({"email": new_admin.email}):
            raise HTTPException(status_code=409, detail="Email already exists")

        # Convert new_admin to dictionary and add custom _id
        admin_data = new_admin.dict()
        admin_data["_id"] = generate_admin_id()
        admin_data["password"] = hash(admin_data["password"])

        # Upload and optimize doctor image
        upload_result = cloudinary.uploader.upload(admin_data["image_url"], public_id="doctor_img")
        secure_url = upload_result["secure_url"]
        admin_data["image_url"] = secure_url
        print(secure_url)

        # Insert into the collection
        resp = await admin_collection.insert_one(admin_data)

        return {"status": 201, "message": "Admin created successfully", "data": str(resp.inserted_id)}

    except HTTPException as http_exc:
        raise http_exc  # Re-raise HTTP exceptions
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Some error occurred: {e}")

# Delete admin
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_admin(id: int):
    result = await admin_collection.delete_one({"_id": id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Admin not found")
        
    return
