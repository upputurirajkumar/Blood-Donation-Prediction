import React from 'react';
import { HeroPipelineVisualizer } from '../components/HeroPipelineVisualizer';
import {
  ArrowRight,
  Cpu,
  Database,
  Activity,
  GitBranch,
  CheckCircle2,
  ShieldCheck,
  Award,
  Sparkles,
  BarChart3,
  TrendingUp,
} from 'lucide-react';
import { PROJECT_METADATA } from '../data/projectData';
import { NavigationTab } from '../types';

interface HomePageProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            ENTERPRISE CLINICAL ML INTELLIGENCE · PRCP-1011
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Precision Blood Donation Forecasting
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            High-dimensional RFMTC donor profiling and machine learning inference engine.
            Predicts whole-blood donation propensity to optimize hospital inventory replenishment.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setActiveTab('predict');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-sm font-mono font-semibold shadow-lg shadow-rose-950/50 hover:shadow-rose-900/60 active:scale-[0.99] transition-all cursor-pointer"
            >
              Launch Prediction Studio
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setActiveTab('models');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0e1117] hover:bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.16] text-neutral-300 text-sm font-mono font-medium transition-all cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-neutral-400" />
              Benchmark Models
            </button>

            <button
              onClick={() => {
                setActiveTab('data');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0e1117] hover:bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.16] text-neutral-300 text-sm font-mono font-medium transition-all cursor-pointer"
            >
              <Database className="w-4 h-4 text-neutral-400" />
              Audit Dataset
            </button>
          </div>
        </div>

        {/* Hero Visual Pipeline Representation */}
        <div className="mt-12">
          <HeroPipelineVisualizer />
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
            System Architecture
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
            Production ML Foundations
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Grounded strictly in the verified data pipeline and empirical parameters of PRCP-1011.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Donor Intelligence */}
          <div className="bg-[#0b0d13] rounded-xl border border-white/[0.08] p-6 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono tracking-tight">Donor Intelligence</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Explores historical donor behavior using the classic Recency-Frequency-Monetary-Time (RFMTC) framework. Exploratory Data Analysis confirmed that recency is inversely correlated with future donation propensity: donors who contributed recently are significantly more likely to respond to subsequent blood drives.
            </p>
            <div className="pt-2 text-[11px] text-neutral-500 font-mono">
              4 Numerical Features • 0 Missing Values • 423 Clean Records
            </div>
          </div>

          {/* Card 2: Machine Learning */}
          <div className="bg-[#0b0d13] rounded-xl border border-white/[0.08] p-6 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-lg bg-white/[0.05] text-neutral-300 border border-white/[0.08] flex items-center justify-center">
              <GitBranch className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono tracking-tight">Multi-Model Benchmarks</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Seven machine learning classification models were systematically trained and compared using identical evaluation criteria on a stratified 80:20 holdout split. Models evaluated include Logistic Regression, Decision Tree, Random Forest, K-Nearest Neighbors, SVM, Naive Bayes, and Gradient Boosting.
            </p>
            <div className="pt-2 text-[11px] text-neutral-500 font-mono">
              Stratified 80:20 Split • StandardScaler • Cross-Validated
            </div>
          </div>

          {/* Card 3: Prediction */}
          <div className="bg-[#0b0d13] rounded-xl border border-white/[0.08] p-6 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono tracking-tight">Inference & Confidence</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Predicts the exact project target variable:{' '}
              <strong className="text-white">Made Donation in March 2007</strong> (Class 1 = Donated Blood, Class 0 = Did Not Donate). The recommended production model—K-Nearest Neighbors (k=5)—achieved the highest test accuracy of 76.47% and balanced precision-recall trade-offs.
            </p>
            <div className="pt-2 text-[11px] text-emerald-400 font-mono font-semibold">
              Selected Model: KNN (k=5) • 76.47% Test Accuracy
            </div>
          </div>
        </div>
      </section>

      {/* How It Works: Visual 4-Step Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0b0d13] text-white rounded-2xl border border-white/[0.08] p-8 sm:p-12 space-y-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              Verified Execution Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight">How It Works</h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              From raw donor attributes to reproducible machine learning inference
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Step 01 */}
            <div className="bg-[#0e1117] rounded-xl p-6 border border-white/[0.06] space-y-3">
              <div className="text-xs font-mono font-bold text-rose-400">01</div>
              <h4 className="text-base font-bold text-white font-mono">Donor Data</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                User enters the 4 donor parameters: Months Since Last Donation, Number of Donations, Total Volume Donated (c.c.), and Months Since First Donation.
              </p>
            </div>

            {/* Step 02 */}
            <div className="bg-[#0e1117] rounded-xl p-6 border border-white/[0.06] space-y-3">
              <div className="text-xs font-mono font-bold text-rose-400">02</div>
              <h4 className="text-base font-bold text-white font-mono">Data Preparation</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Inputs are verified and standardized with StandardScaler using the exact mean and variance computed on the 338 training records, eliminating scale disparities.
              </p>
            </div>

            {/* Step 03 */}
            <div className="bg-[#0e1117] rounded-xl p-6 border border-white/[0.06] space-y-3">
              <div className="text-xs font-mono font-bold text-rose-400">03</div>
              <h4 className="text-base font-bold text-white font-mono">KNN Metric Search</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                The K-Nearest Neighbors classifier computes Euclidean distances in 4D standardized space to locate the 5 closest historical donor profiles from the training dataset.
              </p>
            </div>

            {/* Step 04 */}
            <div className="bg-[#0e1117] rounded-xl p-6 border border-white/[0.06] space-y-3">
              <div className="text-xs font-mono font-bold text-rose-400">04</div>
              <h4 className="text-base font-bold text-white font-mono">Prediction Consensus</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Outputs the consensus classification (Class 1 or 0), exact neighborhood probability score, nearest-neighbor breakdown, and operational campaign recommendations.
              </p>
            </div>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => {
                setActiveTab('predict');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold shadow-lg shadow-rose-950/50 transition-all cursor-pointer"
            >
              Launch Donor Prediction Studio
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

