import motor.motor_asyncio
from .config import settings

uri = f"mongodb+srv://{settings.database_username}:{settings.database_password}@dabs-fullstack.zvwtzb9.mongodb.net/?retryWrites=true&w=majority&appName=dabs-fullstack"

# Create a new client and connect to the server
client = motor.motor_asyncio.AsyncIOMotorClient(uri)

db = client.dabsdb
patient_collection = db["patients"]
appointment_collection = db["bookings"]
admin_collection = db["admin"]