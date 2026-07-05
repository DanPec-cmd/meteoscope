import { getWeatherInfo } from "../../utils/weatherCode";

type Props = {
  daily: any;
};

export default function ForecastStrip({ daily }: Props) {
  if (!daily?.time || !Array.isArray(daily.time)) return null;

  return (
    <div className="mt-6">
      <div className="flex gap-3 overflow-x-auto pb-2">
        {daily.time.map((day: string, i: number) => {
          const code = daily.weather_code?.[i];
          const max = daily.temperature_2m_max?.[i];
          const min = daily.temperature_2m_min?.[i];

          const weather = getWeatherInfo(code ?? 0);

          const date = new Date(day);
          const label = date.toLocaleDateString("en-US", {
            weekday: "short",
          });

          return (
            <div
              key={i}
              className="min-w-[90px] flex-shrink-0 rounded-2xl
              bg-white/5 border border-white/10
              backdrop-blur-xl p-3 text-center"
            >
              <div className="text-xs text-white/60">{label}</div>

              <div className="text-2xl my-2">{weather.icon}</div>

              <div className="text-sm font-semibold">
                {Math.round(max)}°
              </div>

              <div className="text-xs text-white/40">
                {Math.round(min)}°
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}