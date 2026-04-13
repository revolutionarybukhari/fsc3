import SectionHeader from "@/components/SectionHeader";
import MetricCard from "@/components/MetricCard";
import { useDashboard } from "@/DashboardContext";
import { reportTemplates } from "@/data/mockData";
import { FileText, Download, Calendar } from "lucide-react";

export default function ReportsPage() {
  const { addToast } = useDashboard();

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <SectionHeader
        title="Reports"
        description="Executive-ready outputs and automated report generation"
      />

      {/* ── Metric Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Report Templates"
          value="5"
          change="Active templates available"
          color="#22c55e"
        />
        <MetricCard
          title="Generated This Month"
          value="24"
          change="+8 vs last month"
          color="#22c55e"
        />
        <MetricCard
          title="Scheduled Reports"
          value="8"
          change="Automated delivery active"
          color="#22c55e"
        />
        <MetricCard
          title="Export Formats"
          value="PDF PPT Excel"
          change="Multi-format support"
          color="#22c55e"
        />
      </div>

      {/* ── Report Templates ── */}
      <div>
        <h3 className="text-[13px] sm:text-[14px] font-semibold text-white/80 mb-4">
          Report Templates
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {reportTemplates.map((tpl) => (
            <div
              key={tpl.name}
              className="bg-surface rounded-xl border border-border-subtle p-5 hover:border-border-emphasis transition-all duration-200"
            >
              {/* Top row */}
              <div className="flex items-start gap-3 mb-3">
                <FileText className="h-5 w-5 text-white/30 shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-[14px] font-semibold text-white/90 mb-1">
                    {tpl.name}
                  </h4>
                  <p className="text-[12px] text-white/40 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>
              </div>

              {/* Metadata row */}
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[10px] font-medium text-white/50">
                  <Calendar className="h-3 w-3" />
                  {tpl.frequency}
                </span>
                <span className="text-[11px] text-white/30">
                  Last generated: {tpl.lastGenerated}
                </span>
              </div>

              {/* Bottom row — formats + generate */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {tpl.formats.map((fmt) => (
                    <span
                      key={fmt}
                      className="inline-flex items-center rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/40"
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addToast("Report generated", "green")}
                  className="flex items-center gap-1.5 rounded-lg bg-green-500/10 border border-green-500/20 px-3 py-1.5 text-[11px] font-medium text-green-400 hover:bg-green-500/20 transition-colors"
                >
                  <Download className="h-3 w-3" />
                  Generate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
