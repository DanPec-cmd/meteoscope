import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function TemperatureGraph({ data }: any) {
  if (!data || data.length === 0) return null;

  return (
    <div className="mt-6 h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>

          <CartesianGrid stroke="rgba(255,255,255,0.08)" />

          {/* ✅ FIXED: use stable label, not raw date */}
          <XAxis
            dataKey="label"
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
          />

          <YAxis
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
            domain={["auto", "auto"]}
          />

          <Tooltip
            labelFormatter={(label) => `Time: ${label}`}
            contentStyle={{
              backgroundColor: "#0f0f0f",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              color: "#fff",
            }}
          />

          <Line
            type="monotone"
            dataKey="temp"
            stroke="#60a5fa"
            strokeWidth={2}
            dot={false}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}