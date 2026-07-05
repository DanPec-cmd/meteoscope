export default function WeatherFX({ weathercode }: { weathercode: number }) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      
      {/* ☁️ CLOUDS */}
      {(weathercode === 1 || weathercode === 2 || weathercode === 3) && (
        <div className="absolute inset-0">
          <div className="cloud cloud1" />
          <div className="cloud cloud2" />
        </div>
      )}

      {/* 🌧️ RAIN */}
     {weathercode >= 51 && weathercode <= 82 && (
  <div className="rain opacity-60" />
)}

      {/* 🌫️ FOG */}
      {weathercode >= 45 && weathercode <= 48 && (
        <div className="fog" />
      )}
    </div>
  );
}