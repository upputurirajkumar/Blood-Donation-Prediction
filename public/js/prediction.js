/**
 * BLOODINTEL — Real-Time Inference & KNN Engine
 * Grounded in Scikit-Learn Pipeline: StandardScaler + KNN (k=5, L2 Euclidean)
 */

(function () {
  'use strict';

  class PredictionEngine {
    constructor() {
      this.isProcessing = false;
      this.currentResult = null;
      this.init();
    }

    init() {
      // Bind inputs and controls
      this.inputRecency = document.getElementById('input-recency');
      this.inputFrequency = document.getElementById('input-frequency');
      this.inputVolume = document.getElementById('input-volume');
      this.inputTenure = document.getElementById('input-tenure');

      this.sliderRecency = document.getElementById('slider-recency');
      this.sliderFrequency = document.getElementById('slider-frequency');
      this.sliderVolume = document.getElementById('slider-volume');
      this.sliderTenure = document.getElementById('slider-tenure');

      this.btnPredict = document.getElementById('btn-run-prediction');
      this.statusBadge = document.getElementById('prediction-status-badge');
      this.progressBar = document.getElementById('prediction-progress-bar');
      this.progressText = document.getElementById('prediction-progress-text');
      this.resultContainer = document.getElementById('prediction-result-container');

      this.bindEvents();
      this.syncInputs();
      this.updateLiveDonorVisual();
    }

    bindEvents() {
      // Sync number inputs and range sliders
      const syncPair = (input, slider, isVolume = false) => {
        if (!input || !slider) return;
        
        input.addEventListener('input', () => {
          let val = parseFloat(input.value) || 0;
          slider.value = val;
          if (isVolume) {
            // keep volume as is
          } else if (input === this.inputFrequency) {
            // Auto update volume if frequency changes (250 c.c. per unit)
            const autoVol = val * 250;
            if (this.inputVolume) this.inputVolume.value = autoVol;
            if (this.sliderVolume) this.sliderVolume.value = autoVol;
          }
          this.validateTenureRecency();
          this.updateLiveDonorVisual();
        });

        slider.addEventListener('input', () => {
          let val = parseFloat(slider.value) || 0;
          input.value = val;
          if (slider === this.sliderFrequency) {
            const autoVol = val * 250;
            if (this.inputVolume) this.inputVolume.value = autoVol;
            if (this.sliderVolume) this.sliderVolume.value = autoVol;
          }
          this.validateTenureRecency();
          this.updateLiveDonorVisual();
        });
      };

      syncPair(this.inputRecency, this.sliderRecency);
      syncPair(this.inputFrequency, this.sliderFrequency);
      syncPair(this.inputVolume, this.sliderVolume, true);
      syncPair(this.inputTenure, this.sliderTenure);

      if (this.btnPredict) {
        this.btnPredict.addEventListener('click', (e) => {
          e.preventDefault();
          this.runInferenceSequence();
        });
      }

      // Preset Archetype buttons
      const archetypeButtons = document.querySelectorAll('[data-archetype-idx]');
      archetypeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-archetype-idx'), 10);
          this.loadArchetype(idx);
          archetypeButtons.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });
    }

    validateTenureRecency() {
      const rec = parseFloat(this.inputRecency.value) || 0;
      let ten = parseFloat(this.inputTenure.value) || 0;
      const errorMsg = document.getElementById('tenure-recency-warning');

      if (rec > ten) {
        if (errorMsg) errorMsg.style.display = 'flex';
        // Auto-bump tenure to recency for realism
        this.inputTenure.value = rec;
        if (this.sliderTenure) this.sliderTenure.value = rec;
      } else {
        if (errorMsg) errorMsg.style.display = 'none';
      }
    }

    loadArchetype(index) {
      const archetype = window.BLOODINTEL_DATA.archetypes[index];
      if (!archetype) return;

      const d = archetype.data;
      if (this.inputRecency) this.inputRecency.value = d.monthsSinceLastDonation;
      if (this.sliderRecency) this.sliderRecency.value = d.monthsSinceLastDonation;

      if (this.inputFrequency) this.inputFrequency.value = d.numberOfDonations;
      if (this.sliderFrequency) this.sliderFrequency.value = d.numberOfDonations;

      if (this.inputVolume) this.inputVolume.value = d.totalVolumeDonated;
      if (this.sliderVolume) this.sliderVolume.value = d.totalVolumeDonated;

      if (this.inputTenure) this.inputTenure.value = d.monthsSinceFirstDonation;
      if (this.sliderTenure) this.sliderTenure.value = d.monthsSinceFirstDonation;

      this.updateLiveDonorVisual();

      // Trigger animation on button
      if (this.btnPredict) {
        this.btnPredict.classList.add('pulse-highlight');
        setTimeout(() => this.btnPredict.classList.remove('pulse-highlight'), 1200);
      }
    }

    getDonorInput() {
      return {
        monthsSinceLastDonation: Math.max(0, parseFloat(this.inputRecency.value) || 0),
        numberOfDonations: Math.max(1, parseFloat(this.inputFrequency.value) || 1),
        totalVolumeDonated: Math.max(250, parseFloat(this.inputVolume.value) || 250),
        monthsSinceFirstDonation: Math.max(0, parseFloat(this.inputTenure.value) || 0)
      };
    }

    updateLiveDonorVisual() {
      const input = this.getDonorInput();
      const scaler = window.BLOODINTEL_DATA.scaler;

      // Compute current z-scores
      const zR = (input.monthsSinceLastDonation - scaler.monthsSinceLastDonation.mean) / scaler.monthsSinceLastDonation.std;
      const zF = (input.numberOfDonations - scaler.numberOfDonations.mean) / scaler.numberOfDonations.std;
      const zV = (input.totalVolumeDonated - scaler.totalVolumeDonated.mean) / scaler.totalVolumeDonated.std;
      const zT = (input.monthsSinceFirstDonation - scaler.monthsSinceFirstDonation.mean) / scaler.monthsSinceFirstDonation.std;

      // Update z-score badges
      const elZR = document.getElementById('live-z-recency');
      const elZF = document.getElementById('live-z-frequency');
      const elZV = document.getElementById('live-z-volume');
      const elZT = document.getElementById('live-z-tenure');

      if (elZR) elZR.textContent = `z = ${zR >= 0 ? '+' : ''}${zR.toFixed(2)}`;
      if (elZF) elZF.textContent = `z = ${zF >= 0 ? '+' : ''}${zF.toFixed(2)}`;
      if (elZV) elZV.textContent = `z = ${zV >= 0 ? '+' : ''}${zV.toFixed(2)}`;
      if (elZT) elZT.textContent = `z = ${zT >= 0 ? '+' : ''}${zT.toFixed(2)}`;

      // Update live graphical cues
      // 1. Recency Dial
      const recencyArc = document.getElementById('live-recency-arc');
      if (recencyArc) {
        // max 60 months
        const pct = Math.min(100, (input.monthsSinceLastDonation / 48) * 100);
        recencyArc.style.strokeDashoffset = `${283 - (283 * pct) / 100}`;
      }

      // 2. Frequency Stack
      const freqStack = document.getElementById('live-frequency-count');
      if (freqStack) freqStack.textContent = `${input.numberOfDonations} units`;

      // 3. Volume Level
      const volFill = document.getElementById('live-volume-level');
      if (volFill) {
        const volPct = Math.min(100, Math.max(10, (input.totalVolumeDonated / 6000) * 100));
        volFill.style.height = `${volPct}%`;
      }

      // 4. Tenure Bar
      const tenureBar = document.getElementById('live-tenure-fill');
      if (tenureBar) {
        const tenPct = Math.min(100, (input.monthsSinceFirstDonation / 96) * 100);
        tenureBar.style.width = `${tenPct}%`;
      }
    }

    syncInputs() {
      if (this.inputRecency && this.sliderRecency) this.sliderRecency.value = this.inputRecency.value;
      if (this.inputFrequency && this.sliderFrequency) this.sliderFrequency.value = this.inputFrequency.value;
      if (this.inputVolume && this.sliderVolume) this.sliderVolume.value = this.inputVolume.value;
      if (this.inputTenure && this.sliderTenure) this.sliderTenure.value = this.inputTenure.value;
    }

    /**
     * Exact Scikit-Learn KNN computation against 338 training samples
     */
    computeKNN(input, k = 5) {
      const scaler = window.BLOODINTEL_DATA.scaler;
      const trainSet = window.BLOODINTEL_DATA.trainSet;

      // 1. Standardize input vector using training set parameters
      const sR = (input.monthsSinceLastDonation - scaler.monthsSinceLastDonation.mean) / scaler.monthsSinceLastDonation.std;
      const sF = (input.numberOfDonations - scaler.numberOfDonations.mean) / scaler.numberOfDonations.std;
      const sV = (input.totalVolumeDonated - scaler.totalVolumeDonated.mean) / scaler.totalVolumeDonated.std;
      const sT = (input.monthsSinceFirstDonation - scaler.monthsSinceFirstDonation.mean) / scaler.monthsSinceFirstDonation.std;

      const targetVector = [sR, sF, sV, sT];

      // 2. Compute Euclidean distance (L2 norm) to all 338 training records
      const distances = [];
      for (let i = 0; i < trainSet.length; i++) {
        const item = trainSet[i];
        const itemSR = (item.monthsSinceLastDonation - scaler.monthsSinceLastDonation.mean) / scaler.monthsSinceLastDonation.std;
        const itemSF = (item.numberOfDonations - scaler.numberOfDonations.mean) / scaler.numberOfDonations.std;
        const itemSV = (item.totalVolumeDonated - scaler.totalVolumeDonated.mean) / scaler.totalVolumeDonated.std;
        const itemST = (item.monthsSinceFirstDonation - scaler.monthsSinceFirstDonation.mean) / scaler.monthsSinceFirstDonation.std;

        const dR = targetVector[0] - itemSR;
        const dF = targetVector[1] - itemSF;
        const dV = targetVector[2] - itemSV;
        const dT = targetVector[3] - itemST;

        const dist = Math.sqrt(dR * dR + dF * dF + dV * dV + dT * dT);
        distances.push({
          index: i,
          distance: dist,
          label: item.madeDonationInMarch2007,
          raw: item,
          scaled: [itemSR, itemSF, itemSV, itemST]
        });
      }

      // 3. Sort ascending by Euclidean distance
      distances.sort((a, b) => a.distance - b.distance);

      // 4. Select top-k nearest neighbors
      const neighbors = distances.slice(0, k);

      // 5. Consensus voting
      const positiveVotes = neighbors.filter((n) => n.label === 1).length;
      const negativeVotes = k - positiveVotes;
      const probability = positiveVotes / k;
      const prediction = probability >= 0.5 ? 1 : 0;

      // 6. Interpretability heuristics based on RFM principles
      let recencySignal = input.monthsSinceLastDonation <= 4 ? 'Favorable' : input.monthsSinceLastDonation > 12 ? 'Unfavorable' : 'Moderate';
      let frequencySignal = input.numberOfDonations >= 8 ? 'High Affinity' : input.numberOfDonations <= 2 ? 'Low Habituation' : 'Moderate';
      let campaignRelevance = '';

      if (prediction === 1) {
        campaignRelevance = `High donor propensity detected (${(probability * 100).toFixed(0)}% consensus). The donor exhibits strong recency momentum and consistent historical affinity matching repeat donation clusters in the Taiwan benchmark.`;
      } else {
        campaignRelevance = `Low donor propensity detected (${((1 - probability) * 100).toFixed(0)}% consensus for Class 0). Elapsed recency or insufficient past donations places this profile in a non-response manifold. Targeted warm reactivation is recommended.`;
      }

      return {
        input,
        targetVector,
        neighbors,
        k,
        positiveVotes,
        negativeVotes,
        probability,
        prediction,
        isLikely: prediction === 1,
        recencySignal,
        frequencySignal,
        campaignRelevance
      };
    }

    async runInferenceSequence() {
      if (this.isProcessing) return;
      this.isProcessing = true;

      const input = this.getDonorInput();

      if (this.btnPredict) {
        this.btnPredict.disabled = true;
        this.btnPredict.classList.add('computing');
      }

      // Show stage progress indicator
      const stages = [
        { text: 'STAGE 1: STANDARDIZING 4D FEATURE VECTOR...', pct: 20 },
        { text: 'STAGE 2: COMPUTING L2 EUCLIDEAN MANIFOLD...', pct: 45 },
        { text: 'STAGE 3: LOCATING 5 NEAREST NEIGHBORS (N=338)...', pct: 75 },
        { text: 'STAGE 4: EVALUATING CONSENSUS CLASSIFICATION...', pct: 90 },
        { text: 'STAGE 5: INFERENCE VERIFIED', pct: 100 }
      ];

      for (let i = 0; i < stages.length; i++) {
        if (this.progressText) this.progressText.textContent = stages[i].text;
        if (this.progressBar) this.progressBar.style.width = `${stages[i].pct}%`;
        await new Promise((r) => setTimeout(r, 160));
      }

      // Run computation
      const result = this.computeKNN(input, 5);
      this.currentResult = result;

      // Render results
      this.renderPredictionResult(result);

      // Trigger 2D Neighborhood visualizer
      if (window.BloodIntelKnnVisualizer) {
        window.BloodIntelKnnVisualizer.render(result);
      }

      if (this.btnPredict) {
        this.btnPredict.disabled = false;
        this.btnPredict.classList.remove('computing');
      }

      this.isProcessing = false;
    }

    renderPredictionResult(res) {
      if (!this.resultContainer) return;
      this.resultContainer.classList.remove('idle');
      this.resultContainer.classList.add('active');

      // Update outcome badge
      const outcomeBadge = document.getElementById('res-outcome-badge');
      const outcomeTitle = document.getElementById('res-outcome-title');
      const outcomeSubtitle = document.getElementById('res-outcome-subtitle');
      const probValue = document.getElementById('res-prob-value');
      const voteTally = document.getElementById('res-vote-tally');
      const probRing = document.getElementById('res-prob-ring');
      const notesEl = document.getElementById('res-interpretation-notes');

      const isLikely = res.isLikely;

      if (outcomeBadge) {
        outcomeBadge.className = `result-badge ${isLikely ? 'badge-likely' : 'badge-unlikely'}`;
        outcomeBadge.textContent = isLikely ? 'CLASS 1: LIKELY TO DONATE' : 'CLASS 0: UNLIKELY TO DONATE';
      }

      if (outcomeTitle) {
        outcomeTitle.textContent = isLikely
          ? 'Positive Donor Propensity Predicted'
          : 'Low Propensity for Upcoming Drive';
      }

      if (outcomeSubtitle) {
        outcomeSubtitle.textContent = `Model: K-Nearest Neighbors (k=5) · Metric: L2 Euclidean (StandardScaler)`;
      }

      if (probValue) {
        probValue.textContent = `${(res.probability * 100).toFixed(1)}%`;
      }

      if (voteTally) {
        voteTally.textContent = `${res.positiveVotes} of ${res.k} nearest neighbors donated in target campaign`;
      }

      if (probRing) {
        const circum = 283;
        const offset = circum - (circum * res.probability);
        probRing.style.strokeDashoffset = offset;
        probRing.style.stroke = isLikely ? '#10b981' : '#e11d48';
      }

      if (notesEl) {
        notesEl.textContent = res.campaignRelevance;
      }

      // Render Neighbors Table
      const tableBody = document.getElementById('res-neighbors-table-body');
      if (tableBody) {
        tableBody.innerHTML = res.neighbors
          .map((n, i) => {
            const isPos = n.label === 1;
            return `
              <tr class="neighbor-row ${isPos ? 'neighbor-positive' : 'neighbor-negative'}">
                <td class="col-rank">#${i + 1}</td>
                <td class="col-dist font-mono font-bold">${n.distance.toFixed(3)}</td>
                <td class="col-rec">${n.raw.monthsSinceLastDonation}m</td>
                <td class="col-freq">${n.raw.numberOfDonations}</td>
                <td class="col-vol">${n.raw.totalVolumeDonated} c.c.</td>
                <td class="col-ten">${n.raw.monthsSinceFirstDonation}m</td>
                <td class="col-label text-right">
                  <span class="label-pill ${isPos ? 'pill-donated' : 'pill-not'}">
                    ${isPos ? 'Donated (1)' : 'No Donation (0)'}
                  </span>
                </td>
              </tr>
            `;
          })
          .join('');
      }

      // Smooth scroll to result if on mobile
      if (window.innerWidth < 1024) {
        this.resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }

  // Export to window
  window.BloodIntelPredictionEngine = new PredictionEngine();
})();
