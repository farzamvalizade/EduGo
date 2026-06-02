import { type ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon?: ReactNode;
  trend?: "up" | "down" | null;
}

const StatCard = ({ title, value, icon, trend }: StatCardProps) => (
  <div className="group relative bg-linear-to-br from-[#151515] to-secondary border border-[#262626] rounded-2xl p-5 text-center overflow-hidden transition-all duration-300 hover:border-custard/30 hover:shadow-lg hover:shadow-custard/5 hover:-translate-y-0.5">
    <div className="absolute -top-12 -right-12 w-24 h-24 bg-custard/5 rounded-full blur-2xl pointer-events-none group-hover:bg-custard/10 transition-all duration-500" />

    {trend && (
      <div className="absolute top-3 right-3">
        <div
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            trend === "up"
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-red-500/20 text-red-400 border border-red-500/30"
          }`}
        >
          {trend === "up" ? "▲ +" : "▼ -"}
        </div>
      </div>
    )}

    <div className="relative z-10">
      <div className="flex items-center justify-center gap-2 mb-2">
        {icon && (
          <div className="text-custard/60 group-hover:text-custard transition-colors duration-300">
            {icon}
          </div>
        )}
        <div className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent tabular-nums">
          {value?.toLocaleString() ?? 0}
        </div>
      </div>

      <div className="text-sm text-gray-400 uppercase tracking-wide flex items-center justify-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-custard/40 group-hover:bg-custard transition-colors" />
        {title}
        <span className="w-1.5 h-1.5 rounded-full bg-custard/40 group-hover:bg-custard transition-colors" />
      </div>
    </div>

    <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-custard/20 to-transparent group-hover:via-custard/40 transition-all" />
  </div>
);

export default StatCard;
