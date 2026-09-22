import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { executeKNNPrediction, validateDonorInput } from './src/services/mlEngine.ts';
import { MODEL_COMPARISON_TABLE, PROJECT_METADATA, SCALER_PARAMS, KNN_CONFUSION_MATRIX } from './src/data/projectData.ts';
import mlArtifacts from './src/data/ml_artifacts.json';

// Simulated model connection flag for user testing of the 5th state: "Model unavailable"
let isModelConnected = true;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'BloodIntel ML API',
      timestamp: new Date().toISOString(),
    });
  });

  // Model Status Route
  app.get('/api/model/status', (req, res) => {
    res.json({
      connected: isModelConnected,
      model: PROJECT_METADATA.selectedModel,
      version: '1.0.0 (Scikit-learn KNN reproduction)',
      projectCode: PROJECT_METADATA.projectCode,
      dataset: PROJECT_METADATA.datasetSource,
      testAccuracy: PROJECT_METADATA.selectedModelAccuracy,
      kNeighbors: 5,
      scaler: PROJECT_METADATA.scalerType,
      trainingSamples: mlArtifacts.trainCount,
      testSamples: mlArtifacts.testCount,
      totalCleanedSamples: mlArtifacts.totalRecords,
      duplicatesRemoved: mlArtifacts.duplicatesRemoved,
      targetVariable: PROJECT_METADATA.targetVariable,
      statusMessage: isModelConnected ? 'Model loaded and operational in memory' : 'Model connection paused for resilience testing',
    });
  });

  // Toggle model connection endpoint for testing "Model unavailable" state
  app.post('/api/model/toggle-connection', (req, res) => {
    const { connected } = req.body;
    if (typeof connected === 'boolean') {
      isModelConnected = connected;
    } else {
      isModelConnected = !isModelConnected;
    }
    res.json({
      connected: isModelConnected,
      message: isModelConnected ? 'ML model service connected successfully.' : 'ML model service disconnected (testing mode).',
    });
  });

  // Main Prediction Endpoint
  app.post('/api/predict', (req, res) => {
    if (!isModelConnected) {
      return res.status(503).json({
        error: 'Prediction model is not connected.',
        details: 'The backend ML service is currently offline or unreachable. Please check model connection status.',
      });
    }

    try {
      const { monthsSinceLastDonation, numberOfDonations, totalVolumeDonated, monthsSinceFirstDonation } = req.body;

      const input = {
        monthsSinceLastDonation: Number(monthsSinceLastDonation),
        numberOfDonations: Number(numberOfDonations),
        totalVolumeDonated: Number(totalVolumeDonated),
        monthsSinceFirstDonation: Number(monthsSinceFirstDonation),
      };

      const validation = validateDonorInput(input);
      if (!validation.isValid) {
        return res.status(400).json({
          error: 'Validation Error',
          details: validation.error,
        });
      }

      const result = executeKNNPrediction(input, 5);
      return res.json(result);
    } catch (err: any) {
      return res.status(500).json({
        error: 'Unable to generate prediction.',
        details: err?.message || 'An unexpected error occurred during inference.',
      });
    }
  });

  // Models comparison data
  app.get('/api/models/comparison', (req, res) => {
    res.json({
      models: MODEL_COMPARISON_TABLE,
      confusionMatrix: KNN_CONFUSION_MATRIX,
      scaler: SCALER_PARAMS,
      metadata: PROJECT_METADATA,
    });
  });

  // Dataset summary
  app.get('/api/dataset/summary', (req, res) => {
    res.json({
      initialRecords: PROJECT_METADATA.initialRecords,
      cleanedRecords: PROJECT_METADATA.cleanedRecords,
      duplicatesRemoved: PROJECT_METADATA.duplicatesRemoved,
      missingValues: PROJECT_METADATA.missingValues,
      trainCount: mlArtifacts.trainCount,
      testCount: mlArtifacts.testCount,
      scalerParams: SCALER_PARAMS,
    });
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BloodIntel Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
