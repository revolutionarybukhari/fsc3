import { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export default function Modal({ open, onClose, title, children, actions }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center"
      style={{ animation: "fadeSlideIn 0.2s ease" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[6px]" onClick={onClose} />

      {/* Modal card */}
      <div
        className="relative bg-surface-2 border border-border-emphasis rounded-2xl p-7 sm:p-8 max-w-[480px] w-[92%]"
        style={{
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          animation: "popupEnter 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[17px] font-semibold text-white/92">{title}</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white/70 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
        {actions && (
          <div className="flex gap-3 justify-end mt-7 pt-5 border-t border-border-subtle">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

/* Shared form components for modals */
export function ModalLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-white/40 mt-4 mb-1.5 first:mt-0">{children}</div>;
}

export function ModalSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3.5 py-2.5 text-[13px] text-white/85 bg-white/[0.04] border border-border-emphasis rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-dim transition-all appearance-none cursor-pointer"
    >
      {options.map((o) => (
        <option key={o} value={o} className="bg-surface-2 text-white/85">{o}</option>
      ))}
    </select>
  );
}

export function ModalBtnCancel({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2.5 rounded-lg border border-border-emphasis text-[13px] font-medium text-white/60 hover:text-white/85 hover:border-border-strong transition-all cursor-pointer"
    >
      Cancel
    </button>
  );
}

export function ModalBtnConfirm({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2.5 rounded-lg border-none text-[13px] font-semibold text-[#0b0d11] cursor-pointer transition-all hover:-translate-y-px active:translate-y-0 inline-flex items-center gap-1.5"
      style={{ background: "#22c55e" }}
    >
      {children}
    </button>
  );
}
