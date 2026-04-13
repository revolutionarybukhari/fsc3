import { useEffect, useState } from "react";
import { Check, AlertTriangle, Info, X } from "lucide-react";
import type { RagStatus } from "./StatusBadge";

export interface ToastData {
  id: string;
  message: string;
  type: RagStatus | "info";
  duration?: number;
}

interface ToastContainerProps {
  toasts: ToastData[];
  onRemove: (id: string) => void;
}

const icons = {
  green: Check,
  amber: AlertTriangle,
  red: AlertTriangle,
  info: Info,
};

const borderColors = {
  green: "#22c55e",
  amber: "#f59e0b",
  red: "#ef4444",
  info: "#60a5fa",
};

function ToastItem({ toast, onRemove }: { toast: ToastData; onRemove: () => void }) {
  const [exiting, setExiting] = useState(false);
  const Icon = icons[toast.type];

  useEffect(() => {
    const dur = toast.duration || 3000;
    const t = setTimeout(() => setExiting(true), dur - 300);
    const t2 = setTimeout(onRemove, dur);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [toast.duration, onRemove]);

  return (
    <div
      className="flex items-center gap-3 rounded-xl border border-border-emphasis px-5 py-3.5"
      style={{
        background: "rgba(18, 21, 28, 0.95)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        borderLeft: `3px solid ${borderColors[toast.type]}`,
        animation: exiting ? "toastExit 0.3s ease-out forwards" : "toastEnter 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <Icon className="h-4 w-4 shrink-0" style={{ color: borderColors[toast.type] }} />
      <span className="text-[13px] text-white/90 font-medium">{toast.message}</span>
      <button onClick={onRemove} className="ml-2 text-white/30 hover:text-white/60 transition-colors">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export default function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-2">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onRemove={() => onRemove(t.id)} />
      ))}
    </div>
  );
}
