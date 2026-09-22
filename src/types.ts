export type NavigationTab = 'overview' | 'data' | 'models' | 'predict' | 'insights' | 'about';

export interface DatasetFeatureStats {
  id: string;
  name: string;
  mean: number;
  median: number;
  std: number;
  min: number;
  max: number;
  q25: number;
  q75: number;
  unit: string;
  bins: { range: string; count: number; countClass0: number; countClass1: number }[];
}

export interface DonorInput {
  monthsSinceLastDonation: number;
  numberOfDonations: number;
  totalVolumeDonated: number;
  monthsSinceFirstDonation: number;
}

export interface ScalerParams {
  mean: number;
  std: number;
}

export interface ScalerFeatureMap {
  monthsSinceLastDonation: ScalerParams;
  numberOfDonations: ScalerParams;
  totalVolumeDonated: ScalerParams;
  monthsSinceFirstDonation: ScalerParams;
}

export interface NearestNeighborInfo {
  index: number;
  distance: number;
  label: 0 | 1;
  monthsSinceLastDonation: number;
  numberOfDonations: number;
  totalVolumeDonated: number;
  monthsSinceFirstDonation: number;
}

export interface PredictionResultData {
  prediction: 0 | 1;
  predictionLabel: string;
  isLikely: boolean;
  probability: number; // Positive class probability (votes / k)
  confidencePercentage: number;
  modelName: string;
  modelType: string;
  kNeighbors: number;
  inputSummary: DonorInput;
  scaledInput: {
    monthsSinceLastDonation: number;
    numberOfDonations: number;
    totalVolumeDonated: number;
    monthsSinceFirstDonation: number;
  };
  nearestNeighbors: NearestNeighborInfo[];
  positiveVotesCount: number;
  negativeVotesCount: number;
  latencyMs: number;
  timestamp: string;
  interpretation: {
    recencyImpact: 'favorable' | 'unfavorable' | 'neutral';
    frequencyImpact: 'favorable' | 'unfavorable' | 'neutral';
    longevityImpact: 'favorable' | 'unfavorable' | 'neutral';
    summaryNotes: string;
  };
}

export type PredictionState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: PredictionResultData }
  | { status: 'error'; message: string; details?: string }
  | { status: 'unavailable'; message: string };

export interface ModelMetricRow {
  model: string;
  trainAccuracy: number;
  testAccuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc: number;
  isBest?: boolean;
  notes?: string;
}

export interface DatasetSummary {
  originalRows: number;
  columns: number;
  cleanRows: number;
  duplicatesRemoved: number;
  missingValues: number;
  trainSamples: number;
  testSamples: number;
  class0Count: number;
  class1Count: number;
  class0Pct: number;
  class1Pct: number;
}

export interface ModelConnectionStatus {
  connected: boolean;
  model: string;
  version: string;
  dataset: string;
  testAccuracy: string;
  kNeighbors: number;
  scaler: string;
  trainingSamples: number;
  testSamples: number;
  latency: number;
}
