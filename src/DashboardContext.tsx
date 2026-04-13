import { createContext, useContext, useState, useCallback } from "react";
import type { ToastData } from "@/components/Toast";
import type { RagStatus } from "@/components/StatusBadge";

interface DrawerContent { title: string; body: React.ReactNode; }

interface DashboardContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  drawerContent: DrawerContent | null;
  openDrawer: (content: DrawerContent) => void;
  closeDrawer: () => void;
  toasts: ToastData[];
  addToast: (message: string, type?: RagStatus | "info") => void;
  removeToast: (id: string) => void;
  countryFilter: string | null;
  setCountryFilter: (country: string | null) => void;
  commodityFilter: string | null;
  setCommodityFilter: (c: string | null) => void;
  timeRange: string;
  setTimeRange: (r: string) => void;
}

const Ctx = createContext<DashboardContextType | null>(null);

export function useDashboard() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
}

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [drawerContent, setDrawerContent] = useState<DrawerContent | null>(null);
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [countryFilter, setCountryFilter] = useState<string | null>(null);
  const [commodityFilter, setCommodityFilter] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("30d");

  const openDrawer = useCallback((c: DrawerContent) => setDrawerContent(c), []);
  const closeDrawer = useCallback(() => setDrawerContent(null), []);
  const addToast = useCallback((message: string, type: RagStatus | "info" = "info") => {
    setToasts(prev => [...prev, { id: crypto.randomUUID(), message, type }]);
  }, []);
  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <Ctx.Provider value={{ activeTab, setActiveTab, drawerContent, openDrawer, closeDrawer, toasts, addToast, removeToast, countryFilter, setCountryFilter, commodityFilter, setCommodityFilter, timeRange, setTimeRange }}>
      {children}
    </Ctx.Provider>
  );
}
