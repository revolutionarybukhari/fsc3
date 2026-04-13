import { Clock, Eye, Shield } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import MetricCard from "@/components/MetricCard";
import StatusBadge from "@/components/StatusBadge";
import { useDashboard } from "@/DashboardContext";
import { incidents, playbooks } from "@/data/mockData";
import type { RagStatus } from "@/components/StatusBadge";

const cardCls =
  "bg-surface rounded-xl border border-border-subtle p-5 sm:p-6 lg:p-7 hover:border-border-emphasis transition-all duration-200";

function statusToRag(status: string): RagStatus {
  if (status === "resolved") return "green";
  return "amber";
}

function statusLabel(status: string): string {
  if (status === "in-progress") return "In Progress";
  if (status === "monitoring") return "Monitoring";
  return "Resolved";
}

function priorityColor(priority: string): { bg: string; text: string } {
  if (priority === "high")
    return { bg: "rgba(239,68,68,0.10)", text: "#ef4444" };
  if (priority === "medium")
    return { bg: "rgba(245,158,11,0.10)", text: "#f59e0b" };
  return { bg: "rgba(34,197,94,0.10)", text: "#22c55e" };
}

export default function OperationsCenterPage() {
  const { openDrawer, addToast } = useDashboard();

  const totalIncidents = incidents.length;
  const inProgressCount = incidents.filter(
    (i) => i.status === "in-progress"
  ).length;
  const monitoringCount = incidents.filter(
    (i) => i.status === "monitoring"
  ).length;
  const resolvedCount = incidents.filter(
    (i) => i.status === "resolved"
  ).length;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Operations Center"
        description="Incident tracking and response playbooks"
      />

      {/* ── Metric cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-6 sm:mb-8">
        <MetricCard
          title="Total Incidents"
          value={String(totalIncidents)}
          change="All tracked incidents"
          color="#f59e0b"
          onClick={() => addToast(`${totalIncidents} total incidents tracked`, "amber")}
          navigateLabel="View all"
        />
        <MetricCard
          title="In Progress"
          value={String(inProgressCount)}
          change="Active response"
          color="#f59e0b"
          onClick={() => addToast(`${inProgressCount} incidents currently in progress`, "amber")}
          navigateLabel="Filter in-progress"
        />
        <MetricCard
          title="Monitoring"
          value={String(monitoringCount)}
          change="Under observation"
          color="#f59e0b"
          onClick={() => addToast(`${monitoringCount} incidents under monitoring`, "amber")}
          navigateLabel="Filter monitoring"
        />
        <MetricCard
          title="Resolved"
          value={String(resolvedCount)}
          change="Successfully closed"
          color="#22c55e"
          onClick={() => addToast(`${resolvedCount} incidents resolved`, "green")}
          navigateLabel="Filter resolved"
        />
      </div>

      {/* ── Active Incidents table ── */}
      <div className={cardCls}>
        <div className="flex items-center gap-2 mb-5 sm:mb-6">
          <Clock className="h-4 w-4 text-white/40" />
          <h3 className="text-[13px] sm:text-[14px] font-semibold text-white/80">
            Active Incidents
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="text-left text-[11px] font-medium uppercase tracking-[0.06em] text-white/34 pb-3.5 pr-5">
                  Incident
                </th>
                <th className="text-left text-[11px] font-medium uppercase tracking-[0.06em] text-white/34 pb-3.5 pr-5">
                  Status
                </th>
                <th className="text-left text-[11px] font-medium uppercase tracking-[0.06em] text-white/34 pb-3.5 pr-5">
                  Priority
                </th>
                <th className="text-left text-[11px] font-medium uppercase tracking-[0.06em] text-white/34 pb-3.5 pr-5">
                  Owner
                </th>
                <th className="text-left text-[11px] font-medium uppercase tracking-[0.06em] text-white/34 pb-3.5 pr-5">
                  SLA Timer
                </th>
                <th className="text-right text-[11px] font-medium uppercase tracking-[0.06em] text-white/34 pb-3.5">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((incident) => {
                const pColor = priorityColor(incident.priority);
                const isCompleted = incident.sla === "Completed";

                const openIncidentDrawer = () =>
                  openDrawer({
                    title: incident.name,
                    body: (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <StatusBadge
                            status={statusToRag(incident.status)}
                            label={statusLabel(incident.status)}
                            pulse={incident.status === "in-progress"}
                          />
                          <span
                            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize"
                            style={{
                              background: pColor.bg,
                              color: pColor.text,
                            }}
                          >
                            {incident.priority}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-t border-border-subtle">
                          <span className="text-[12px] text-white/40">Owner</span>
                          <span className="text-[12px] text-white/60">{incident.owner}</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-t border-border-subtle">
                          <span className="text-[12px] text-white/40">Created</span>
                          <span className="text-[12px] text-white/60">{incident.created}</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-t border-border-subtle">
                          <span className="text-[12px] text-white/40">SLA</span>
                          <span
                            className="text-[12px] font-mono"
                            style={{
                              color: isCompleted ? "#22c55e" : "rgba(255,255,255,0.56)",
                            }}
                          >
                            {incident.sla}
                          </span>
                        </div>
                      </div>
                    ),
                  });

                return (
                  <tr
                    key={incident.id}
                    className="border-b border-border-subtle last:border-b-0 hover:bg-white/[0.02] transition-colors cursor-pointer"
                    onClick={openIncidentDrawer}
                  >
                    <td className="py-3.5 pr-5">
                      <p className="text-[13px] font-semibold text-white/90">
                        {incident.name}
                      </p>
                      <p className="text-[11px] text-white/34 mt-0.5">
                        Created {incident.created}
                      </p>
                    </td>
                    <td className="py-3.5 pr-5">
                      <StatusBadge
                        status={statusToRag(incident.status)}
                        label={statusLabel(incident.status)}
                        pulse={incident.status === "in-progress"}
                      />
                    </td>
                    <td className="py-3.5 pr-5">
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize"
                        style={{
                          background: pColor.bg,
                          color: pColor.text,
                        }}
                      >
                        {incident.priority}
                      </span>
                    </td>
                    <td className="py-3.5 pr-5">
                      <span className="text-[12px] text-white/60">
                        {incident.owner}
                      </span>
                    </td>
                    <td className="py-3.5 pr-5">
                      <span
                        className="text-[12px] font-mono"
                        style={{
                          color: isCompleted
                            ? "#22c55e"
                            : "rgba(255,255,255,0.56)",
                        }}
                      >
                        {incident.sla}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openIncidentDrawer();
                        }}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] transition-colors border border-border-subtle hover:border-border-emphasis"
                      >
                        <Eye className="h-3.5 w-3.5 text-white/50" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Response Playbooks ── */}
      <div className="mb-6 sm:mb-10">
        <div className="flex items-center gap-2 mb-5 sm:mb-6">
          <Shield className="h-4 w-4 text-white/40" />
          <h3 className="text-[13px] sm:text-[14px] font-semibold text-white/80">
            Response Playbooks
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {playbooks.map((pb) => (
            <div
              key={pb.name}
              className={`${cardCls} cursor-pointer hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)] active:translate-y-0`}
              onClick={() => addToast(`Playbook "${pb.name}" activated`, "info")}
            >
              <p className="text-[14px] font-semibold text-white/90 mb-1.5">
                {pb.name}
              </p>
              <p className="text-[12px] text-white/40 leading-relaxed mb-3">
                {pb.description}
              </p>
              <div className="flex items-center justify-between text-[11px] text-white/34 mb-4">
                <span>{pb.steps} steps</span>
                <span>Used {pb.lastUsed}</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  addToast(`Playbook "${pb.name}" activated`, "info");
                }}
                className="w-full text-[11px] font-medium text-accent bg-accent-dim hover:bg-accent/20 rounded-lg py-2 px-3 transition-colors"
              >
                Activate
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
