import { useState } from "react";
import { api } from "../services/api";

export function useCitySearch() {
  const [results, setResults] = useState<any[]>([]);

  const search = async (city: string) => {
    try {
      const res = await api.get("/search", {
        params: { city }
      });

      setResults(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("City search failed:", err);
      setResults([]);
    }
  };

  return { results, search };
}