from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services.weather import get_temperature
from app.services.geocoding import search_city

app = FastAPI()

# 🌍 IMPORTANT: define origins BEFORE using it
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://meteoscope.vercel.app",
]

# ✅ CORS middleware (must be BEFORE routes)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,  # safer for public APIs
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------
# WEATHER ENDPOINT
# -------------------
@app.get("/weather")
async def weather(lat: float, lon: float):
    return await get_temperature(lat, lon)

# -------------------
# CITY SEARCH ENDPOINT
# -------------------
@app.get("/search")
async def search(city: str):
    return await search_city(city)