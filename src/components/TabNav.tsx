import {
  LayoutDashboard, BarChart3, ShieldAlert, Globe,
  Cpu, Radio, BrainCircuit, FileText, Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TabNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs: { id: string; label: string; shortLabel: string; icon: LucideIcon }[] = [
  { id: "Dashboard", label: "Dashboard", shortLabel: "Dashboard", icon: LayoutDashboard },
  { id: "Overview", label: "Overview", shortLabel: "Overview", icon: BarChart3 },
  { id: "Risk Intelligence", label: "Risk Intelligence", shortLabel: "Risk", icon: ShieldAlert },
  { id: "Supply Network", label: "Supply Network", shortLabel: "Supply", icon: Globe },
  { id: "Model Registry", label: "Model Registry", shortLabel: "Models", icon: Cpu },
  { id: "Operations Center", label: "Operations Center", shortLabel: "Ops", icon: Radio },
  { id: "AI Agents", label: "AI Agents", shortLabel: "AI", icon: BrainCircuit },
  { id: "Reports", label: "Reports", shortLabel: "Reports", icon: FileText },
  { id: "Settings", label: "Settings", shortLabel: "Settings", icon: Settings },
];

export default function TabNav({ activeTab, onTabChange }: TabNavProps) {
  return (
    <div className="bg-white/[0.02] rounded-lg border border-border-subtle p-[3px] flex gap-[2px] overflow-x-auto scrollbar-hide mb-5 sm:mb-6">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-md text-[12px] sm:text-[13px] font-medium whitespace-nowrap transition-all duration-150 shrink-0 ${
              isActive
                ? "bg-white/[0.08] text-white/92 font-semibold"
                : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
            }`}
          >
            <Icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 ${isActive ? "text-accent opacity-90" : "opacity-50"}`} />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
