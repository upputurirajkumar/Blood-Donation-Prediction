import React from 'react';
import { Activity, ShieldCheck, Database, GitBranch, ArrowUpRight } from 'lucide-react';
import { NavigationTab } from '../types';
import { PROJECT_METADATA } from '../data/projectData';

interface FooterProps {
  setActivePage: (page: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  return (
    <footer className="bg-[#050608] text-neutral-400 border-t border-white/[0.08] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-600 to-rose-800 flex items-center justify-center shadow-sm">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white font-mono">
                BLOOD<span className="text-rose-500">INTEL</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
              Predictive donor propensity intelligence developed under project{' '}
              <strong className="text-neutral-200 font-mono">{PROJECT_METADATA.projectCode}</strong>.
              Engineered to optimize blood collection mobilization through empirical RFMTC behavior modeling.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="inline-flex items-center gap-1.5 bg-white/[0.04] px-2.5 py-1 rounded border border-white/[0.08] text-neutral-300 font-mono text-[11px]">
                <Database className="w-3.5 h-3.5 text-rose-400" />
                423 Clean Records
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/[0.04] px-2.5 py-1 rounded border border-white/[0.08] text-neutral-300 font-mono text-[11px]">
                <GitBranch className="w-3.5 h-3.5 text-rose-400" />
                7 Benchmark Models
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/[0.04] px-2.5 py-1 rounded border border-white/[0.08] text-emerald-400 font-mono text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                KNN (k=5) 76.47% Test Acc
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200 mb-3 font-mono">
              System Architecture
            </h4>
            <ul className="space-y-2 text-xs">
              {(
                [
                  { id: 'overview', label: 'Platform Overview' },
                  { id: 'data', label: 'Data Intelligence' },
                  { id: 'models', label: 'Model Benchmarks & Pipeline' },
                  { id: 'predict', label: 'Donor Prediction Studio' },
                  { id: 'insights', label: 'Insights & Campaign Matrix' },
                  { id: 'about', label: 'Full Case Study & Audit' },
                ] as { id: NavigationTab; label: string }[]
              ).map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setActivePage(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors text-neutral-400 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-50" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Source Attribution & Disclaimer */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200 mb-3 font-mono">
              Provenance & Scientific Basis
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Trained on the empirical benchmark from the Blood Transfusion Service Center (Hsin-Chu City, Taiwan).
              Evaluated using 80/20 stratified split with scikit-learn standard scaling.
            </p>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-neutral-500 leading-normal">
              Notice: Healthcare operations and donor scheduling decision-support system. Not an individual clinical diagnostic device.
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.08] text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-mono text-[11px]">
            © {new Date().getFullYear()} BLOODINTEL · Project {PROJECT_METADATA.projectCode} · All rights reserved.
          </span>
          <span className="font-mono text-[11px] text-neutral-400">
            Reproducible Scikit-Learn Euclidean Distance Matrix
          </span>
        </div>
      </div>
    </footer>
  );
};

