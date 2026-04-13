import SectionHeader from "@/components/SectionHeader";
import StatusBadge from "@/components/StatusBadge";
import { useDashboard } from "@/DashboardContext";
import {
  agentInputs,
  agentProcessors,
  agentOutputs,
} from "@/data/mockData";
import { BrainCircuit, ArrowDown, Zap } from "lucide-react";

const cardCls =
  "bg-surface rounded-xl border border-border-subtle p-4 sm:p-6 hover:border-border-emphasis transition-all duration-200";

export default function AiAgentsPage() {
  const { addToast } = useDashboard();

  return (
    <div className="space-y-6">
      {/* ── Header + Model Training button ── */}
      <div className="flex items-start justify-between">
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

      {/* ── Info Banner ── */}
      <div className="rounded-xl border border-purple-500/20 bg-purple-500/[0.06] p-5">
        <h3 className="text-[14px] font-semibold text-purple-300 mb-1.5">
          Agentic AI Framework
        </h3>
        <p className="text-[12px] text-white/50 leading-relaxed">
          LLM-powered agents with chain-of-thought reasoning orchestrate
          autonomous decision workflows across risk assessment, supplier
          evaluation, and demand forecasting pipelines.
        </p>
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4">
        {/* Left — Agent Workflow Canvas */}
        <div className={cardCls}>
          <h3 className="text-[13px] sm:text-[14px] font-semibold text-white/80 mb-6">
            Agent Workflow Canvas
          </h3>

          <div className="flex flex-col items-center gap-4">
            {/* INPUT LAYER */}
            <div className="w-full">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/30 mb-3 text-center">
                Input Layer
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {agentInputs.map((input) => (
                  <span
                    key={input}
                    className="px-4 py-2 bg-surface-2 rounded-lg border border-border-subtle text-[12px] text-white/60"
                  >
                    {input}
                  </span>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <ArrowDown className="h-5 w-5 text-white/20" />

            {/* PROCESSING LAYER */}
            <div className="w-full">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/30 mb-3 text-center">
                Processing Layer
              </p>
              <div className="grid grid-cols-2 gap-3">
                {agentProcessors.map((proc) => (
                  <div
                    key={proc.name}
                    className="bg-surface-2 rounded-lg border border-border-subtle p-4"
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
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <ArrowDown className="h-5 w-5 text-white/20" />

            {/* OUTPUT LAYER */}
            <div className="w-full">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/30 mb-3 text-center">
                Output Layer
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {agentOutputs.map((output) => (
                  <span
                    key={output}
                    className="px-4 py-2 bg-surface-2 rounded-lg border border-border-subtle text-[12px] text-white/60"
                  >
                    {output}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — Active Agents sidebar */}
        <div className={cardCls}>
          <h3 className="text-[13px] sm:text-[14px] font-semibold text-white/80 mb-4">
            Active Agents
          </h3>
          <div className="space-y-3">
            {agentProcessors.map((agent) => (
              <div
                key={agent.name}
                className="rounded-lg border border-border-subtle bg-white/[0.02] p-3"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <BrainCircuit className="h-4 w-4 text-purple-400 shrink-0" />
                  <span className="text-[13px] font-semibold text-white/90">
                    {agent.name}
                  </span>
                  {agent.status === "active" && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-green-500 shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-white/40 mb-2 leading-relaxed">
                  {agent.description}
                </p>
                <span className="text-[13px] font-mono text-green-400">
                  {agent.confidence}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
