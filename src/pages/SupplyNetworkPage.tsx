import SectionHeader from "@/components/SectionHeader";
import MetricCard from "@/components/MetricCard";
import StatusBadge from "@/components/StatusBadge";
import LiveMap from "@/components/LiveMap";
import { useDashboard } from "@/DashboardContext";
import { countries, statusToRag } from "@/data/mapData";
import { productionByCountry, shippedTonnage, ttStyle } from "@/data/mockData";
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";

const sorted = [...countries].sort((a, b) => b.importVolume - a.importVolume);

const depColor = (dep: number) =>
  dep >= 50
    ? "#ef4444"
    : dep >= 20
      ? "#f59e0b"
      : "#22c55e";

export default function SupplyNetworkPage() {
  const { setCountryFilter, addToast, openDrawer, setActiveTab } = useDashboard();

  return (
    <>
      <SectionHeader
        title="Supply Network"
        description="Global import dependency and distribution visualization"
      />

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 mb-6 sm:mb-8">
        <MetricCard title="Total Import Volume" value="875,000" suffix="MT/mo" change="Up 4.2% vs last month" color="#22c55e" onClick={() => openDrawer({ title: "Import Volume Breakdown", body: (<div className="space-y-3"><p className="text-[13px] text-white/60 leading-relaxed">Total monthly import volume across all origins.</p><div className="flex justify-between py-2 border-t border-border-subtle"><span className="text-[12px] text-white/40">Current month</span><span className="text-[13px] font-mono font-semibold text-white/70">875,000 MT</span></div><div className="flex justify-between py-2 border-t border-border-subtle"><span className="text-[12px] text-white/40">Previous month</span><span className="text-[13px] font-mono text-white/50">839,700 MT</span></div><div className="flex justify-between py-2 border-t border-border-subtle"><span className="text-[12px] text-white/40">Change</span><span className="text-[13px] font-mono font-semibold text-[#22c55e]">+4.2%</span></div></div>) })} navigateLabel="View volume details" />
        <MetricCard title="Active Origins" value="12" change="All reporting" color="#22c55e" onClick={() => { addToast("12 active origins currently reporting", "green"); }} navigateLabel="View origins" />
        <MetricCard title="High Risk Origins" value="3" change="Indonesia, Philippines, Myanmar" color="#ef4444" isNegative onClick={() => setActiveTab("Risk Intelligence")} navigateLabel="View risk details" />
        <MetricCard title="Avg Dependency" value="30" suffix="%" change="Across all origins" color="#f59e0b" onClick={() => openDrawer({ title: "Dependency Analysis", body: (<div className="space-y-3"><p className="text-[13px] text-white/60 leading-relaxed">Average import dependency across all 12 active origins.</p>{sorted.slice(0, 5).map(c => (<div key={c.code} className="flex justify-between py-2 border-t border-border-subtle"><span className="text-[12px] text-white/40">{c.name}</span><span className="text-[13px] font-mono font-semibold" style={{ color: depColor(c.dependency) }}>{c.dependency}%</span></div>))}</div>) })} navigateLabel="View dependency" />
      </div>

      {/* Main grid: Map + Import Origins */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 sm:gap-6 mb-6 sm:mb-10">
        {/* Left: LiveMap */}
        <LiveMap
          height="500px"
          showLayers={true}
          onCountryClick={(name) => {
            setCountryFilter(name);
            addToast(`Filtered to ${name}`, "info");
          }}
        />

        {/* Right: Import Origins sidebar */}
        <div className="bg-surface rounded-xl border border-border-subtle hover:border-border-emphasis transition-all duration-200 overflow-hidden flex flex-col" style={{ maxHeight: "540px" }}>
          <div className="px-5 sm:px-6 py-4 border-b border-border-subtle shrink-0">
            <h3 className="text-[13px] sm:text-[14px] font-semibold text-white/80">Import Origins</h3>
            <p className="text-[11px] text-white/34 mt-1">{sorted.length} active origins sorted by volume</p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {sorted.map((c) => (
              <div
                key={c.code}
                className="flex flex-col gap-2 px-5 sm:px-6 py-3.5 border-b border-border-subtle/40 cursor-pointer hover:bg-white/[0.02] transition-colors"
                onClick={() => {
                  setCountryFilter(c.name);
                  addToast(`Filtered to ${c.name}`, "info");
                }}
              >
                {/* Row 1: Name + Status */}
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-white/85">{c.name}</span>
                  <StatusBadge
                    status={statusToRag[c.riskLevel]}
                    label={c.riskLevel === "low" ? "Low" : c.riskLevel === "medium" ? "Medium" : "High"}
                  />
                </div>

                {/* Row 2: Volume + Dependency */}
                <div className="flex items-center justify-between text-[11px] text-white/40">
                  <span>{c.importVolume.toLocaleString()} MT</span>
                  <span>Dependency: {c.dependency}%</span>
                </div>

                {/* Row 3: Dependency progress bar */}
                <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(c.dependency, 100)}%`,
                      background: depColor(c.dependency),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Production & Shipped Tonnage charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mb-6 sm:mb-10">
        {/* Production by Country */}
        <div className="bg-surface rounded-xl border border-border-subtle p-5 sm:p-6 lg:p-7 hover:border-border-emphasis hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)] active:translate-y-0 transition-all cursor-pointer">
          <h3 className="text-[13px] sm:text-[14px] font-semibold text-white/80 mb-5 sm:mb-6">Production by Country</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={productionByCountry}
              layout="vertical"
              margin={{ top: 0, right: 12, bottom: 0, left: 8 }}
              onClick={(state) => {
                if (state?.activeLabel) {
                  setCountryFilter(String(state.activeLabel));
                  addToast(`Filtered to ${state.activeLabel}`, "info");
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.34)" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="country" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.56)" }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={ttStyle} cursor={{ fill: "rgba(255,255,255,0.06)" }} formatter={(v) => [`${Number(v).toLocaleString()} MT`, "Volume"]} />
              <Bar dataKey="volume" fill="#22c55e" radius={[0, 4, 4, 0]} barSize={18} cursor="pointer" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Shipped Tonnage */}
        <div className="bg-surface rounded-xl border border-border-subtle p-5 sm:p-6 lg:p-7 hover:border-border-emphasis hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)] active:translate-y-0 transition-all cursor-pointer" onClick={() => addToast("Shipped tonnage: 58K MT rice, 42K MT wheat, 26K MT vegetables in June", "green")}>
          <h3 className="text-[13px] sm:text-[14px] font-semibold text-white/80 mb-5 sm:mb-6">Shipped Tonnage (6M)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={shippedTonnage} margin={{ top: 0, right: 12, bottom: 0, left: 8 }}>
              <defs>
                <linearGradient id="gRiceSN" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} /><stop offset="95%" stopColor="#22c55e" stopOpacity={0} /></linearGradient>
                <linearGradient id="gWheatSN" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} /><stop offset="95%" stopColor="#f59e0b" stopOpacity={0} /></linearGradient>
                <linearGradient id="gVegSN" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} /><stop offset="95%" stopColor="#a855f7" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.56)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "rgba(255,255,255,0.34)" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={ttStyle} formatter={(v) => [`${Number(v).toLocaleString()} MT`]} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: "rgba(255,255,255,0.56)" }} />
              <Area type="monotone" dataKey="rice" stroke="#22c55e" fill="url(#gRiceSN)" strokeWidth={2} />
              <Area type="monotone" dataKey="wheat" stroke="#f59e0b" fill="url(#gWheatSN)" strokeWidth={2} />
              <Area type="monotone" dataKey="vegetables" stroke="#a855f7" fill="url(#gVegSN)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
