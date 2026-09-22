import React, { useState, useEffect } from 'react';
import { PredictionForm } from '../components/PredictionForm';
import { PredictionResultCard } from '../components/PredictionResultCard';
import { DonorInput, PredictionState, ModelConnectionStatus } from '../types';
import { predictionService, ModelUnavailableError } from '../services/predictionService';
import { PROJECT_METADATA } from '../data/projectData';
import { Cpu, ShieldCheck, ToggleLeft, ToggleRight, Info, Sparkles } from 'lucide-react';

export const PredictionPage: React.FC = () => {
  const [predictionState, setPredictionState] = useState<PredictionState>({ status: 'idle' });
  const [lastInput, setLastInput] = useState<DonorInput | null>(null);
  const [modelStatus, setModelStatus] = useState<ModelConnectionStatus | null>(null);
  const [isToggling, setIsToggling] = useState(false);

  const fetchModelStatus = async () => {
    try {
      const status = await predictionService.getModelStatus();
      setModelStatus(status);
    } catch {
      setModelStatus(null);
    }
  };

  useEffect(() => {
    fetchModelStatus();
  }, []);

  const handlePredict = async (data: DonorInput) => {
    setLastInput(data);
    setPredictionState({ status: 'loading' });

    try {
      // Execute inference via the abstracted predictionService
      const result = await predictionService.predict(data);
      setPredictionState({ status: 'success', data: result });
    } catch (err: any) {
      if (err instanceof ModelUnavailableError || err.message?.includes('not connected')) {
        setPredictionState({
          status: 'unavailable',
          message: 'Prediction model is not connected.',
        });
      } else {
        setPredictionState({
          status: 'error',
          message: 'Unable to generate prediction.',
          details: err?.message || 'Inference could not be completed.',
        });
      }
    }
  };

  const handleToggleConnection = async () => {
    if (!modelStatus) return;
    setIsToggling(true);
    try {
      const nextConnected = !modelStatus.connected;
      await predictionService.toggleConnection(nextConnected);
      await fetchModelStatus();

      // If we just disconnected, and currently idle or predicting, reflect state
      if (!nextConnected) {
        setPredictionState({
          status: 'unavailable',
          message: 'Prediction model is not connected.',
        });
      } else {
        setPredictionState({ status: 'idle' });
      }
    } catch (err) {
      console.error('Failed to toggle connection:', err);
    } finally {
      setIsToggling(false);
    }
  };

  const handleRetry = () => {
    if (lastInput) {
      handlePredict(lastInput);
    } else {
      setPredictionState({ status: 'idle' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
              REAL-TIME INFERENCE STUDIO
            </span>
            <span className="text-xs text-neutral-400 font-mono">KNN (k=5) · Euclidean 4D</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Donor Propensity Prediction Studio
          </h1>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
            Ingest donor RFMTC parameters, project onto the standardized coordinate space, and execute
            k-nearest neighbors consensus classification with probability diagnostics.
          </p>
        </div>

        {/* Model Connection Controller / Diagnostic Pill */}
        <div className="bg-[#0b0d13] rounded-xl p-3.5 border border-white/[0.08] shadow-lg flex items-center justify-between sm:justify-end gap-4 shrink-0">
          <div className="text-left font-mono">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  modelStatus?.connected ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-amber-400'
                }`}
              />
              <span className="text-xs font-bold text-white">
                {modelStatus?.connected ? 'Engine Online' : 'Engine Offline'}
              </span>
            </div>
            <div className="text-[10px] text-neutral-400 mt-0.5">
              Acc: {PROJECT_METADATA.selectedModelAccuracy} · 338 Vectors
            </div>
          </div>

          <button
            onClick={handleToggleConnection}
            disabled={isToggling}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-white/[0.08] bg-[#0e1117] hover:bg-white/[0.04] text-neutral-300 transition-colors cursor-pointer"
            title="Toggle connection to test the graceful 'Model unavailable' failure state"
          >
            {modelStatus?.connected ? (
              <>
                <ToggleRight className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px]">Test Disconnect</span>
              </>
            ) : (
              <>
                <ToggleLeft className="w-4 h-4 text-amber-400" />
                <span className="text-[11px]">Reconnect</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Form on Left, Results on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-6">
          <PredictionForm
            onSubmit={handlePredict}
            isLoading={predictionState.status === 'loading'}
          />
        </div>

        {/* Result Column */}
        <div className="lg:col-span-6">
          <PredictionResultCard
            state={predictionState}
            onRetry={handleRetry}
            onReconnect={handleToggleConnection}
          />
        </div>
      </div>

      {/* Methodology Context Note */}
      <div className="bg-[#0b0d13] rounded-xl p-5 border border-white/[0.08] text-xs text-neutral-400 flex items-start gap-3">
        <Info className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-mono font-semibold text-white">Scikit-Learn Reproduction Pipeline</div>
          <p className="leading-relaxed">
            The prediction request applies the exact StandardScaler parameters (mean & standard deviation) trained on the 338 training records of dataset <strong className="text-white">{PROJECT_METADATA.datasetSource}</strong>. The K-Nearest Neighbors classifier evaluates Euclidean distances in 4D standardized space across all training vectors and tallies the proportion of repeat donors among the 5 nearest historical records.
          </p>
        </div>
      </div>
    </div>
  );
};
