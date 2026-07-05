from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services.weather import get_temperature
from app.services.geocoding import search_city
app = FastAPI()

# ✅ THIS IS THE FIX
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/weather")
async def weather(lat: float, lon: float):
    return await get_temperature(lat, lon)

@app.get("/search")
async def search(city: str):
    return await search_city(city)