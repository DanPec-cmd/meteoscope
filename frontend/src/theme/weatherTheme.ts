export function getWeatherTheme(code: number) {
  // Clear / sunny
  if (code === 0) {
    return {
      bg: "from-[#0B1B3A] via-[#1E3A8A] to-[#60A5FA]",
      glow: "bg-yellow-400/20",
    };
  }

  // Partly cloudy
  if (code === 1 || code === 2) {
    return {
      bg: "from-[#0F172A] via-[#1E293B] to-[#334155]",
      glow: "bg-blue-400/20",
    };
  }

  // Overcast
  if (code === 3) {
    return {
      bg: "from-[#0B1220] via-[#111827] to-[#1F2937]",
      glow: "bg-gray-400/10",
    };
  }

  // Rain / drizzle
  if (code >= 51 && code <= 67) {
    return {
      bg: "from-[#0A1A2F] via-[#0B2A4A] to-[#0E3A5A]",
      glow: "bg-cyan-400/20",
    };
  }

  // Snow
  if (code >= 71 && code <= 77) {
    return {
      bg: "from-[#0B1320] via-[#1B2A3A] to-[#3B4A5A]",
      glow: "bg-white/20",
    };
  }

  // Storm
  if (code >= 95) {
    return {
      bg: "from-[#0A0A1A] via-[#1A1033] to-[#2D1B4E]",
      glow: "bg-purple-500/20",
    };
  }

  // default fallback
  return {
    bg: "from-[#0B0F1A] via-[#111827] to-[#0B0F1A]",
    glow: "bg-blue-500/10",
  };
}