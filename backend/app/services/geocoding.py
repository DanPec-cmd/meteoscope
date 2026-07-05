import httpx
from typing import List, Dict, Any

GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search"


async def search_city(city: str) -> List[Dict[str, Any]]:
    # 🧼 Prevent unnecessary network trips for whitespace queries
    if not city or not city.strip():
        return []

    try:
        async with httpx.AsyncClient(timeout=10) as client:
            res = await client.get(
                GEOCODING_URL, 
                params={
                    "name": city.strip(),
                    "count": 5,
                    "language": "en",
                    "format": "json"
                }
            )

            if res.status_code != 200:
                return []

            data = res.json()
            results = data.get("results", [])

            # Handle edge case where 'results' key is missing or explicitly None
            if not results:
                return []

            formatted_results = []
            for r in results:
                # 🛡️ Safe fallback mapping to completely avoid KeyErrors
                lat = r.get("latitude")
                lon = r.get("longitude")
                name = r.get("name")

                # Skip malformed data entries that don't have mandatory coords
                if lat is None or lon is None or not name:
                    continue

                # 🗺️ Pull region/state data (admin1) to distinguish duplicate cities
                admin_region = r.get("admin1", "")
                country = r.get("country", "")
                
                # Combine them nicely (e.g., "Texas, United States" or just "France")
                location_context = f", {admin_region}" if admin_region else ""
                full_country_str = f"{country}{location_context}" if country else admin_region

                formatted_results.append({
                    "name": name,
                    "country": full_country_str,
                    "lat": lat,
                    "lon": lon
                })

            return formatted_results

    except (httpx.RequestError, ValueError):
        # Gracefully handle network timeouts or JSON parsing glitches
        return []