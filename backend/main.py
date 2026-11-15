
from fastapi import FastAPI
import pickle
import numpy as np
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://satyam-placement-prediction-2026.netlify.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load ML Model
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

# Load Scaler
with open("scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

@app.get("/")
def home():
    return {"message": "Placement Prediction API Running"}

class StudentData(BaseModel):
    cgpa: float
    iq: float

@app.post("/predict")
def predict(data: StudentData):

    input_data = np.array([[data.cgpa, data.iq]])

    scaled_data = scaler.transform(input_data)

    prediction = model.predict(scaled_data)

    if prediction[0] == 1:
        result = "Placed"
    else:
        result = "Not Placed"

    return {"prediction": result}

