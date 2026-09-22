import React from 'react';
import { PipelineFlowChart } from '../components/PipelineFlowChart';
import { ModelComparisonTable } from '../components/ModelComparisonTable';
import { ConfusionMatrixVisualizer } from '../components/ConfusionMatrixVisualizer';
import { PROJECT_METADATA } from '../data/projectData';
import { Trophy, GitCompare, LineChart, BarChart2, ShieldCheck, ArrowRight } from 'lucide-react';

export const ModelInsightsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Page Header */}
      <div className="pb-6 border-b border-stone-200">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 uppercase tracking-wider mb-1">
          <LineChart className="w-3.5 h-3.5" />
          Analytics & Benchmarks
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Model Intelligence
        </h1>
        <p className="text-sm text-stone-600 mt-1">
          Explore how the prediction system was developed, evaluated, and selected for production.
        </p>
      </div>

      {/* 1. Visual ML Pipeline */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">
            1. Machine Learning Pipeline
          </h2>
          <span className="text-xs text-stone-500 font-mono">Sequential Architecture</span>
        </div>
        <PipelineFlowChart />
      </section>

      {/* 2. Highlighted Selected Model Card */}
      <section className="bg-white rounded-2xl border-2 border-red-800/80 shadow-sm p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-red-800 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-red-700">
                Production Recommendation
              </div>
              <h2 className="text-2xl font-black text-stone-900 tracking-tight mt-0.5">
                Selected Model: {PROJECT_METADATA.selectedModel}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              Test Accuracy: {PROJECT_METADATA.selectedModelAccuracy}
            </span>
            <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-mono font-semibold">
              k = 5 Neighbors
            </span>
          </div>
        </div>

        {/* Why KNN Was Selected Justification */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-stone-900">Highest Holdout Accuracy</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              After evaluating seven machine learning algorithms using Accuracy, Precision, Recall, F1-Score, and ROC-AUC, the K-Nearest Neighbors classifier achieved the highest testing accuracy of <strong>76.47%</strong> across the 85 unseen test records.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-stone-900">Minimal Overfitting Gap</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Tree algorithms (Decision Tree & Random Forest) achieved over 94.9% training accuracy but plummeted to 68.2% and 72.9% on test data. KNN maintained a narrow 1.9% gap (78.40% train vs 76.47% test), demonstrating robust generalization.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-stone-900">Balanced Evaluation Metrics</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              KNN retained the highest F1-Score (0.4118) and a strong Precision of 70.0%. It achieved the best balance across both positive donor detection and negative class specificity without suffering from severe false alarm rates.
            </p>
          </div>
        </div>

        {/* Key Model Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
            <div className="text-[10px] text-stone-500 font-semibold uppercase">Hyperparameters</div>
            <div className="text-sm font-bold text-stone-900 font-mono mt-0.5">k=5, p=2</div>
            <div className="text-[10px] text-stone-500">Euclidean Distance</div>
          </div>
          <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
            <div className="text-[10px] text-stone-500 font-semibold uppercase">Feature Scaling</div>
            <div className="text-sm font-bold text-stone-900 font-mono mt-0.5">StandardScaler</div>
            <div className="text-[10px] text-stone-500">Fitted on Train Set</div>
          </div>
          <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
            <div className="text-[10px] text-stone-500 font-semibold uppercase">Training Records</div>
            <div className="text-sm font-bold text-stone-900 font-mono mt-0.5">338 vectors</div>
            <div className="text-[10px] text-stone-500">80% Stratified Split</div>
          </div>
          <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
            <div className="text-[10px] text-stone-500 font-semibold uppercase">Test Records</div>
            <div className="text-sm font-bold text-stone-900 font-mono mt-0.5">85 vectors</div>
            <div className="text-[10px] text-stone-500">20% Holdout Split</div>
          </div>
        </div>
      </section>

      {/* 3. Model Comparison Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">
            2. Multi-Model Benchmark Comparison
          </h2>
          <span className="text-xs text-stone-500 font-mono">7 Supervised Models</span>
        </div>
        <ModelComparisonTable />
      </section>

      {/* 4. Confusion Matrix */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">
            3. Selected Model Classification Diagnostics
          </h2>
          <span className="text-xs text-stone-500 font-mono">Confusion Matrix</span>
        </div>
        <ConfusionMatrixVisualizer />
      </section>

      {/* 5. Feature Correlation & EDA Insights */}
      <section className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <h3 className="text-base font-bold text-stone-900 tracking-tight">
              4. Feature Relationships & EDA Findings
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Correlation analysis derived during exploratory data inspection
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-stone-900">Key Correlation Observations</h4>
            <ul className="space-y-2 text-xs text-stone-600 leading-relaxed list-disc list-inside">
              <li>
                <strong>Collinear Volume & Count:</strong> Total Volume Donated (c.c.) is perfectly collinear with Number of Donations (r = 1.0) because standard blood collection draws 250 c.c. per donation.
              </li>
              <li>
                <strong>Negative Recency Correlation:</strong> Months Since Last Donation has an inverse correlation with donation status. Donors with low recency values (e.g. 2–4 months) represent active donors with the highest repeat probability.
              </li>
              <li>
                <strong>Donor Longevity:</strong> Months Since First Donation exhibits positive correlation with total blood volume, confirming that long-term repeat donors accumulate significant cumulative life-saving volume over time.
              </li>
              <li>
                <strong>Non-Normal Skew:</strong> Numerical distributions showed positive skewness, with the majority of donors having 1 to 4 donations and a dedicated minority contributing over 20+ times.
              </li>
            </ul>
          </div>

          {/* Simple Correlation Matrix View */}
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-xs">
            <div className="font-semibold text-stone-800 mb-3 text-center">
              Empirical Feature Correlation Matrix
            </div>
            <div className="grid grid-cols-5 gap-1 text-center font-mono text-[10px]">
              <div className="p-1 font-bold text-stone-400">Var</div>
              <div className="p-1 font-bold text-stone-700 bg-stone-200/60 rounded">Recency</div>
              <div className="p-1 font-bold text-stone-700 bg-stone-200/60 rounded">Freq</div>
              <div className="p-1 font-bold text-stone-700 bg-stone-200/60 rounded">Volume</div>
              <div className="p-1 font-bold text-stone-700 bg-stone-200/60 rounded">Target</div>

              <div className="p-1 font-bold text-stone-700 text-left">Recency</div>
              <div className="p-1.5 bg-stone-200 rounded font-bold">1.00</div>
              <div className="p-1.5 bg-stone-100 rounded text-stone-600">-0.20</div>
              <div className="p-1.5 bg-stone-100 rounded text-stone-600">-0.20</div>
              <div className="p-1.5 bg-rose-100 text-rose-800 font-bold rounded">-0.28</div>

              <div className="p-1 font-bold text-stone-700 text-left">Freq</div>
              <div className="p-1.5 bg-stone-100 rounded text-stone-600">-0.20</div>
              <div className="p-1.5 bg-stone-200 rounded font-bold">1.00</div>
              <div className="p-1.5 bg-emerald-200 text-emerald-950 font-black rounded">1.00</div>
              <div className="p-1.5 bg-emerald-100 text-emerald-800 font-bold rounded">+0.22</div>

              <div className="p-1 font-bold text-stone-700 text-left">Volume</div>
              <div className="p-1.5 bg-stone-100 rounded text-stone-600">-0.20</div>
              <div className="p-1.5 bg-emerald-200 text-emerald-950 font-black rounded">1.00</div>
              <div className="p-1.5 bg-stone-200 rounded font-bold">1.00</div>
              <div className="p-1.5 bg-emerald-100 text-emerald-800 font-bold rounded">+0.22</div>

              <div className="p-1 font-bold text-stone-700 text-left">Target</div>
              <div className="p-1.5 bg-rose-100 text-rose-800 font-bold rounded">-0.28</div>
              <div className="p-1.5 bg-emerald-100 text-emerald-800 font-bold rounded">+0.22</div>
              <div className="p-1.5 bg-emerald-100 text-emerald-800 font-bold rounded">+0.22</div>
              <div className="p-1.5 bg-stone-200 rounded font-bold">1.00</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
