import { useState } from "react";
import { useCitySearch } from "../../hooks/useCitySearch";

export default function CitySearch({ onSelect }: any) {
  const [query, setQuery] = useState("");
  const { results, search } = useCitySearch();

  const handleSearch = (value: string) => {
    setQuery(value);

    // prevent empty / spam requests
    if (value.trim().length < 2) {
      return;
    }

    search(value);
  };

  return (
    <div className="mb-6">
      <input
        className="w-full rounded-xl bg-white/5 p-3 text-white outline-none"
        placeholder="Search city..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // prevents mobile "open app" / submit behavior
            search(query);
          }
        }}
        autoComplete="off"
      />

      {/* dropdown */}
      <div className="mt-2 space-y-2">
        {results.length > 0 &&
          results.map((city, i) => (
            <div
              key={i}
              onClick={() => {
                setQuery(city.name);
                onSelect(city);
              }}
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