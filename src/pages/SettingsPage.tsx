import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { useDashboard } from "@/DashboardContext";
import { Upload, RefreshCw, Plug } from "lucide-react";

type SettingsTab = "Data" | "Users" | "Tenant";

const tabs: SettingsTab[] = ["Data", "Users", "Tenant"];

const connectors = [
  { name: "Weather API", status: "Connected" },
  { name: "Price Feeds", status: "Connected" },
  { name: "News Aggregator", status: "Connected" },
];

const cardCls =
  "bg-surface rounded-xl border border-border-subtle p-5 sm:p-6 lg:p-7 hover:border-border-emphasis transition-all duration-200";

export default function SettingsPage() {
  const { addToast } = useDashboard();
  const [activeSettingsTab, setActiveSettingsTab] = useState<SettingsTab>("Data");
  const [refreshCadence, setRefreshCadence] = useState("Daily");

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <SectionHeader
        title="Settings"
        description="System configuration, data management, and user access"
      />

      {/* ── Segmented Tabs ── */}
      <div className="inline-flex rounded-lg border border-border-subtle bg-surface p-1 gap-0.5">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveSettingsTab(tab)}
            className={`px-4 py-2 rounded-md text-[12px] font-medium transition-colors ${
              activeSettingsTab === tab
                ? "bg-white/[0.08] text-white/90"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Data Tab ── */}
      {activeSettingsTab === "Data" && (
        <div className="space-y-5 mt-6">
          {/* CSV Upload */}
          <div className={cardCls}>
            <h3 className="text-[13px] sm:text-[14px] font-semibold text-white/80 mb-5 sm:mb-6">
              CSV Upload
            </h3>
            <div className="flex flex-col items-center justify-center gap-4 sm:gap-5 rounded-lg border-2 border-dashed border-border-subtle p-8 sm:p-12 hover:border-white/20 transition-colors">
              <Upload className="h-8 w-8 text-white/20" />
              <p className="text-[13px] text-white/50 text-center">
                Drop CSV files here or click to browse
              </p>
            </div>
          </div>

          {/* Data Refresh Cadence */}
          <div className={cardCls}>
            <div className="flex items-center gap-2 mb-5 sm:mb-6">
              <RefreshCw className="h-4 w-4 text-white/30" />
              <h3 className="text-[13px] sm:text-[14px] font-semibold text-white/80">
                Data Refresh Cadence
              </h3>
            </div>
            <select
              value={refreshCadence}
              onChange={(e) => {
                setRefreshCadence(e.target.value);
                addToast(`Refresh cadence set to ${e.target.value}`, "info");
              }}
              className="w-full max-w-xs rounded-lg border border-border-subtle bg-surface-2 px-3 py-2 text-[13px] text-white/70 outline-none focus:border-accent/40"
            >
              <option value="Daily">Daily</option>
              <option value="Hourly">Hourly</option>
              <option value="Real-time">Real-time</option>
            </select>
          </div>

          {/* API Connectors */}
          <div className={`${cardCls} mb-6 sm:mb-10`}>
            <div className="flex items-center gap-2 mb-5 sm:mb-6">
              <Plug className="h-4 w-4 text-white/30" />
              <h3 className="text-[13px] sm:text-[14px] font-semibold text-white/80">
                API Connectors
              </h3>
            </div>
            <div className="space-y-4 sm:space-y-5">
              {connectors.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between rounded-lg border border-border-subtle bg-white/[0.02] py-4 px-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] text-white/70">{c.name}</span>
                    <span className="flex items-center gap-1.5 text-[11px] text-green-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      {c.status}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => addToast(`${c.name} configuration updated`, "info")}
                    className="rounded-lg border border-border-subtle px-3 py-1.5 text-[11px] font-medium text-white/50 hover:bg-white/[0.04] hover:text-white/70 transition-colors"
                  >
                    Configure
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Users Tab ── */}
      {activeSettingsTab === "Users" && (
        <div className={`${cardCls} mt-6 mb-6 sm:mb-10`}>
          <p className="text-[13px] text-white/40">User management coming soon</p>
        </div>
      )}

      {/* ── Tenant Tab ── */}
      {activeSettingsTab === "Tenant" && (
        <div className={`${cardCls} mt-6 mb-6 sm:mb-10`}>
          <p className="text-[13px] text-white/40">Tenant settings coming soon</p>
        </div>
      )}
    </div>
  );
}
