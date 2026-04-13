import { useEffect } from "react";
import { X } from "lucide-react";

interface DetailDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function DetailDrawer({ open, onClose, title, children }: DetailDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <>
      <div className={`drawer-overlay ${open ? "open" : ""}`} onClick={onClose} />
      <div className={`detail-drawer ${open ? "open" : ""}`}>
        <div className="flex items-center justify-between mb-6">
          {title && (
            <h2 className="text-[11px] font-medium uppercase tracking-[0.06em] text-white/34">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="ml-auto w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white/80 hover:bg-white/[0.06] transition-all"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </>
  );
}
