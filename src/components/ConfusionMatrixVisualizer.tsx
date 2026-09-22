import React, { useState } from 'react';
import { KNN_CONFUSION_MATRIX } from '../data/projectData';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ConfusionMatrixVisualizer: React.FC = () => {
  const { trueNegatives, falsePositives, falseNegatives, truePositives, totalTest } = KNN_CONFUSION_MATRIX;
  const [activeCell, setActiveCell] = useState<'TN' | 'FP' | 'FN' | 'TP'>('TN');

  const accuracy = ((trueNegatives + truePositives) / totalTest) * 100;
  const precision = (truePositives / (truePositives + falsePositives)) * 100;
  const recall = (truePositives / (truePositives + falseNegatives)) * 100;
  const specificity = (trueNegatives / (trueNegatives + falsePositives)) * 100;

  const cellDetails = {
    TN: {
      title: 'True Negative (TN = 58)',
      category: 'Correct Inactive Prediction',
      desc: 'Donors correctly classified as non-donors. Represents 68.2% of the test cohort. Demonstrates the model is exceptionally reliable at not spamming non-donors.',
      rate: `${specificity.toFixed(1)}% Specificity`,
    },
    FP: {
      title: 'False Positive (FP = 3)',
      category: 'Type I Error (False Alarm)',
      desc: 'Only 3 non-donors were incorrectly flagged as likely to donate. Exceptionally low Type I error rate (3 out of 61 non-donors = 4.9%), preserving campaign budget.',
      rate: '4.9% False Positive Rate',
    },
    FN: {
      title: 'False Negative (FN = 17)',
      category: 'Type II Error (Missed Opportunity)',
      desc: '17 donors who actually donated were predicted not to donate. Driven by the class imbalance (27.9% positive class). Indicates conservative prediction behavior.',
      rate: `${(100 - recall).toFixed(1)}% Miss Rate`,
    },
    TP: {
      title: 'True Positive (TP = 7)',
      category: 'Correct Repeat Donor Hit',
      desc: '7 repeat donors captured with 70.0% precision. When the model predicts positive, it is correct 7 out of 10 times.',
      rate: `${precision.toFixed(1)}% Precision`,
    },
  };

  return (
    <div className="bg-[#0b0d13] rounded-xl border border-white/[0.08] p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.08]">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
            Classification Performance Diagnostics
          </span>
          <h3 className="text-base font-bold text-white tracking-tight mt-0.5">
            Confusion Matrix — K-Nearest Neighbors (k=5)
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Holdout evaluation on 85 test records from the 20% stratified test set. Click quadrants to inspect.
          </p>
        </div>
        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-white/[0.05] text-neutral-300 border border-white/[0.08] self-start sm:self-auto">
          N = {totalTest} Test Records
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* 2x2 Matrix Grid */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {/* Header Row */}
            <div className="p-2 font-mono text-[11px] text-neutral-500 flex items-center justify-center">
              Actual \ Predicted
            </div>
            <div className="p-2 font-mono font-bold text-neutral-300 bg-[#0e1117] border border-white/[0.06] rounded">
              Predicted: No (0)
            </div>
            <div className="p-2 font-mono font-bold text-neutral-300 bg-[#0e1117] border border-white/[0.06] rounded">
              Predicted: Yes (1)
            </div>

            {/* Actual 0 Row */}
            <div className="flex items-center justify-center font-mono font-semibold text-neutral-400 bg-[#0e1117] border border-white/[0.06] rounded p-2 text-left">
              Actual: No (0)
            </div>

            {/* True Negative Cell */}
            <div
              onClick={() => setActiveCell('TN')}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center ${
                activeCell === 'TN'
                  ? 'bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-950/40 ring-1 ring-emerald-500/50'
                  : 'bg-emerald-950/20 border-emerald-500/20 hover:bg-emerald-950/30'
              }`}
            >
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                True Negative (TN)
              </span>
              <span className="text-2xl font-black text-white font-mono mt-0.5">
                {trueNegatives}
              </span>
              <span className="text-[10px] font-mono text-emerald-400/80 mt-0.5 font-medium">
                68.2% of holdout
              </span>
            </div>

            {/* False Positive Cell */}
            <div
              onClick={() => setActiveCell('FP')}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center ${
                activeCell === 'FP'
                  ? 'bg-amber-950/40 border-amber-500 shadow-md shadow-amber-950/40 ring-1 ring-amber-500/50'
                  : 'bg-amber-950/20 border-amber-500/20 hover:bg-amber-950/30'
              }`}
            >
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                False Positive (FP)
              </span>
              <span className="text-2xl font-black text-white font-mono mt-0.5">
                {falsePositives}
              </span>
              <span className="text-[10px] font-mono text-amber-400/80 mt-0.5 font-medium">
                Type I (Only 3)
              </span>
            </div>

            {/* Actual 1 Row */}
            <div className="flex items-center justify-center font-mono font-semibold text-neutral-400 bg-[#0e1117] border border-white/[0.06] rounded p-2 text-left">
              Actual: Yes (1)
            </div>

            {/* False Negative Cell */}
            <div
              onClick={() => setActiveCell('FN')}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center ${
                activeCell === 'FN'
                  ? 'bg-rose-950/40 border-rose-500 shadow-md shadow-rose-950/40 ring-1 ring-rose-500/50'
                  : 'bg-rose-950/20 border-rose-500/20 hover:bg-rose-950/30'
              }`}
            >
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400">
                False Negative (FN)
              </span>
              <span className="text-2xl font-black text-white font-mono mt-0.5">
                {falseNegatives}
              </span>
              <span className="text-[10px] font-mono text-rose-400/80 mt-0.5 font-medium">
                Type II (Misses)
              </span>
            </div>

            {/* True Positive Cell */}
            <div
              onClick={() => setActiveCell('TP')}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center ${
                activeCell === 'TP'
                  ? 'bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-950/40 ring-1 ring-emerald-500/50'
                  : 'bg-emerald-950/20 border-emerald-500/20 hover:bg-emerald-950/30'
              }`}
            >
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                True Positive (TP)
              </span>
              <span className="text-2xl font-black text-white font-mono mt-0.5">
                {truePositives}
              </span>
              <span className="text-[10px] font-mono text-emerald-400/80 mt-0.5 font-medium">
                70% Precision
              </span>
            </div>
          </div>
        </div>

        {/* Selected Quadrant Inspector */}
        <div className="lg:col-span-5 bg-[#0e1117] border border-white/[0.08] rounded-xl p-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <span className="text-xs font-mono font-bold text-white">
              {cellDetails[activeCell].title}
            </span>
            <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
              {cellDetails[activeCell].rate}
            </span>
          </div>

          <div className="mt-3 space-y-2 text-xs">
            <span className="text-[11px] font-mono text-neutral-400 block font-semibold">
              Category: {cellDetails[activeCell].category}
            </span>
            <p className="text-neutral-300 leading-relaxed text-xs">
              {cellDetails[activeCell].desc}
            </p>
          </div>
        </div>
      </div>

      {/* Derived Metric Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="bg-[#0e1117] p-3 rounded-lg border border-white/[0.06]">
          <div className="text-[10px] font-mono text-neutral-500 uppercase">Test Accuracy</div>
          <div className="text-base font-bold text-white font-mono mt-0.5">
            {accuracy.toFixed(2)}%
          </div>
          <div className="text-[10px] text-neutral-500 font-mono">(TN+TP) / 85</div>
        </div>
        <div className="bg-[#0e1117] p-3 rounded-lg border border-white/[0.06]">
          <div className="text-[10px] font-mono text-neutral-500 uppercase">Precision</div>
          <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
            {precision.toFixed(1)}%
          </div>
          <div className="text-[10px] text-neutral-500 font-mono">TP / (TP+FP) = 7/10</div>
        </div>
        <div className="bg-[#0e1117] p-3 rounded-lg border border-white/[0.06]">
          <div className="text-[10px] font-mono text-neutral-500 uppercase">Specificity</div>
          <div className="text-base font-bold text-white font-mono mt-0.5">
            {specificity.toFixed(1)}%
          </div>
          <div className="text-[10px] text-neutral-500 font-mono">TN / (TN+FP) = 58/61</div>
        </div>
        <div className="bg-[#0e1117] p-3 rounded-lg border border-white/[0.06]">
          <div className="text-[10px] font-mono text-neutral-500 uppercase">Recall (Sensitivity)</div>
          <div className="text-base font-bold text-white font-mono mt-0.5">
            {recall.toFixed(1)}%
          </div>
          <div className="text-[10px] text-neutral-500 font-mono">TP / (TP+FN) = 7/24</div>
        </div>
      </div>
    </div>
  );
};

