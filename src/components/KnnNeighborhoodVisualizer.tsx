import React, { useState } from 'react';
import { NearestNeighborInfo, DonorInput } from '../types';
import { ShieldCheck, User, Sparkles, Info, Activity } from 'lucide-react';

interface KnnNeighborhoodVisualizerProps {
  currentDonor: DonorInput;
  nearestNeighbors: NearestNeighborInfo[];
  k: number;
  positiveVotes: number;
  negativeVotes: number;
  isLikely: boolean;
  probability: number;
}

export const KnnNeighborhoodVisualizer: React.FC<KnnNeighborhoodVisualizerProps> = ({
  currentDonor,
  nearestNeighbors,
  k = 5,
  positiveVotes,
  negativeVotes,
  isLikely,
  probability,
}) => {
  const [selectedNeighbor, setSelectedNeighbor] = useState<NearestNeighborInfo | null>(
    nearestNeighbors && nearestNeighbors.length > 0 ? nearestNeighbors[0] : null
  );

  // Layout coordinates for 5 neighbors around center (200, 160)
  // Distance will modulate the radius slightly
  const centerX = 200;
  const centerY = 150;

  // Angles for 5 nodes: -90, -18, 54, 126, 198 (evenly spaced 72 deg)
  const angles = [-90, -18, 54, 126, 198];

  const neighborsWithCoords = nearestNeighbors.map((neighbor, index) => {
    const angleRad = (angles[index % angles.length] * Math.PI) / 180;
    // Map distance [0.2, 2.5] to radius [75, 115]
    const clampedDist = Math.max(0.2, Math.min(2.5, neighbor.distance || 0.8));
    const radius = 70 + (clampedDist / 2.5) * 45;
    const x = centerX + radius * Math.cos(angleRad);
    const y = centerY + radius * Math.sin(angleRad);
    return {
      ...neighbor,
      x,
      y,
      radius,
    };
  });

  return (
    <div className="bg-[#0b0d13] border border-white/[0.08] rounded-xl p-5 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300">
              KNN Feature-Space Neighborhood (k={k})
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-neutral-400 border border-white/[0.07]">
              Euclidean Metric
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            Click any neighboring donor node to inspect their historical profile in standardized feature space.
          </p>
        </div>

        {/* Vote badge summary */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{positiveVotes} Re-Donated</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900 border border-white/[0.08] text-neutral-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-neutral-500" />
            <span>{negativeVotes} Did Not</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* SVG Visualization Canvas */}
        <div className="lg:col-span-7 flex justify-center items-center bg-[#07080b] rounded-lg border border-white/[0.06] p-3 relative">
          <svg viewBox="0 0 400 300" className="w-full max-w-[420px] h-auto select-none">
            {/* Concentric distance rings */}
            <circle cx={centerX} cy={centerY} r="65" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="3 3" />
            <circle cx={centerX} cy={centerY} r="95" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeDasharray="3 3" />
            <circle cx={centerX} cy={centerY} r="120" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeDasharray="3 3" />

            {/* Connection Vectors from Center to Neighbors */}
            {neighborsWithCoords.map((n, i) => {
              const isSelected = selectedNeighbor?.index === n.index;
              const isClass1 = n.label === 1;
              const strokeColor = isClass1 ? 'rgba(52, 211, 153, 0.7)' : 'rgba(148, 163, 184, 0.35)';

              return (
                <g key={`vector-${n.index}-${i}`}>
                  <line
                    x1={centerX}
                    y1={centerY}
                    x2={n.x}
                    y2={n.y}
                    stroke={strokeColor}
                    strokeWidth={isSelected ? 2.5 : 1.2}
                    strokeDasharray={isSelected ? 'none' : '4 2'}
                  />
                  {/* Distance label pill on midpoint */}
                  <g transform={`translate(${(centerX + n.x) / 2}, ${(centerY + n.y) / 2})`}>
                    <rect
                      x="-18"
                      y="-8"
                      width="36"
                      height="16"
                      rx="4"
                      fill="#07080b"
                      stroke={isSelected ? strokeColor : 'rgba(255, 255, 255, 0.1)'}
                      strokeWidth="1"
                    />
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="9"
                      fontFamily="monospace"
                      fill="#94a3b8"
                    >
                      d={n.distance.toFixed(2)}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Center Node (Current Donor Being Evaluated) */}
            <g transform={`translate(${centerX}, ${centerY})`}>
              {/* Outer pulse */}
              <circle
                r="28"
                fill="none"
                stroke={isLikely ? 'rgba(225, 29, 72, 0.4)' : 'rgba(148, 163, 184, 0.2)'}
                strokeWidth="1.5"
                className="animate-pulse"
              />
              <circle
                r="22"
                fill="#12151e"
                stroke={isLikely ? '#e11d48' : '#64748b'}
                strokeWidth="2"
              />
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="10"
                fontFamily="sans-serif"
                fontWeight="700"
                fill="#ffffff"
              >
                TARGET
              </text>
              <text
                y="35"
                textAnchor="middle"
                fontSize="9"
                fontFamily="monospace"
                fill="#cbd5e1"
              >
                Current Donor
              </text>
            </g>

            {/* Surrounding Neighbor Nodes */}
            {neighborsWithCoords.map((n, i) => {
              const isClass1 = n.label === 1;
              const isSelected = selectedNeighbor?.index === n.index;

              return (
                <g
                  key={`node-${n.index}-${i}`}
                  transform={`translate(${n.x}, ${n.y})`}
                  className="cursor-pointer transition-transform duration-200 hover:scale-115"
                  onClick={() => setSelectedNeighbor(n)}
                >
                  {/* Selection Ring */}
                  {isSelected && (
                    <circle
                      r="20"
                      fill="none"
                      stroke={isClass1 ? '#34d399' : '#94a3b8'}
                      strokeWidth="2"
                      strokeDasharray="3 2"
                    />
                  )}
                  {/* Node Circle */}
                  <circle
                    r="15"
                    fill={isClass1 ? '#064e3b' : '#1e293b'}
                    stroke={isClass1 ? '#10b981' : '#64748b'}
                    strokeWidth={isSelected ? '2.5' : '1.5'}
                  />
                  {/* Rank badge */}
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="700"
                    fill="#ffffff"
                  >
                    #{i + 1}
                  </text>
                  {/* Outcome Tag below node */}
                  <text
                    y="22"
                    textAnchor="middle"
                    fontSize="8"
                    fontFamily="monospace"
                    fontWeight="600"
                    fill={isClass1 ? '#34d399' : '#94a3b8'}
                  >
                    {isClass1 ? 'DONATED' : 'NO'}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Canvas Legend */}
          <div className="absolute bottom-2 left-3 flex items-center gap-3 text-[10px] font-mono text-neutral-400 bg-black/60 px-2.5 py-1 rounded backdrop-blur">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Class 1 (Donated)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-500 inline-block" /> Class 0 (Did Not)
            </span>
          </div>
        </div>

        {/* Interactive Neighbor Profile Detail Panel */}
        <div className="lg:col-span-5 bg-[#0e1117] rounded-lg border border-white/[0.08] p-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-white">
                Neighbor #{neighborsWithCoords.findIndex((x) => x.index === selectedNeighbor?.index) + 1}
              </span>
              <span className="text-[10px] font-mono text-neutral-400">
                (Train Index: #{selectedNeighbor?.index ?? 0})
              </span>
            </div>
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                selectedNeighbor?.label === 1
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                  : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
              }`}
            >
              {selectedNeighbor?.label === 1 ? 'Outcome: Donated (1)' : 'Outcome: Did Not Donate (0)'}
            </span>
          </div>

          {selectedNeighbor ? (
            <div className="mt-3 space-y-2.5">
              <div className="flex items-center justify-between text-xs py-1 border-b border-white/[0.04]">
                <span className="text-neutral-400">Euclidean Distance:</span>
                <span className="font-mono text-white font-semibold">
                  {selectedNeighbor.distance.toFixed(4)} std units
                </span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 border-b border-white/[0.04]">
                <span className="text-neutral-400">Recency (Last Donation):</span>
                <span className="font-mono text-neutral-200">
                  {selectedNeighbor.monthsSinceLastDonation} months
                  <span className="text-[10px] text-neutral-400 ml-1">
                    (You: {currentDonor.monthsSinceLastDonation}m)
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 border-b border-white/[0.04]">
                <span className="text-neutral-400">Frequency (Total Donations):</span>
                <span className="font-mono text-neutral-200">
                  {selectedNeighbor.numberOfDonations} times
                  <span className="text-[10px] text-neutral-400 ml-1">
                    (You: {currentDonor.numberOfDonations})
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 border-b border-white/[0.04]">
                <span className="text-neutral-400">Total Volume Donated:</span>
                <span className="font-mono text-neutral-200">
                  {selectedNeighbor.totalVolumeDonated} c.c.
                  <span className="text-[10px] text-neutral-400 ml-1">
                    (You: {currentDonor.totalVolumeDonated} c.c.)
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 border-b border-white/[0.04]">
                <span className="text-neutral-400">Longevity (First Donation):</span>
                <span className="font-mono text-neutral-200">
                  {selectedNeighbor.monthsSinceFirstDonation} months
                  <span className="text-[10px] text-neutral-400 ml-1">
                    (You: {currentDonor.monthsSinceFirstDonation}m)
                  </span>
                </span>
              </div>

              <div className="mt-3 p-2.5 rounded bg-white/[0.02] border border-white/[0.05] text-[11px] text-neutral-400 leading-relaxed">
                <span className="text-rose-400 font-semibold font-mono">Mathematical Basis:</span> The KNN classifier maps the scaled input vector onto the 338-donor training manifold. The {k} closest records vote with equal weight ({positiveVotes} positive vs {negativeVotes} negative) to generate the final propensity estimation of {(probability * 100).toFixed(0)}%.
              </div>
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-neutral-500">
              Select a node in the chart to inspect neighbor metrics.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
