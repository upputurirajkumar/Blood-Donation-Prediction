import React, { useState } from 'react';
import { DonorInput } from '../types';
import { PRESET_DONOR_PROFILES } from '../data/projectData';
import { Cpu, RotateCcw, Sparkles, AlertCircle, Link2 } from 'lucide-react';

interface PredictionFormProps {
  onSubmit: (data: DonorInput) => void;
  isLoading: boolean;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<DonorInput>({
    monthsSinceLastDonation: 2,
    numberOfDonations: 12,
    totalVolumeDonated: 3000,
    monthsSinceFirstDonation: 28,
  });

  const [autoSyncVolume, setAutoSyncVolume] = useState<boolean>(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (data: DonorInput): boolean => {
    const newErrors: Record<string, string> = {};

    if (isNaN(data.monthsSinceLastDonation) || data.monthsSinceLastDonation < 0) {
      newErrors.monthsSinceLastDonation = 'Months since last donation must be 0 or greater.';
    }

    if (isNaN(data.numberOfDonations) || data.numberOfDonations < 1) {
      newErrors.numberOfDonations = 'Number of donations must be at least 1.';
    }

    if (isNaN(data.totalVolumeDonated) || data.totalVolumeDonated <= 0) {
      newErrors.totalVolumeDonated = 'Total volume donated must be greater than 0 c.c.';
    }

    if (isNaN(data.monthsSinceFirstDonation) || data.monthsSinceFirstDonation < 0) {
      newErrors.monthsSinceFirstDonation = 'Months since first donation must be 0 or greater.';
    }

    if (data.monthsSinceLastDonation > data.monthsSinceFirstDonation) {
      newErrors.monthsSinceFirstDonation = `First donation (${data.monthsSinceFirstDonation} mos) cannot be more recent than last donation (${data.monthsSinceLastDonation} mos).`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof DonorInput, rawValue: string) => {
    const val = rawValue === '' ? 0 : Number(rawValue);

    setFormData((prev) => {
      const updated = { ...prev, [field]: val };

      // Auto-sync 250 c.c. per donation if toggled
      if (field === 'numberOfDonations' && autoSyncVolume) {
        updated.totalVolumeDonated = Math.max(0, val * 250);
      }

      // If user sets last donation higher than first, auto-adjust first
      if (field === 'monthsSinceLastDonation' && val > updated.monthsSinceFirstDonation) {
        updated.monthsSinceFirstDonation = val;
      }

      validateForm(updated);
      return updated;
    });
  };

  const handlePresetSelect = (preset: typeof PRESET_DONOR_PROFILES[0]) => {
    setFormData(preset.data);
    setErrors({});
  };

  const handleReset = () => {
    const defaults = {
      monthsSinceLastDonation: 4,
      numberOfDonations: 4,
      totalVolumeDonated: 1000,
      monthsSinceFirstDonation: 16,
    };
    setFormData(defaults);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm(formData)) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-[#0b0d13] rounded-xl border border-white/[0.08] p-6 lg:p-8 space-y-6">
      {/* Header & Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
            Vector Ingestion
          </span>
          <h2 className="text-xl font-bold font-mono text-white tracking-tight mt-0.5">
            Donor Attributes
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            4 standard RFMTC features mapped directly to the StandardScaler transform
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Defaults
        </button>
      </div>

      {/* Benchmark Presets Selector */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider mb-2.5">
          <Sparkles className="w-3.5 h-3.5" />
          Benchmark Donor Profiles (1-Click Fill)
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {PRESET_DONOR_PROFILES.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => handlePresetSelect(preset)}
              className="text-left p-2.5 rounded-lg border border-white/[0.06] bg-[#0e1117] hover:border-rose-500/40 hover:bg-rose-950/20 transition-all text-xs cursor-pointer group"
            >
              <div className="font-mono font-bold text-white group-hover:text-rose-300 truncate">
                {preset.name}
              </div>
              <div className="text-[10px] text-neutral-400 mt-0.5 truncate">{preset.tag}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Prediction Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Months Since Last Donation */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="lastDonation" className="text-xs font-mono font-semibold text-neutral-200">
                Months Since Last Donation
              </label>
              <span className="text-[10px] font-mono text-neutral-400 bg-white/[0.04] border border-white/[0.06] px-1.5 py-0.5 rounded">
                months
              </span>
            </div>
            <input
              id="lastDonation"
              type="number"
              min="0"
              max="150"
              value={formData.monthsSinceLastDonation}
              onChange={(e) => handleInputChange('monthsSinceLastDonation', e.target.value)}
              className={`w-full px-3 py-2.5 rounded-lg border bg-[#0e1117] text-white font-mono text-sm transition-all focus:outline-none focus:ring-1 focus:ring-rose-500 ${
                errors.monthsSinceLastDonation ? 'border-rose-500 bg-rose-950/20' : 'border-white/[0.08]'
              }`}
              placeholder="e.g. 2"
            />
            <p className="text-[11px] text-neutral-500 leading-normal">
              Time elapsed since the most recent blood donation. Lower values indicate high recent momentum.
            </p>
            {errors.monthsSinceLastDonation && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1 font-mono">
                <AlertCircle className="w-3 h-3" />
                {errors.monthsSinceLastDonation}
              </p>
            )}
          </div>

          {/* 2. Number of Donations */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="numDonations" className="text-xs font-mono font-semibold text-neutral-200">
                Number of Previous Donations
              </label>
              <span className="text-[10px] font-mono text-neutral-400 bg-white/[0.04] border border-white/[0.06] px-1.5 py-0.5 rounded">
                count
              </span>
            </div>
            <input
              id="numDonations"
              type="number"
              min="1"
              max="100"
              value={formData.numberOfDonations}
              onChange={(e) => handleInputChange('numberOfDonations', e.target.value)}
              className={`w-full px-3 py-2.5 rounded-lg border bg-[#0e1117] text-white font-mono text-sm transition-all focus:outline-none focus:ring-1 focus:ring-rose-500 ${
                errors.numberOfDonations ? 'border-rose-500 bg-rose-950/20' : 'border-white/[0.08]'
              }`}
              placeholder="e.g. 12"
            />
            <p className="text-[11px] text-neutral-500 leading-normal">
              Cumulative donation frequency. Reflects historical donor engagement.
            </p>
            {errors.numberOfDonations && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1 font-mono">
                <AlertCircle className="w-3 h-3" />
                {errors.numberOfDonations}
              </p>
            )}
          </div>

          {/* 3. Total Volume Donated */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="volumeDonated" className="text-xs font-mono font-semibold text-neutral-200">
                Total Volume Donated
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAutoSyncVolume(!autoSyncVolume)}
                  className={`text-[10px] font-mono flex items-center gap-1 px-1.5 py-0.5 rounded border transition-colors cursor-pointer ${
                    autoSyncVolume
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : 'bg-white/[0.04] text-neutral-400 border-white/[0.08]'
                  }`}
                  title="Link volume: 1 donation = 250 c.c."
                >
                  <Link2 className="w-3 h-3" />
                  {autoSyncVolume ? 'Auto 250cc' : 'Manual'}
                </button>
                <span className="text-[10px] font-mono text-neutral-400 bg-white/[0.04] border border-white/[0.06] px-1.5 py-0.5 rounded">
                  c.c.
                </span>
              </div>
            </div>
            <input
              id="volumeDonated"
              type="number"
              min="250"
              step="250"
              max="25000"
              value={formData.totalVolumeDonated}
              onChange={(e) => {
                setAutoSyncVolume(false);
                handleInputChange('totalVolumeDonated', e.target.value);
              }}
              className={`w-full px-3 py-2.5 rounded-lg border bg-[#0e1117] text-white font-mono text-sm transition-all focus:outline-none focus:ring-1 focus:ring-rose-500 ${
                errors.totalVolumeDonated ? 'border-rose-500 bg-rose-950/20' : 'border-white/[0.08]'
              }`}
              placeholder="e.g. 3000"
            />
            <p className="text-[11px] text-neutral-500 leading-normal">
              Total volume of blood donated in cubic centimeters (typically 250 c.c. per standard donation).
            </p>
            {errors.totalVolumeDonated && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1 font-mono">
                <AlertCircle className="w-3 h-3" />
                {errors.totalVolumeDonated}
              </p>
            )}
          </div>

          {/* 4. Months Since First Donation */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="firstDonation" className="text-xs font-mono font-semibold text-neutral-200">
                Months Since First Donation
              </label>
              <span className="text-[10px] font-mono text-neutral-400 bg-white/[0.04] border border-white/[0.06] px-1.5 py-0.5 rounded">
                months
              </span>
            </div>
            <input
              id="firstDonation"
              type="number"
              min="0"
              max="200"
              value={formData.monthsSinceFirstDonation}
              onChange={(e) => handleInputChange('monthsSinceFirstDonation', e.target.value)}
              className={`w-full px-3 py-2.5 rounded-lg border bg-[#0e1117] text-white font-mono text-sm transition-all focus:outline-none focus:ring-1 focus:ring-rose-500 ${
                errors.monthsSinceFirstDonation ? 'border-rose-500 bg-rose-950/20' : 'border-white/[0.08]'
              }`}
              placeholder="e.g. 28"
            />
            <p className="text-[11px] text-neutral-500 leading-normal">
              Overall donor lifespan. Must be greater than or equal to Months Since Last Donation.
            </p>
            {errors.monthsSinceFirstDonation && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1 font-mono">
                <AlertCircle className="w-3 h-3" />
                {errors.monthsSinceFirstDonation}
              </p>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            id="predict-donation-btn"
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 active:scale-[0.99] text-white font-mono font-bold text-sm shadow-lg shadow-rose-950/50 hover:shadow-rose-900/60 transition-all disabled:opacity-60 cursor-pointer"
          >
            <Cpu className="w-4 h-4" />
            {isLoading ? 'Computing Euclidean Metric in 4D...' : 'Run Prediction Engine'}
          </button>
        </div>
      </form>
    </div>
  );
};
