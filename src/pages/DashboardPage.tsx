import SectionHeader from "@/components/SectionHeader";
import StatusBadge from "@/components/StatusBadge";
import LiveMap from "@/components/LiveMap";
import { useDashboard } from "@/DashboardContext";
import { alerts } from "@/data/mockData";
import type { RagStatus } from "@/components/StatusBadge";

const sevToRag = (s: string): RagStatus =>
  s === "critical" || s === "high" ? "red" : s === "medium" ? "amber" : "green";

const cardCls =
  "bg-surface rounded-xl border border-border-subtle p-5 sm:p-6 lg:p-7 hover:border-border-emphasis hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all duration-200";

const sectionTitle =
  "text-[13px] sm:text-[14px] font-semibold text-white/80";


export default function DashboardPage() {
  const { openDrawer, addToast, setCountryFilter } = useDashboard();

  const handleCountryClick = (name: string) => {
    setCountryFilter(name);
    addToast(`Filtering by ${name}`, "info");
  };

  const handleAlertClick = (alert: (typeof alerts)[number]) => {
    openDrawer({
      title: "Alert Detail",
      body: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <StatusBadge status={sevToRag(alert.severity)} label={alert.severity} pulse />
            <span className="text-[11px] text-white/40">{alert.time}</span>
          </div>
          <h3 className="text-[16px] font-semibold text-white/90">
            {alert.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] text-white/50">
              {alert.category}
            </span>
            <span className="inline-flex items-center rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] text-white/50">
              {alert.country}
            </span>
          </div>
          <p className="text-[13px] font-mono text-white/60">
            Risk: {alert.riskScore}/100
          </p>
          <div>
            <p className="text-[12px] font-medium text-white/50 mb-2">
              Recommended Actions
            </p>
            <ul className="space-y-1.5">
              {alert.actions.map((a, i) => (
                <li
                  key={i}
                  className="text-[12px] text-white/60 pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-white/20"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    });
  };

  return (
    <>
      {/* ── Section Header ── */}
      <div className="mb-6 sm:mb-7">
        <SectionHeader
          title="Live Food Security Dashboard"
          description="Real-time monitoring and control centre"
        />
      </div>

      {/* ── Alerts + Map row — Supply chain alerts on LEFT (primary focus) ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-5 sm:gap-6 mb-6 sm:mb-8">
        {/* Active Alerts panel — LEFT side, key focus */}
        <div className={cardCls}>
          <h3 className={`${sectionTitle} mb-5 sm:mb-6`}>Active Alerts</h3>
          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
            {alerts.slice(0, 5).map((alert) => (
              <button
                key={alert.id}
                type="button"
                onClick={() => handleAlertClick(alert)}
                className="w-full text-left rounded-lg border border-border-subtle bg-white/[0.02] p-4 hover:border-border-emphasis hover:bg-white/[0.04] hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)] active:translate-y-0 active:scale-[0.995] transition-all duration-150 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <StatusBadge
                    status={sevToRag(alert.severity)}
                    label={alert.severity}
                    pulse={alert.severity === "critical"}
                  />
                  <span className="text-[11px] text-white/34 ml-auto">
                    {alert.time}
                  </span>
                </div>
                <p className="text-[13px] font-semibold text-white/90 mb-1">
                  {alert.title}
                </p>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/40">
                    {alert.category}
                  </span>
                  <span className="font-mono text-[11px] text-white/50">
                    Risk: {alert.riskScore}/100
                  </span>
                </div>
                <ul className="space-y-0.5 mb-1.5">
                  {alert.actions.map((a, i) => (
                    <li
                      key={i}
                      className="text-[11px] text-white/40 truncate pl-2.5 relative before:content-[''] before:absolute before:left-0 before:top-[6px] before:w-1 before:h-1 before:rounded-full before:bg-white/20"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/40">
                  {alert.country}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Map — RIGHT side */}
        <LiveMap height="420px" onCountryClick={handleCountryClick} />
      </div>

      {/* ── System Status — primary focus area ── */}
      <div className={`${cardCls} mb-6 sm:mb-8`}>
        <h3 className={`${sectionTitle} mb-5 sm:mb-6`}>System Status</h3>
        <div className="space-y-3">
          {([
            { label: "Overall Status", status: "green" as const, statusLabel: "Stable", border: true },
            { label: "Supply Chain", status: "amber" as const, statusLabel: "Risky", border: true },
            { label: "Price Stability", status: "green" as const, statusLabel: "Stable", border: false },
          ] as const).map((row) => (
            <div
              key={row.label}
              className={`flex items-center justify-between py-3 rounded-lg px-2 -mx-2 cursor-pointer hover:bg-white/[0.03] active:scale-[0.99] transition-all duration-150${row.border ? " border-b border-border-subtle" : ""}`}
              onClick={() => addToast(`System status: ${row.label} is ${row.statusLabel}`, row.status === "green" ? "green" : "amber")}
            >
              <span className="text-[13px] text-white/60">{row.label}</span>
              <StatusBadge status={row.status} label={row.statusLabel} />
            </div>
          ))}
        </div>
      </div>

    </>
  );
}
