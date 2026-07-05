export function getWeatherInfo(code: number) {
  if (code === 0) return { label: "Clear", icon: "☀️" };
  if (code === 1) return { label: "Mainly clear", icon: "🌤️" };
  if (code === 2) return { label: "Partly cloudy", icon: "⛅" };
  if (code === 3) return { label: "Overcast", icon: "☁️" };

  if (code >= 45 && code <= 48) return { label: "Fog", icon: "🌫️" };
  if (code >= 51 && code <= 67) return { label: "Rain", icon: "🌧️" };
  if (code >= 71 && code <= 77) return { label: "Snow", icon: "❄️" };
  if (code >= 80 && code <= 82) return { label: "Showers", icon: "🌦️" };
  if (code >= 95) return { label: "Storm", icon: "⛈️" };

  return { label: "Unknown", icon: "🌡️" };
}