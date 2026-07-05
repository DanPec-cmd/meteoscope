import { CloudSun } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-white/10 px-8 py-4">
      <div className="flex items-center gap-2">
        <CloudSun size={28} />
        <span className="text-xl font-bold">
          MeteoScope
        </span>
      </div>

      <div className="text-sm text-slate-400">
        Weather Intelligence Platform
      </div>
    </nav>
  );
}