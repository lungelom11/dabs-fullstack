import random
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def generate_id():
    #code to generate random number 
    random_number = random.randint(10000000, 99999999)
    id = "P" + str(random_number)
    return id

def generate_appointment_id():
    random_id = random.randint(10000,99999)
    return random_id

def generate_admin_id():
    random_id = random.randint(1000000,9999999)
    return random_id


def hash(password: str):
    return pwd_context.hash(password)

def verify(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)