import { Info } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

interface HeroKpiCardProps {
  title: string;
  value: string;
  unit?: string;
  delta: number;
  deltaLabel: string;
  sparkData: number[];
  color?: string;
  onClick?: () => void;
}

function ragFromDelta(delta: number, color?: string): { stroke: string; fill: string; text: string } {
  // If color explicitly signals red/amber, use that
  if (color === "#ef4444" || color === "#f87171") {
    return { stroke: "#ef4444", fill: "#ef4444", text: "#ef4444" };
  }
  if (color === "#fbbf24" || color === "#f59e0b") {
    return { stroke: "#f59e0b", fill: "#f59e0b", text: "#f59e0b" };
  }
  // Auto-detect from delta direction
  if (delta < -5) return { stroke: "#ef4444", fill: "#ef4444", text: "#ef4444" };
  if (delta < 0) return { stroke: "#f59e0b", fill: "#f59e0b", text: "#f59e0b" };
  return { stroke: "#22c55e", fill: "#22c55e", text: "#22c55e" };
}

export default function HeroKpiCard({
  title,
  value,
  unit,
  delta,
  deltaLabel,
  sparkData,
  color,
  onClick,
}: HeroKpiCardProps) {
  const chartData = sparkData.map((v, i) => ({ i, v }));
  const isPositive = delta >= 0;
  const rag = ragFromDelta(delta, color);
  const isClickable = !!onClick;

  return (
    <div
      onClick={onClick}
      className={`group relative bg-surface rounded-xl border border-border-subtle p-5 sm:p-6 lg:p-7 flex flex-col justify-between min-h-[190px] sm:min-h-[220px] overflow-hidden transition-all duration-200 hover:border-border-emphasis ${
        isClickable ? "cursor-pointer hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.995]" : ""
      }`}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-dim to-transparent" />

      <div className="flex items-start justify-between mb-2">
        <h3 className="text-[11px] font-medium uppercase tracking-[0.06em] text-white/34">{title}</h3>
        <Info className="h-3.5 w-3.5 text-white/18 shrink-0 mt-0.5" />
      </div>

      <div className="flex items-baseline gap-1.5 sm:gap-2 mt-1">
        <span className="text-[28px] sm:text-[32px] lg:text-[36px] font-semibold text-white/92 tracking-[-0.02em] leading-none font-mono">
          {value}
        </span>
        {unit && (
          <span className="text-[13px] sm:text-[14px] text-white/34 font-normal ml-1">{unit}</span>
        )}
      </div>

      <div className="flex items-center gap-2 mt-2.5">
        <span className="text-[12px] font-semibold" style={{ color: rag.text }}>
          {isPositive ? '↑' : '↓'} {Math.abs(delta)}%
        </span>
        <span className="text-[11px] text-white/34">{deltaLabel}</span>
      </div>

      <div className="h-[40px] sm:h-[50px] mt-3 sm:mt-4 -mx-2 sm:-mx-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`grad-${title.replace(/\s/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={rag.fill} stopOpacity={0.2} />
                <stop offset="100%" stopColor={rag.fill} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={rag.stroke}
              strokeWidth={1.5}
              fill={`url(#grad-${title.replace(/\s/g, "")})`}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
