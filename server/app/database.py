from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from .config import settings

uri = f"mongodb+srv://{settings.database_username}:{settings.database_password}@dabs-fullstack.zvwtzb9.mongodb.net/?retryWrites=true&w=majority&appName=dabs-fullstack"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

db = client.dabsdb
patient_collection = db["patients"]
bookings_collection = db["bookings"]
admin_collection = db["admin"]