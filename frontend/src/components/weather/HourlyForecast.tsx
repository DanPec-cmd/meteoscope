import { getWeatherInfo } from "../../utils/weatherCode";

type Props = {
  hourly: {
    time: string[];
    temperature: number[];
    weathercode: number[];
  };
};

export default function HourlyForecast({ hourly }: Props) {
  if (!hourly) return null;

  const now = new Date();
  const currentHour = now.getHours();

  // show next 24 hours only
  const startIndex = currentHour;
  const endIndex = currentHour + 24;

  return (
    <div className="mt-6">
      <div className="text-white/60 text-sm mb-3">Hourly Forecast</div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {hourly.time.slice(startIndex, endIndex).map((t, i) => {
          const temp = hourly.temperature[startIndex + i];
          const code = hourly.weathercode[startIndex + i];

          const weather = getWeatherInfo(code);

          const hour = new Date(t).getHours();

          return (
            <div
              key={i}
              className="min-w-[70px] p-3 rounded-xl bg-white/5 border border-white/10 text-center backdrop-blur-xl"
            >
              <div className="text-xs text-white/60">
                {hour}:00
              </div>

              <div className="text-lg mt-2">
                {weather.icon}
              </div>

              <div className="text-sm mt-2">
                {Math.round(temp)}°
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}