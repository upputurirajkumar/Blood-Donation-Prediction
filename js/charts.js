/**
 * BLOODINTEL — Custom Canvas & SVG Data Laboratory
 * Zero third-party dependency scientific visualization engine
 */

(function () {
  'use strict';

  class DataLaboratory {
    constructor() {
      this.init();
    }

    init() {
      window.addEventListener('DOMContentLoaded', () => {
        this.renderCorrelationMatrix();
        this.renderFeatureDistributions();
        this.renderRocCurve('knn');
        this.initRocControls();
        this.initConfusionMatrixHover();
      });
    }

    /**
     * Interactive 5x5 Heatmap Correlation Matrix
     */
    renderCorrelationMatrix() {
      const container = document.getElementById('correlation-matrix-container');
      if (!container || !window.BLOODINTEL_DATA) return;

      const data = window.BLOODINTEL_DATA.correlations5x5;
      const features = data.features;
      const matrix = data.matrix;

      let html = `<div class="matrix-wrapper">
        <div class="matrix-header-row">
          <div class="matrix-corner"></div>
          ${features.map((f) => `<div class="matrix-col-header font-mono text-xs">${f}</div>`).join('')}
        </div>
      `;

      for (let r = 0; r < features.length; r++) {
        html += `<div class="matrix-row" data-row="${r}">
          <div class="matrix-row-header font-mono text-xs">${features[r]}</div>`;

        for (let c = 0; c < features.length; c++) {
          const val = matrix[r][c];
          const isSelf = r === c;
          const isCollinear = !isSelf && ((r === 1 && c === 2) || (r === 2 && c === 1));
          const isTargetR = (r === 0 && c === 4) || (r === 4 && c === 0);

          // Color scale
          let bg = 'rgba(255, 255, 255, 0.03)';
          let textColor = '#e2e8f0';

          if (isSelf) {
            bg = 'rgba(255, 255, 255, 0.08)';
          } else if (val > 0) {
            const opacity = Math.min(0.85, val * 0.75 + 0.1);
            bg = isCollinear ? 'rgba(56, 189, 248, 0.35)' : `rgba(16, 185, 129, ${opacity})`;
            textColor = val > 0.4 ? '#ffffff' : '#a7f3d0';
          } else if (val < 0) {
            const opacity = Math.min(0.85, Math.abs(val) * 1.5 + 0.1);
            bg = `rgba(225, 29, 72, ${opacity})`;
            textColor = Math.abs(val) > 0.2 ? '#ffffff' : '#fecdd3';
          }

          html += `
            <div class="matrix-cell ${isCollinear ? 'cell-collinear' : ''} ${isTargetR ? 'cell-key-signal' : ''}" 
                 data-row="${r}" 
                 data-col="${c}" 
                 data-val="${val.toFixed(2)}"
                 data-fa="${features[r]}"
                 data-fb="${features[c]}"
                 style="background-color: ${bg}; color: ${textColor};">
              <span class="matrix-cell-val font-mono">${val.toFixed(2)}</span>
            </div>
          `;
        }
        html += `</div>`;
      }
      html += `</div>`;

      container.innerHTML = html;

      // Add interactive hover crosshair
      const cells = container.querySelectorAll('.matrix-cell');
      const inspectBox = document.getElementById('correlation-inspect-card');

      cells.forEach((cell) => {
        cell.addEventListener('mouseenter', () => {
          const row = cell.getAttribute('data-row');
          const col = cell.getAttribute('data-col');
          const val = parseFloat(cell.getAttribute('data-val'));
          const fa = cell.getAttribute('data-fa');
          const fb = cell.getAttribute('data-fb');

          // Highlight row and col
          cells.forEach((c) => {
            if (c.getAttribute('data-row') === row || c.getAttribute('data-col') === col) {
              c.classList.add('cell-highlighted');
            } else {
              c.classList.remove('cell-highlighted');
            }
          });

          if (inspectBox) {
            let note = '';
            if (fa === fb) {
              note = 'Self-correlation is identically 1.00 by definition.';
            } else if ((fa === 'Frequency' && fb === 'Volume') || (fa === 'Volume' && fb === 'Frequency')) {
              note = '⚠️ EXACT COLLINEARITY (r = 1.00): In Taiwan blood bank operations, volume is strictly 250 c.c. multiplied by donation count. Distance models like KNN normalize this without gradient divergence.';
            } else if ((fa === 'Recency' && fb === 'Target') || (fa === 'Target' && fb === 'Recency')) {
              note = '⚡ STRONGEST PREDICTOR (r = -0.27): Inverse correlation. Donors with fewer elapsed months since last donation are statistically far more prone to return.';
            } else if (val > 0) {
              note = `Positive correlation: Higher ${fa} corresponds to higher ${fb}.`;
            } else {
              note = `Negative correlation: Higher ${fa} corresponds to lower ${fb}.`;
            }

            inspectBox.innerHTML = `
              <div class="flex items-center justify-between border-b border-white/10 pb-2">
                <span class="font-bold text-white text-sm">${fa} ⟷ ${fb}</span>
                <span class="font-mono font-bold text-xs ${val >= 0 ? 'text-emerald-400' : 'text-rose-400'}">
                  r = ${val >= 0 ? '+' : ''}${val.toFixed(2)}
                </span>
              </div>
              <p class="text-xs text-slate-300 mt-2 leading-relaxed">${note}</p>
            `;
          }
        });

        cell.addEventListener('mouseleave', () => {
          cells.forEach((c) => c.classList.remove('cell-highlighted'));
        });
      });
    }

    /**
     * Feature Distribution Histograms
     */
    renderFeatureDistributions() {
      const container = document.getElementById('feature-distributions-wrapper');
      if (!container || !window.BLOODINTEL_DATA) return;

      const dists = window.BLOODINTEL_DATA.featureDistributions;
      let activeIdx = 0;

      const renderActive = (idx) => {
        const item = dists[idx];
        const maxCount = Math.max(...item.bins.map((b) => b.count));

        let html = `
          <div class="distribution-header flex items-center justify-between mb-4">
            <div>
              <h4 class="text-base font-bold text-white">${item.name}</h4>
              <p class="text-xs text-slate-400">Mean: ${item.mean} ${item.unit} · Median: ${item.median} ${item.unit} · Std: ${item.std}</p>
            </div>
            <div class="distribution-tabs flex gap-1">
              ${dists.map((d, i) => `
                <button class="dist-tab-btn ${i === idx ? 'active' : ''}" data-dist-idx="${i}">
                  ${d.id.toUpperCase()}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="histogram-bars-container">
            ${item.bins.map((bin) => {
              const hPct = Math.max(12, (bin.count / maxCount) * 100);
              return `
                <div class="hist-column group" title="${bin.range}: ${bin.count} donors (${bin.class1Rate}% return rate)">
                  <div class="hist-bar-wrapper">
                    <div class="hist-bar" style="height: ${hPct}%;">
                      <div class="hist-bar-positive" style="height: ${bin.class1Rate}%;"></div>
                    </div>
                  </div>
                  <div class="hist-label font-mono text-xs">${bin.range}</div>
                  <div class="hist-stat font-mono text-[10px] text-slate-400">${bin.count}</div>
                  <div class="hist-rate font-mono text-[10px] text-emerald-400 font-bold">${bin.class1Rate}% rtn</div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="hist-legend flex items-center justify-between mt-4 text-xs text-slate-400 pt-3 border-t border-white/10">
            <div class="flex items-center gap-3">
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded bg-slate-600 inline-block"></span> Class 0: No Return</span>
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded bg-emerald-500 inline-block"></span> Class 1: Return Donor</span>
            </div>
            <span class="text-[11px] font-mono text-slate-500">423 Cleaned Records</span>
          </div>
        `;

        container.innerHTML = html;

        // Re-bind tab clicks
        container.querySelectorAll('[data-dist-idx]').forEach((btn) => {
          btn.addEventListener('click', () => {
            renderActive(parseInt(btn.getAttribute('data-dist-idx'), 10));
          });
        });
      };

      renderActive(0);
    }

    /**
     * Interactive Multi-Model ROC Curves (SVG)
     */
    initRocControls() {
      const modelBtns = document.querySelectorAll('[data-roc-model]');
      modelBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          modelBtns.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          const modelId = btn.getAttribute('data-roc-model');
          this.renderRocCurve(modelId);
        });
      });
    }

    renderRocCurve(selectedModel = 'knn') {
      const svg = document.getElementById('roc-curve-svg');
      if (!svg || !window.BLOODINTEL_DATA) return;

      const data = window.BLOODINTEL_DATA.rocData;
      const width = 460;
      const height = 360;
      const pad = 50;

      const plotW = width - pad * 2;
      const plotH = height - pad * 2;

      // Coordinate mapper (0..1)
      const toX = (fpr) => pad + fpr * plotW;
      const toY = (tpr) => height - pad - tpr * plotH;

      // Build path points
      const makePath = (key) => {
        return data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(d.fpr).toFixed(1)} ${toY(d[key]).toFixed(1)}`).join(' ');
      };

      const pathKnn = makePath('tprKnn');
      const pathLogReg = makePath('tprLogReg');
      const pathRf = makePath('tprRandomForest');
      const pathTree = makePath('tprTree');

      const aucMap = {
        knn: { name: 'K-Nearest Neighbors (KNN)', auc: '0.7420', color: '#10b981' },
        logreg: { name: 'Logistic Regression', auc: '0.7580', color: '#38bdf8' },
        rf: { name: 'Random Forest', auc: '0.7180', color: '#f59e0b' },
        dt: { name: 'Decision Tree', auc: '0.6014', color: '#e11d48' }
      };

      const cur = aucMap[selectedModel] || aucMap.knn;

      svg.innerHTML = `
        <!-- Grid lines -->
        ${[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((v) => `
          <line x1="${toX(v)}" y1="${toY(0)}" x2="${toX(v)}" y2="${toY(1)}" stroke="rgba(255,255,255,0.06)" />
          <line x1="${toX(0)}" y1="${toY(v)}" x2="${toX(1)}" y2="${toY(v)}" stroke="rgba(255,255,255,0.06)" />
          <text x="${toX(v)}" y="${height - pad + 16}" fill="rgba(255,255,255,0.4)" font-size="10" font-family="JetBrains Mono" text-anchor="middle">${v.toFixed(1)}</text>
          <text x="${pad - 12}" y="${toY(v) + 3}" fill="rgba(255,255,255,0.4)" font-size="10" font-family="JetBrains Mono" text-anchor="end">${v.toFixed(1)}</text>
        `).join('')}

        <!-- Diagonal random baseline -->
        <line x1="${toX(0)}" y1="${toY(0)}" x2="${toX(1)}" y2="${toY(1)}" stroke="rgba(255,255,255,0.18)" stroke-dasharray="4,4" />

        <!-- Competing curves in background -->
        <path d="${pathTree}" fill="none" stroke="${selectedModel === 'dt' ? '#e11d48' : 'rgba(225,29,72,0.22)'}" stroke-width="${selectedModel === 'dt' ? 3 : 1.2}" />
        <path d="${pathRf}" fill="none" stroke="${selectedModel === 'rf' ? '#f59e0b' : 'rgba(245,158,11,0.22)'}" stroke-width="${selectedModel === 'rf' ? 3 : 1.2}" />
        <path d="${pathLogReg}" fill="none" stroke="${selectedModel === 'logreg' ? '#38bdf8' : 'rgba(56,189,248,0.22)'}" stroke-width="${selectedModel === 'logreg' ? 3 : 1.2}" />
        <path d="${pathKnn}" fill="none" stroke="${selectedModel === 'knn' ? '#10b981' : 'rgba(16,185,129,0.22)'}" stroke-width="${selectedModel === 'knn' ? 3.5 : 1.2}" />

        <!-- Key Axis Labels -->
        <text x="${width / 2}" y="${height - 10}" fill="#94a3b8" font-size="11" font-family="Space Grotesk" text-anchor="middle">False Positive Rate (1 - Specificity)</text>
        <text transform="rotate(-90)" x="${-height / 2}" y="18" fill="#94a3b8" font-size="11" font-family="Space Grotesk" text-anchor="middle">True Positive Rate (Sensitivity / Recall)</text>
      `;

      // Update readout
      const readoutName = document.getElementById('roc-active-name');
      const readoutAuc = document.getElementById('roc-active-auc');
      if (readoutName) readoutName.textContent = cur.name;
      if (readoutAuc) {
        readoutAuc.textContent = `ROC-AUC: ${cur.auc}`;
        readoutAuc.style.color = cur.color;
      }
    }

    /**
     * 4-Quadrant Confusion Matrix Hover Inspection
     */
    initConfusionMatrixHover() {
      const cells = document.querySelectorAll('[data-cm-quadrant]');
      const readout = document.getElementById('cm-inspect-readout');

      const explanations = {
        tn: {
          title: 'True Negatives (TN): 58 Donors',
          pct: '68.2% of test set',
          text: 'Donors who actually did not donate, and the KNN model correctly classified as Class 0. High specificity (95.08%) prevents expensive outreach to non-responsive individuals.'
        },
        fp: {
          title: 'False Positives (FP): 3 Donors',
          pct: '3.5% of test set (Very Low)',
          text: 'Donors predicted to donate who did not return. A remarkably low false positive count indicates strong model precision (70.00%), ensuring targeted marketing budgets are not squandered.'
        },
        fn: {
          title: 'False Negatives (FN): 17 Donors',
          pct: '20.0% of test set',
          text: 'Donors who actually donated, but the model conservatively predicted Class 0 due to the high dataset class imbalance (72.1% negative class prevalence).'
        },
        tp: {
          title: 'True Positives (TP): 7 Donors',
          pct: '8.2% of test set',
          text: 'Donors who returned and were successfully identified by KNN. In operational blood centers, capturing these high-propensity return donors ensures stable inventory reserves.'
        }
      };

      cells.forEach((cell) => {
        cell.addEventListener('mouseenter', () => {
          const q = cell.getAttribute('data-cm-quadrant');
          const item = explanations[q];
          if (item && readout) {
            readout.innerHTML = `
              <div class="font-bold text-white text-xs mb-1 flex items-center justify-between">
                <span>${item.title}</span>
                <span class="font-mono text-emerald-400">${item.pct}</span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">${item.text}</p>
            `;
          }
        });
      });
    }
  }

  window.BloodIntelDataLab = new DataLaboratory();
})();
