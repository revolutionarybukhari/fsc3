import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import MetricCard from "@/components/MetricCard";
import StatusBadge from "@/components/StatusBadge";
import Modal, { ModalLabel, ModalSelect, ModalBtnCancel, ModalBtnConfirm } from "@/components/Modal";
import { useDashboard } from "@/DashboardContext";
import { riskMatrix, riskCategories, riskCategoryLabels } from "@/data/mockData";
import type { RagStatus } from "@/components/StatusBadge";

const cellColor = (v: number) =>
  v === 0
    ? "bg-surface"
    : v <= 2
      ? "bg-[rgba(34,197,94,0.08)] text-[#22c55e]"
      : v <= 4
        ? "bg-[rgba(245,158,11,0.08)] text-[#f59e0b]"
        : "bg-[rgba(239,68,68,0.08)] text-[#ef4444]";

const severities = [
  { label: "Critical", count: 3, status: "red" as const, barWidth: "13%" },
  { label: "High", count: 6, status: "red" as const, barWidth: "26%" },
  { label: "Medium", count: 9, status: "amber" as const, barWidth: "39%" },
  { label: "Low", count: 5, status: "green" as const, barWidth: "22%" },
];

const topCategories = [
  { name: "Quality Issues", count: 8 },
  { name: "Supplier Delays", count: 7 },
  { name: "Export Bans", count: 5 },
];

export default function RiskIntelligencePage() {
  const { addToast, openDrawer } = useDashboard();
  const [riskType, setRiskType] = useState<"Inherent" | "Residual">("Inherent");
  const [commodity, setCommodity] = useState("All Commodities");
  const [timeWindow, setTimeWindow] = useState("30 Days");
  const [modalOpen, setModalOpen] = useState(false);
  const [scenarioCommodity, setScenarioCommodity] = useState("Rice");
  const [scenarioType, setScenarioType] = useState("Export Ban");

  return (
    <>
      <SectionHeader
        title="Risk Intelligence"
        description="Likelihood x Impact analysis and risk assessment"
      />

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 mb-6 sm:mb-8">
        <MetricCard title="Total Active Risks" value="23" change="3 new this week" color="#22c55e" onClick={() => openDrawer({ title: "Active Risks Breakdown", body: (<div className="space-y-3"><div className="flex justify-between py-2 border-b border-border-subtle"><span className="text-[12px] text-white/40">Critical</span><span className="text-[13px] font-mono font-semibold text-[#ef4444]">3</span></div><div className="flex justify-between py-2 border-b border-border-subtle"><span className="text-[12px] text-white/40">High</span><span className="text-[13px] font-mono font-semibold text-[#f59e0b]">6</span></div><div className="flex justify-between py-2 border-b border-border-subtle"><span className="text-[12px] text-white/40">Medium</span><span className="text-[13px] font-mono font-semibold text-[#f59e0b]">9</span></div><div className="flex justify-between py-2"><span className="text-[12px] text-white/40">Low</span><span className="text-[13px] font-mono font-semibold text-[#22c55e]">5</span></div></div>) })} navigateLabel="View breakdown" />
        <MetricCard title="Critical" value="3" change="1 escalated" color="#ef4444" isNegative onClick={() => openDrawer({ title: "Critical Risks", body: (<div className="space-y-3"><p className="text-[13px] text-white/60 leading-relaxed">3 critical risks require immediate attention. 1 was escalated this week.</p><div className="flex justify-between py-2 border-t border-border-subtle"><span className="text-[12px] text-white/40">Escalated</span><span className="text-[12px] text-[#ef4444] font-semibold">1</span></div><div className="flex justify-between py-2 border-t border-border-subtle"><span className="text-[12px] text-white/40">Under review</span><span className="text-[12px] text-white/60">2</span></div></div>) })} navigateLabel="View critical" />
        <MetricCard title="High" value="6" change="2 under review" color="#f59e0b" onClick={() => openDrawer({ title: "High Risks", body: (<div className="space-y-3"><p className="text-[13px] text-white/60 leading-relaxed">6 high-severity risks. 2 are currently under review.</p><div className="flex justify-between py-2 border-t border-border-subtle"><span className="text-[12px] text-white/40">Under review</span><span className="text-[12px] text-[#f59e0b] font-semibold">2</span></div><div className="flex justify-between py-2 border-t border-border-subtle"><span className="text-[12px] text-white/40">Pending mitigation</span><span className="text-[12px] text-white/60">4</span></div></div>) })} navigateLabel="View high risks" />
        <MetricCard title="Medium" value="9" change="4 mitigated" color="#f59e0b" onClick={() => openDrawer({ title: "Medium Risks", body: (<div className="space-y-3"><p className="text-[13px] text-white/60 leading-relaxed">9 medium-severity risks. 4 have been mitigated.</p><div className="flex justify-between py-2 border-t border-border-subtle"><span className="text-[12px] text-white/40">Mitigated</span><span className="text-[12px] text-[#22c55e] font-semibold">4</span></div><div className="flex justify-between py-2 border-t border-border-subtle"><span className="text-[12px] text-white/40">Active</span><span className="text-[12px] text-white/60">5</span></div></div>) })} navigateLabel="View medium risks" />
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
        {/* Risk Type toggle */}
        <div className="flex rounded-lg border border-border-subtle overflow-hidden">
          {(["Inherent", "Residual"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setRiskType(t)}
              className={`px-4 py-2 text-[12px] font-medium transition-all cursor-pointer ${
                riskType === t
                  ? "bg-white/[0.08] text-white/90"
                  : "text-white/40 hover:text-white/60 hover:bg-white/[0.03]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Commodity dropdown */}
        <select
          value={commodity}
          onChange={(e) => setCommodity(e.target.value)}
          className="px-3.5 py-2 text-[12px] text-white/70 bg-white/[0.04] border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-dim transition-all appearance-none cursor-pointer"
        >
          {["All Commodities", "Rice", "Wheat", "Palm Oil", "Soybeans"].map((o) => (
            <option key={o} value={o} className="bg-surface-2 text-white/85">{o}</option>
          ))}
        </select>

        {/* Time Window dropdown */}
        <select
          value={timeWindow}
          onChange={(e) => setTimeWindow(e.target.value)}
          className="px-3.5 py-2 text-[12px] text-white/70 bg-white/[0.04] border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-dim transition-all appearance-none cursor-pointer"
        >
          {["7 Days", "30 Days", "90 Days", "12 Months"].map((o) => (
            <option key={o} value={o} className="bg-surface-2 text-white/85">{o}</option>
          ))}
        </select>
      </div>

      {/* Main grid: Heat Map + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 sm:gap-6 mb-6 sm:mb-8">
        {/* Left: 5x5 Risk Heat Map */}
        <div className="bg-surface rounded-xl border border-border-subtle p-5 sm:p-6 lg:p-7 hover:border-border-emphasis transition-all duration-200">
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <h3 className="text-[13px] sm:text-[14px] font-semibold text-white/80">
              5x5 Risk Heat Map
              <span className="ml-2 text-[11px] font-normal text-white/34">({riskType})</span>
            </h3>
            <span className="text-[11px] text-white/34">{commodity} &middot; {timeWindow}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-[11px] uppercase tracking-[0.06em] text-white/34 font-medium">
                  <th className="text-left font-medium py-2.5 pr-4 w-[120px]">Likelihood</th>
                  {riskCategories.map((cat) => (
                    <th key={cat} className="text-center font-medium py-2.5 px-2">
                      {riskCategoryLabels[cat]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {riskMatrix.map((row) => (
                  <tr key={row.likelihood}>
                    <td className="py-1.5 pr-4 text-white/56 font-medium">{row.likelihood}</td>
                    {riskCategories.map((cat) => {
                      const count = row[cat];
                      return (
                        <td key={cat} className="py-1.5 px-2">
                          <div
                            className={`${cellColor(count)} rounded-lg h-14 flex items-center justify-center text-[16px] font-bold font-mono cursor-pointer hover:scale-[1.03] transition-transform`}
                            onClick={() =>
                              addToast(
                                `${count} ${riskCategoryLabels[cat]} risks at ${row.likelihood} likelihood`,
                                count >= 5 ? "red" : count >= 3 ? "amber" : "green"
                              )
                            }
                          >
                            {count > 0 ? count : ""}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Risk Summary */}
        <div className="bg-surface rounded-xl border border-border-subtle p-5 sm:p-6 lg:p-7 hover:border-border-emphasis transition-all duration-200">
          <h3 className="text-[13px] sm:text-[14px] font-semibold text-white/80 mb-5 sm:mb-6">Risk Summary</h3>

          {/* Big number */}
          <div className="text-center mb-6">
            <div className="text-[40px] font-bold text-white/92 font-mono leading-none">23</div>
            <div className="text-[12px] text-white/40 mt-1.5">Total Active Risks</div>
          </div>

          {/* Severity bars */}
          <div className="flex flex-col gap-3 mb-6">
            {severities.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-3 cursor-pointer hover:bg-white/[0.03] rounded-lg transition-all p-1.5 -mx-1.5"
                onClick={() => addToast(`Filtering: ${s.label} risks`, s.status as RagStatus)}
              >
                <StatusBadge status={s.status} label={s.label} />
                <div className="flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: s.barWidth,
                      background:
                        s.status === "red"
                          ? "#ef4444"
                          : s.status === "amber"
                            ? "#f59e0b"
                            : "#22c55e",
                    }}
                  />
                </div>
                <span className="text-[13px] font-mono font-semibold text-white/70 w-5 text-right">
                  {s.count}
                </span>
              </div>
            ))}
          </div>

          {/* Top Categories */}
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-white/34 mb-3">
              Top Categories
            </div>
            <div className="flex flex-col gap-2">
              {topCategories.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-surface-2 text-[12px] cursor-pointer hover:border-border-emphasis hover:-translate-y-px transition-all border border-transparent"
                  onClick={() => addToast(`${c.name}: ${c.count} active risks`, "amber")}
                >
                  <span className="text-white/70">{c.name}</span>
                  <span className="text-white/50 font-mono font-semibold">{c.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Run Scenario button */}
      <div className="mb-6 sm:mb-10">
        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-lg border-none text-[13px] font-semibold text-[#0b0d11] cursor-pointer transition-all hover:-translate-y-px active:translate-y-0"
          style={{ background: "#22c55e" }}
        >
          Run Scenario
        </button>
      </div>

      {/* Scenario Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Run Risk Scenario"
        actions={
          <>
            <ModalBtnCancel onClick={() => setModalOpen(false)} />
            <ModalBtnConfirm
              onClick={() => {
                setModalOpen(false);
                addToast(`Scenario "${scenarioType}" for ${scenarioCommodity} queued`, "info");
              }}
            >
              Run Scenario
            </ModalBtnConfirm>
          </>
        }
      >
        <ModalLabel>Commodity</ModalLabel>
        <ModalSelect
          value={scenarioCommodity}
          onChange={setScenarioCommodity}
          options={["Rice", "Wheat", "Palm Oil", "Soybeans", "Vegetables"]}
        />
        <ModalLabel>Scenario Type</ModalLabel>
        <ModalSelect
          value={scenarioType}
          onChange={setScenarioType}
          options={["Export Ban", "Port Disruption", "Weather Event", "Price Spike", "Supplier Default"]}
        />
      </Modal>
    </>
  );
}
