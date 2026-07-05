import httpx
from typing import Dict, Any

OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"


async def get_temperature(latitude: float, longitude: float) -> Dict[str, Any]:

    params = {
        "latitude": latitude,
        "longitude": longitude,

        # current conditions
        "current": "temperature_2m,weather_code,wind_speed_10m",

        # hourly forecast
        "hourly": "temperature_2m,weather_code",

        # daily forecast
        "daily": "temperature_2m_max,temperature_2m_min,weather_code",

        "timezone": "auto",
        "forecast_days": 7
    }

    try:
        async with httpx.AsyncClient(timeout=10) as client:
            res = await client.get(OPEN_METEO_URL, params=params)

            if res.status_code != 200:
                return {
                    "error": "failed_request",
                    "status_code": res.status_code,
                    "details": res.text
                }

            data = res.json()

            current = data.get("current", {})
            hourly = data.get("hourly", {})
            daily = data.get("daily", {})

            return {
                # current weather
                "temperature": current.get("temperature_2m"),
                "weathercode": current.get("weather_code"),
                "windspeed": current.get("wind_speed_10m"),

                # hourly timeline
                "hourly": {
                    "time": hourly.get("time", []),
                    "temperature": hourly.get("temperature_2m", []),
                    "weathercode": hourly.get("weather_code", [])
                },

                # daily forecast
                "daily": daily
            }

    except httpx.RequestError as exc:
        return {
            "error": "network_error",
            "details": str(exc)
        }

    except Exception as e:
        return {
            "error": "server_error",
            "details": str(e)
        }