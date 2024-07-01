from fastapi import FastAPI
from .routes import patient,auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()



origins = [
    "http://localhost",
    "http://localhost:3001",
    "http://localhost:5173",
    "http://your-domain.com",
    # add more origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




@app.get("/")
def home():
    return {"message":"Welcome to DABS server"}


app.include_router(patient.router)
app.include_router(auth.router)