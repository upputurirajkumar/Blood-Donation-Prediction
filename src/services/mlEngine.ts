import { DonorInput, PredictionResultData, NearestNeighborInfo } from '../types';
import { SCALER_PARAMS, PROJECT_METADATA } from '../data/projectData';
import mlArtifacts from '../data/ml_artifacts.json';

interface ScaledRecord {
  features: [number, number, number, number];
  raw: DonorInput;
  label: 0 | 1;
  index: number;
}

// Pre-scale training dataset in memory for instant O(N) evaluation (N=338)
const scaledTrainSet: ScaledRecord[] = mlArtifacts.trainSet.map((record, index) => {
  const s0 = (record.monthsSinceLastDonation - SCALER_PARAMS.monthsSinceLastDonation.mean) / SCALER_PARAMS.monthsSinceLastDonation.std;
  const s1 = (record.numberOfDonations - SCALER_PARAMS.numberOfDonations.mean) / SCALER_PARAMS.numberOfDonations.std;
  const s2 = (record.totalVolumeDonated - SCALER_PARAMS.totalVolumeDonated.mean) / SCALER_PARAMS.totalVolumeDonated.std;
  const s3 = (record.monthsSinceFirstDonation - SCALER_PARAMS.monthsSinceFirstDonation.mean) / SCALER_PARAMS.monthsSinceFirstDonation.std;

  return {
    features: [s0, s1, s2, s3],
    raw: {
      monthsSinceLastDonation: record.monthsSinceLastDonation,
      numberOfDonations: record.numberOfDonations,
      totalVolumeDonated: record.totalVolumeDonated,
      monthsSinceFirstDonation: record.monthsSinceFirstDonation,
    },
    label: record.madeDonationInMarch2007 as 0 | 1,
    index,
  };
});

export function validateDonorInput(input: DonorInput): { isValid: boolean; error?: string } {
  if (typeof input.monthsSinceLastDonation !== 'number' || isNaN(input.monthsSinceLastDonation) || input.monthsSinceLastDonation < 0) {
    return { isValid: false, error: 'Months Since Last Donation must be a non-negative number.' };
  }
  if (typeof input.numberOfDonations !== 'number' || isNaN(input.numberOfDonations) || input.numberOfDonations < 1) {
    return { isValid: false, error: 'Number of Donations must be at least 1 donation.' };
  }
  if (typeof input.totalVolumeDonated !== 'number' || isNaN(input.totalVolumeDonated) || input.totalVolumeDonated <= 0) {
    return { isValid: false, error: 'Total Volume Donated must be greater than 0 c.c.' };
  }
  if (typeof input.monthsSinceFirstDonation !== 'number' || isNaN(input.monthsSinceFirstDonation) || input.monthsSinceFirstDonation < 0) {
    return { isValid: false, error: 'Months Since First Donation must be a non-negative number.' };
  }
  if (input.monthsSinceLastDonation > input.monthsSinceFirstDonation) {
    return {
      isValid: false,
      error: `Validation conflict: Months Since Last Donation (${input.monthsSinceLastDonation}) cannot exceed Months Since First Donation (${input.monthsSinceFirstDonation}).`,
    };
  }

  return { isValid: true };
}

export function executeKNNPrediction(input: DonorInput, k = 5): PredictionResultData {
  const startTime = performance.now();

  const validation = validateDonorInput(input);
  if (!validation.isValid) {
    throw new Error(validation.error || 'Invalid donor input provided.');
  }

  // 1. Exact StandardScaler Transformation
  const scaled0 = (input.monthsSinceLastDonation - SCALER_PARAMS.monthsSinceLastDonation.mean) / SCALER_PARAMS.monthsSinceLastDonation.std;
  const scaled1 = (input.numberOfDonations - SCALER_PARAMS.numberOfDonations.mean) / SCALER_PARAMS.numberOfDonations.std;
  const scaled2 = (input.totalVolumeDonated - SCALER_PARAMS.totalVolumeDonated.mean) / SCALER_PARAMS.totalVolumeDonated.std;
  const scaled3 = (input.monthsSinceFirstDonation - SCALER_PARAMS.monthsSinceFirstDonation.mean) / SCALER_PARAMS.monthsSinceFirstDonation.std;

  const targetVector: [number, number, number, number] = [scaled0, scaled1, scaled2, scaled3];

  // 2. Compute Euclidean Distance (Minkowski p=2) to each training record
  const distances: { dist: number; record: ScaledRecord }[] = scaledTrainSet.map((record) => {
    const d0 = targetVector[0] - record.features[0];
    const d1 = targetVector[1] - record.features[1];
    const d2 = targetVector[2] - record.features[2];
    const d3 = targetVector[3] - record.features[3];
    const euclidean = Math.sqrt(d0 * d0 + d1 * d1 + d2 * d2 + d3 * d3);

    return { dist: euclidean, record };
  });

  // Sort ascending by Euclidean distance
  distances.sort((a, b) => a.dist - b.dist);

  // 3. Select top-k Nearest Neighbors
  const topK = distances.slice(0, k);

  const nearestNeighbors: NearestNeighborInfo[] = topK.map((item) => ({
    index: item.record.index,
    distance: Math.round(item.dist * 1000) / 1000,
    label: item.record.label,
    monthsSinceLastDonation: item.record.raw.monthsSinceLastDonation,
    numberOfDonations: item.record.raw.numberOfDonations,
    totalVolumeDonated: item.record.raw.totalVolumeDonated,
    monthsSinceFirstDonation: item.record.raw.monthsSinceFirstDonation,
  }));

  // 4. Probability & Classification Decision
  const positiveVotesCount = topK.filter((item) => item.record.label === 1).length;
  const negativeVotesCount = k - positiveVotesCount;
  const probability = positiveVotesCount / k;
  const prediction: 0 | 1 = probability >= 0.5 ? 1 : 0;
  const isLikely = prediction === 1;

  // 5. RFM Interpretability Engine
  const recencyImpact: 'favorable' | 'unfavorable' | 'neutral' =
    input.monthsSinceLastDonation <= 4 ? 'favorable' : input.monthsSinceLastDonation > 12 ? 'unfavorable' : 'neutral';

  const frequencyImpact: 'favorable' | 'unfavorable' | 'neutral' =
    input.numberOfDonations >= 8 ? 'favorable' : input.numberOfDonations <= 2 ? 'unfavorable' : 'neutral';

  const longevityImpact: 'favorable' | 'unfavorable' | 'neutral' =
    input.monthsSinceFirstDonation >= 24 && input.numberOfDonations > 3 ? 'favorable' : 'neutral';

  let summaryNotes = '';
  if (isLikely) {
    summaryNotes = `The KNN algorithm identified ${positiveVotesCount} of ${k} nearest historical donor records who donated in March 2007. Key predictive driver: ${
      recencyImpact === 'favorable' ? 'recent donation recency' : 'strong historical donation frequency'
    }.`;
  } else {
    summaryNotes = `The KNN algorithm identified ${negativeVotesCount} of ${k} nearest historical donor records who did not donate in the target period. Key factor: ${
      recencyImpact === 'unfavorable' ? 'extended lapse since last donation' : 'lower overall donation frequency'
    }.`;
  }

  const endTime = performance.now();
  const latencyMs = Math.max(1, Math.round(endTime - startTime));

  return {
    prediction,
    predictionLabel: isLikely ? 'Likely to Donate Blood (Class 1)' : 'Unlikely to Donate Blood (Class 0)',
    isLikely,
    probability,
    confidencePercentage: Math.round(Math.max(probability, 1 - probability) * 100),
    modelName: PROJECT_METADATA.selectedModel,
    modelType: 'Instance-based Classification (k=5)',
    kNeighbors: k,
    inputSummary: { ...input },
    scaledInput: {
      monthsSinceLastDonation: Math.round(scaled0 * 1000) / 1000,
      numberOfDonations: Math.round(scaled1 * 1000) / 1000,
      totalVolumeDonated: Math.round(scaled2 * 1000) / 1000,
      monthsSinceFirstDonation: Math.round(scaled3 * 1000) / 1000,
    },
    nearestNeighbors,
    positiveVotesCount,
    negativeVotesCount,
    latencyMs,
    timestamp: new Date().toISOString(),
    interpretation: {
      recencyImpact,
      frequencyImpact,
      longevityImpact,
      summaryNotes,
    },
  };
}
