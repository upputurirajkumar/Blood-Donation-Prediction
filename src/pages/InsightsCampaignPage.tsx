import React, { useState } from 'react';
import { ConfusionMatrixVisualizer } from '../components/ConfusionMatrixVisualizer';
import {
  CAMPAIGN_STRATEGIES,
  ROC_CURVE_DATA,
  PROJECT_METADATA,
} from '../data/projectData';
import {
  Send,
  Calendar,
  AlertCircle,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface RocModelInfo {
  id: string;
  name: string;
  auc: number;
  tprKey: 'tprKnn' | 'tprLogReg' | 'tprRandomForest' | 'tprTree';
  color: string;
}

const ROC_MODELS: RocModelInfo[] = [
  { id: 'knn', name: 'K-Nearest Neighbors', auc: 0.7420, tprKey: 'tprKnn', color: '#e11d48' },
  { id: 'logreg', name: 'Logistic Regression', auc: 0.7580, tprKey: 'tprLogReg', color: '#3b82f6' },
  { id: 'rf', name: 'Random Forest', auc: 0.7180, tprKey: 'tprRandomForest', color: '#10b981' },
  { id: 'dt', name: 'Decision Tree', auc: 0.6010, tprKey: 'tprTree', color: '#f59e0b' },
];

export const InsightsCampaignPage: React.FC = () => {
  const [selectedTierIdx, setSelectedTierIdx] = useState<number>(0);
  const [selectedModelId, setSelectedModelId] = useState<string>('knn');

  const activeStrategy = CAMPAIGN_STRATEGIES[selectedTierIdx] || CAMPAIGN_STRATEGIES[0];
  const activeModel = ROC_MODELS.find((m) => m.id === selectedModelId) || ROC_MODELS[0];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            TRANSLATIONAL CLINICAL INTELLIGENCE
          </span>
          <span className="text-xs text-neutral-400 font-mono">Operations & Strategic Interventions</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Campaign Strategy & Model Diagnostics
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-3xl leading-relaxed">
          Operationalizing machine learning insights into targeted donor outreach tiers, discrimination curve analysis,
          and clinical inventory stabilization workflows.
        </p>
      </div>

      {/* 4-Tier Operational Campaign Strategy Matrix */}
      <div className="bg-[#0b0d13] border border-white/[0.08] rounded-xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
              Operational Outreach Framework
            </span>
            <h2 className="text-lg font-bold text-white mt-0.5">
              4-Tier Donor Mobilization Matrix
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Derived from empirical RFMTC behavior patterns to optimize hospital blood bank outreach ROI.
            </p>
          </div>

          {/* Tier Selector Buttons */}
          <div className="flex flex-wrap gap-1 bg-[#0e1117] p-1 rounded-lg border border-white/[0.06]">
            {CAMPAIGN_STRATEGIES.map((strat, idx) => (
              <button
                key={strat.tier}
                onClick={() => setSelectedTierIdx(idx)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all cursor-pointer ${
                  selectedTierIdx === idx
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {strat.tier.split(':')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Tier Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0e1117] p-5 rounded-xl border border-white/[0.06]">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {activeStrategy.tier.split(':')[0].toUpperCase()}
              </span>
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                {activeStrategy.predictedLikelihood}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white font-mono">{activeStrategy.tier}</h3>
            
            <div className="bg-[#12151e] p-3 rounded-lg border border-white/[0.04] text-xs font-mono text-neutral-300 space-y-1">
              <span className="text-neutral-500 block text-[10px]">COHORT CRITERIA:</span>
              <span className="font-semibold text-rose-300 block">{activeStrategy.criteria}</span>
              <span className="text-neutral-400 text-[11px] block mt-1">Signal: {activeStrategy.signal}</span>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-neutral-500 font-mono text-[10px] block">RECOMMENDED ACTION & TIMING:</span>
              <span className="text-neutral-200 font-mono font-medium block">{activeStrategy.recommendedAction}</span>
              <span className="text-neutral-400 font-mono text-[11px] block">Timing: {activeStrategy.timing}</span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400">
                Intervention Rationale & Operational Directive
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {activeStrategy.businessRationale}
              </p>
            </div>

            {/* Campaign Action Simulation Preview */}
            <div className="bg-[#07080b] p-4 rounded-lg border border-white/[0.08] flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-neutral-400">Target Segment Action</span>
                <div className="text-xs font-mono text-rose-400">
                  {activeStrategy.tier} ({activeStrategy.predictedLikelihood})
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-rose-600/20 border border-rose-500/30 text-rose-300 text-xs font-mono font-medium flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                Workflow Integrated
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confusion Matrix Diagnostic Visualizer */}
      <section className="space-y-4">
        <ConfusionMatrixVisualizer />
      </section>

      {/* ROC Curves Multi-Model Discrimination Analysis */}
      <div className="bg-[#0b0d13] border border-white/[0.08] rounded-xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
              Receiver Operating Characteristic
            </span>
            <h2 className="text-lg font-bold text-white mt-0.5">
              Empirical ROC Curve & Discrimination Comparison
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Comparing True Positive Rate (Sensitivity) vs False Positive Rate across decision thresholds.
            </p>
          </div>

          {/* Model Selector */}
          <div className="flex flex-wrap gap-1 bg-[#0e1117] p-1 rounded-lg border border-white/[0.06]">
            {ROC_MODELS.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedModelId(m.id)}
                className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                  selectedModelId === m.id
                    ? 'bg-rose-600 text-white font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {m.name} (AUC: {m.auc.toFixed(3)})
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* SVG ROC Plot */}
          <div className="lg:col-span-7 bg-[#0e1117] p-4 rounded-xl border border-white/[0.06] flex flex-col items-center">
            <div className="w-full max-w-sm aspect-square relative">
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                {/* Grid lines */}
                {[0.2, 0.4, 0.6, 0.8, 1.0].map((v) => (
                  <g key={v}>
                    <line
                      x1={v * 100}
                      y1="0"
                      x2={v * 100}
                      y2="100"
                      stroke="rgba(255,255,255,0.05)"
                      strokeDasharray="2,2"
                    />
                    <line
                      x1="0"
                      y1={100 - v * 100}
                      x2="100"
                      y2={100 - v * 100}
                      stroke="rgba(255,255,255,0.05)"
                      strokeDasharray="2,2"
                    />
                  </g>
                ))}

                {/* Diagonal random chance line */}
                <line
                  x1="0"
                  y1="100"
                  x2="100"
                  y2="0"
                  stroke="rgba(255,255,255,0.2)"
                  strokeDasharray="3,3"
                  strokeWidth="1"
                />

                {/* ROC curve path */}
                <path
                  d={ROC_CURVE_DATA.reduce((acc: string, pt, idx: number) => {
                    const x = pt.fpr * 100;
                    const tprVal = pt[activeModel.tprKey];
                    const y = 100 - tprVal * 100;
                    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
                  }, '')}
                  fill="none"
                  stroke={activeModel.color}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Area under curve fill */}
                <path
                  d={`${ROC_CURVE_DATA.reduce((acc: string, pt, idx: number) => {
                    const x = pt.fpr * 100;
                    const tprVal = pt[activeModel.tprKey];
                    const y = 100 - tprVal * 100;
                    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
                  }, '')} L 100 100 L 0 100 Z`}
                  fill="rgba(225, 29, 72, 0.12)"
                />

                {/* Data points */}
                {ROC_CURVE_DATA.map((pt, i: number) => (
                  <circle
                    key={i}
                    cx={pt.fpr * 100}
                    cy={100 - pt[activeModel.tprKey] * 100}
                    r="2"
                    fill="#ffffff"
                    stroke={activeModel.color}
                    strokeWidth="1"
                  />
                ))}
              </svg>

              {/* Axis labels */}
              <div className="absolute -bottom-6 left-0 right-0 text-center font-mono text-[10px] text-neutral-400">
                False Positive Rate (1 - Specificity)
              </div>
              <div className="absolute -left-7 top-1/2 -translate-y-1/2 -rotate-90 font-mono text-[10px] text-neutral-400">
                True Positive Rate
              </div>
            </div>
          </div>

          {/* Model ROC Interpretation */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#0e1117] p-4 rounded-xl border border-white/[0.06]">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <span className="font-mono text-sm font-bold text-white">{activeModel.name}</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                  AUC = {activeModel.auc.toFixed(4)}
                </span>
              </div>
              <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
                {activeModel.id === 'knn'
                  ? 'With an empirical AUC of 0.7420, KNN demonstrates solid discriminatory power on holdout donors. It strikes an optimal trade-off between sensitivity and false alarm prevention, achieving a 70.0% precision rate at the standard 0.5 decision threshold.'
                  : activeModel.id === 'logreg'
                  ? 'Logistic Regression achieved a slightly higher numerical AUC (0.7580) due to smooth probability calibration, but yielded lower test classification accuracy (75.29% vs 76.47%) and poorer positive recall.'
                  : activeModel.id === 'rf'
                  ? 'Random Forest attained an AUC of 0.7180. While the ensemble smoothed out some decision boundaries, it suffered from training set memorization (94.97% train accuracy vs 72.94% test).'
                  : 'Decision Tree suffered severe overfitting (94.97% train vs 68.24% test), yielding an AUC of only 0.6010 on unseen test donors.'}
              </p>
            </div>

            <div className="bg-rose-950/20 border border-rose-500/20 rounded-lg p-3 text-xs text-neutral-300">
              <span className="font-mono font-bold text-rose-400 block mb-1">
                Threshold Recommendation:
              </span>
              In whole-blood shortage emergencies, the decision threshold can be lowered from 0.50 to 0.35 to increase
              sensitivity (capturing more donors at the expense of a slightly higher outreach cost).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
