import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ExpandablePanelProps {
  title: string;
  summary?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function ExpandablePanel({
  title,
  summary,
  icon,
  children,
  defaultOpen = false,
}: ExpandablePanelProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="relative bg-surface rounded-xl border border-border-subtle overflow-hidden transition-all duration-200 hover:border-border-emphasis">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-dim to-transparent" />

      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 sm:px-6 py-4 text-left cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          {icon && <span className="text-white/34">{icon}</span>}
          <span className="text-[13px] sm:text-[14px] font-semibold text-white/80">{title}</span>
          {summary && !open && (
            <span className="text-[11px] text-white/30 ml-2 hidden sm:inline">{summary}</span>
          )}
        </div>
        <ChevronDown
          className={`h-4 w-4 text-white/30 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="border-t border-border-subtle">{children}</div>
      </div>
    </div>
  );
}
