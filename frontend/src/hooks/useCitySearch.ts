import { useState } from "react";
import { api } from "../services/api";

export function useCitySearch() {
  const [results, setResults] = useState<any[]>([]);

  const search = async (name: string) => {
    try {
      const res = await api.get("/search-city", {
        params: { name }
      });

      // ✅ backend returns ARRAY directly
      setResults(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("City search failed:", err);
      setResults([]);
    }
  };

  return { results, search };
}