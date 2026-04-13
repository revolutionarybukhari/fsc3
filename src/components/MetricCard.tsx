import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  suffix?: string;
  change: string;
  color?: string;
  isNegative?: boolean;
  onClick?: () => void;
  navigateLabel?: string;
}

function ragColorFromHex(color: string, isNegative?: boolean): { text: string; glow: string; border: string } {
  if (isNegative || color === "#ef4444" || color === "#f87171" || color === "#dc2626") {
    return { text: "#ef4444", glow: "rgba(239,68,68,0.06)", border: "#ef4444" };
  }
  if (color === "#f59e0b" || color === "#fbbf24" || color === "#d97706") {
    return { text: "#f59e0b", glow: "rgba(245,158,11,0.06)", border: "#f59e0b" };
  }
  // Default to green for positive
  return { text: "#22c55e", glow: "rgba(34,197,94,0.06)", border: "#22c55e" };
}

export default function MetricCard({
  title,
  value,
  suffix,
  change,
  color = "#22c55e",
  isNegative = false,
  onClick,
  navigateLabel,
}: MetricCardProps) {
  const TrendIcon = isNegative ? TrendingDown : TrendingUp;
  const rag = ragColorFromHex(color, isNegative);
  const isDanger = isNegative || color === "#ef4444" || color === "#f87171";
  const isClickable = !!onClick;

  return (
    <div
      onClick={onClick}
      className={`group relative bg-surface rounded-xl border border-border-subtle p-5 sm:p-6 overflow-hidden transition-all duration-200 hover:border-border-emphasis ${
        isDanger ? "border-l-[3px]" : ""
      } ${isClickable ? "cursor-pointer hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.995]" : ""}`}
      style={{
        borderLeftColor: isDanger ? rag.border : undefined,
        ...(isClickable ? {} : {}),
      }}
    >
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-dim to-transparent" />

      <div className="flex items-start justify-between">
        <h3 className="text-[11px] font-medium uppercase tracking-[0.06em] text-white/34 mb-4">{title}</h3>
        {isClickable && (
          <ArrowRight className="h-3.5 w-3.5 text-white/0 group-hover:text-white/34 transition-all duration-200 group-hover:translate-x-0 -translate-x-1" />
        )}
      </div>

      <div className="flex items-center gap-2.5">
        <TrendIcon className="h-5 w-5 shrink-0" style={{ color: rag.text }} />
        <div className="flex items-baseline gap-1">
          <span className="text-[24px] sm:text-[28px] font-semibold text-white/92 tracking-[-0.02em] leading-none font-mono">
            {value}
          </span>
          {suffix && (
            <span className="text-[13px] text-white/34 font-normal ml-0.5">{suffix}</span>
          )}
        </div>
      </div>

      <p className="text-[11px] sm:text-[12px] text-white/40 mt-3 leading-relaxed">{change}</p>
      {navigateLabel && (
        <p className="text-[11px] text-accent opacity-0 group-hover:opacity-100 transition-opacity mt-1.5 font-medium">
          {navigateLabel} →
        </p>
      )}
    </div>
  );
}
