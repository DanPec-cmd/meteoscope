import { useEffect, useState } from "react";
import { api } from "../services/api";

type HourlyData = {
  time: string[];
  temperature: number[];
  weathercode: number[];
};

export function useWeather(location: any) {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [weathercode, setWeathercode] = useState<number | null>(null);
  const [daily, setDaily] = useState<any>(null);
  const [hourly, setHourly] = useState<HourlyData | null>(null);

  useEffect(() => {
    if (!location?.lat || !location?.lon) return;

    const fetchWeather = async () => {
      try {
        const res = await api.get("/weather", {
          params: {
            lat: location.lat,
            lon: location.lon,
          },
        });

        setTemperature(res.data.temperature ?? null);
        setWeathercode(res.data.weathercode ?? null);
        setDaily(res.data.daily ?? null);
        setHourly(res.data.hourly ?? null);
      } catch (err) {
        console.error("Weather fetch failed:", err);
      }
    };

    fetchWeather();
  }, [location?.lat, location?.lon]);

  return {
    temperature,
    weathercode,
    daily,
    hourly,
  };
}