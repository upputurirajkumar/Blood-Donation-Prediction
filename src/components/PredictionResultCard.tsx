import React from 'react';
import { PredictionState } from '../types';
import { KnnNeighborhoodVisualizer } from './KnnNeighborhoodVisualizer';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Cpu,
  Layers,
  HelpCircle,
  RotateCw,
  TrendingUp,
  Activity,
} from 'lucide-react';

interface PredictionResultCardProps {
  state: PredictionState;
  onRetry?: () => void;
  onReconnect?: () => void;
}

export const PredictionResultCard: React.FC<PredictionResultCardProps> = ({
  state,
  onRetry,
  onReconnect,
}) => {
  // State 1: Initial State
  if (state.status === 'idle') {
    return (
      <div className="h-full min-h-[440px] bg-[#0b0d13] rounded-xl border border-dashed border-white/[0.12] p-8 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-400 mb-4">
          <Activity className="w-6 h-6 stroke-[1.8]" />
        </div>
        <h3 className="text-lg font-bold font-mono text-white tracking-tight">Inference Engine Ready</h3>
        <p className="text-xs text-neutral-400 max-w-sm mt-1 leading-relaxed">
          Provide the donor's historical RFMTC activity in the vector ingestion form and click{' '}
          <strong className="text-rose-400 font-mono font-semibold">Run Prediction Engine</strong> to
          execute inference across the 338 standardized training vectors.
        </p>
        <div className="mt-6 flex items-center gap-2 text-[11px] font-mono text-neutral-400 bg-[#0e1117] px-3 py-1.5 rounded-full border border-white/[0.06]">
          <Cpu className="w-3.5 h-3.5 text-rose-400" />
          Engine: KNN (k=5) • Scaler: StandardScaler • Metric: L2 Euclidean
        </div>
      </div>
    );
  }

  // State 2: Loading State
  if (state.status === 'loading') {
    return (
      <div className="h-full min-h-[440px] bg-[#0b0d13] rounded-xl border border-white/[0.08] p-8 flex flex-col items-center justify-center text-center">
        <div className="relative mb-5">
          <div className="w-14 h-14 rounded-full border-2 border-rose-500/20 border-t-rose-500 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-rose-400">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
        </div>
        <h3 className="text-base font-bold font-mono text-white tracking-tight">
          Computing Euclidean Vector Distances...
        </h3>
        <p className="text-xs text-neutral-400 mt-1 max-w-xs">
          Applying StandardScaler transformation and searching 4D space across 338 training records...
        </p>
        <div className="mt-6 space-y-1.5 w-52 text-left">
          <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
            <span>Standardizing Input Vector</span>
            <span className="text-emerald-400 font-bold">Done</span>
          </div>
          <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
            <span>Evaluating k=5 Neighbors</span>
            <span className="text-rose-400 animate-pulse font-bold">In Progress</span>
          </div>
        </div>
      </div>
    );
  }

  // State 5: Model Unavailable State
  if (state.status === 'unavailable') {
    return (
      <div className="h-full min-h-[440px] bg-[#0b0d13] rounded-xl border border-amber-500/40 p-8 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold font-mono text-white tracking-tight">
          Prediction Model Is Disconnected
        </h3>
        <p className="text-xs text-neutral-400 max-w-sm mt-2 leading-relaxed">
          {state.message ||
            'The machine learning service is currently disconnected. In accordance with clinical data ethics, the system refuses to invent synthetic random predictions.'}
        </p>

        {onReconnect && (
          <button
            onClick={onReconnect}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono font-bold shadow-md transition-all cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            Reconnect ML Service
          </button>
        )}
      </div>
    );
  }

  // State 4: Error State
  if (state.status === 'error') {
    return (
      <div className="h-full min-h-[440px] bg-[#0b0d13] rounded-xl border border-rose-500/40 p-8 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
          <XCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold font-mono text-white tracking-tight">
          Inference Computation Error
        </h3>
        <p className="text-xs text-rose-300 max-w-sm mt-2 font-mono">
          {state.message}
        </p>
        {state.details && (
          <p className="text-[11px] text-neutral-400 max-w-sm mt-1 font-mono bg-[#0e1117] p-2 rounded border border-white/[0.06]">
            {state.details}
          </p>
        )}

        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/[0.08] hover:bg-white/[0.12] text-white text-xs font-mono font-semibold transition-all cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            Retry Inference
          </button>
        )}
      </div>
    );
  }

  // State 3: Success State
  const { data } = state;
  const isLikely = data.isLikely;

  return (
    <div className="bg-[#0b0d13] rounded-xl border border-white/[0.08] p-6 lg:p-8 space-y-6">
      {/* Result Status Banner */}
      <div
        className={`rounded-xl p-5 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          isLikely
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100 shadow-lg shadow-emerald-950/20'
            : 'bg-[#0e1117] border-white/[0.08] text-neutral-200'
        }`}
      >
        <div className="flex items-start gap-3.5">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isLikely ? 'bg-emerald-600 text-white' : 'bg-white/[0.08] text-neutral-400'
            }`}
          >
            {isLikely ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : (
              <Clock className="w-6 h-6" />
            )}
          </div>
          <div>
            <div className="text-[10px] font-mono font-semibold uppercase tracking-wider opacity-75">
              TARGET: MARCH 2007 DONATION
            </div>
            <div className="text-xl font-black font-mono tracking-tight mt-0.5">
              {isLikely ? 'Likely to Donate Blood (Class 1)' : 'Unlikely to Donate Blood (Class 0)'}
            </div>
            <div className="text-xs mt-1 font-mono opacity-90">
              Algorithm: <span className="font-bold text-white">{data.modelName}</span> (k={data.kNeighbors})
            </div>
          </div>
        </div>

        {/* Probability Metric Pill */}
        <div className="sm:text-right bg-[#12151e] px-4 py-2.5 rounded-lg border border-white/[0.08]">
          <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-400">
            Probability
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {(data.probability * 100).toFixed(1)}%
          </div>
          <div className="text-[10px] font-mono text-neutral-400">
            {data.positiveVotesCount} of {data.kNeighbors} votes positive
          </div>
        </div>
      </div>

      {/* Interactive 2D KNN Neighborhood Visualizer */}
      <KnnNeighborhoodVisualizer
        currentDonor={data.inputSummary}
        nearestNeighbors={data.nearestNeighbors}
        k={data.kNeighbors}
        positiveVotes={data.positiveVotesCount}
        negativeVotes={data.negativeVotesCount}
        isLikely={data.isLikely}
        probability={data.probability}
      />

      {/* Input Summary & Scaled Vector Table */}
      <div>
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          Standardized 4D Feature Vector
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="bg-[#0e1117] p-3 rounded-lg border border-white/[0.06]">
            <div className="text-[10px] font-mono text-neutral-500 uppercase">Recency</div>
            <div className="text-sm font-bold font-mono text-white mt-0.5">
              {data.inputSummary.monthsSinceLastDonation} mos
            </div>
            <div className="text-[10px] font-mono text-neutral-400 mt-0.5">
              z = {data.scaledInput.monthsSinceLastDonation}
            </div>
          </div>

          <div className="bg-[#0e1117] p-3 rounded-lg border border-white/[0.06]">
            <div className="text-[10px] font-mono text-neutral-500 uppercase">Frequency</div>
            <div className="text-sm font-bold font-mono text-white mt-0.5">
              {data.inputSummary.numberOfDonations} donations
            </div>
            <div className="text-[10px] font-mono text-neutral-400 mt-0.5">
              z = {data.scaledInput.numberOfDonations}
            </div>
          </div>

          <div className="bg-[#0e1117] p-3 rounded-lg border border-white/[0.06]">
            <div className="text-[10px] font-mono text-neutral-500 uppercase">Volume</div>
            <div className="text-sm font-bold font-mono text-white mt-0.5">
              {data.inputSummary.totalVolumeDonated} c.c.
            </div>
            <div className="text-[10px] font-mono text-neutral-400 mt-0.5">
              z = {data.scaledInput.totalVolumeDonated}
            </div>
          </div>

          <div className="bg-[#0e1117] p-3 rounded-lg border border-white/[0.06]">
            <div className="text-[10px] font-mono text-neutral-500 uppercase">Longevity</div>
            <div className="text-sm font-bold font-mono text-white mt-0.5">
              {data.inputSummary.monthsSinceFirstDonation} mos
            </div>
            <div className="text-[10px] font-mono text-neutral-400 mt-0.5">
              z = {data.scaledInput.monthsSinceFirstDonation}
            </div>
          </div>
        </div>
      </div>

      {/* Nearest Neighbors Breakdown */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            Top 5 Nearest Historical Training Neighbors
          </h4>
          <span className="text-[10px] text-neutral-400 font-mono">Metric: L2 Euclidean (4D)</span>
        </div>
        <div className="overflow-x-auto rounded-lg border border-white/[0.08]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0e1117] text-neutral-400 font-mono font-semibold border-b border-white/[0.08]">
              <tr>
                <th className="py-2.5 px-3">Neighbor</th>
                <th className="py-2.5 px-3">Distance</th>
                <th className="py-2.5 px-3">Recency</th>
                <th className="py-2.5 px-3">Donations</th>
                <th className="py-2.5 px-3">First Don.</th>
                <th className="py-2.5 px-3 text-right">Target Label</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {data.nearestNeighbors.map((nb, i) => (
                <tr key={nb.index} className="hover:bg-white/[0.02] font-mono">
                  <td className="py-2 px-3 font-semibold text-white">#{i + 1}</td>
                  <td className="py-2 px-3 text-neutral-300">{nb.distance.toFixed(3)}</td>
                  <td className="py-2 px-3 text-neutral-300">{nb.monthsSinceLastDonation}m</td>
                  <td className="py-2 px-3 text-neutral-300">{nb.numberOfDonations}x</td>
                  <td className="py-2 px-3 text-neutral-300">{nb.monthsSinceFirstDonation}m</td>
                  <td className="py-2 px-3 text-right">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        nb.label === 1
                          ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                          : 'bg-white/[0.05] border border-white/[0.08] text-neutral-400'
                      }`}
                    >
                      {nb.label === 1 ? 'Donated (1)' : 'No Donation (0)'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interpretability & Operational Note */}
      <div className="p-4 rounded-xl bg-[#0e1117] border border-white/[0.06] text-xs space-y-2">
        <div className="font-mono font-semibold text-white flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
          Model Interpretation & Campaign Relevance
        </div>
        <p className="text-neutral-400 leading-relaxed">
          {data.interpretation.summaryNotes}
        </p>
        <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono">
          <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-neutral-300">
            Recency Impact: <strong className="capitalize text-white">{data.interpretation.recencyImpact}</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-neutral-300">
            Frequency Impact: <strong className="capitalize text-white">{data.interpretation.frequencyImpact}</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-neutral-300">
            Latency: <strong className="text-rose-400">{data.latencyMs}ms</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
