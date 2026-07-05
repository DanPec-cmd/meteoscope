import { useState, useMemo, useEffect } from "react";
import HeroCard from "./components/weather/HeroCard";
import { api } from "./services/api";
import { getWeatherTheme } from "./theme/weatherTheme";
import WeatherFX from "./components/weather/WeatherFX";

interface CityResult {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export default function App() {
  const [results, setResults] = useState<CityResult[]>([]);
  const [location, setLocation] = useState<CityResult | null>(null);
  const [weathercode, setWeathercode] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ⏱️ Debounce effect ONLY handles active API fetching now
  useEffect(() => {
    if (!searchTerm.trim()) return;

    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await api.get("/search", {
          params: { city: searchTerm },
        });
        setResults(res.data);
      } catch (err) {
        console.error("Search error:", err);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // 🌈 Memoize theme calculation
  const theme = useMemo(() => getWeatherTheme(weathercode ?? 0), [weathercode]);

  // 🧼 Handle input changes and clear states safely in the event handler
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (!value.trim()) {
      setResults([]); // Perfectly legal to call synchronously inside an event handler!
    }
  };

  return (
    <div className={`relative min-h-screen text-white px-6 py-8 transition-all duration-700 bg-gradient-to-b ${theme.bg}`}>
      <WeatherFX weathercode={weathercode ?? 0} />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <div className="text-white/60 text-sm tracking-wide">Meteo Dashboard</div>

        {/* SEARCH */}
        <div className="relative z-50">
          <input
            className="w-full rounded-2xl px-4 py-3 bg-white/5 border border-white/10 backdrop-blur-xl outline-none focus:border-white/20 transition"
            placeholder="Search city..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)} // Use the new handler
          />

          {/* DROPDOWN */}
          {results.length > 0 && (
            <div className="absolute w-full mt-2 rounded-xl bg-black/70 border border-white/10 backdrop-blur-xl overflow-hidden">
              {results.map((city) => {
                const cityKey = `${city.lat}-${city.lon}`;
                return (
                  <div
                    key={cityKey}
                    className="p-3 hover:bg-white/10 cursor-pointer transition"
                    onClick={() => {
                      setLocation(city);
                      setWeathercode(null);
                      setResults([]);
                      setSearchTerm("");
                    }}
                  >
                    {city.name} {city.country}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* HERO */}
        {location ? (
          <div className={`transition-all duration-500 ease-in-out ${weathercode === null ? "opacity-0 scale-[0.98] blur-sm" : "opacity-100 scale-100 blur-0"}`}>
            <HeroCard location={location} onWeather={(code: number) => setWeathercode(code)} />
          </div>
        ) : (
          <div className="text-white/40 text-center mt-20">Search a city to begin</div>
        )}
      </div>
    </div>
  );
}