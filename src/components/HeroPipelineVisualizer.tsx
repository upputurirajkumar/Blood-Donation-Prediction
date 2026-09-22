import React, { useState } from 'react';
import { Database, Filter, Cpu, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export const HeroPipelineVisualizer: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(2);

  const stages = [
    {
      step: '01',
      title: 'Donor History',
      subtitle: 'RFM Raw Input Vector',
      icon: Database,
      items: [
        { label: 'Recency', value: '2 mos', detail: 'Last donation' },
        { label: 'Frequency', value: '16x', detail: 'Total donations' },
        { label: 'Monetary', value: '4,000 cc', detail: 'Blood volume' },
        { label: 'Time', value: '35 mos', detail: 'First donation' },
      ],
      badge: 'Raw Variables',
    },
    {
      step: '02',
      title: 'Feature Scaling',
      subtitle: 'StandardScaler Transform',
      icon: Filter,
      items: [
        { label: 'z₁ (Recency)', value: '-0.863', detail: 'μ=9.51, σ=8.70' },
        { label: 'z₂ (Frequency)', value: '+1.424', detail: 'μ=6.81, σ=6.45' },
        { label: 'z₃ (Volume)', value: '+1.424', detail: 'μ=1703, σ=1612' },
        { label: 'z₄ (Longevity)', value: '-0.304', detail: 'μ=42.29, σ=23.99' },
      ],
      badge: 'Standardized',
    },
    {
      step: '03',
      title: 'KNN Classification',
      subtitle: 'k=5 Euclidean Space',
      icon: Cpu,
      items: [
        { label: 'Distance Metric', value: 'Euclidean', detail: 'L2 norm in 4D' },
        { label: 'Search Space', value: '338 vectors', detail: 'Training split' },
        { label: 'Nearest Pool', value: '4 of 5 positive', detail: 'Class 1 votes' },
        { label: 'Probability', value: '80.0%', detail: 'Voting ratio' },
      ],
      badge: 'Decision Engine',
    },
    {
      step: '04',
      title: 'Prediction Output',
      subtitle: 'Propensity & Action',
      icon: CheckCircle,
      items: [
        { label: 'Target', value: 'March 2007', detail: 'Donation status' },
        { label: 'Classification', value: 'Class 1 (Yes)', detail: 'Likely to Donate' },
        { label: 'Confidence', value: '80% (High)', detail: 'Ensemble consensus' },
        { label: 'Campaign Action', value: 'Priority Outreach', detail: 'Send reminder' },
      ],
      badge: 'Actionable',
    },
  ];

  return (
    <div className="w-full bg-[#0b0d13] rounded-xl border border-white/[0.08] p-6 lg:p-8">
      {/* Visual Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
              Interactive Execution Pipeline
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Click any step to inspect mathematical vector transformations from raw donor inputs to decision consensus.
          </p>
        </div>
        <div className="flex items-center gap-1 bg-[#0e1117] p-1 rounded-lg border border-white/[0.06] self-start sm:self-auto">
          {stages.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setActiveStage(idx)}
              className={`px-3 py-1 text-xs font-mono font-semibold rounded-md transition-all cursor-pointer ${
                activeStage === idx
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Step {s.step}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Connected Pipeline Flow Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = activeStage === idx;
          return (
            <div
              key={stage.step}
              onClick={() => setActiveStage(idx)}
              className={`relative rounded-xl p-4 transition-all cursor-pointer border ${
                isActive
                  ? 'bg-rose-950/40 border-rose-500 shadow-md shadow-rose-950/40 ring-1 ring-rose-500/40'
                  : 'bg-[#0e1117] border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-xs font-mono font-bold ${
                    isActive ? 'text-rose-400' : 'text-neutral-500'
                  }`}
                >
                  {stage.step}
                </span>
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-semibold ${
                    isActive ? 'bg-rose-500/20 text-rose-300' : 'bg-white/[0.05] text-neutral-400'
                  }`}
                >
                  {stage.badge}
                </span>
              </div>

              <div className="flex items-center gap-2.5 mb-1.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isActive ? 'bg-rose-600 text-white' : 'bg-white/[0.06] text-neutral-400'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-sm font-bold font-mono text-white">{stage.title}</h4>
              </div>

              <p className="text-xs text-neutral-400 truncate">{stage.subtitle}</p>

              {/* Connecting arrow indicator for desktop */}
              {idx < stages.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-neutral-600 pointer-events-none">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Deep Dive Expanded Card of Selected Stage */}
      <div className="bg-[#0e1117] rounded-xl p-5 border border-white/[0.06]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Stage {stages[activeStage].step} Payload Inspection: {stages[activeStage].title}
            </h5>
          </div>
          <span className="text-xs text-neutral-400 font-mono">
            {stages[activeStage].subtitle}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stages[activeStage].items.map((item) => (
            <div
              key={item.label}
              className="bg-[#12151e] rounded-lg p-3 border border-white/[0.04]"
            >
              <div className="text-[10px] font-mono text-neutral-500 uppercase">{item.label}</div>
              <div className="text-sm font-bold font-mono text-white mt-0.5">{item.value}</div>
              <div className="text-[10px] font-mono text-neutral-400 mt-1 truncate">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

