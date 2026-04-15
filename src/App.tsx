import { useEffect, useCallback } from "react";
import { Wheat } from "lucide-react";
import { DashboardProvider, useDashboard } from "@/DashboardContext";
import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import TabNav from "@/components/TabNav";
import DetailDrawer from "@/components/DetailDrawer";
import ToastContainer from "@/components/Toast";
import DashboardPage from "@/pages/DashboardPage";
import OverviewPage from "@/pages/OverviewPage";
import RiskIntelligencePage from "@/pages/RiskIntelligencePage";
import SupplyNetworkPage from "@/pages/SupplyNetworkPage";
import ModelRegistryPage from "@/pages/ModelRegistryPage";
import OperationsCenterPage from "@/pages/OperationsCenterPage";
import AiAgentsPage from "@/pages/AiAgentsPage";
import ReportsPage from "@/pages/ReportsPage";
import SettingsPage from "@/pages/SettingsPage";

const pages: Record<string, React.ComponentType> = {
  "Dashboard": DashboardPage,
  "Overview": OverviewPage,
  "Operations Center": OperationsCenterPage,
  "Supply Chain Risk Intelligence": RiskIntelligencePage,
  "Supply Network": SupplyNetworkPage,
  "Model Registry": ModelRegistryPage,
  "AI Agents": AiAgentsPage,
  "Reports": ReportsPage,
  "Settings": SettingsPage,
};

const tabOrder = Object.keys(pages);

function LiveClock() {
  return null; // Clock shown in map's LIVE badge — keep header clean
}

function Shell() {
  const { activeTab, setActiveTab, drawerContent, closeDrawer, toasts, removeToast, countryFilter, setCountryFilter } = useDashboard();
  const ActivePage = pages[activeTab] || DashboardPage;

  const handleKey = useCallback((e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement).tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if (e.key === "Escape") { closeDrawer(); setCountryFilter(null); return; }
    const n = parseInt(e.key);
    if (n >= 1 && n <= 9 && n <= tabOrder.length) { e.preventDefault(); setActiveTab(tabOrder[n - 1]); }
  }, [closeDrawer, setActiveTab, setCountryFilter]);

  useEffect(() => { window.addEventListener("keydown", handleKey); return () => window.removeEventListener("keydown", handleKey); }, [handleKey]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-base">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-y-auto bg-base">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-5 lg:py-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="hidden sm:flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-accent-dim shrink-0">
                  <Wheat className="h-5 w-5 sm:h-[22px] sm:w-[22px] text-accent" />
                </div>
                <div>
                  <h1 className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold text-white/92 leading-tight tracking-[-0.01em]">
                    Food Security Command & Control Centre
                  </h1>
                  <p className="text-[12px] sm:text-[13px] text-white/34 mt-1">
                    Patent SG 10202109991Y — Risk intelligence across ASEAN+ supply chains
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rag-green-bg border border-rag-green-border">
                  <span className="w-[7px] h-[7px] rounded-full bg-rag-green" style={{ animation: "live-pulse 2s ease-in-out infinite" }} />
                  <span className="text-[11px] font-semibold text-rag-green tracking-[0.05em]">LIVE</span>
                </div>
                <LiveClock />
              </div>
            </div>

            {countryFilter && (
              <div className="mb-4 flex items-center gap-2" style={{ animation: "fadeSlideIn 0.2s ease-out" }}>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-border text-[12px] font-medium text-white/80">
                  Filtered: {countryFilter}
                  <button onClick={() => setCountryFilter(null)} className="ml-1 text-white/34 hover:text-rag-red transition-colors text-[14px] leading-none">✕</button>
                </span>
              </div>
            )}

            <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
            <div key={activeTab} className="page-enter"><ActivePage /></div>
          </div>
        </main>
      </div>
      <DetailDrawer open={!!drawerContent} onClose={closeDrawer} title={drawerContent?.title}>{drawerContent?.body}</DetailDrawer>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default function App() {
  return <DashboardProvider><Shell /></DashboardProvider>;
}
