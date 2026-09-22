import React, { useState } from 'react';
import {
  Database,
  Search,
  CheckSquare,
  Sparkles,
  SplitSquareVertical,
  Cpu,
  BarChart3,
  Award,
  Send,
  ChevronRight,
} from 'lucide-react';

export const PipelineFlowChart: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(7); // Default to Model Selection

  const pipelineSteps = [
    {
      step: 1,
      title: 'Dataset',
      subtitle: 'Raw CSV Ingestion',
      icon: Database,
      details: 'Ingested Warm_Up_Predict_Blood_Donations_-_Traning_Data.csv containing 576 rows and 6 columns from the UCI / DrivenData benchmark.',
      sourceCode: 'df = pd.read_csv("Warm_Up_Predict_Blood_Donations_-_Traning_Data.csv")',
    },
    {
      step: 2,
      title: 'Data Profiling',
      subtitle: 'EDA & Distributions',
      icon: Search,
      details: 'Statistical profiling with Seaborn & Matplotlib. Analyzed positive skewness in Recency and Frequency. Verified 0 missing values.',
      sourceCode: 'sns.histplot(blood_df[col]); sns.heatmap(blood_df.corr())',
    },
    {
      step: 3,
      title: 'Data Cleaning',
      subtitle: 'Deduplication',
      icon: CheckSquare,
      details: 'Removed index column "Unnamed: 0". Identified and pruned 153 duplicate records, resulting in 423 clean unique donor rows.',
      sourceCode: 'blood_df.drop(columns="Unnamed: 0"); blood_df.drop_duplicates(inplace=True)',
    },
    {
      step: 4,
      title: 'Feature Scaling',
      subtitle: 'StandardScaler',
      icon: Sparkles,
      details: 'Standardized features to zero mean and unit variance. Scaler was fitted strictly on the training set to prevent data leakage.',
      sourceCode: 'scaler = StandardScaler(); X_train_scaled = scaler.fit_transform(X_train)',
    },
    {
      step: 5,
      title: 'Train/Test Split',
      subtitle: '80:20 Stratified',
      icon: SplitSquareVertical,
      details: 'Partitioned into 338 training samples and 85 testing samples. Stratification preserved the 72.1% negative / 27.9% positive class balance.',
      sourceCode: 'train_test_split(X, y, test_size=0.20, random_state=42, stratify=y)',
    },
    {
      step: 6,
      title: 'Model Training',
      subtitle: '7 Algorithms',
      icon: Cpu,
      details: 'Trained Logistic Regression, Decision Tree, Random Forest, K-Nearest Neighbors, SVM, Naive Bayes, and Gradient Boosting.',
      sourceCode: 'models = {"KNN": KNeighborsClassifier(), "LR": LogisticRegression(), ...}',
    },
    {
      step: 7,
      title: 'Evaluation',
      subtitle: 'Multi-Metric Audit',
      icon: BarChart3,
      details: 'Evaluated Accuracy, Precision, Recall, F1 Score, ROC-AUC, and Confusion Matrices across all 7 candidates on unseen test data.',
      sourceCode: 'accuracy_score(y_test, y_pred); roc_auc_score(y_test, probabilities)',
    },
    {
      step: 8,
      title: 'Selection',
      subtitle: 'KNN (k=5) Best',
      icon: Award,
      details: 'K-Nearest Neighbors achieved highest test accuracy (76.47%) and best F1 Score while resisting the overfitting seen in tree models.',
      sourceCode: 'best_model_name = comparison_df.loc[0, "Model"] # Selected: K-Nearest Neighbors',
    },
    {
      step: 9,
      title: 'Deployment',
      subtitle: 'Real-Time API',
      icon: Send,
      details: 'Served via dedicated predictionService with live vector scaling, nearest-neighbor distance calculation, and probability estimation.',
      sourceCode: 'executeKNNPrediction(input, k=5) -> returns prediction and neighbor breakdown',
    },
  ];

  return (
    <div className="bg-[#0b0d13] border border-white/[0.08] rounded-xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.08]">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
            Methodology Architecture
          </span>
          <h3 className="text-base font-bold text-white tracking-tight mt-0.5">
            End-to-End Machine Learning Pipeline
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Click any phase below to inspect data transformation logic and source implementation.
          </p>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/[0.05] text-neutral-300 border border-white/[0.08]">
          9 Verified Phases
        </span>
      </div>

      {/* Horizontal Flow Steps */}
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
        {pipelineSteps.map((p, idx) => {
          const Icon = p.icon;
          const isSelected = selectedStep === idx;
          return (
            <button
              key={p.step}
              onClick={() => setSelectedStep(idx)}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[92px] ${
                isSelected
                  ? 'bg-rose-950/40 text-white border-rose-500 shadow-md shadow-rose-950/40'
                  : 'bg-[#0e1117] hover:bg-white/[0.04] border-white/[0.06] text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-[10px] font-mono font-bold ${
                    isSelected ? 'text-rose-400' : 'text-neutral-500'
                  }`}
                >
                  0{p.step}
                </span>
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isSelected ? 'text-rose-400' : 'text-neutral-500'
                  }`}
                />
              </div>
              <div className="mt-2">
                <div className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                  {p.title}
                </div>
                <div className="text-[10px] truncate mt-0.5 text-neutral-500">
                  {p.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail Pane for Selected Step */}
      <div className="p-5 rounded-lg bg-[#0e1117] border border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-rose-600 text-white text-xs font-bold font-mono flex items-center justify-center">
              0{pipelineSteps[selectedStep].step}
            </span>
            <h4 className="text-sm font-bold text-white font-mono">
              {pipelineSteps[selectedStep].title}: {pipelineSteps[selectedStep].subtitle}
            </h4>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            PRCP-1011 Verified Component
          </span>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed mb-3">
          {pipelineSteps[selectedStep].details}
        </p>

        <div className="bg-[#07080b] rounded-md p-3 border border-white/[0.06] text-rose-300 font-mono text-xs overflow-x-auto">
          <span className="text-neutral-500"># Source script implementation:</span>
          <br />
          <code>{pipelineSteps[selectedStep].sourceCode}</code>
        </div>
      </div>
    </div>
  );
};

