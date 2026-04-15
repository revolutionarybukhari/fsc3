import { useState } from "react";
import { BrainCircuit, ChevronDown, ChevronUp, Zap } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import MetricCard from "@/components/MetricCard";
import { useDashboard } from "@/DashboardContext";
import { models } from "@/data/mockData";

const cardCls =
  "bg-surface rounded-xl border border-border-subtle p-5 sm:p-6 lg:p-7 hover:border-border-emphasis hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)] active:translate-y-0 transition-all";

function accuracyColor(acc: number): string {
  if (acc >= 90) return "#22c55e";
  if (acc >= 85) return "#f59e0b";
  return "#ef4444";
}

function accuracyBg(acc: number): string {
  if (acc >= 90) return "rgba(34,197,94,0.18)";
  if (acc >= 85) return "rgba(245,158,11,0.18)";
  return "rgba(239,68,68,0.18)";
}

export default function ModelRegistryPage() {
  const { openDrawer, addToast } = useDashboard();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const totalModels = models.length;
  const runningCount = models.filter((m) => m.status === "running").length;
  const completedCount = models.filter((m) => m.status === "completed").length;
  const avgQuality = (
    models.reduce((sum, m) => sum + m.accuracy, 0) / totalModels
  ).toFixed(1);

  const toggleExpand = (idx: number) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between mb-6 sm:mb-8">
        <SectionHeader
          title="Model Registry"
          description="Forecasting models, status, and prediction quality"
        />
        <button
          type="button"
          onClick={() => addToast("Model training initiated — estimated 4h runtime", "info")}
          className="shrink-0 flex items-center gap-2 rounded-lg bg-accent/10 border border-accent/20 px-4 py-2 text-[12px] font-medium text-accent hover:bg-accent/20 transition-colors cursor-pointer"
        >
          <Zap className="h-3.5 w-3.5" />
          Model Training
        </button>
      </div>

      {/* ── Metric cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-6 sm:mb-8">
        <MetricCard
          title="Total Models"
          value={String(totalModels)}
          change="All registered models"
          color="#22c55e"
          onClick={() => openDrawer({ title: "All Registered Models", body: (<div className="space-y-3">{models.map(m => (<div key={m.name} className="flex items-center justify-between py-2 border-b border-border-subtle last:border-b-0"><div><span className="text-[13px] font-semibold text-white/85">{m.name}</span><span className="ml-2 text-[11px] text-white/40">{m.type}</span></div><span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: m.status === "running" ? "rgba(245,158,11,0.10)" : "rgba(34,197,94,0.10)", color: m.status === "running" ? "#f59e0b" : "#22c55e" }}>{m.status}</span></div>))}</div>) })}
          navigateLabel="View all models"
        />
        <MetricCard
          title="Running"
          value={String(runningCount)}
          change="Currently active"
          color="#f59e0b"
          onClick={() => addToast(`${runningCount} models currently running`, "amber")}
          navigateLabel="View running"
        />
        <MetricCard
          title="Completed"
          value={String(completedCount)}
          change="Finished training"
          color="#22c55e"
          onClick={() => addToast(`${completedCount} models completed training`, "green")}
          navigateLabel="View completed"
        />
        <MetricCard
          title="Avg Quality"
          value={avgQuality}
          suffix="%"
          change="Across all models"
          color="#22c55e"
          onClick={() => openDrawer({ title: "Accuracy Breakdown", body: (<div className="space-y-3">{models.map(m => (<div key={m.name} className="flex items-center justify-between py-2 border-b border-border-subtle last:border-b-0"><span className="text-[12px] text-white/60">{m.name}</span><span className="text-[13px] font-mono font-semibold" style={{ color: accuracyColor(m.accuracy) }}>{m.accuracy}%</span></div>))}</div>) })}
          navigateLabel="View accuracy"
        />
      </div>

      {/* ── Model cards grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-6 sm:mb-10">
        {models.map((model, idx) => {
          const isExpanded = expandedIdx === idx;
          const accColor = accuracyColor(model.accuracy);
          const accBg = accuracyBg(model.accuracy);
          const isRunning = model.status === "running";

          return (
            <div
              key={model.name}
              className={`${cardCls} cursor-pointer`}
              onClick={() => toggleExpand(idx)}
            >
              {/* Header row */}
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center w-9 h-9 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <BrainCircuit className="h-[18px] w-[18px] text-accent" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-white/90">
                      {model.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="inline-flex items-center rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/50">
                        {model.type}
                      </span>
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                        style={{
                          background: isRunning
                            ? "rgba(245,158,11,0.10)"
                            : "rgba(34,197,94,0.10)",
                          color: isRunning ? "#f59e0b" : "#22c55e",
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background: isRunning ? "#f59e0b" : "#22c55e",
                          }}
                        />
                        {model.status}
                      </span>
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-white/34" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-white/34" />
                )}
              </div>

              {/* Accuracy bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] text-white/40">
                    Prediction Quality
                  </span>
                  <span
                    className="text-[12px] font-semibold font-mono"
                    style={{ color: accColor }}
                  >
                    {model.accuracy}%
                  </span>
                </div>
                <div
                  className="w-full h-2 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${model.accuracy}%`,
                      background: accColor,
                      boxShadow: `0 0 8px ${accBg}`,
                    }}
                  />
                </div>
              </div>

              {/* Last updated */}
              <p className="text-[11px] text-white/34 mb-3">
                Last updated: {model.lastUpdated}
              </p>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDrawer({
                      title: model.name,
                      body: (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <span
                              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                              style={{
                                background: isRunning
                                  ? "rgba(245,158,11,0.10)"
                                  : "rgba(34,197,94,0.10)",
                                color: isRunning ? "#f59e0b" : "#22c55e",
                              }}
                            >
                              {model.status}
                            </span>
                            <span className="inline-flex items-center rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] text-white/50">
                              {model.type}
                            </span>
                          </div>
                          <p className="text-[13px] text-white/60 leading-relaxed">
                            {model.description}
                          </p>
                          <div className="flex items-center justify-between py-2 border-t border-border-subtle">
                            <span className="text-[12px] text-white/40">
                              Prediction Quality
                            </span>
                            <span
                              className="text-[13px] font-semibold font-mono"
                              style={{ color: accColor }}
                            >
                              {model.accuracy}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-t border-border-subtle">
                            <span className="text-[12px] text-white/40">
                              Last Updated
                            </span>
                            <span className="text-[12px] text-white/60">
                              {model.lastUpdated}
                            </span>
                          </div>
                        </div>
                      ),
                    });
                  }}
                  className="flex-1 text-[11px] font-medium text-white/60 bg-white/[0.04] hover:bg-white/[0.08] rounded-lg py-2 px-3 transition-colors border border-border-subtle hover:border-border-emphasis"
                >
                  View Details
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToast(
                      `${model.name} performance report generating...`,
                      "info"
                    );
                  }}
                  className="flex-1 text-[11px] font-medium text-accent bg-accent-dim hover:bg-accent/20 rounded-lg py-2 px-3 transition-colors"
                >
                  Performance
                </button>
              </div>

              {/* Expanded description */}
              {isExpanded && (
                <div
                  className="mt-4 pt-3 border-t border-border-subtle"
                  style={{ animation: "fadeSlideIn 0.2s ease-out" }}
                >
                  <p className="text-[12px] text-white/50 leading-relaxed">
                    {model.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
