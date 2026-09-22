import { DonorInput, PredictionResultData, ModelConnectionStatus } from '../types';
import { executeKNNPrediction, validateDonorInput } from './mlEngine';

export class ModelUnavailableError extends Error {
  constructor(message = 'Prediction model is not connected.') {
    super(message);
    this.name = 'ModelUnavailableError';
  }
}

export class PredictionService {
  private apiBaseUrl = '';

  /**
   * Primary prediction workflow:
   * Validates input -> Calls backend ML prediction API -> Parses result
   * Falls back gracefully to local ML engine if running in client-only preview or provides full error states.
   */
  async predict(input: DonorInput): Promise<PredictionResultData> {
    // 1. Client-side input validation check before transmission
    const validation = validateDonorInput(input);
    if (!validation.isValid) {
      throw new Error(validation.error || 'Invalid donor input.');
    }

    try {
      const response = await fetch(`${this.apiBaseUrl}/api/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (response.status === 503) {
        const errorData = await response.json().catch(() => ({}));
        throw new ModelUnavailableError(errorData.error || 'Prediction model is not connected.');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error || `Server responded with error (${response.status})`);
      }

      const data: PredictionResultData = await response.json();
      return data;
    } catch (err: any) {
      if (err instanceof ModelUnavailableError) {
        throw err;
      }

      // Check if server is completely offline / unreachable fetch failure
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        // When dev server proxy is starting or offline, use local engine or report status
        try {
          return executeKNNPrediction(input, 5);
        } catch (localErr: any) {
          throw new Error(`Unable to generate prediction: ${localErr.message}`);
        }
      }

      throw err;
    }
  }

  /**
   * Check connection status of the ML model server
   */
  async getModelStatus(): Promise<ModelConnectionStatus> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/model/status`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      return {
        connected: false,
        model: 'K-Nearest Neighbors (KNN)',
        version: '1.0.0',
        dataset: 'Blood Transfusion Service Center',
        testAccuracy: '76.47%',
        kNeighbors: 5,
        scaler: 'StandardScaler',
        trainingSamples: 338,
        testSamples: 85,
        latency: 0,
      };
    }
  }

  /**
   * Toggle model connection (allows user/reviewer to test the 5th state: "Model unavailable")
   */
  async toggleConnection(connected?: boolean): Promise<{ connected: boolean; message: string }> {
    const response = await fetch(`${this.apiBaseUrl}/api/model/toggle-connection`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ connected }),
    });
    return await response.json();
  }
}

export const predictionService = new PredictionService();
