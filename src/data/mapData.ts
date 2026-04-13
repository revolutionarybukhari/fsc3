export const countries = [
  { name: "Singapore", code: "SGP", lat: 1.35, lng: 103.82, importVolume: 2400, dependency: 92, riskLevel: "low", price: "$520/MT", commodity: "Rice" },
  { name: "Vietnam", code: "VNM", lat: 14.06, lng: 108.28, importVolume: 245000, dependency: 28, riskLevel: "medium", price: "$380/MT", commodity: "Rice" },
  { name: "Thailand", code: "THA", lat: 15.87, lng: 100.99, importVolume: 198000, dependency: 22, riskLevel: "low", price: "$410/MT", commodity: "Rice" },
  { name: "India", code: "IND", lat: 20.59, lng: 78.96, importVolume: 167000, dependency: 15, riskLevel: "medium", price: "$350/MT", commodity: "Wheat" },
  { name: "Indonesia", code: "IDN", lat: -0.79, lng: 113.92, importVolume: 131000, dependency: 42, riskLevel: "high", price: "$440/MT", commodity: "Rice" },
  { name: "Malaysia", code: "MYS", lat: 4.21, lng: 101.98, importVolume: 134000, dependency: 55, riskLevel: "medium", price: "$460/MT", commodity: "Palm Oil" },
  { name: "Philippines", code: "PHL", lat: 12.88, lng: 121.77, importVolume: 98000, dependency: 48, riskLevel: "high", price: "$470/MT", commodity: "Rice" },
  { name: "Myanmar", code: "MMR", lat: 19.76, lng: 96.08, importVolume: 65000, dependency: 18, riskLevel: "high", price: "$310/MT", commodity: "Rice" },
  { name: "Australia", code: "AUS", lat: -25.27, lng: 133.78, importVolume: 42000, dependency: 5, riskLevel: "low", price: "$580/MT", commodity: "Wheat" },
  { name: "Ukraine", code: "UKR", lat: 48.38, lng: 31.17, importVolume: 78000, dependency: 8, riskLevel: "high", price: "$280/MT", commodity: "Wheat" },
  { name: "Brazil", code: "BRA", lat: -14.24, lng: -51.93, importVolume: 95000, dependency: 6, riskLevel: "low", price: "$320/MT", commodity: "Soybeans" },
  { name: "USA", code: "USA", lat: 37.09, lng: -95.71, importVolume: 62000, dependency: 4, riskLevel: "low", price: "$420/MT", commodity: "Wheat" },
];

export type RiskLevel = "low" | "medium" | "high";

export const tradeRoutes: [number, number][][] = [
  [[14.06, 108.28], [1.35, 103.82]],           // Vietnam → Singapore
  [[15.87, 100.99], [1.35, 103.82]],           // Thailand → Singapore
  [[20.59, 78.96], [4.21, 101.98], [1.35, 103.82]], // India → Malaysia → Singapore
  [[-25.27, 133.78], [-0.79, 113.92], [1.35, 103.82]], // Australia → Indonesia → Singapore
  [[48.38, 31.17], [20.59, 78.96], [1.35, 103.82]], // Ukraine → India → Singapore
  [[-14.24, -51.93], [1.35, 103.82]],           // Brazil → Singapore
  [[37.09, -95.71], [12.88, 121.77], [1.35, 103.82]], // USA → Philippines → Singapore
];

export const statusColor: Record<string, string> = {
  low: "#22c55e",
  medium: "#f59e0b",
  high: "#ef4444",
};

export const statusLabel: Record<string, string> = {
  low: "Low Risk",
  medium: "Medium Risk",
  high: "High Risk",
};

export const statusToRag: Record<string, "green" | "amber" | "red"> = {
  low: "green",
  medium: "amber",
  high: "red",
};
