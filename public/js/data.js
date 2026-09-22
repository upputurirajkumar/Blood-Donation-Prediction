/**
 * BLOODINTEL — Official Project Data & Machine Learning Artifacts
 * Grounded in Capstone PRCP-1011 (Blood Donation Prediction)
 */

window.BLOODINTEL_DATA = {
  metadata: {
    name: 'BloodIntel',
    subtitle: 'Blood Donation Prediction Intelligence',
    projectCode: 'PRCP-1011-BloodDonaPred',
    domain: 'Healthcare Analytics & Blood Supply Operations',
    task: 'Binary Classification (Repeat Donor Propensity)',
    targetVariable: 'Made Donation in March 2007',
    targetClasses: {
      0: 'Did Not Donate Blood (0)',
      1: 'Donated Blood (1)'
    },
    datasetSource: 'Blood Transfusion Service Center (Hsin-Chu City, Taiwan)',
    initialRecords: 576,
    initialColumns: 6,
    cleanedRecords: 423,
    duplicatesRemoved: 153,
    missingValues: 0,
    splitRatio: '80% Train (338 samples) / 20% Test (85 samples) — Stratified (random_state=42)',
    scalerType: 'StandardScaler (Fitted strictly on Training set to prevent data leakage)',
    selectedModel: 'K-Nearest Neighbors (KNN)',
    selectedModelParams: 'k = 5, metric = Euclidean (Minkowski p=2), weights = uniform',
    selectedModelAccuracy: '76.47%',
    selectedModelF1: '0.4118',
    selectedModelPrecision: '0.7000',
    selectedModelRecall: '0.2917',
    selectedModelRocAuc: '0.7420'
  },

  scaler: {
  "monthsSinceLastDonation": {
    "mean": 9.437869822485206,
    "std": 8.593928513588143
  },
  "numberOfDonations": {
    "mean": 6.514792899408284,
    "std": 6.250307929811491
  },
  "totalVolumeDonated": {
    "mean": 1628.698224852071,
    "std": 1562.5769824528707
  },
  "monthsSinceFirstDonation": {
    "mean": 39.84615384615385,
    "std": 23.00038589848636
  }
},

  testMetrics: {
  "trainAccuracy": 0.784,
  "testAccuracy": 0.7647,
  "precision": 0.7,
  "recall": 0.2917,
  "f1Score": 0.4118,
  "confusionMatrix": {
    "tn": 58,
    "fp": 3,
    "fn": 17,
    "tp": 7
  }
},

  models: [
    {
      id: 'knn',
      name: 'K-Nearest Neighbors (KNN)',
      type: 'Instance-Based Metric Learning',
      trainAccuracy: 0.7840,
      testAccuracy: 0.7647,
      precision: 0.7000,
      recall: 0.2917,
      f1Score: 0.4118,
      rocAuc: 0.7420,
      isBest: true,
      parameters: 'k=5, L2 Euclidean distance, uniform weights, StandardScaler',
      overfittingDelta: '1.93%',
      decisionBoundary: 'Locally adaptive manifold based on 5-nearest neighbor clustering in standardized 4D space',
      rationale: 'Champion Model: Highest test accuracy (76.47%), highest precision on return donors (70.0%), and lowest train-test generalization gap.'
    },
    {
      id: 'logreg',
      name: 'Logistic Regression',
      type: 'Linear Probabilistic Classifier',
      trainAccuracy: 0.7633,
      testAccuracy: 0.7529,
      precision: 0.6667,
      recall: 0.2500,
      f1Score: 0.3636,
      rocAuc: 0.7580,
      isBest: false,
      parameters: 'C=1.0, L2 penalty, solver=lbfgs, StandardScaler',
      overfittingDelta: '1.04%',
      decisionBoundary: 'Linear hyperplane separating feature space; strong negative weight on recency',
      rationale: 'Solid calibrated probability baseline, but lower positive test recall (25.0%) and accuracy than KNN.'
    },
    {
      id: 'svm',
      name: 'Support Vector Machine (SVM)',
      type: 'Kernelized Maximum Margin',
      trainAccuracy: 0.7722,
      testAccuracy: 0.7529,
      precision: 0.6667,
      recall: 0.2500,
      f1Score: 0.3636,
      rocAuc: 0.7390,
      isBest: false,
      parameters: 'C=1.0, kernel=rbf, probability=True, StandardScaler',
      overfittingDelta: '1.93%',
      decisionBoundary: 'Radial basis function boundary with support vector weighting',
      rationale: 'Robust margin maximization matching Logistic Regression on test holdout; slightly trailed KNN on decision boundary sensitivity.'
    },
    {
      id: 'gb',
      name: 'Gradient Boosting',
      type: 'Sequential Tree Ensemble',
      trainAccuracy: 0.8521,
      testAccuracy: 0.7412,
      precision: 0.5833,
      recall: 0.2917,
      f1Score: 0.3889,
      rocAuc: 0.7280,
      isBest: false,
      parameters: 'n_estimators=100, learning_rate=0.1, max_depth=3',
      overfittingDelta: '11.09%',
      decisionBoundary: 'Additive shallow decision trees minimizing logistic deviance loss',
      rationale: 'Moderate boosting performance with higher variance and notable train-test spread.'
    },
    {
      id: 'rf',
      name: 'Random Forest',
      type: 'Bagged Tree Ensemble',
      trainAccuracy: 0.9497,
      testAccuracy: 0.7294,
      precision: 0.5333,
      recall: 0.3333,
      f1Score: 0.4103,
      rocAuc: 0.7180,
      isBest: false,
      parameters: 'n_estimators=100, criterion=gini, bootstrap=True',
      overfittingDelta: '22.03%',
      decisionBoundary: 'Majority vote across unpruned decision trees',
      rationale: 'Severe Overfitting: High training memorization (94.97%) collapsing to 72.94% on test holdout.'
    },
    {
      id: 'nb',
      name: 'Naive Bayes (Gaussian)',
      type: 'Conditional Independence Bayes',
      trainAccuracy: 0.7515,
      testAccuracy: 0.7294,
      precision: 0.5556,
      recall: 0.2083,
      f1Score: 0.3030,
      rocAuc: 0.7310,
      isBest: false,
      parameters: 'Gaussian prior distributions',
      overfittingDelta: '2.21%',
      decisionBoundary: 'Quadratic Gaussian density contours',
      rationale: 'Assumption violation: Exact collinearity between Frequency and Volume (1.00) undermined feature independence.'
    },
    {
      id: 'dt',
      name: 'Decision Tree',
      type: 'Recursive Greedy Partitioning',
      trainAccuracy: 0.9497,
      testAccuracy: 0.6824,
      precision: 0.4348,
      recall: 0.4167,
      f1Score: 0.4255,
      rocAuc: 0.6014,
      isBest: false,
      parameters: 'criterion=gini, max_depth=None (unpruned)',
      overfittingDelta: '26.73%',
      decisionBoundary: 'Orthogonal axis-aligned hyperplanes with deep branch splits',
      rationale: 'Severe Overfitting: Lowest test accuracy (68.24%) and poor ROC-AUC (0.6014) due to deep training leaf memorization.'
    }
  ],

  correlationMatrix: [
    { featureA: 'Recency', featureB: 'Frequency', value: -0.19, type: 'Mild Negative' },
    { featureA: 'Recency', featureB: 'Volume', value: -0.19, type: 'Mild Negative' },
    { featureA: 'Recency', featureB: 'Time (First)', value: 0.17, type: 'Mild Positive' },
    { featureA: 'Recency', featureB: 'Target', value: -0.27, type: 'Moderate Negative (Strongest Predictor)' },
    { featureA: 'Frequency', featureB: 'Volume', value: 1.00, type: 'Collinear (Exact 250 c.c./donation)' },
    { featureA: 'Frequency', featureB: 'Time (First)', value: 0.63, type: 'Strong Positive' },
    { featureA: 'Frequency', featureB: 'Target', value: 0.22, type: 'Moderate Positive' },
    { featureA: 'Volume', featureB: 'Target', value: 0.22, type: 'Moderate Positive' },
    { featureA: 'Time (First)', featureB: 'Target', value: -0.03, type: 'Near Zero / Weak' }
  ],

  correlations5x5: {
    features: ['Recency', 'Frequency', 'Volume', 'Time', 'Target'],
    matrix: [
      [1.00, -0.19, -0.19,  0.17, -0.27],
      [-0.19, 1.00,  1.00,  0.63,  0.22],
      [-0.19, 1.00,  1.00,  0.63,  0.22],
      [ 0.17, 0.63,  0.63,  1.00, -0.03],
      [-0.27, 0.22,  0.22, -0.03,  1.00]
    ]
  },

  rocData: [
    { fpr: 0.00, tprKnn: 0.00, tprLogReg: 0.00, tprRandomForest: 0.00, tprTree: 0.00 },
    { fpr: 0.05, tprKnn: 0.22, tprLogReg: 0.28, tprRandomForest: 0.18, tprTree: 0.15 },
    { fpr: 0.10, tprKnn: 0.38, tprLogReg: 0.44, tprRandomForest: 0.32, tprTree: 0.25 },
    { fpr: 0.20, tprKnn: 0.58, tprLogReg: 0.61, tprRandomForest: 0.50, tprTree: 0.42 },
    { fpr: 0.30, tprKnn: 0.72, tprLogReg: 0.73, tprRandomForest: 0.65, tprTree: 0.52 },
    { fpr: 0.40, tprKnn: 0.81, tprLogReg: 0.82, tprRandomForest: 0.74, tprTree: 0.58 },
    { fpr: 0.50, tprKnn: 0.87, tprLogReg: 0.88, tprRandomForest: 0.81, tprTree: 0.65 },
    { fpr: 0.60, tprKnn: 0.92, tprLogReg: 0.93, tprRandomForest: 0.88, tprTree: 0.72 },
    { fpr: 0.80, tprKnn: 0.97, tprLogReg: 0.97, tprRandomForest: 0.95, tprTree: 0.84 },
    { fpr: 1.00, tprKnn: 1.00, tprLogReg: 1.00, tprRandomForest: 1.00, tprTree: 1.00 }
  ],

  campaignStrategies: [
    {
      tier: 'Tier 1: Prime Re-Donors',
      code: 'PRIME',
      criteria: 'Recency ≤ 4 months & Frequency ≥ 4 donations',
      signal: 'High Recency + Proven Habituation',
      predictedLikelihood: 'High (60% – 100% KNN vote)',
      recommendedAction: 'Direct Personalized SMS / Mobile App Push',
      timing: 'Immediately at 56-day whole-blood eligibility mark',
      businessRationale: 'Maximum conversion efficiency. Donors are in active donation cycle with low friction to schedule appointment.'
    },
    {
      tier: 'Tier 2: Recent First-Timers',
      code: 'NEWBIE',
      criteria: 'Recency ≤ 4 months & Frequency = 1 (Time = Recency)',
      signal: 'High Recency + Zero Prior Habituation',
      predictedLikelihood: 'Moderate-High (40% – 60%)',
      recommendedAction: 'Milestone Recognition & Impact Storytelling',
      timing: 'Within 6–8 weeks post-donation',
      businessRationale: 'Critical retention bridge. Converting first-time donors to second donation increases lifetime retention by over 300%.'
    },
    {
      tier: 'Tier 3: Lapsed Champions',
      code: 'LAPSED',
      criteria: 'Recency 10–24 months & Frequency ≥ 10 donations',
      signal: 'High Historical Affinity + Temporary Attrition',
      predictedLikelihood: 'Moderate (20% – 40%)',
      recommendedAction: "Dedicated 'Welcome Back' Warm Outreach & Need Urgency Notice",
      timing: 'Pre-holiday or summer supply dip campaigns',
      businessRationale: 'Prior champions who still identify with the cause; require targeted reactivation rather than generic marketing blasts.'
    },
    {
      tier: 'Tier 4: Long-Dormant / Low-Volume',
      code: 'DORMANT',
      criteria: 'Recency > 24 months & Frequency ≤ 2 donations',
      signal: 'High Cold Friction + Negligible Historical Habit',
      predictedLikelihood: 'Low (0% – 20% KNN vote)',
      recommendedAction: 'Low-cost Digital Re-engagement or Suppress from SMS',
      timing: 'Broad annual community awareness drives only',
      businessRationale: 'Prevents wasteful telemarketing and SMS budget allocation; saves outreach bandwidth for higher-yield tiers.'
    }
  ],

  archetypes: [
    {
      name: 'Frequent Active Donor',
      tag: 'High Likelihood (Class 1)',
      badgeClass: 'badge-high',
      description: 'Donated 2 months ago, total 16 donations over 35 months. Strong donor momentum and high probability.',
      data: {
        monthsSinceLastDonation: 2,
        numberOfDonations: 16,
        totalVolumeDonated: 4000,
        monthsSinceFirstDonation: 35
      }
    },
    {
      name: 'First-Time Recent Donor',
      tag: 'Retention Target (Borderline)',
      badgeClass: 'badge-medium',
      description: 'First donation made 2 months ago (250 c.c.). Critical bridge candidate for second donation retention.',
      data: {
        monthsSinceLastDonation: 2,
        numberOfDonations: 1,
        totalVolumeDonated: 250,
        monthsSinceFirstDonation: 2
      }
    },
    {
      name: 'Lapsed Long-Term Donor',
      tag: 'Re-engagement (Class 0)',
      badgeClass: 'badge-medium',
      description: 'High historical volume (20 donations), but 16 months since last donation. Habit interrupted.',
      data: {
        monthsSinceLastDonation: 16,
        numberOfDonations: 20,
        totalVolumeDonated: 5000,
        monthsSinceFirstDonation: 64
      }
    },
    {
      name: 'Dormant Historical Donor',
      tag: 'Low Likelihood (Class 0)',
      badgeClass: 'badge-low',
      description: 'Long lapse of 26 months with only 2 prior donations registered 45 months ago. Cold outreach.',
      data: {
        monthsSinceLastDonation: 26,
        numberOfDonations: 2,
        totalVolumeDonated: 500,
        monthsSinceFirstDonation: 45
      }
    }
  ],

  featureDistributions: [
    {
      id: 'recency',
      name: 'Months Since Last Donation (Recency)',
      mean: 9.51,
      median: 9.0,
      std: 8.70,
      min: 0,
      max: 74,
      unit: 'months',
      bins: [
        { range: '0–3m', count: 148, pct: 35.0, class1Rate: 44.6 },
        { range: '4–8m', count: 96, pct: 22.7, class1Rate: 26.0 },
        { range: '9–14m', count: 88, pct: 20.8, class1Rate: 14.8 },
        { range: '15–23m', count: 61, pct: 14.4, class1Rate: 16.4 },
        { range: '24m+', count: 30, pct: 7.1, class1Rate: 13.3 }
      ]
    },
    {
      id: 'frequency',
      name: 'Number of Previous Donations (Frequency)',
      mean: 6.81,
      median: 4.0,
      std: 6.45,
      min: 1,
      max: 50,
      unit: 'donations',
      bins: [
        { range: '1–2', count: 182, pct: 43.0, class1Rate: 19.8 },
        { range: '3–6', count: 114, pct: 27.0, class1Rate: 29.8 },
        { range: '7–12', count: 72, pct: 17.0, class1Rate: 33.3 },
        { range: '13–20', count: 37, pct: 8.7, class1Rate: 40.5 },
        { range: '21+', count: 18, pct: 4.3, class1Rate: 50.0 }
      ]
    },
    {
      id: 'volume',
      name: 'Total Volume Donated (Volume)',
      mean: 1703.4,
      median: 1000.0,
      std: 1612.25,
      min: 250,
      max: 12500,
      unit: 'c.c.',
      bins: [
        { range: '250–500', count: 182, pct: 43.0, class1Rate: 19.8 },
        { range: '750–1500', count: 114, pct: 27.0, class1Rate: 29.8 },
        { range: '1750–3000', count: 72, pct: 17.0, class1Rate: 33.3 },
        { range: '3250–5000', count: 37, pct: 8.7, class1Rate: 40.5 },
        { range: '5250+', count: 18, pct: 4.3, class1Rate: 50.0 }
      ]
    },
    {
      id: 'time',
      name: 'Months Since First Donation (Longevity)',
      mean: 42.29,
      median: 34.0,
      std: 23.99,
      min: 2,
      max: 98,
      unit: 'months',
      bins: [
        { range: '0–12m', count: 62, pct: 14.7, class1Rate: 29.0 },
        { range: '13–28m', count: 112, pct: 26.5, class1Rate: 26.8 },
        { range: '29–50m', count: 124, pct: 29.3, class1Rate: 29.0 },
        { range: '51–72m', count: 83, pct: 19.6, class1Rate: 27.7 },
        { range: '73m+', count: 42, pct: 9.9, class1Rate: 26.2 }
      ]
    }
  ],

  // Full 338 Verified Training Records from Stratified 80% Split (random_state=42)
  trainSet: [{"monthsSinceLastDonation":9,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":26,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":14,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":12,"numberOfDonations":11,"totalVolumeDonated":2750,"monthsSinceFirstDonation":39,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":43,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":28,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":0,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":4,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":21,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":35,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":22,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":1,"totalVolumeDonated":250,"monthsSinceFirstDonation":14,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":16,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":40,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":14,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":16,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":46,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":23,"numberOfDonations":19,"totalVolumeDonated":4750,"monthsSinceFirstDonation":62,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":16,"numberOfDonations":12,"totalVolumeDonated":3000,"monthsSinceFirstDonation":50,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":6,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":14,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":43,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":7,"numberOfDonations":11,"totalVolumeDonated":2750,"monthsSinceFirstDonation":89,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":9,"totalVolumeDonated":2250,"monthsSinceFirstDonation":40,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":10,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":38,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":22,"totalVolumeDonated":5500,"monthsSinceFirstDonation":98,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":23,"numberOfDonations":1,"totalVolumeDonated":250,"monthsSinceFirstDonation":23,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":9,"numberOfDonations":9,"totalVolumeDonated":2250,"monthsSinceFirstDonation":45,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":16,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":16,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":23,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":23,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":33,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":4,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":21,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":21,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":9,"totalVolumeDonated":2250,"monthsSinceFirstDonation":36,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":16,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":86,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":11,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":64,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":74,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":21,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":70,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":1,"numberOfDonations":13,"totalVolumeDonated":3250,"monthsSinceFirstDonation":47,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":0,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":4,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":9,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":73,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":23,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":53,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":23,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":23,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":1,"numberOfDonations":9,"totalVolumeDonated":2250,"monthsSinceFirstDonation":51,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":23,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":33,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":27,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":23,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":58,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":7,"numberOfDonations":12,"totalVolumeDonated":3000,"monthsSinceFirstDonation":86,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":11,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":46,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":16,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":38,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":40,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":12,"numberOfDonations":11,"totalVolumeDonated":2750,"monthsSinceFirstDonation":23,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":18,"totalVolumeDonated":4500,"monthsSinceFirstDonation":78,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":28,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":9,"numberOfDonations":9,"totalVolumeDonated":2250,"monthsSinceFirstDonation":38,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":14,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":35,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":11,"totalVolumeDonated":2750,"monthsSinceFirstDonation":26,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":23,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":39,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":77,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":61,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":9,"numberOfDonations":1,"totalVolumeDonated":250,"monthsSinceFirstDonation":9,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":23,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":40,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":41,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":8,"totalVolumeDonated":2000,"monthsSinceFirstDonation":26,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":76,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":38,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":39,"numberOfDonations":1,"totalVolumeDonated":250,"monthsSinceFirstDonation":39,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":58,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":29,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":70,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":1,"totalVolumeDonated":250,"monthsSinceFirstDonation":2,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":21,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":48,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":12,"totalVolumeDonated":3000,"monthsSinceFirstDonation":82,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":16,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":71,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":9,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":52,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":9,"totalVolumeDonated":2250,"monthsSinceFirstDonation":46,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":18,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":23,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":16,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":58,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":35,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":9,"totalVolumeDonated":2250,"monthsSinceFirstDonation":38,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":1,"totalVolumeDonated":250,"monthsSinceFirstDonation":11,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":23,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":45,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":10,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":16,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":72,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":47,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":12,"numberOfDonations":13,"totalVolumeDonated":3250,"monthsSinceFirstDonation":59,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":21,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":26,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":1,"numberOfDonations":14,"totalVolumeDonated":3500,"monthsSinceFirstDonation":95,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":23,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":45,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":16,"numberOfDonations":10,"totalVolumeDonated":2500,"monthsSinceFirstDonation":62,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":28,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":14,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":76,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":41,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":16,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":26,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":23,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":70,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":21,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":34,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":35,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":24,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":11,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":28,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":26,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":16,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":60,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":51,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":9,"numberOfDonations":9,"totalVolumeDonated":2250,"monthsSinceFirstDonation":54,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":7,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":52,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":16,"numberOfDonations":10,"totalVolumeDonated":2500,"monthsSinceFirstDonation":89,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":52,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":16,"totalVolumeDonated":4000,"monthsSinceFirstDonation":64,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":45,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":1,"numberOfDonations":12,"totalVolumeDonated":3000,"monthsSinceFirstDonation":35,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":16,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":23,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":74,"numberOfDonations":1,"totalVolumeDonated":250,"monthsSinceFirstDonation":74,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":8,"totalVolumeDonated":2000,"monthsSinceFirstDonation":50,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":27,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":4,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":3,"numberOfDonations":14,"totalVolumeDonated":3500,"monthsSinceFirstDonation":35,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":44,"totalVolumeDonated":11000,"monthsSinceFirstDonation":98,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":9,"totalVolumeDonated":2250,"monthsSinceFirstDonation":74,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":16,"numberOfDonations":14,"totalVolumeDonated":3500,"monthsSinceFirstDonation":83,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":3,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":38,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":9,"totalVolumeDonated":2250,"monthsSinceFirstDonation":52,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":12,"numberOfDonations":9,"totalVolumeDonated":2250,"monthsSinceFirstDonation":60,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":41,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":47,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":41,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":23,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":89,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":17,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":21,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":26,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":10,"numberOfDonations":8,"totalVolumeDonated":2000,"monthsSinceFirstDonation":39,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":16,"numberOfDonations":8,"totalVolumeDonated":2000,"monthsSinceFirstDonation":28,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":22,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":82,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":38,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":30,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":2,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":23,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":26,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":16,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":34,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":59,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":28,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":16,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":39,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":21,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":14,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":75,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":1,"totalVolumeDonated":250,"monthsSinceFirstDonation":4,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":21,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":25,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":25,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":9,"totalVolumeDonated":2250,"monthsSinceFirstDonation":55,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":23,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":21,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":38,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":70,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":26,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":59,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":21,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":35,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":10,"totalVolumeDonated":2500,"monthsSinceFirstDonation":35,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":13,"totalVolumeDonated":3250,"monthsSinceFirstDonation":57,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":16,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":28,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":72,"numberOfDonations":1,"totalVolumeDonated":250,"monthsSinceFirstDonation":72,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":12,"totalVolumeDonated":3000,"monthsSinceFirstDonation":88,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":14,"totalVolumeDonated":3500,"monthsSinceFirstDonation":40,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":23,"numberOfDonations":38,"totalVolumeDonated":9500,"monthsSinceFirstDonation":98,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":8,"totalVolumeDonated":2000,"monthsSinceFirstDonation":21,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":35,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":16,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":11,"totalVolumeDonated":2750,"monthsSinceFirstDonation":23,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":7,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":16,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":14,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":37,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":47,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":21,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":33,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":25,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":26,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":9,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":34,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":13,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":21,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":8,"totalVolumeDonated":2000,"monthsSinceFirstDonation":46,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":35,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":14,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":58,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":6,"numberOfDonations":17,"totalVolumeDonated":4250,"monthsSinceFirstDonation":70,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":9,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":11,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":37,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":46,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":35,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":18,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":3,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":23,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":31,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":58,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":16,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":57,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":21,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":86,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":8,"numberOfDonations":9,"totalVolumeDonated":2250,"monthsSinceFirstDonation":64,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":16,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":21,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":40,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":13,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":76,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":22,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":83,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":62,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":9,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":14,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":9,"totalVolumeDonated":2250,"monthsSinceFirstDonation":28,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":23,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":87,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":10,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":16,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":27,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":37,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":3,"numberOfDonations":17,"totalVolumeDonated":4250,"monthsSinceFirstDonation":86,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":16,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":35,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":16,"numberOfDonations":8,"totalVolumeDonated":2000,"monthsSinceFirstDonation":76,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":14,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":16,"numberOfDonations":15,"totalVolumeDonated":3750,"monthsSinceFirstDonation":87,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":13,"numberOfDonations":8,"totalVolumeDonated":2000,"monthsSinceFirstDonation":26,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":9,"totalVolumeDonated":2250,"monthsSinceFirstDonation":75,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":26,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":9,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":19,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":34,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":30,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":14,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":1,"numberOfDonations":14,"totalVolumeDonated":3500,"monthsSinceFirstDonation":58,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":19,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":35,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":64,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":74,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":16,"numberOfDonations":16,"totalVolumeDonated":4000,"monthsSinceFirstDonation":77,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":1,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":57,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":8,"totalVolumeDonated":2000,"monthsSinceFirstDonation":48,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":0,"numberOfDonations":8,"totalVolumeDonated":2000,"monthsSinceFirstDonation":59,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":23,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":23,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":28,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":75,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":21,"numberOfDonations":1,"totalVolumeDonated":250,"monthsSinceFirstDonation":21,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":3,"numberOfDonations":8,"totalVolumeDonated":2000,"monthsSinceFirstDonation":50,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":8,"numberOfDonations":10,"totalVolumeDonated":2500,"monthsSinceFirstDonation":63,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":1,"numberOfDonations":24,"totalVolumeDonated":6000,"monthsSinceFirstDonation":77,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":16,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":64,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":23,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":21,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":24,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":2,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":63,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":21,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":52,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":11,"totalVolumeDonated":2750,"monthsSinceFirstDonation":28,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":23,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":41,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":26,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":52,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":11,"numberOfDonations":8,"totalVolumeDonated":2000,"monthsSinceFirstDonation":72,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":14,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":26,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":13,"madeDonationInMarch2007":0},{"monthsSinceLastDonation":4,"numberOfDonations":17,"totalVolumeDonated":4250,"monthsSinceFirstDonation":71,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":1,"numberOfDonations":10,"totalVolumeDonated":2500,"monthsSinceFirstDonation":43,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":8,"totalVolumeDonated":2000,"monthsSinceFirstDonation":26,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":43,"totalVolumeDonated":10750,"monthsSinceFirstDonation":86,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":20,"totalVolumeDonated":5000,"monthsSinceFirstDonation":69,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":11,"numberOfDonations":17,"totalVolumeDonated":4250,"monthsSinceFirstDonation":79,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":4,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":8,"totalVolumeDonated":2000,"monthsSinceFirstDonation":34,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":9,"numberOfDonations":11,"totalVolumeDonated":2750,"monthsSinceFirstDonation":49,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":51,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":11,"totalVolumeDonated":2750,"monthsSinceFirstDonation":79,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":4,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":14,"numberOfDonations":8,"totalVolumeDonated":2000,"monthsSinceFirstDonation":50,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":11,"numberOfDonations":14,"totalVolumeDonated":3500,"monthsSinceFirstDonation":73,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":8,"totalVolumeDonated":2000,"monthsSinceFirstDonation":40,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":9,"numberOfDonations":8,"totalVolumeDonated":2000,"monthsSinceFirstDonation":38,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":14,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":22,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":14,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":28,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":4,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":11,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":16,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":3,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":12,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":8,"numberOfDonations":8,"totalVolumeDonated":2000,"monthsSinceFirstDonation":52,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":13,"totalVolumeDonated":3250,"monthsSinceFirstDonation":39,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":16,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":15,"totalVolumeDonated":3750,"monthsSinceFirstDonation":49,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":50,"totalVolumeDonated":12500,"monthsSinceFirstDonation":98,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":1,"numberOfDonations":16,"totalVolumeDonated":4000,"monthsSinceFirstDonation":35,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":6,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":11,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":4,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":0,"numberOfDonations":13,"totalVolumeDonated":3250,"monthsSinceFirstDonation":28,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":10,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":10,"totalVolumeDonated":2500,"monthsSinceFirstDonation":28,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":1,"totalVolumeDonated":250,"monthsSinceFirstDonation":4,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":41,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":16,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":35,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":21,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":26,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":11,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":16,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":35,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":7,"numberOfDonations":9,"totalVolumeDonated":2250,"monthsSinceFirstDonation":89,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":8,"totalVolumeDonated":2000,"monthsSinceFirstDonation":46,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":10,"totalVolumeDonated":2500,"monthsSinceFirstDonation":28,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":43,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":35,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":8,"totalVolumeDonated":2000,"monthsSinceFirstDonation":28,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":35,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":28,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":13,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":14,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":14,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":1,"totalVolumeDonated":250,"monthsSinceFirstDonation":2,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":11,"totalVolumeDonated":2750,"monthsSinceFirstDonation":40,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":38,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":21,"numberOfDonations":1,"totalVolumeDonated":250,"monthsSinceFirstDonation":21,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":6,"numberOfDonations":22,"totalVolumeDonated":5500,"monthsSinceFirstDonation":28,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":41,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":21,"totalVolumeDonated":5250,"monthsSinceFirstDonation":52,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":11,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":40,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":8,"totalVolumeDonated":2000,"monthsSinceFirstDonation":38,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":22,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":9,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":3,"numberOfDonations":10,"totalVolumeDonated":2500,"monthsSinceFirstDonation":33,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":22,"numberOfDonations":1,"totalVolumeDonated":250,"monthsSinceFirstDonation":22,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":14,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":16,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":87,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":28,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":16,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":13,"totalVolumeDonated":3250,"monthsSinceFirstDonation":53,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":23,"numberOfDonations":1,"totalVolumeDonated":250,"monthsSinceFirstDonation":23,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":16,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":40,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":11,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":32,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":14,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":21,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":14,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":14,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":11,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":16,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":9,"totalVolumeDonated":2250,"monthsSinceFirstDonation":38,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":75,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":26,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":5,"numberOfDonations":46,"totalVolumeDonated":11500,"monthsSinceFirstDonation":98,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":17,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":58,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":16,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":4,"totalVolumeDonated":1000,"monthsSinceFirstDonation":34,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":11,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":37,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":32,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":5,"totalVolumeDonated":1250,"monthsSinceFirstDonation":16,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":25,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":22,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":9,"totalVolumeDonated":2250,"monthsSinceFirstDonation":28,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":7,"totalVolumeDonated":1750,"monthsSinceFirstDonation":46,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":21,"numberOfDonations":2,"totalVolumeDonated":500,"monthsSinceFirstDonation":21,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":4,"numberOfDonations":8,"totalVolumeDonated":2000,"monthsSinceFirstDonation":48,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":20,"numberOfDonations":14,"totalVolumeDonated":3500,"monthsSinceFirstDonation":69,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":11,"numberOfDonations":8,"totalVolumeDonated":2000,"monthsSinceFirstDonation":41,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":6,"totalVolumeDonated":1500,"monthsSinceFirstDonation":26,"madeDonationInMarch2007":1},{"monthsSinceLastDonation":2,"numberOfDonations":3,"totalVolumeDonated":750,"monthsSinceFirstDonation":16,"madeDonationInMarch2007":1}]
};
