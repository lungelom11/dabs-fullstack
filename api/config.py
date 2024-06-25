
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://lungelomkhwemte11:k4vy74kN0PutPWwv@dabs-fullstack.zvwtzb9.mongodb.net/?retryWrites=true&w=majority&appName=dabs-fullstack"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

db = client.dabs_db
collection = db["patients"]

