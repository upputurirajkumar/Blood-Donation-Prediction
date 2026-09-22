import React, { useState } from 'react';
import {
  Database,
  BarChart3,
  Sliders,
  Layers,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Info,
  Calendar,
  Clock,
  Heart,
  Droplet,
} from 'lucide-react';
import {
  PROJECT_METADATA,
  DATASET_STATS,
  FEATURE_DISTRIBUTIONS,
  CORRELATION_MATRIX,
  INPUT_FEATURES,
} from '../data/projectData';

export const DataIntelligencePage: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState(FEATURE_DISTRIBUTIONS[0].id);
  const [selectedCorrCell, setSelectedCorrCell] = useState<{
    featureA: string;
    featureB: string;
    value: number;
    type: string;
  } | null>(CORRELATION_MATRIX[3]); // default: Recency vs Target

  const activeFeatureData =
    FEATURE_DISTRIBUTIONS.find((f) => f.id === selectedFeature) || FEATURE_DISTRIBUTIONS[0];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Page Header */}
      <div className="border-b border-white/[0.08] pb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            EXPLORATORY DATA INTELLIGENCE
          </span>
          <span className="text-xs text-neutral-400 font-mono">Dataset Benchmark · PRCP-1011</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Blood Transfusion Service Center Dataset
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-3xl leading-relaxed">
          Comprehensive empirical audit of the 576 historical donor records from Hsin-Chu City, Taiwan.
          From deduplication and quality engineering to RFMTC feature distributions and target class balance.
        </p>
      </div>

      {/* 4 Stat Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0e1117] border border-white/[0.08] rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono mb-2">
            <span>RAW INGESTION</span>
            <Database className="w-4 h-4 text-neutral-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">576 Records</div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Original dataset records across 6 initial columns prior to deduplication.
          </p>
        </div>

        <div className="bg-[#0e1117] border border-white/[0.08] rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono mb-2">
            <span>DEDUPLICATION</span>
            <AlertCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400">153 Pruned</div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Exact duplicate donor tuples identified and systematically removed.
          </p>
        </div>

        <div className="bg-[#0e1117] border border-white/[0.08] rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono mb-2">
            <span>CLEANED COHORT</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">423 Donors</div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Clean unique training/testing cohort. 0 missing values across all features.
          </p>
        </div>

        <div className="bg-[#0e1117] border border-white/[0.08] rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono mb-2">
            <span>DATA SPLIT</span>
            <Layers className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">80% / 20%</div>
          <p className="text-[11px] text-neutral-400 mt-1">
            338 Train / 85 Test samples with stratified class balance (random_state=42).
          </p>
        </div>
      </div>

      {/* Target Class Distribution & Imbalance Callout */}
      <div className="bg-[#0b0d13] border border-white/[0.08] rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
                Target Variable Distribution
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-neutral-300">
                "Made Donation in March 2007"
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">Binary Propensity Class Ratio</h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="px-3 py-1 rounded-md bg-neutral-900 border border-white/[0.08] text-neutral-300">
              Imbalance Ratio: <strong className="text-rose-400">2.58 : 1</strong>
            </span>
            <span className="px-3 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
              Stratified Splits Enforced
            </span>
          </div>
        </div>

        {/* Visual Progress Bar Distribution */}
        <div className="space-y-3">
          <div className="h-6 w-full bg-[#12151e] rounded-lg overflow-hidden flex border border-white/[0.08]">
            <div
              style={{ width: `${DATASET_STATS.class0Pct}%` }}
              className="bg-neutral-700/80 hover:bg-neutral-600 transition-all flex items-center justify-start px-3 text-[11px] font-mono text-neutral-200 font-semibold"
              title={`Class 0: ${DATASET_STATS.class0Count} records (${DATASET_STATS.class0Pct}%)`}
            >
              Class 0: Did Not Donate ({DATASET_STATS.class0Count} · {DATASET_STATS.class0Pct}%)
            </div>
            <div
              style={{ width: `${DATASET_STATS.class1Pct}%` }}
              className="bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 transition-all flex items-center justify-end px-3 text-[11px] font-mono text-white font-semibold"
              title={`Class 1: ${DATASET_STATS.class1Count} records (${DATASET_STATS.class1Pct}%)`}
            >
              Class 1: Donated ({DATASET_STATS.class1Count} · {DATASET_STATS.class1Pct}%)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#0e1117] rounded-lg p-3.5 border border-white/[0.05] text-xs">
              <div className="flex items-center gap-2 text-neutral-300 font-mono font-medium">
                <span className="w-2.5 h-2.5 rounded-sm bg-neutral-600" />
                Negative Class (0) — 305 Records (72.1%)
              </div>
              <p className="text-neutral-400 mt-1 leading-relaxed text-[11px]">
                Represents donors registered in the BTSC database who did not make a whole-blood contribution during
                the target observation window of March 2007.
              </p>
            </div>

            <div className="bg-[#0e1117] rounded-lg p-3.5 border border-white/[0.05] text-xs">
              <div className="flex items-center gap-2 text-rose-300 font-mono font-medium">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-600" />
                Positive Class (1) — 118 Records (27.9%)
              </div>
              <p className="text-neutral-400 mt-1 leading-relaxed text-[11px]">
                Donors who successfully contributed in March 2007. To prevent bias from class imbalance, the ML workflow
                utilizes stratified cross-validation and evaluates precision, recall, and ROC-AUC alongside accuracy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Distributions Deep-Dive */}
      <div className="bg-[#0b0d13] border border-white/[0.08] rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
              RFMTC Feature Exploration
            </span>
            <h2 className="text-lg font-bold text-white mt-0.5">Empirical Distributions & Quantiles</h2>
          </div>

          {/* Feature selector tabs */}
          <div className="flex flex-wrap gap-1.5 bg-[#0e1117] p-1 rounded-lg border border-white/[0.07]">
            {FEATURE_DISTRIBUTIONS.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFeature(f.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors cursor-pointer ${
                  selectedFeature === f.id
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {f.name.split(' ')[0]} ({f.unit})
              </button>
            ))}
          </div>
        </div>

        {/* Active Feature Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Metrics summary */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#0e1117] rounded-xl p-4 border border-white/[0.06]">
              <h3 className="text-sm font-bold text-white font-mono">{activeFeatureData.name}</h3>
              <p className="text-xs text-neutral-400 mt-1">
                {INPUT_FEATURES.find((f) => f.id === activeFeatureData.id)?.description}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-[#12151e] p-2.5 rounded border border-white/[0.04]">
                  <span className="text-neutral-500 text-[10px] block">MEAN</span>
                  <span className="text-white font-bold text-sm">
                    {activeFeatureData.mean} {activeFeatureData.unit}
                  </span>
                </div>
                <div className="bg-[#12151e] p-2.5 rounded border border-white/[0.04]">
                  <span className="text-neutral-500 text-[10px] block">MEDIAN</span>
                  <span className="text-emerald-400 font-bold text-sm">
                    {activeFeatureData.median} {activeFeatureData.unit}
                  </span>
                </div>
                <div className="bg-[#12151e] p-2.5 rounded border border-white/[0.04]">
                  <span className="text-neutral-500 text-[10px] block">STD DEV</span>
                  <span className="text-neutral-300 font-bold text-sm">±{activeFeatureData.std}</span>
                </div>
                <div className="bg-[#12151e] p-2.5 rounded border border-white/[0.04]">
                  <span className="text-neutral-500 text-[10px] block">RANGE (MIN - MAX)</span>
                  <span className="text-neutral-300 font-bold text-sm">
                    {activeFeatureData.min} – {activeFeatureData.max}
                  </span>
                </div>
                <div className="bg-[#12151e] p-2.5 rounded border border-white/[0.04]">
                  <span className="text-neutral-500 text-[10px] block">25TH PERCENTILE</span>
                  <span className="text-neutral-300 font-bold text-sm">{activeFeatureData.q25}</span>
                </div>
                <div className="bg-[#12151e] p-2.5 rounded border border-white/[0.04]">
                  <span className="text-neutral-500 text-[10px] block">75TH PERCENTILE</span>
                  <span className="text-neutral-300 font-bold text-sm">{activeFeatureData.q75}</span>
                </div>
              </div>
            </div>

            <div className="bg-rose-950/20 border border-rose-500/20 rounded-lg p-3 text-[11px] text-neutral-300 leading-relaxed">
              <span className="text-rose-400 font-semibold font-mono">StandardScaler Note:</span> The wide numerical
              disparity (Volume in thousands vs Recency in single digits) makes feature scaling essential. Without
              StandardScaler (z = (x - μ) / σ), distance-based models like KNN would be overwhelmed by
              Volume alone.
            </div>
          </div>

          {/* Histogram Chart with Class breakdown */}
          <div className="lg:col-span-8 bg-[#0e1117] rounded-xl p-5 border border-white/[0.06] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-neutral-300 font-semibold">
                  Sample Distribution by Cohort Bins (423 Clean Records)
                </span>
                <div className="flex items-center gap-3 text-[10px] font-mono">
                  <span className="flex items-center gap-1 text-neutral-400">
                    <span className="w-2.5 h-2.5 rounded bg-neutral-600 inline-block" /> Class 0 (Did Not)
                  </span>
                  <span className="flex items-center gap-1 text-rose-400">
                    <span className="w-2.5 h-2.5 rounded bg-rose-600 inline-block" /> Class 1 (Donated)
                  </span>
                </div>
              </div>

              {/* Bar visualization */}
              <div className="space-y-4 pt-2">
                {activeFeatureData.bins.map((bin) => {
                  const maxBin = Math.max(...activeFeatureData.bins.map((b) => b.count));
                  const pctWidth = (bin.count / maxBin) * 100;
                  const class1Share = ((bin.countClass1 / bin.count) * 100).toFixed(0);

                  return (
                    <div key={bin.range} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-neutral-300 font-medium w-20">{bin.range}</span>
                        <div className="flex items-center gap-3 text-neutral-400 text-[11px]">
                          <span>Total: {bin.count}</span>
                          <span className="text-rose-400 font-semibold">({class1Share}% donated)</span>
                        </div>
                      </div>

                      {/* Stacked bar */}
                      <div className="h-5 w-full bg-[#12151e] rounded overflow-hidden flex border border-white/[0.05]">
                        <div
                          style={{ width: `${(bin.countClass0 / maxBin) * 100}%` }}
                          className="bg-neutral-700 h-full transition-all"
                          title={`Class 0: ${bin.countClass0}`}
                        />
                        <div
                          style={{ width: `${(bin.countClass1 / maxBin) * 100}%` }}
                          className="bg-rose-600 h-full transition-all"
                          title={`Class 1: ${bin.countClass1}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs text-neutral-400 flex items-center justify-between">
              <span>* Data source: Cleaned training/testing cohort (423 records)</span>
              <span className="font-mono text-emerald-400">100% Complete Records</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Correlation Matrix & Multicollinearity Findings */}
      <div className="bg-[#0b0d13] border border-white/[0.08] rounded-xl p-6">
        <div className="mb-6">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
            Feature Relationships & Interdependence
          </span>
          <h2 className="text-lg font-bold text-white mt-0.5">Pearson Correlation Matrix</h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
            Click any relationship card below to analyze correlation magnitude and behavioral implications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {CORRELATION_MATRIX.map((item, idx) => {
            const isSelected =
              selectedCorrCell?.featureA === item.featureA && selectedCorrCell?.featureB === item.featureB;
            const isCollinear = item.value === 1.0;
            const isNegative = item.value < 0;

            return (
              <div
                key={idx}
                onClick={() => setSelectedCorrCell(item)}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-rose-950/30 border-rose-500/50 shadow-md shadow-rose-950/20'
                    : 'bg-[#0e1117] border-white/[0.06] hover:bg-white/[0.02] hover:border-white/[0.12]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-neutral-300 font-semibold">
                    {item.featureA} ↔ {item.featureB}
                  </span>
                  <span
                    className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${
                      isCollinear
                        ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                        : isNegative
                        ? 'bg-rose-950/50 text-rose-300 border border-rose-500/30'
                        : 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    r = {item.value > 0 ? `+${item.value.toFixed(2)}` : item.value.toFixed(2)}
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400">{item.type}</div>
              </div>
            );
          })}
        </div>

        {/* Selected Correlation Deep-Dive Insight Box */}
        {selectedCorrCell && (
          <div className="mt-5 p-4 rounded-xl bg-[#0e1117] border border-white/[0.08] text-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-white font-bold">
                Analysis: {selectedCorrCell.featureA} vs {selectedCorrCell.featureB} (r ={' '}
                {selectedCorrCell.value > 0 ? `+${selectedCorrCell.value}` : selectedCorrCell.value})
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-neutral-300">
                {selectedCorrCell.type}
              </span>
            </div>
            <p className="text-neutral-400 leading-relaxed text-[11px] mt-1">
              {selectedCorrCell.featureA === 'Frequency' && selectedCorrCell.featureB === 'Volume'
                ? 'CRITICAL FINDING: In this dataset, total volume is strictly deterministic (Volume = Frequency × 250 c.c.). Every donation session contributes exactly 250 c.c. of whole blood. Because r = 1.000, these two features are perfectly collinear. While tree models and KNN can tolerate this redundancy without numerical collapse, linear models benefit from standardization.'
                : selectedCorrCell.featureB === 'Target' && selectedCorrCell.featureA === 'Recency'
                ? 'KEY DRIVER: Months since last donation has the strongest correlation with the target variable (r = -0.27). As recency grows larger (more months elapsed without donating), the likelihood of re-donating drops precipitously. Donors dormant for >15 months show less than 12% probability of repeat donation.'
                : selectedCorrCell.featureB === 'Target' && selectedCorrCell.featureA === 'Time (First)'
                ? 'COUNTER-INTUITIVE FINDING: Time since first donation exhibits near zero correlation with re-donation in March 2007 (r = -0.03). Having registered 8 years ago does not indicate whether a donor will give today. Longevity only adds predictive signal when paired with frequency (calculating donation pace/velocity).'
                : 'Empirical correlation derived across all 423 clean donor observations in the project benchmark.'}
            </p>
          </div>
        )}
      </div>

      {/* 4 Architectural Behavioral Conclusions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-[#0b0d13] border border-white/[0.08] rounded-xl p-5">
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-semibold mb-2">
            <Clock className="w-4 h-4" />
            <span>Recency Primacy Law</span>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            The data demonstrates that recency is by far the single most decisive variable. Donors who contributed
            within the past 2 to 4 months comprise the vast majority of positive re-donations. Mobilization campaigns
            should prioritize recent donors before donation friction sets in.
          </p>
        </div>

        <div className="bg-[#0b0d13] border border-white/[0.08] rounded-xl p-5">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold mb-2">
            <Droplet className="w-4 h-4" />
            <span>Exact Volume Collinearity</span>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Total volume donated is mathematically tied to the number of donations: Volume = Frequency × 250 c.c.
            In Taiwan blood banks, blood bags are standardized to 250 c.c., meaning Volume conveys zero independent
            information beyond Frequency.
          </p>
        </div>

        <div className="bg-[#0b0d13] border border-white/[0.08] rounded-xl p-5">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold mb-2">
            <Heart className="w-4 h-4" />
            <span>The Lapsed Champion Anomaly</span>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            High historical frequency (e.g. 20+ donations) does not protect against donor churn if recency lapses
            past 18 months. Donors who were once champions can become dormant, requiring warm re-engagement prompts
            rather than standard automated notifications.
          </p>
        </div>

        <div className="bg-[#0b0d13] border border-white/[0.08] rounded-xl p-5">
          <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-semibold mb-2">
            <Calendar className="w-4 h-4" />
            <span>Tenure Independence</span>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Longevity (months since first donation) on its own has virtually zero direct correlation with re-donation (r = -0.03).
            A 10-year registered donor with 2 donations is vastly less likely to donate than a 6-month donor with 3 donations.
          </p>
        </div>
      </div>
    </div>
  );
};
