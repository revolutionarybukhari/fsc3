export type RagStatus = "green" | "amber" | "red";

interface StatusBadgeProps {
  status: RagStatus;
  label?: string;
  pulse?: boolean;
}

const config: Record<RagStatus, { bg: string; color: string; defaultLabel: string; pulseAnim: string }> = {
  green: {
    bg: "rgba(34, 197, 94, 0.08)",
    color: "#22c55e",
    defaultLabel: "Healthy",
    pulseAnim: "rag-pulse-green 2s ease-in-out infinite",
  },
  amber: {
    bg: "rgba(245, 158, 11, 0.08)",
    color: "#f59e0b",
    defaultLabel: "At Risk",
    pulseAnim: "rag-pulse-amber 2s ease-in-out infinite",
  },
  red: {
    bg: "rgba(239, 68, 68, 0.08)",
    color: "#ef4444",
    defaultLabel: "Critical",
    pulseAnim: "rag-pulse-red 2s ease-in-out infinite",
  },
};

export default function StatusBadge({ status, label, pulse = false }: StatusBadgeProps) {
  const c = config[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full"
      style={{
        padding: "4px 12px",
        background: c.bg,
        color: c.color,
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.02em",
      }}
    >
      <span
        className="shrink-0 rounded-full"
        style={{
          width: 6,
          height: 6,
          background: c.color,
          boxShadow: pulse ? `0 0 0 3px ${c.bg}` : "none",
          animation: pulse ? c.pulseAnim : "none",
        }}
      />
      {label || c.defaultLabel}
    </span>
  );
}
