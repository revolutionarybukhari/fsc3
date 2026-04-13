import { Globe, Search, Bell, Wheat, Menu } from "lucide-react";

interface TopNavProps {
  onMenuToggle?: () => void;
}

export default function TopNav({ onMenuToggle }: TopNavProps) {
  return (
    <header className="h-12 sm:h-[52px] bg-sidebar border-b border-border flex items-center justify-between px-4 sm:px-6 shrink-0">
      <div className="flex items-center gap-3 sm:gap-7">
        <button className="md:hidden p-1 text-white/40" onClick={onMenuToggle}>
          <Menu className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-accent-dim flex items-center justify-center">
            <Wheat className="h-3.5 w-3.5 text-accent" />
          </div>
          <span className="text-[14px] font-bold tracking-wide text-white/90">FSC3</span>
        </div>
        <nav className="hidden lg:flex items-center gap-5 text-[13px] text-white/34 font-medium">
          <button className="hover:text-white/70 transition-colors">All</button>
          <button className="hover:text-white/70 transition-colors">Favorites</button>
          <button className="hover:text-white/70 transition-colors">History</button>
        </nav>
      </div>
      <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-white/[0.02] text-[12px] sm:text-[13px] text-white/50 font-medium">
        Food Security Command &amp; Control Centre
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <button className="hidden sm:flex w-8 h-8 items-center justify-center rounded-lg text-white/34 hover:text-white/70 hover:bg-white/[0.04] transition-all">
          <Globe className="h-4 w-4" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-white/34 hover:text-white/70 hover:bg-white/[0.04] transition-all">
          <Search className="h-4 w-4" />
        </button>
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg text-white/34 hover:text-white/70 hover:bg-white/[0.04] transition-all">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-danger" />
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent to-info flex items-center justify-center text-[11px] font-bold text-white ml-1">
          ZB
        </div>
      </div>
    </header>
  );
}
