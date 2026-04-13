import SectionHeader from "@/components/SectionHeader";
import MetricCard from "@/components/MetricCard";
import { useDashboard } from "@/DashboardContext";
import { reportTemplates } from "@/data/mockData";
import { FileText, Download, Calendar, Clock, BarChart3 } from "lucide-react";

export default function ReportsPage() {
  const { addToast, openDrawer } = useDashboard();

  return (
    <div className="space-y-6">
      {/* -- Header -- */}
      <SectionHeader
        title="Reports"
        description="Executive-ready outputs and automated report generation"
      />

      {/* -- Metric Cards -- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-6 sm:mb-8">
        <MetricCard
          title="Report Templates"
          value="5"
          change="Active templates available"
          color="#22c55e"
          onClick={() =>
            openDrawer({
              title: "Report Templates",
              body: (
                <div className="space-y-3">
                  {reportTemplates.map((tpl) => (
                    <div key={tpl.name} className="rounded-lg bg-white/[0.03] border border-border-subtle p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="h-3.5 w-3.5 text-white/30" />
                        <span className="text-[13px] font-semibold text-white/80">{tpl.name}</span>
                      </div>
                      <p className="text-[11px] text-white/40 leading-relaxed">{tpl.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] text-white/30">{tpl.frequency}</span>
                        <span className="text-[10px] text-white/20">|</span>
                        <span className="text-[10px] text-white/30">Last: {tpl.lastGenerated}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ),
            })
          }
          navigateLabel="View all templates"
        />
        <MetricCard
          title="Generated This Month"
          value="24"
          change="+8 vs last month"
          color="#22c55e"
          onClick={() => addToast("24 reports generated in April", "green")}
        />
        <MetricCard
          title="Scheduled Reports"
          value="8"
          change="Automated delivery active"
          color="#22c55e"
          onClick={() => addToast("8 scheduled reports active", "info")}
        />
        <MetricCard
          title="Export Formats"
          value="PDF PPT Excel"
          change="Multi-format support"
          color="#22c55e"
          onClick={() => addToast("All export formats available", "info")}
        />
      </div>

      {/* -- Report Templates -- */}
      <div className="mb-6 sm:mb-10">
        <h3 className="text-[13px] sm:text-[14px] font-semibold text-white/80 mb-5 sm:mb-6">
          Report Templates
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {reportTemplates.map((tpl) => (
            <div
              key={tpl.name}
              role="button"
              tabIndex={0}
              onClick={() =>
                openDrawer({
                  title: tpl.name,
                  body: (
                    <div className="space-y-5">
                      <p className="text-[13px] text-white/60 leading-relaxed">
                        {tpl.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-white/[0.03] border border-border-subtle p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="h-3.5 w-3.5 text-white/40" />
                            <span className="text-[11px] text-white/40 uppercase tracking-wider">Frequency</span>
                          </div>
                          <span className="text-[13px] text-white/70">{tpl.frequency}</span>
                        </div>
                        <div className="rounded-lg bg-white/[0.03] border border-border-subtle p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-3.5 w-3.5 text-white/40" />
                            <span className="text-[11px] text-white/40 uppercase tracking-wider">Last Generated</span>
                          </div>
                          <span className="text-[13px] text-white/70">{tpl.lastGenerated}</span>
                        </div>
                      </div>
                      <div className="rounded-lg bg-white/[0.03] border border-border-subtle p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <BarChart3 className="h-3.5 w-3.5 text-white/40" />
                          <span className="text-[11px] text-white/40 uppercase tracking-wider">Recent Reports</span>
                        </div>
                        <div className="space-y-2 text-[12px]">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex justify-between">
                              <span className="text-white/40">{tpl.name} #{i}</span>
                              <span className="text-white/30">{i * 3} days ago</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-lg bg-white/[0.03] border border-border-subtle p-4">
                        <span className="text-[11px] text-white/40 uppercase tracking-wider">Available Formats</span>
                        <div className="flex items-center gap-2 mt-2">
                          {tpl.formats.map((fmt) => (
                            <span key={fmt} className="inline-flex items-center rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] text-white/50">
                              {fmt}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ),
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") e.currentTarget.click();
              }}
              className="bg-surface rounded-xl border border-border-subtle p-5 sm:p-6 cursor-pointer hover:border-border-emphasis hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all duration-200"
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

              {/* Bottom row -- formats + generate */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {tpl.formats.map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToast(`Downloading ${tpl.name} as ${fmt}...`, "green");
                      }}
                      className="inline-flex items-center rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/40 cursor-pointer hover:bg-white/[0.08] transition-all"
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToast("Report generated", "green");
                  }}
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
