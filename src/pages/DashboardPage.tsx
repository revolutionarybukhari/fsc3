import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import SectionHeader from "@/components/SectionHeader";
import StatusBadge from "@/components/StatusBadge";
import LiveMap from "@/components/LiveMap";
import { useDashboard } from "@/DashboardContext";
import {
  alerts,
  productionByCountry,
  shippedTonnage,
  ttStyle,
} from "@/data/mockData";
import type { RagStatus } from "@/components/StatusBadge";

const sevToRag = (s: string): RagStatus =>
  s === "critical" || s === "high" ? "red" : s === "medium" ? "amber" : "green";

const cardCls =
  "bg-surface rounded-xl border border-border-subtle p-4 sm:p-6 hover:border-border-emphasis transition-all duration-200";

const sectionTitle =
  "text-[13px] sm:text-[14px] font-semibold text-white/80";

const axisCat = { fill: "rgba(255,255,255,0.56)" };
const axisVal = { fill: "rgba(255,255,255,0.34)" };
const gridStroke = "rgba(255,255,255,0.04)";

export default function DashboardPage() {
  const { openDrawer, addToast, setCountryFilter } = useDashboard();

  const handleCountryClick = (name: string) => {
    setCountryFilter(name);
    addToast(`Filtering by ${name}`, "info");
  };

  const handleAlertClick = (alert: (typeof alerts)[number]) => {
    openDrawer({
      title: "Alert Detail",
      body: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <StatusBadge status={sevToRag(alert.severity)} label={alert.severity} pulse />
            <span className="text-[11px] text-white/40">{alert.time}</span>
          </div>
          <h3 className="text-[16px] font-semibold text-white/90">
            {alert.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] text-white/50">
              {alert.category}
            </span>
            <span className="inline-flex items-center rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] text-white/50">
              {alert.country}
            </span>
          </div>
          <p className="text-[13px] font-mono text-white/60">
            Risk: {alert.riskScore}/100
          </p>
          <div>
            <p className="text-[12px] font-medium text-white/50 mb-2">
              Recommended Actions
            </p>
            <ul className="space-y-1.5">
              {alert.actions.map((a, i) => (
                <li
                  key={i}
                  className="text-[12px] text-white/60 pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-white/20"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    });
  };

  return (
    <div className="space-y-6">
      {/* ── Section Header ── */}
      <SectionHeader
        title="Live Food Security Dashboard"
        description="Real-time monitoring and control centre"
      />

      {/* ── Map + Alerts row ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4">
        {/* Map */}
        <LiveMap height="420px" onCountryClick={handleCountryClick} />

        {/* Active Alerts panel */}
        <div className={cardCls}>
          <h3 className={`${sectionTitle} mb-4`}>Active Alerts</h3>
          <div className="space-y-3 max-h-[370px] overflow-y-auto pr-1 custom-scrollbar">
            {alerts.slice(0, 5).map((alert) => (
              <button
                key={alert.id}
                type="button"
                onClick={() => handleAlertClick(alert)}
                className="w-full text-left rounded-lg border border-border-subtle bg-white/[0.02] p-3 hover:border-border-emphasis hover:bg-white/[0.04] transition-all duration-150 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <StatusBadge
                    status={sevToRag(alert.severity)}
                    label={alert.severity}
                    pulse={alert.severity === "critical"}
                  />
                  <span className="text-[11px] text-white/34 ml-auto">
                    {alert.time}
                  </span>
                </div>
                <p className="text-[13px] font-semibold text-white/90 mb-1">
                  {alert.title}
                </p>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/40">
                    {alert.category}
                  </span>
                  <span className="font-mono text-[11px] text-white/50">
                    Risk: {alert.riskScore}/100
                  </span>
                </div>
                <ul className="space-y-0.5 mb-1.5">
                  {alert.actions.map((a, i) => (
                    <li
                      key={i}
                      className="text-[11px] text-white/40 truncate pl-2.5 relative before:content-[''] before:absolute before:left-0 before:top-[6px] before:w-1 before:h-1 before:rounded-full before:bg-white/20"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/40">
                  {alert.country}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Charts row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Production by Country */}
        <div className={cardCls}>
          <h3 className={`${sectionTitle} mb-4`}>Production by Country</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={productionByCountry}
              layout="vertical"
              margin={{ top: 0, right: 12, bottom: 0, left: 8 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={gridStroke}
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 11, ...axisVal }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
              />
              <YAxis
                type="category"
                dataKey="country"
                tick={{ fontSize: 11, ...axisCat }}
                axisLine={false}
                tickLine={false}
                width={80}
              />
              <Tooltip
                contentStyle={ttStyle}
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
                formatter={(v) => [`${Number(v).toLocaleString()} MT`, "Volume"]}
              />
              <Bar
                dataKey="volume"
                fill="#22c55e"
                radius={[0, 4, 4, 0]}
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Shipped Tonnage */}
        <div className={cardCls}>
          <h3 className={`${sectionTitle} mb-4`}>Shipped Tonnage (6M)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart
              data={shippedTonnage}
              margin={{ top: 0, right: 12, bottom: 0, left: 8 }}
            >
              <defs>
                <linearGradient id="gRice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gWheat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gVeg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={gridStroke}
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, ...axisCat }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, ...axisVal }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={ttStyle}
                formatter={(v) => [`${Number(v).toLocaleString()} MT`]}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 11, color: "rgba(255,255,255,0.56)" }}
              />
              <Area
                type="monotone"
                dataKey="rice"
                stroke="#22c55e"
                fill="url(#gRice)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="wheat"
                stroke="#f59e0b"
                fill="url(#gWheat)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="vegetables"
                stroke="#a855f7"
                fill="url(#gVeg)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── System Status ── */}
      <div className={cardCls}>
        <h3 className={`${sectionTitle} mb-4`}>System Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border-subtle">
            <span className="text-[13px] text-white/60">Overall Status</span>
            <StatusBadge status="green" label="Stable" />
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border-subtle">
            <span className="text-[13px] text-white/60">Supply Chain</span>
            <StatusBadge status="amber" label="Risky" />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-[13px] text-white/60">Price Stability</span>
            <StatusBadge status="green" label="Stable" />
          </div>
        </div>
      </div>
    </div>
  );
}
