/**
 * BLOODINTEL — Master Application Bootstrapper
 * Orchestrates modules, counter animations & interactive state
 */

(function () {
  'use strict';

  class BloodIntelApp {
    constructor() {
      this.init();
    }

    init() {
      window.addEventListener('DOMContentLoaded', () => {
        console.log('🩸 BLOODINTEL Intelligence Platform Initialized.');
        this.initCounterAnimations();
        this.initCampaignTabs();
        this.initDefaultState();
        this.initInteractiveSliders();
      });
    }

    initDefaultState() {
      // Run initial prediction after a brief delay so canvas & DOM are rendered
      setTimeout(() => {
        if (window.BloodIntelPredictionEngine) {
          window.BloodIntelPredictionEngine.loadArchetype(0);
          window.BloodIntelPredictionEngine.runInferenceSequence();
        }
      }, 500);
    }

    initInteractiveSliders() {
      // Interactive slider for Recency in Section 03 (Donor Signals)
      const testSlider = document.getElementById('signal-recency-test-slider');
      const testVal = document.getElementById('signal-recency-test-val');
      const testRisk = document.getElementById('signal-recency-test-risk');
      const testDecay = document.getElementById('signal-recency-decay-bar');

      if (testSlider) {
        testSlider.addEventListener('input', () => {
          const v = parseInt(testSlider.value, 10);
          if (testVal) testVal.textContent = `${v} months`;

          // Empirical likelihood decay curve from Taiwan dataset
          let likelihood = 0;
          let label = '';
          let barColor = '#10b981';

          if (v <= 2) {
            likelihood = 52;
            label = 'Prime Retention Window (52% Propensity)';
            barColor = '#10b981';
          } else if (v <= 4) {
            likelihood = 44;
            label = 'Active Re-donor Band (44% Propensity)';
            barColor = '#10b981';
          } else if (v <= 8) {
            likelihood = 26;
            label = 'Early Attrition Transition (26% Propensity)';
            barColor = '#f59e0b';
          } else if (v <= 14) {
            likelihood = 15;
            label = 'Lapsed Zone — Warm Reactivation Required (15% Propensity)';
            barColor = '#f43f5e';
          } else {
            likelihood = 11;
            label = 'Dormant Baseline (< 12% Organic Return)';
            barColor = '#e11d48';
          }

          if (testRisk) {
            testRisk.textContent = label;
            testRisk.style.color = barColor;
          }

          if (testDecay) {
            testDecay.style.width = `${likelihood * 1.8}%`;
            testDecay.style.backgroundColor = barColor;
          }
        });
      }
    }

    initCampaignTabs() {
      const tabs = document.querySelectorAll('[data-campaign-tier]');
      const contentCard = document.getElementById('campaign-tier-content');

      if (!tabs.length || !contentCard || !window.BLOODINTEL_DATA) return;

      const strategies = window.BLOODINTEL_DATA.campaignStrategies;

      const renderTier = (tierIdx) => {
        const item = strategies[tierIdx];
        if (!item) return;

        tabs.forEach((t, i) => {
          if (i === tierIdx) t.classList.add('active');
          else t.classList.remove('active');
        });

        contentCard.innerHTML = `
          <div class="tier-card-body p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
            <div class="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
              <div>
                <span class="inline-block text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 mb-2">
                  ${item.code} STRATEGY
                </span>
                <h3 class="text-xl sm:text-2xl font-bold text-white">${item.tier}</h3>
              </div>
              <div class="text-right">
                <span class="text-xs font-mono text-slate-400 block">Predicted Propensity</span>
                <span class="text-lg sm:text-xl font-bold font-mono text-emerald-400">${item.predictedLikelihood}</span>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div class="space-y-4">
                <div class="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div class="text-xs font-mono text-slate-400 mb-1">Qualifying Behavioral Criteria</div>
                  <div class="text-white font-mono font-bold">${item.criteria}</div>
                </div>

                <div class="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div class="text-xs font-mono text-slate-400 mb-1">Underlying Predictive Signal</div>
                  <div class="text-slate-200">${item.signal}</div>
                </div>
              </div>

              <div class="space-y-4">
                <div class="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div class="text-xs font-mono text-slate-400 mb-1">Recommended Outreach Channel</div>
                  <div class="text-white font-bold">${item.recommendedAction}</div>
                </div>

                <div class="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div class="text-xs font-mono text-slate-400 mb-1">Campaign Timing Protocol</div>
                  <div class="text-slate-200">${item.timing}</div>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-white/10 text-xs text-slate-300 leading-relaxed">
              <strong class="text-white">Clinical & Operational Rationale:</strong> ${item.businessRationale}
            </div>
          </div>
        `;
      };

      tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
          const idx = parseInt(tab.getAttribute('data-campaign-tier'), 10);
          renderTier(idx);
        });
      });

      renderTier(0);
    }

    initCounterAnimations() {
      const counters = document.querySelectorAll('[data-counter-target]');
      if (!counters.length) return;

      const runCounter = (el) => {
        const target = parseFloat(el.getAttribute('data-counter-target'));
        const suffix = el.getAttribute('data-counter-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-counter-decimals') || '0', 10);
        const duration = 1400;
        const startTime = performance.now();

        const step = (now) => {
          const progress = Math.min(1, (now - startTime) / duration);
          // Ease-out cubic
          const ease = 1 - Math.pow(1 - progress, 3);
          const current = (target * ease).toFixed(decimals);
          el.textContent = `${current}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = `${target.toFixed(decimals)}${suffix}`;
          }
        };

        requestAnimationFrame(step);
      };

      if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runCounter(entry.target);
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.2 });

        counters.forEach((c) => obs.observe(c));
      } else {
        counters.forEach((c) => runCounter(c));
      }
    }
  }

  window.BloodIntel = new BloodIntelApp();
})();
