import { useEffect, useMemo } from "react";
import { useWeather } from "../../hooks/useWeather";
import { getWeatherInfo } from "../../utils/weatherCode";
import ForecastStrip from "./ForecastStrip";
import HourlyForecast from "./HourlyForecast";
import TemperatureGraph from "./TemperatureGraph";
import { useAnimatedNumber } from "../../hooks/useAnimatedNumber";

export default function HeroCard({ location, onWeather }: any) {
  const { temperature, weathercode, daily, hourly } = useWeather(location);

  const weather = getWeatherInfo(weathercode ?? 0);
  const animatedTemp = useAnimatedNumber(temperature);

  useEffect(() => {
    if (weathercode !== null && onWeather) {
      onWeather(weathercode);
    }
  }, [weathercode, onWeather]);

  // ✅ Step 1: build structured hourly data
  const hourlySeries = useMemo(() => {
    if (!hourly?.time || !hourly?.temperature) return [];

    return hourly.time.map((t: string, i: number) => {
      const date = new Date(t);

      return {
        rawTime: t,
        time: date, // real Date object (for sorting / logic)
        label: date.getHours().toString().padStart(2, "0") + ":00",
        temp: hourly.temperature[i],
      };
    });
  }, [hourly]);

  // ✅ Step 2: sort safely (fixes API ordering issues)
  const sortedHourlySeries = useMemo(() => {
    return [...hourlySeries].sort(
      (a, b) => a.time.getTime() - b.time.getTime()
    );
  }, [hourlySeries]);

  return (
    <div className="relative overflow-hidden rounded-[28px] p-10 text-white bg-white/10 backdrop-blur-2xl border border-white/10 shadow-2xl">

      {/* ambient glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full" />

      {/* header */}
      <div className="relative flex justify-between items-start">
        <div>
          <p className="text-sm text-white/60">{location?.name}</p>

          <h2 className="text-xl font-medium mt-1 text-white/80">
            {weather.label}
          </h2>

          <div className="mt-6 text-7xl font-extralight leading-none">
            {temperature !== null ? `${animatedTemp}°` : "--"}
          </div>
        </div>

        <div className="text-6xl">{weather.icon}</div>
      </div>

      <div className="my-8 h-px bg-white/10" />

      {/* hourly list */}
      {hourly && <HourlyForecast hourly={hourly} />}

      {/* 🌡 GRAPH */}
      {sortedHourlySeries.length > 0 && (
        <TemperatureGraph data={sortedHourlySeries} />
      )}

      {/* daily */}
      {daily && (
        <div className="mt-6">
          <ForecastStrip daily={daily} />
        </div>
      )}
    </div>
  );
}