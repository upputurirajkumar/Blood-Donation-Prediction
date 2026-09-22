import React, { useState } from 'react';
import { MODEL_COMPARISON_TABLE } from '../data/projectData';
import { Trophy, ArrowUpDown, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ModelMetricRow } from '../types';

export const ModelComparisonTable: React.FC = () => {
  const [sortBy, setSortBy] = useState<keyof ModelMetricRow>('testAccuracy');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const handleSort = (field: keyof ModelMetricRow) => {
    if (sortBy === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(field);
      setSortAsc(false);
    }
  };

  const sortedModels = [...MODEL_COMPARISON_TABLE].sort((a, b) => {
    const valA = a[sortBy] as number;
    const valB = b[sortBy] as number;
    return sortAsc ? valA - valB : valB - valA;
  });

  return (
    <div className="bg-[#0b0d13] rounded-xl border border-white/[0.08] overflow-hidden">
      <div className="p-6 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
              Benchmark Audit
            </span>
            <span className="text-[10px] font-mono bg-white/[0.05] text-neutral-300 px-2 py-0.5 rounded border border-white/[0.07]">
              80/20 Stratified Split
            </span>
          </div>
          <h3 className="text-base font-bold text-white tracking-tight mt-1">
            Performance Matrix Across 7 Machine Learning Algorithms
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Exact empirical metrics logged during Python source execution. Click column headers to sort.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0e1117] text-neutral-400 text-[11px] font-mono uppercase tracking-wider border-b border-white/[0.06]">
            <tr>
              <th className="py-3 px-4">Algorithm Candidate</th>
              <th
                onClick={() => handleSort('testAccuracy')}
                className="py-3 px-3 text-right cursor-pointer hover:text-white"
              >
                <div className="inline-flex items-center gap-1">
                  Test Acc
                  <ArrowUpDown className="w-3 h-3 text-neutral-500" />
                </div>
              </th>
              <th
                onClick={() => handleSort('trainAccuracy')}
                className="py-3 px-3 text-right cursor-pointer hover:text-white"
              >
                <div className="inline-flex items-center gap-1">
                  Train Acc
                  <ArrowUpDown className="w-3 h-3 text-neutral-500" />
                </div>
              </th>
              <th
                onClick={() => handleSort('precision')}
                className="py-3 px-3 text-right cursor-pointer hover:text-white"
              >
                <div className="inline-flex items-center gap-1">
                  Precision
                  <ArrowUpDown className="w-3 h-3 text-neutral-500" />
                </div>
              </th>
              <th
                onClick={() => handleSort('recall')}
                className="py-3 px-3 text-right cursor-pointer hover:text-white"
              >
                <div className="inline-flex items-center gap-1">
                  Recall
                  <ArrowUpDown className="w-3 h-3 text-neutral-500" />
                </div>
              </th>
              <th
                onClick={() => handleSort('f1Score')}
                className="py-3 px-3 text-right cursor-pointer hover:text-white"
              >
                <div className="inline-flex items-center gap-1">
                  F1 Score
                  <ArrowUpDown className="w-3 h-3 text-neutral-500" />
                </div>
              </th>
              <th
                onClick={() => handleSort('rocAuc')}
                className="py-3 px-3 text-right cursor-pointer hover:text-white"
              >
                <div className="inline-flex items-center gap-1">
                  ROC-AUC
                  <ArrowUpDown className="w-3 h-3 text-neutral-500" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {sortedModels.map((m) => (
              <tr
                key={m.model}
                className={`transition-colors ${
                  m.isBest
                    ? 'bg-rose-950/25 hover:bg-rose-950/35 border-l-2 border-rose-500'
                    : 'hover:bg-white/[0.02]'
                }`}
              >
                <td className="py-3.5 px-4 text-white">
                  <div className="flex items-center gap-2">
                    {m.isBest && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider bg-rose-600 text-white px-1.5 py-0.5 rounded">
                        <Trophy className="w-2.5 h-2.5" /> Best Model
                      </span>
                    )}
                    <span className="font-semibold text-sm">{m.model}</span>
                  </div>
                  {m.notes && (
                    <div className="text-[11px] text-neutral-400 font-normal mt-0.5 max-w-xl leading-normal">
                      {m.notes}
                    </div>
                  )}
                </td>
                <td className="py-3.5 px-3 text-right font-mono font-bold text-white text-sm">
                  {(m.testAccuracy * 100).toFixed(2)}%
                </td>
                <td className="py-3.5 px-3 text-right font-mono text-neutral-400">
                  {(m.trainAccuracy * 100).toFixed(2)}%
                </td>
                <td className="py-3.5 px-3 text-right font-mono text-neutral-300">
                  {m.precision.toFixed(4)}
                </td>
                <td className="py-3.5 px-3 text-right font-mono text-neutral-300">
                  {m.recall.toFixed(4)}
                </td>
                <td className="py-3.5 px-3 text-right font-mono font-bold text-emerald-400">
                  {m.f1Score.toFixed(4)}
                </td>
                <td className="py-3.5 px-3 text-right font-mono text-neutral-300">
                  {m.rocAuc.toFixed(4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-[#0e1117] border-t border-white/[0.06] text-xs text-neutral-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-neutral-200">Overfitting Audit:</strong> Decision Tree (94.97% train vs 68.24% test) and Random Forest (94.97% train vs 72.94% test) suffered memorization penalty. KNN delivered the tightest generalization gap (78.40% train vs 76.47% test).
          </span>
        </div>
      </div>
    </div>
  );
};

