import { AlertTriangle, MapPin, Package } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import HeroKpiCard from "@/components/HeroKpiCard";
import StatusBadge from "@/components/StatusBadge";
import type { RagStatus } from "@/components/StatusBadge";
import { useDashboard } from "@/DashboardContext";
import { alerts } from "@/data/mockData";

/* ── spark helpers ── */
const sparkUp = [30, 34, 38, 36, 42, 48, 52, 55, 60, 64, 68, 72];
const sparkMedium = [50, 48, 52, 46, 44, 42, 45, 40, 38, 36, 34, 32];
const sparkLow = [20, 22, 18, 24, 20, 26, 22, 28, 24, 30, 26, 28];
const sparkVol = [8, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15];
const sparkConc = [80, 78, 82, 76, 74, 78, 72, 70, 74, 68, 72, 70];

/* ── severity → RAG mapping ── */
const severityToRag: Record<string, RagStatus> = {
  critical: "red",
  high: "red",
  medium: "amber",
  low: "green",
};
const severityBorderColor: Record<string, string> = {
  critical: "#ef4444",
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#22c55e",
};

/* ── forecast items ── */
const forecastItems: { label: string; rag: RagStatus }[] = [
  { label: "Rice imports - Vietnam", rag: "amber" },
  { label: "Vegetables - Malaysia", rag: "amber" },
  { label: "Wheat - Ukraine", rag: "red" },
];

/* ── top production centres ── */
const productionCentres = [
  { country: "Vietnam", volume: 245, max: 245 },
  { country: "Thailand", volume: 198, max: 245 },
  { country: "India", volume: 167, max: 245 },
  { country: "Malaysia", volume: 134, max: 245 },
  { country: "Indonesia", volume: 131, max: 245 },
];

export default function OverviewPage() {
  const { openDrawer } = useDashboard();
  const topAlerts = alerts.slice(0, 5);

  function openKpiDrawer(title: string, value: string) {
    openDrawer({
      title,
      body: (
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-semibold text-white/92 font-mono">{value}</span>
          </div>
          <p className="text-[13px] text-white/50 leading-relaxed">
            Detailed breakdown and historical trend for {title}. Data refreshed every 15 minutes from upstream supply-chain telemetry.
          </p>
        </div>
      ),
    });
  }

  return (
    <>
      {/* ── Section header ── */}
      <div className="mb-6 sm:mb-7">
        <SectionHeader
          title="Executive Overview"
          description="High-level situational awareness and key performance indicators"
        />
      </div>

      {/* ── Hero KPI row ── */}
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-5 sm:gap-6 mb-6 sm:mb-8">
        <HeroKpiCard
          title="Food Security Index"
          value="72.4"
          delta={2.1}
          deltaLabel="vs last month"
          sparkData={sparkUp}
          color="#f59e0b"
          onClick={() => openKpiDrawer("Food Security Index", "72.4")}
        />
        <HeroKpiCard
          title="Availability Risk"
          value="Medium"
          delta={-3.2}
          deltaLabel="vs last month"
          sparkData={sparkMedium}
          color="#f59e0b"
          onClick={() => openKpiDrawer("Availability Risk", "Medium")}
        />
        <HeroKpiCard
          title="Lead Time Risk"
          value="Low"
          delta={1.5}
          deltaLabel="vs last month"
          sparkData={sparkLow}
          color="#22c55e"
          onClick={() => openKpiDrawer("Lead Time Risk", "Low")}
        />
        <HeroKpiCard
          title="Price Volatility"
          value="12.3%"
          delta={4.8}
          deltaLabel="vs last month"
          sparkData={sparkVol}
          color="#f59e0b"
          onClick={() => openKpiDrawer("Price Volatility", "12.3%")}
        />
        <HeroKpiCard
          title="Supplier Concentration"
          value="High"
          delta={-2.1}
          deltaLabel="vs last month"
          sparkData={sparkConc}
          color="#ef4444"
          onClick={() => openKpiDrawer("Supplier Concentration", "High")}
        />
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 sm:gap-6 mb-6 sm:mb-10">
        {/* ── Active Alerts ── */}
        <div className="bg-surface rounded-xl border border-border-subtle p-5 sm:p-6 lg:p-7">
          <div className="flex items-center gap-2 mb-5 sm:mb-6">
            <AlertTriangle className="h-4 w-4 text-rag-amber" />
            <h3 className="text-[13px] font-semibold text-white/80 tracking-[-0.01em]">Active Alerts</h3>
            <span className="ml-auto text-[11px] text-white/30">{topAlerts.length} of {alerts.length}</span>
          </div>

          <div className="space-y-4">
            {topAlerts.map((alert) => (
              <div
                key={alert.id}
                className="rounded-lg border border-border-subtle p-4 transition-colors hover:border-border-emphasis"
                style={{ borderLeftWidth: 3, borderLeftColor: severityBorderColor[alert.severity] }}
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <StatusBadge status={severityToRag[alert.severity]} label={alert.severity} />
                  <span className="text-[13px] font-medium text-white/85">{alert.title}</span>
                  <span className="ml-auto text-[11px] text-white/30">{alert.time}</span>
                </div>

                {alert.actions.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {alert.actions.map((action, i) => (
                      <li key={i} className="text-[11px] sm:text-[12px] text-white/40 leading-relaxed flex items-start gap-1.5">
                        <span className="text-white/20 mt-px shrink-0">-</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium bg-white/[0.04] text-white/40 border border-border-subtle">
                    <MapPin className="h-2.5 w-2.5" />
                    {alert.country}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium bg-white/[0.04] text-white/40 border border-border-subtle">
                    <Package className="h-2.5 w-2.5" />
                    {alert.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="space-y-5 sm:space-y-6">
          {/* Forecast Window */}
          <div className="bg-surface rounded-xl border border-border-subtle p-5 sm:p-6 lg:p-7">
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <h3 className="text-[13px] font-semibold text-white/80 tracking-[-0.01em]">Forecast Window</h3>
              <span className="text-[11px] text-white/30">Next 30 days</span>
            </div>
            <div className="mb-5">
              <StatusBadge status="amber" label="Medium Risk" />
            </div>
            <div className="space-y-3">
              {forecastItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 border border-border-subtle hover:border-border-emphasis transition-colors"
                >
                  <span className="text-[12px] text-white/60">{item.label}</span>
                  <StatusBadge status={item.rag} />
                </div>
              ))}
            </div>
          </div>

          {/* Top Production Centres */}
          <div className="bg-surface rounded-xl border border-border-subtle p-5 sm:p-6 lg:p-7">
            <h3 className="text-[13px] font-semibold text-white/80 tracking-[-0.01em] mb-5 sm:mb-6">Top Production Centres</h3>
            <div className="space-y-3">
              {productionCentres.map((pc) => (
                <div key={pc.country}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[12px] text-white/60">{pc.country}</span>
                    <span className="text-[12px] font-mono text-white/50">{pc.volume}K MT</span>
                  </div>
                  <div className="h-[6px] rounded-full bg-white/[0.04] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(pc.volume / pc.max) * 100}%`,
                        background: "linear-gradient(90deg, #2dd4a8, #22c55e)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
