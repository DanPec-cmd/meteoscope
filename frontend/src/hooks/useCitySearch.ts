import { useState } from "react";
import { api } from "../services/api";

export function useCitySearch() {
  const [results, setResults] = useState<any[]>([]);

  const search = async (name: string) => {
    const res = await api.get("/search-city", {
      params: { name }
    });

    setResults(res.data.results || []);
  };

  return { results, search };
}