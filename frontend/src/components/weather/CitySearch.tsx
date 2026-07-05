import { useState } from "react";
import { useCitySearch } from "../../hooks/useCitySearch";

export default function CitySearch({ onSelect }: any) {
  const [query, setQuery] = useState("");
  const { results, search } = useCitySearch();

  return (
    <div className="mb-6">
      <input
  className="w-full rounded-xl bg-white/5 p-3 text-white outline-none"
  placeholder="Search city..."
  value={query}
  onChange={(e) => handleSearch(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();   // 🚨 IMPORTANT FIX
      search(query);
    }
  }}
/>

      <div className="mt-2 space-y-2">
        {results.map((city, i) => (
          <div
            key={i}
            onClick={() => onSelect(city)}
            className="cursor-pointer rounded-lg bg-white/5 p-2 hover:bg-white/10"
          >
            {city.name}, {city.country}
          </div>
        ))}
      </div>
    </div>
  );
}