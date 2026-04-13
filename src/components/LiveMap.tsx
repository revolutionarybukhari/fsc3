import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { countries, tradeRoutes, statusColor, statusLabel } from "@/data/mapData";
import "leaflet/dist/leaflet.css";

const tileLayers = {
  satellite: { url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", label: "Satellite", attr: "Esri, Maxar" },
  terrain: { url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", label: "Terrain", attr: "OpenTopoMap" },
  streets: { url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", label: "Streets", attr: "CARTO" },
};
type TileKey = keyof typeof tileLayers;

const markerClass: Record<string, string> = { low: "marker-healthy", medium: "marker-warning", high: "marker-critical" };

function createMarkerIcon(risk: string, volume: number) {
  const size = Math.max(10, Math.min(22, Math.sqrt(volume / 2000)));
  return L.divIcon({
    className: "",
    html: `<div class="marker-dot ${markerClass[risk] || "marker-healthy"}" style="width:${size}px;height:${size}px"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function routeColor(i: number): string {
  const highRisk = [4, 7]; // Ukraine, Myanmar routes
  const medRisk = [2, 3];  // India, Australia routes
  if (highRisk.includes(i)) return "rgba(239,68,68,0.45)";
  if (medRisk.includes(i)) return "rgba(245,158,11,0.45)";
  return "rgba(34,197,94,0.45)";
}

function TileSwitcher({ activeLayer }: { activeLayer: TileKey }) {
  const map = useMap();
  useEffect(() => { setTimeout(() => map.invalidateSize(), 100); }, [activeLayer, map]);
  return null;
}

function LiveBadge() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "UTC" }) + " UTC");
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="map-live-badge">
      <span className="map-live-dot" />
      <span className="map-live-text">LIVE</span>
      <span className="map-live-time">{time}</span>
    </div>
  );
}

interface LiveMapProps {
  height?: string;
  showLayers?: boolean;
  filterCountries?: (c: typeof countries) => typeof countries;
  onCountryClick?: (name: string) => void;
}

export default function LiveMap({ height = "420px", showLayers, filterCountries, onCountryClick }: LiveMapProps) {
  const [tileKey, setTileKey] = useState<TileKey>("satellite");
  const [layers, setLayers] = useState({ origins: true, routes: true });
  const tile = tileLayers[tileKey];
  const display = filterCountries ? filterCountries(countries) : countries;

  const lowCount = countries.filter(c => c.riskLevel === "low").length;
  const medCount = countries.filter(c => c.riskLevel === "medium").length;
  const highCount = countries.filter(c => c.riskLevel === "high").length;

  return (
    <div className="relative rounded-xl overflow-hidden border border-border-subtle" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)" }}>
      <LiveBadge />
      {showLayers && (
        <div className="absolute top-3 left-3 z-[800] bg-[rgba(15,18,25,0.85)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.1)] rounded-lg p-3 text-[12px]">
          <div className="text-[11px] uppercase tracking-[0.06em] text-white/34 font-medium mb-2">Layers</div>
          {([{ key: "origins" as const, label: "Import Origins" }, { key: "routes" as const, label: "Trade Routes" }]).map(l => (
            <label key={l.key} className="flex items-center gap-2 py-1 cursor-pointer text-white/56 hover:text-white/80 transition-colors">
              <input type="checkbox" checked={layers[l.key]} onChange={() => setLayers(p => ({ ...p, [l.key]: !p[l.key] }))} className="accent-[#22c55e]" />
              {l.label}
            </label>
          ))}
        </div>
      )}

      <MapContainer center={[5, 108]} zoom={3} style={{ height, width: "100%" }} zoomControl={false} attributionControl={false}>
        <TileLayer url={tile.url} attribution={tile.attr} maxZoom={18} />
        <TileSwitcher activeLayer={tileKey} />
        {layers.routes && tradeRoutes.map((route, i) => (
          <Polyline key={`r-${i}-${tileKey}`} positions={route} pathOptions={{ color: routeColor(i), weight: 2.5, dashArray: "10 8", opacity: 0.8, lineCap: "round" }} />
        ))}
        {layers.origins && display.map(c => (
          <Marker key={c.code} position={[c.lat, c.lng]} icon={createMarkerIcon(c.riskLevel, c.importVolume)} eventHandlers={{ click: () => onCountryClick?.(c.name) }}>
            <Tooltip direction="top" offset={[0, -12]} opacity={1}>
              <div className="map-tooltip">
                <div className="map-tooltip-name"><span style={{ color: statusColor[c.riskLevel] }}>●</span> {c.name}</div>
                <div className="map-tooltip-row"><span className="map-tooltip-label">Volume</span><span className="map-tooltip-value">{c.importVolume.toLocaleString()} MT</span></div>
                <div className="map-tooltip-row"><span className="map-tooltip-label">Dependency</span><span className="map-tooltip-value">{c.dependency}%</span></div>
                <div className="map-tooltip-row"><span className="map-tooltip-label">Commodity</span><span className="map-tooltip-value">{c.commodity}</span></div>
                <div className="map-tooltip-row"><span className="map-tooltip-label">Risk</span><span className="map-tooltip-value" style={{ color: statusColor[c.riskLevel] }}>{statusLabel[c.riskLevel]}</span></div>
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

      <div className="map-legend-bar">
        <div className="legend-pill"><span className="legend-dot green" />Low Risk <span className="legend-count">({lowCount})</span></div>
        <div className="legend-pill"><span className="legend-dot amber" />Medium Risk <span className="legend-count">({medCount})</span></div>
        <div className="legend-pill"><span className="legend-dot red" />High Risk <span className="legend-count">({highCount})</span></div>
      </div>

      <div className="layer-switcher">
        {(Object.keys(tileLayers) as TileKey[]).map(key => (
          <button key={key} className={`layer-btn ${tileKey === key ? "active" : ""}`} onClick={() => setTileKey(key)}>{tileLayers[key].label}</button>
        ))}
      </div>
    </div>
  );
}
