import { useState } from "react";
import { useCitySearch } from "../../hooks/useCitySearch";

type City = {
  name: string;
  country: string;
  lat: number;
  lon: number;
};

export default function CitySearch({
  onSelect,
}: {
  onSelect: (city: City) => void;
}) {
  const [query, setQuery] = useState("");
  const { results, search } = useCitySearch();

  const handleChange = (value: string) => {
    setQuery(value);

    // prevent spam requests
    if (value.trim().length < 2) return;

    search(value);
  };

  const handleSelect = (city: City) => {
    // HARD GUARD — prevents accidental bad objects causing Android intent issues
    if (!city || typeof city !== "object") return;
    if (typeof city.lat !== "number" || typeof city.lon !== "number") return;

    setQuery(city.name);
    onSelect(city);
  };

  // Handles the Android keyboard "Search" button press natively
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Safely blocks Android from launching external intents
    
    if (results.length > 0) {
      handleSelect(results[0]);
    }
  };

  return (
    <div className="mb-6">
      {/* WRAPPED IN A FORM */}
      <form action="." onSubmit={handleSubmit}>
        <input
          type="search" // Tells mobile keyboards to show the "Search" key
          className="w-full rounded-xl bg-white/5 p-3 text-white outline-none"
          placeholder="Search city..."
          value={query}
          autoComplete="off"
          onChange={(e) => handleChange(e.target.value)}
          // onKeyDown is removed because onSubmit handles the Enter/Search key now
        />
      </form>

      {/* DROPDOWN */}
      <div className="mt-2 space-y-2">
        {Array.isArray(results) &&
          results.map((city: City, i: number) => (
            <div
              key={`${city.name}-${i}`}
              onClick={() => handleSelect(city)}
              className="cursor-pointer rounded-lg bg-white/5 p-2 hover:bg-white/10 text-white"
            >
              <div className="font-medium">{city.name}</div>
              <div className="text-xs text-white/60">{city.country}</div>
            </div>
          ))}
      </div>
    </div>
  );
}