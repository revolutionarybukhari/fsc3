import SectionHeader from "@/components/SectionHeader";
import StatusBadge from "@/components/StatusBadge";
import { useDashboard } from "@/DashboardContext";
import {
  agentInputs,
  agentProcessors,
  agentOutputs,
} from "@/data/mockData";
import { BrainCircuit, ArrowDown, Zap, Activity, Clock, BarChart3 } from "lucide-react";

const cardCls =
  "bg-surface rounded-xl border border-border-subtle p-5 sm:p-6 lg:p-7 hover:border-border-emphasis transition-all duration-200";

export default function AiAgentsPage() {
  const { addToast, openDrawer } = useDashboard();

  return (
    <div className="space-y-6">
      {/* -- Header + Model Training button -- */}
      <div className="flex items-start justify-between mb-6 sm:mb-8">
        <SectionHeader
          title="AI Agent Orchestration"
          description="LLM-powered multi-agent workflow with autonomous reasoning"
        />
        <button
          type="button"
          onClick={() => addToast("Model training initiated", "info")}
          className="shrink-0 flex items-center gap-2 rounded-lg bg-accent/10 border border-accent/20 px-4 py-2 text-[12px] font-medium text-accent hover:bg-accent/20 transition-colors"
        >
          <Zap className="h-3.5 w-3.5" />
          Model Training
        </button>
      </div>

      {/* -- Info Banner -- */}
      <div className="rounded-xl border border-purple-500/20 bg-purple-500/[0.06] p-5 mb-6 sm:mb-8">
        <h3 className="text-[14px] font-semibold text-purple-300 mb-1.5">
          Agentic AI Framework
        </h3>
        <p className="text-[12px] text-white/50 leading-relaxed">
          LLM-powered agents with chain-of-thought reasoning orchestrate
          autonomous decision workflows across risk assessment, supplier
          evaluation, and demand forecasting pipelines.
        </p>
      </div>

      {/* -- Main Grid -- */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-5 sm:gap-6 mb-6 sm:mb-10">
        {/* Left -- Agent Workflow Canvas */}
        <div className={cardCls}>
          <h3 className="text-[13px] sm:text-[14px] font-semibold text-white/80 mb-5 sm:mb-6">
            Agent Workflow Canvas
          </h3>

          <div className="flex flex-col items-center gap-5 sm:gap-6">
            {/* INPUT LAYER */}
            <div className="w-full py-5 sm:py-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/30 mb-3 text-center">
                Input Layer
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {agentInputs.map((input) => (
                  <button
                    key={input}
                    type="button"
                    onClick={() => addToast(`${input} feed: Active, last updated 2m ago`, "green")}
                    className="px-4 py-2.5 bg-surface-2 rounded-lg border border-border-subtle text-[12px] text-white/60 cursor-pointer hover:bg-white/[0.06] hover:border-border-emphasis active:scale-[0.97] transition-all"
                  >
                    {input}
                  </button>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <ArrowDown className="h-5 w-5 text-white/20" />

            {/* PROCESSING LAYER */}
            <div className="w-full py-5 sm:py-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/30 mb-3 text-center">
                Processing Layer
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                {agentProcessors.map((proc) => (
                  <button
                    key={proc.name}
                    type="button"
                    onClick={() =>
                      openDrawer({
                        title: proc.name,
                        body: (
                          <div className="space-y-5">
                            <p className="text-[13px] text-white/60 leading-relaxed">
                              {proc.description}
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="rounded-lg bg-white/[0.03] border border-border-subtle p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <Activity className="h-3.5 w-3.5 text-green-400" />
                                  <span className="text-[11px] text-white/40 uppercase tracking-wider">Confidence</span>
                                </div>
                                <span className="text-[20px] font-mono font-semibold text-green-400">{proc.confidence}%</span>
                              </div>
                              <div className="rounded-lg bg-white/[0.03] border border-border-subtle p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <Clock className="h-3.5 w-3.5 text-white/40" />
                                  <span className="text-[11px] text-white/40 uppercase tracking-wider">Last Run</span>
                                </div>
                                <span className="text-[13px] text-white/70">3 min ago</span>
                              </div>
                            </div>
                            <div className="rounded-lg bg-white/[0.03] border border-border-subtle p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <BarChart3 className="h-3.5 w-3.5 text-white/40" />
                                <span className="text-[11px] text-white/40 uppercase tracking-wider">Processing Stats</span>
                              </div>
                              <div className="space-y-2 text-[12px]">
                                <div className="flex justify-between"><span className="text-white/40">Status</span><span className="text-white/70 capitalize">{proc.status}</span></div>
                                <div className="flex justify-between"><span className="text-white/40">Avg. Latency</span><span className="text-white/70">240ms</span></div>
                                <div className="flex justify-between"><span className="text-white/40">Tasks (24h)</span><span className="text-white/70">1,284</span></div>
                                <div className="flex justify-between"><span className="text-white/40">Error Rate</span><span className="text-white/70">0.02%</span></div>
                              </div>
                            </div>
                          </div>
                        ),
                      })
                    }
                    className="bg-surface-2 rounded-lg border border-border-subtle p-5 sm:p-6 text-left cursor-pointer hover:border-border-emphasis hover:-translate-y-px transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] font-medium text-white/80">
                        {proc.name}
                      </span>
                      <StatusBadge
                        status={proc.status === "active" ? "green" : "amber"}
                        label={proc.status}
                        pulse={proc.status === "active"}
                      />
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] font-medium text-purple-400">
                      <BrainCircuit className="h-3 w-3" />
                      LLM-Powered
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <ArrowDown className="h-5 w-5 text-white/20" />

            {/* OUTPUT LAYER */}
            <div className="w-full py-5 sm:py-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/30 mb-3 text-center">
                Output Layer
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {agentOutputs.map((output) => (
                  <button
                    key={output}
                    type="button"
                    onClick={() => addToast(`${output}: 24 generated this week`, "green")}
                    className="px-4 py-2.5 bg-surface-2 rounded-lg border border-border-subtle text-[12px] text-white/60 cursor-pointer hover:bg-white/[0.06] hover:border-border-emphasis active:scale-[0.97] transition-all"
                  >
                    {output}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right -- Active Agents sidebar */}
        <div className={cardCls}>
          <h3 className="text-[13px] sm:text-[14px] font-semibold text-white/80 mb-5 sm:mb-6">
            Active Agents
          </h3>
          <div className="space-y-4">
            {agentProcessors.map((agent) => (
              <button
                key={agent.name}
                type="button"
                onClick={() =>
                  openDrawer({
                    title: agent.name,
                    body: (
                      <div className="space-y-5">
                        <p className="text-[13px] text-white/60 leading-relaxed">
                          {agent.description}
                        </p>
                        <div className="rounded-lg bg-white/[0.03] border border-border-subtle p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Activity className="h-3.5 w-3.5 text-green-400" />
                            <span className="text-[11px] text-white/40 uppercase tracking-wider">Confidence</span>
                          </div>
                          <span className="text-[28px] font-mono font-semibold text-green-400">{agent.confidence}%</span>
                          <div className="mt-3 h-2 rounded-full bg-white/[0.06] overflow-hidden">
                            <div className="h-full rounded-full bg-green-500/60" style={{ width: `${agent.confidence}%` }} />
                          </div>
                        </div>
                        <div className="rounded-lg bg-white/[0.03] border border-border-subtle p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Clock className="h-3.5 w-3.5 text-white/40" />
                            <span className="text-[11px] text-white/40 uppercase tracking-wider">Processing History</span>
                          </div>
                          <div className="space-y-2 text-[12px]">
                            <div className="flex justify-between"><span className="text-white/40">Status</span><span className="text-white/70 capitalize">{agent.status}</span></div>
                            <div className="flex justify-between"><span className="text-white/40">Uptime</span><span className="text-white/70">99.97%</span></div>
                            <div className="flex justify-between"><span className="text-white/40">Last Run</span><span className="text-white/70">3 min ago</span></div>
                            <div className="flex justify-between"><span className="text-white/40">Avg. Latency</span><span className="text-white/70">240ms</span></div>
                            <div className="flex justify-between"><span className="text-white/40">Tasks (24h)</span><span className="text-white/70">1,284</span></div>
                          </div>
                        </div>
                      </div>
                    ),
                  })
                }
                className="w-full text-left rounded-lg border border-border-subtle bg-white/[0.02] p-4 sm:p-5 cursor-pointer hover:bg-white/[0.03] transition-all"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <BrainCircuit className="h-4 w-4 text-purple-400 shrink-0" />
                  <span className="text-[13px] font-semibold text-white/90">
                    {agent.name}
                  </span>
                  {agent.status === "active" && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-green-500 shrink-0 animate-pulse" />
                  )}
                </div>
                <p className="text-[11px] text-white/40 mb-2 leading-relaxed">
                  {agent.description}
                </p>
                <span className="text-[13px] font-mono text-green-400">
                  {agent.confidence}%
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
