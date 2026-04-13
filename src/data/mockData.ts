/* ══════════════════════════════════════════
   FSC3 Mock Data — Food Security Command & Control Centre
   ══════════════════════════════════════════ */

/* ── Alerts ── */
export const alerts = [
  { id: 1, title: "Rice Import Delay", category: "Logistics disruption" as const, severity: "high" as const, riskScore: 64, actions: ["Prioritise port clearance for staple food imports", "Deploy national rice buffer stocks to stabilise domestic supply"], country: "Vietnam", time: "2 hours ago" },
  { id: 2, title: "Wheat Price Spike", category: "Policy decision" as const, severity: "critical" as const, riskScore: 78, actions: ["Release strategic wheat reserves to dampen inflationary pressure", "Temporarily relax import duties or quotas for substitution"], country: "Ukraine", time: "5 hours ago" },
  { id: 3, title: "Monsoon Weather Alert", category: "Weather" as const, severity: "medium" as const, riskScore: 52, actions: ["Mobilise emergency logistics and flood mitigation support", "Conduct rapid crop damage assessments and yield loss analysis"], country: "Malaysia", time: "1 day ago" },
  { id: 4, title: "Supply Chain Disruption", category: "Logistics disruption" as const, severity: "medium" as const, riskScore: 57, actions: ["Engage transport unions to limit disruption duration", "Activate emergency transport corridors for perishables"], country: "India", time: "2 days ago" },
  { id: 5, title: "Supplier Capacity Issue", category: "Diseases" as const, severity: "low" as const, riskScore: 38, actions: ["Monitor supplier concentration risk in key food categories", "Support capacity recovery efforts through financing or flexibility"], country: "Thailand", time: "3 days ago" },
  { id: 6, title: "Export Ban — Palm Oil", category: "Policy decision" as const, severity: "high" as const, riskScore: 71, actions: ["Identify alternative palm oil suppliers (Malaysia, Colombia)", "Assess downstream impact on processed food supply chains"], country: "Indonesia", time: "6 hours ago" },
  { id: 7, title: "Port Congestion Alert", category: "Logistics disruption" as const, severity: "medium" as const, riskScore: 48, actions: ["Divert shipments to secondary ports", "Negotiate priority berthing for food security shipments"], country: "Philippines", time: "1 day ago" },
  { id: 8, title: "Crop Disease Outbreak", category: "Diseases" as const, severity: "high" as const, riskScore: 66, actions: ["Quarantine affected regions immediately", "Deploy crop surveillance drones for damage assessment"], country: "Myanmar", time: "4 hours ago" },
];

/* ── Production by country ── */
export const productionByCountry = [
  { country: "Vietnam", volume: 245000 },
  { country: "Thailand", volume: 198000 },
  { country: "India", volume: 167000 },
  { country: "Malaysia", volume: 134000 },
  { country: "Indonesia", volume: 131000 },
  { country: "Philippines", volume: 98000 },
];

/* ── Shipped tonnage (6 months) ── */
export const shippedTonnage = [
  { month: "Jan", rice: 42000, wheat: 28000, vegetables: 15000 },
  { month: "Feb", rice: 45000, wheat: 32000, vegetables: 18000 },
  { month: "Mar", rice: 48000, wheat: 30000, vegetables: 22000 },
  { month: "Apr", rice: 52000, wheat: 35000, vegetables: 20000 },
  { month: "May", rice: 55000, wheat: 38000, vegetables: 24000 },
  { month: "Jun", rice: 58000, wheat: 42000, vegetables: 26000 },
];

/* ── Risk matrix (5×5) ── */
export const riskMatrix = [
  { likelihood: "Almost Certain", weatherEvents: 3, supplierDelays: 2, exportBans: 1, qualityIssues: 0, portDisruptions: 0, priceVolatility: 1 },
  { likelihood: "Likely", weatherEvents: 0, supplierDelays: 5, exportBans: 4, qualityIssues: 0, portDisruptions: 0, priceVolatility: 2 },
  { likelihood: "Possible", weatherEvents: 0, supplierDelays: 0, exportBans: 0, qualityIssues: 8, portDisruptions: 0, priceVolatility: 0 },
  { likelihood: "Unlikely", weatherEvents: 0, supplierDelays: 0, exportBans: 0, qualityIssues: 0, portDisruptions: 0, priceVolatility: 0 },
  { likelihood: "Rare", weatherEvents: 0, supplierDelays: 0, exportBans: 0, qualityIssues: 0, portDisruptions: 0, priceVolatility: 0 },
];

export const riskCategories = ["weatherEvents", "supplierDelays", "exportBans", "qualityIssues", "portDisruptions", "priceVolatility"] as const;
export const riskCategoryLabels: Record<string, string> = {
  weatherEvents: "Weather Events",
  supplierDelays: "Supplier Delays",
  exportBans: "Export Bans",
  qualityIssues: "Quality Issues",
  portDisruptions: "Port Disruptions",
  priceVolatility: "Price Volatility",
};

/* ── Models ── */
export const models = [
  { name: "Rice Price Forecast", type: "Time Series", accuracy: 94.2, lastUpdated: "2 hours ago", status: "running" as const, description: "Prophet + XGBoost ensemble for rice commodity pricing" },
  { name: "Supply Chain Risk", type: "Classification", accuracy: 91.7, lastUpdated: "1 day ago", status: "completed" as const, description: "Multi-label classifier for supply chain disruption risk" },
  { name: "Demand Forecasting", type: "Regression", accuracy: 88.5, lastUpdated: "3 hours ago", status: "running" as const, description: "LSTM-based demand prediction across commodities" },
  { name: "Weather Impact Model", type: "ML Ensemble", accuracy: 86.3, lastUpdated: "12 hours ago", status: "completed" as const, description: "Multi-modal fusion of satellite + weather data for crop impact" },
];

/* ── Incidents ── */
export const incidents = [
  { id: 1, name: "Vietnam Rice Shipment Delay", created: "6/15/2024", status: "in-progress" as const, priority: "high" as const, owner: "Operations Team", sla: "4h 23m remaining" },
  { id: 2, name: "Thailand Port Congestion", created: "6/14/2024", status: "monitoring" as const, priority: "medium" as const, owner: "Logistics Team", sla: "1d 8h remaining" },
  { id: 3, name: "Wheat Quality Issue — India", created: "6/12/2024", status: "resolved" as const, priority: "high" as const, owner: "Quality Team", sla: "Completed" },
];

/* ── Playbooks ── */
export const playbooks = [
  { name: "Monsoon Response", description: "Emergency logistics and flood mitigation for Southeast Asian supply routes", steps: 8, lastUsed: "2 weeks ago" },
  { name: "Export Ban Response", description: "Alternative supplier activation and trade route rerouting protocol", steps: 6, lastUsed: "1 month ago" },
  { name: "Supply Disruption", description: "Multi-tier supplier fallback and buffer stock deployment", steps: 10, lastUsed: "3 weeks ago" },
  { name: "Price Volatility Response", description: "Hedging activation and procurement timing optimization", steps: 5, lastUsed: "1 week ago" },
];

/* ── AI Agents ── */
export const agentInputs = ["Weather Data", "Price Feeds", "Supplier DB", "News Events"];
export const agentProcessors = [
  { name: "Risk Aggregation", status: "active" as const, confidence: 94.2, description: "Aggregates risk signals from multiple sources" },
  { name: "Supplier Ranking", status: "active" as const, confidence: 96.5, description: "Ranks alternative suppliers by reliability and cost" },
  { name: "Report Generation", status: "idle" as const, confidence: 91.8, description: "Generates executive-ready reports and summaries" },
  { name: "Forecast Synthesis", status: "active" as const, confidence: 89.4, description: "Synthesizes forecasts from multiple models" },
];
export const agentOutputs = ["Risk Reports", "Supplier Scores", "Demand Forecasts", "Alert Triggers"];

/* ── Report templates ── */
export const reportTemplates = [
  { name: "Weekly Food Security Outlook", description: "Executive summary of food security status, risks, and forecasts", frequency: "Weekly", lastGenerated: "2 days ago", formats: ["PDF", "PPT"] },
  { name: "Scenario Impact Analysis", description: "Detailed analysis of simulated scenarios and recommended actions", frequency: "On-Demand", lastGenerated: "5 days ago", formats: ["PDF"] },
  { name: "Supplier Performance Report", description: "Quarterly assessment of supplier reliability and risk tiers", frequency: "Quarterly", lastGenerated: "12 days ago", formats: ["PDF", "Excel"] },
  { name: "Risk Register Summary", description: "Historical disruptions and mitigation effectiveness", frequency: "Monthly", lastGenerated: "8 days ago", formats: ["PDF"] },
  { name: "Model Performance Audit", description: "AI model accuracy, stability, and explainability metrics", frequency: "Monthly", lastGenerated: "15 days ago", formats: ["PDF", "Excel"] },
];

/* ── Shared chart tooltip style ── */
export const ttStyle = {
  background: "rgba(15,18,25,0.92)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 10,
  fontSize: 12,
  color: "#fff",
  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
};
