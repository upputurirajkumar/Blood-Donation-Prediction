import React from 'react';
import { PipelineFlowChart } from '../components/PipelineFlowChart';
import { ModelComparisonTable } from '../components/ModelComparisonTable';
import { PROJECT_METADATA, MODEL_COMPARISON_TABLE } from '../data/projectData';
import {
  Trophy,
  Cpu,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  TrendingDown,
  Sparkles,
  Layers,
  ArrowRight,
  Info,
} from 'lucide-react';

export const ModelsPage: React.FC = () => {
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Page Header */}
      <div className="border-b border-white/[0.08] pb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            MODEL ARCHITECTURE & BENCHMARKS
          </span>
          <span className="text-xs text-neutral-400 font-mono">Evaluation & Selection · PRCP-1011</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Algorithm Comparison & ML Architecture
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-3xl leading-relaxed">
          Full empirical evaluation across 7 supervised algorithms. Analyzing holdout accuracy, overfitting gaps,
          precision-recall trade-offs, and why K-Nearest Neighbors was selected for production inference.
        </p>
      </div>

      {/* Selected Model Production Spotlight */}
      <div className="bg-[#0b0d13] border-2 border-rose-500/60 rounded-xl p-6 lg:p-8 space-y-6 relative overflow-hidden shadow-xl shadow-rose-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-600 to-rose-700 text-white flex items-center justify-center shrink-0 shadow-lg shadow-rose-900/40">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
                Selected Production Engine
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight mt-0.5">
                {PROJECT_METADATA.selectedModel}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold">
              Test Accuracy: {PROJECT_METADATA.selectedModelAccuracy}
            </span>
            <span className="px-3 py-1 rounded bg-white/[0.05] border border-white/[0.08] text-neutral-300">
              k = 5 Neighbors
            </span>
            <span className="px-3 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300">
              ROC-AUC: 0.7420
            </span>
          </div>
        </div>

        {/* 3 Justification Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2 bg-[#0e1117] p-4 rounded-lg border border-white/[0.05]">
            <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Highest Holdout Accuracy
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Achieved <strong>76.47%</strong> holdout accuracy across the 85 unseen test records, outperforming
              Logistic Regression (75.29%), Random Forest (72.94%), and Decision Tree (68.24%).
            </p>
          </div>

          <div className="space-y-2 bg-[#0e1117] p-4 rounded-lg border border-white/[0.05]">
            <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-rose-400" />
              Minimal Overfitting Divergence
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Unlike tree models that scored 94.97% on training data only to collapse on testing, KNN maintained a
              tight 1.93% generalization delta (78.40% train vs 76.47% test).
            </p>
          </div>

          <div className="space-y-2 bg-[#0e1117] p-4 rounded-lg border border-white/[0.05]">
            <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Optimal Precision & F1 Balance
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Maintained the highest F1-Score (0.4118) and a strong 70.0% precision, preventing false alarms and
              protecting clinical outreach budgets.
            </p>
          </div>
        </div>

        {/* Hyperparameters & Implementation Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-[#0e1117] p-3 rounded-lg border border-white/[0.06]">
            <div className="text-[10px] font-mono text-neutral-400 font-semibold uppercase">HYPERPARAMETERS</div>
            <div className="text-sm font-bold text-white font-mono mt-0.5">k=5, p=2</div>
            <div className="text-[10px] text-neutral-400">Euclidean Distance</div>
          </div>
          <div className="bg-[#0e1117] p-3 rounded-lg border border-white/[0.06]">
            <div className="text-[10px] font-mono text-neutral-400 font-semibold uppercase">SCALING STRATEGY</div>
            <div className="text-sm font-bold text-white font-mono mt-0.5">StandardScaler</div>
            <div className="text-[10px] text-neutral-400">Zero Mean / Unit Variance</div>
          </div>
          <div className="bg-[#0e1117] p-3 rounded-lg border border-white/[0.06]">
            <div className="text-[10px] font-mono text-neutral-400 font-semibold uppercase">TRAIN COHORT</div>
            <div className="text-sm font-bold text-white font-mono mt-0.5">338 vectors</div>
            <div className="text-[10px] text-neutral-400">80% Stratified Split</div>
          </div>
          <div className="bg-[#0e1117] p-3 rounded-lg border border-white/[0.06]">
            <div className="text-[10px] font-mono text-neutral-400 font-semibold uppercase">HOLDOUT TEST</div>
            <div className="text-sm font-bold text-white font-mono mt-0.5">85 vectors</div>
            <div className="text-[10px] text-neutral-400">20% Unseen Cohort</div>
          </div>
        </div>
      </div>

      {/* Overfitting Analysis Comparison */}
      <div className="bg-[#0b0d13] border border-white/[0.08] rounded-xl p-6 space-y-6">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
            Generalization Diagnostics
          </span>
          <h2 className="text-lg font-bold text-white mt-0.5">
            Overfitting Gap: Training vs Test Accuracy Delta
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Models with large disparities between training and holdout accuracy have memorized sample noise rather than learning true donor propensity.
          </p>
        </div>

        <div className="space-y-4">
          {MODEL_COMPARISON_TABLE.slice(0, 4).map((m) => {
            const gap = (m.trainAccuracy - m.testAccuracy) * 100;
            const isSevere = gap > 15;

            return (
              <div key={m.model} className="bg-[#0e1117] p-4 rounded-lg border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-white">{m.model}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-400">Train: {(m.trainAccuracy * 100).toFixed(1)}%</span>
                    <span className="text-white font-bold">Test: {(m.testAccuracy * 100).toFixed(1)}%</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isSevere
                          ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      Gap: -{gap.toFixed(1)}% {isSevere ? '(Overfit)' : '(Robust)'}
                    </span>
                  </div>
                </div>

                <div className="h-2 w-full bg-[#12151e] rounded overflow-hidden flex">
                  <div
                    style={{ width: `${m.testAccuracy * 100}%` }}
                    className={`h-full ${m.isBest ? 'bg-rose-500' : 'bg-neutral-500'}`}
                  />
                  <div
                    style={{ width: `${gap}%` }}
                    className="h-full bg-amber-500/40 border-l border-amber-500"
                    title={`Overfitting gap: ${gap.toFixed(1)}%`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Model Benchmark Table */}
      <section className="space-y-4">
        <ModelComparisonTable />
      </section>

      {/* Sequential ML Pipeline Visualizer */}
      <section className="space-y-4">
        <PipelineFlowChart />
      </section>
    </div>
  );
};
