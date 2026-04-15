import { LayoutDashboard, BarChart3, ShieldAlert, Globe, Cpu, Radio, BrainCircuit, FileText, Settings } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const items = [
  { icon: LayoutDashboard, tab: "Dashboard" },
  { icon: BarChart3, tab: "Overview" },
  { icon: Radio, tab: "Operations Center" },
  { icon: ShieldAlert, tab: "Supply Chain Risk Intelligence" },
  { icon: Globe, tab: "Supply Network" },
  { icon: Cpu, tab: "Model Registry" },
  { icon: BrainCircuit, tab: "AI Agents" },
  { icon: FileText, tab: "Reports" },
  { icon: Settings, tab: "Settings" },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="hidden md:flex w-[52px] bg-sidebar border-r border-border-subtle flex-col items-center py-4 gap-1 shrink-0">
      {items.map(({ icon: Icon, tab }) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          title={tab}
          className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-150 ${
            activeTab === tab
              ? "bg-accent-dim text-accent"
              : "text-white/30 hover:text-white/56 hover:bg-white/[0.04]"
          }`}
        >
          <Icon className="h-[18px] w-[18px]" />
        </button>
      ))}
    </aside>
  );
}
