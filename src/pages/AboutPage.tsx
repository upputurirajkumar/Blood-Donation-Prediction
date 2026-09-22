import React from 'react';
import { PROJECT_METADATA, INPUT_FEATURES } from '../data/projectData';
import {
  Database,
  Layers,
  Cpu,
  Send,
  Monitor,
  Code2,
  FileSpreadsheet,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const techStack = [
    { name: 'Python 3', role: 'Machine Learning Core & EDA', category: 'Data Science' },
    { name: 'Pandas & NumPy', role: 'Data Manipulation & Vector Processing', category: 'Data Science' },
    { name: 'Scikit-Learn', role: 'Modeling, Preprocessing (StandardScaler), Evaluation', category: 'Machine Learning' },
    { name: 'Matplotlib & Seaborn', role: 'Exploratory Statistical Visualizations', category: 'Visualization' },
    { name: 'React 19 & TypeScript', role: 'Type-Safe Modular User Interface', category: 'Frontend' },
    { name: 'Tailwind CSS v4', role: 'Design System & Responsive Command Center Layout', category: 'Styling' },
    { name: 'Node.js & Express', role: 'REST API Inference Serving Layer', category: 'Backend' },
    { name: 'Vite', role: 'Fast Tooling & Module Bundler', category: 'Tooling' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            TECHNICAL DOCUMENTATION & METADATA
          </span>
          <span className="text-xs text-neutral-400 font-mono">PRCP-1011 · BloodIntel</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Project Architecture & Verification
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-3xl leading-relaxed">
          Comprehensive project portfolio documentation for Capstone {PROJECT_METADATA.projectCode}.
          Every metric, hyperparameter, and statistical calculation is strictly grounded in the project codebase.
        </p>
      </div>

      {/* 1. Project Overview */}
      <section className="bg-[#0b0d13] rounded-xl border border-white/[0.08] p-6 lg:p-8 space-y-6">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
            Clinical Background
          </span>
          <h2 className="text-xl font-bold font-mono text-white tracking-tight mt-0.5">
            Operational Objective
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          Blood donation is essential for surgical care, trauma medicine, and long-term hematological treatments. Maintaining an adequate and steady blood inventory is a persistent operational challenge for blood centers worldwide. This project—codenamed <strong className="text-rose-400 font-mono">{PROJECT_METADATA.projectCode}</strong>—was designed to address this challenge by building an end-to-end supervised machine learning classification workflow to predict whether past blood donors will donate again during an upcoming collection drive.
        </p>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          By modeling historical donor records, the system enables blood donation centers to prioritize outreach, allocate recruitment marketing spend efficiently, design targeted re-engagement campaigns, and reduce donor attrition.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-[#0e1117] p-3.5 rounded-lg border border-white/[0.06]">
            <div className="text-[10px] text-neutral-500 font-mono uppercase">Project Code</div>
            <div className="text-xs font-bold text-white font-mono mt-0.5">{PROJECT_METADATA.projectCode}</div>
          </div>
          <div className="bg-[#0e1117] p-3.5 rounded-lg border border-white/[0.06]">
            <div className="text-[10px] text-neutral-500 font-mono uppercase">Domain</div>
            <div className="text-xs font-bold text-white font-mono mt-0.5">Transfusion & Supply Logistics</div>
          </div>
          <div className="bg-[#0e1117] p-3.5 rounded-lg border border-white/[0.06]">
            <div className="text-[10px] text-neutral-500 font-mono uppercase">Task Type</div>
            <div className="text-xs font-bold text-white font-mono mt-0.5">Binary Classification</div>
          </div>
          <div className="bg-[#0e1117] p-3.5 rounded-lg border border-white/[0.06]">
            <div className="text-[10px] text-neutral-500 font-mono uppercase">Target Outcome</div>
            <div className="text-xs font-bold text-emerald-400 font-mono mt-0.5">Repeat Donor Likelihood</div>
          </div>
        </div>
      </section>

      {/* 2. Dataset & Features */}
      <section className="bg-[#0b0d13] rounded-xl border border-white/[0.08] p-6 lg:p-8 space-y-6">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
            Data Provenance
          </span>
          <h2 className="text-xl font-bold font-mono text-white tracking-tight mt-0.5">
            Dataset Information & Preprocessing
          </h2>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            Source: {PROJECT_METADATA.datasetSource}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-neutral-300">
          <div className="space-y-3 bg-[#0e1117] p-4 rounded-lg border border-white/[0.06]">
            <h4 className="text-sm font-bold font-mono text-white">Data Cleansing & Sanitization</h4>
            <p className="leading-relaxed">
              The original dataset contained <strong>576 records</strong> and <strong>6 columns</strong>. During data cleaning, the non-predictive index column (<code className="bg-white/[0.06] text-rose-300 px-1 py-0.5 rounded font-mono">Unnamed: 0</code>) was dropped. Duplicate detection identified <strong>153 redundant rows</strong>, which were pruned to yield a clean cohort of <strong>423 distinct donor profiles</strong>.
            </p>
            <p className="leading-relaxed">
              No missing values were present in any feature. The dataset is moderately imbalanced, with 72.1% non-donors (Class 0) and 27.9% donors (Class 1) in the target period.
            </p>
          </div>

          <div className="space-y-3 bg-[#0e1117] p-4 rounded-lg border border-white/[0.06]">
            <h4 className="text-sm font-bold font-mono text-white">Target Variable Definition</h4>
            <div className="space-y-2">
              <div className="font-mono font-bold text-white text-xs">
                Made Donation in March 2007
              </div>
              <ul className="space-y-1.5 list-disc list-inside text-[11px] text-neutral-300 font-mono">
                <li>
                  <strong className="text-emerald-400">1 (Positive Class):</strong> The donor contributed blood during the March 2007 campaign (27.9% of cohort).
                </li>
                <li>
                  <strong className="text-neutral-400">0 (Negative Class):</strong> The donor did not contribute blood during the campaign (72.1% of cohort).
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Feature Specifications Table */}
        <div className="pt-2">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 mb-3">
            The 4 Verified Input Features (RFMTC Framework)
          </h4>
          <div className="overflow-x-auto rounded-lg border border-white/[0.08]">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#0e1117] text-neutral-400 font-semibold border-b border-white/[0.08]">
                <tr>
                  <th className="py-2.5 px-3">Exact Column Name</th>
                  <th className="py-2.5 px-3">Dimension</th>
                  <th className="py-2.5 px-3">Unit</th>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3">Dataset Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-neutral-300">
                {INPUT_FEATURES.map((f) => (
                  <tr key={f.id} className="hover:bg-white/[0.02]">
                    <td className="py-2.5 px-3 font-semibold text-white">
                      {f.exactName}
                    </td>
                    <td className="py-2.5 px-3 text-rose-300">{f.rfmCategory}</td>
                    <td className="py-2.5 px-3 text-neutral-400">{f.unit}</td>
                    <td className="py-2.5 px-3 max-w-xs">{f.description}</td>
                    <td className="py-2.5 px-3 text-neutral-400">{f.typicalRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. Project Architecture Diagram */}
      <section className="bg-[#0b0d13] rounded-xl border border-white/[0.08] p-6 lg:p-8 space-y-6">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
            System Dataflow
          </span>
          <h2 className="text-xl font-bold font-mono text-white tracking-tight mt-0.5">
            End-to-End Pipeline
          </h2>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            Raw Donor Data → StandardScaler Transform → KNN (k=5) Classifier → Express REST API → React UI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center font-mono">
          <div className="bg-[#0e1117] rounded-xl p-4 border border-white/[0.06] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-white/[0.05] text-neutral-300 border border-white/[0.08] flex items-center justify-center mx-auto">
              <Database className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">01 · Ingestion</h4>
            <p className="text-[11px] text-neutral-400 leading-snug">
              576 raw records pruned to 423 deduplicated vectors
            </p>
          </div>

          <div className="bg-[#0e1117] rounded-xl p-4 border border-white/[0.06] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-white/[0.05] text-neutral-300 border border-white/[0.08] flex items-center justify-center mx-auto">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">02 · StandardScaler</h4>
            <p className="text-[11px] text-neutral-400 leading-snug">
              Zero-mean, unit-variance fitted strictly on 338 train vectors
            </p>
          </div>

          <div className="bg-[#0e1117] rounded-xl p-4 border border-rose-500/30 bg-rose-950/20 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center mx-auto">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-rose-300">03 · KNN (k=5)</h4>
            <p className="text-[11px] text-neutral-400 leading-snug">
              Euclidean search across 4D standardized feature space
            </p>
          </div>

          <div className="bg-[#0e1117] rounded-xl p-4 border border-white/[0.06] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-white/[0.05] text-neutral-300 border border-white/[0.08] flex items-center justify-center mx-auto">
              <Send className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">04 · API Engine</h4>
            <p className="text-[11px] text-neutral-400 leading-snug">
              Express /api/predict with vector validation and resilience
            </p>
          </div>

          <div className="bg-[#0e1117] rounded-xl p-4 border border-white/[0.06] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-white/[0.05] text-neutral-300 border border-white/[0.08] flex items-center justify-center mx-auto">
              <Monitor className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">05 · UI Dashboard</h4>
            <p className="text-[11px] text-neutral-400 leading-snug">
              BloodIntel command center with 2D neighborhood projection
            </p>
          </div>
        </div>
      </section>

      {/* 4. Technology Stack */}
      <section className="bg-[#0b0d13] rounded-xl border border-white/[0.08] p-6 lg:p-8 space-y-6">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
            Stack Infrastructure
          </span>
          <h2 className="text-xl font-bold font-mono text-white tracking-tight mt-0.5">
            Technology Stack
          </h2>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            Technologies and libraries verified in the Python project and web deployment
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="p-4 rounded-xl bg-[#0e1117] border border-white/[0.06] space-y-1 text-left font-mono"
            >
              <div className="text-[10px] font-semibold text-rose-400 uppercase tracking-wider">
                {tech.category}
              </div>
              <div className="text-sm font-bold text-white">{tech.name}</div>
              <p className="text-xs text-neutral-400 leading-snug">{tech.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
