/**
 * BLOODINTEL — Atmospheric Motion & Donor Network Engine
 * High-performance Canvas particle physics, pipeline pulses & interactive state transitions
 */

(function () {
  'use strict';

  class HeroNetworkVisualizer {
    constructor() {
      this.canvas = document.getElementById('hero-network-canvas');
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
      this.particles = [];
      this.numParticles = 110;
      this.maxConnectDistance = 110;
      this.mouse = { x: -1000, y: -1000, active: false };
      this.queryNode = { x: 0, y: 0, vx: 0.6, vy: 0.45, pulse: 0, radius: 6 };
      this.isVisible = true;

      if (this.canvas) {
        this.init();
      }
    }

    init() {
      this.resize();
      window.addEventListener('resize', () => this.resize());

      // Mouse tracking
      window.addEventListener('mousemove', (e) => {
        if (!this.canvas) return;
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
        this.mouse.active = true;
      });

      window.addEventListener('mouseleave', () => {
        this.mouse.active = false;
      });

      // Pause when scrolled away
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            this.isVisible = entry.isIntersecting;
          });
        }, { threshold: 0.05 });
        observer.observe(this.canvas);
      }

      this.spawnParticles();
      this.animate = this.animate.bind(this);
      requestAnimationFrame(this.animate);
    }

    resize() {
      if (!this.canvas) return;
      const rect = this.canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      this.width = rect.width;
      this.height = rect.height;

      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.canvas.style.width = `${this.width}px`;
      this.canvas.style.height = `${this.height}px`;

      if (this.ctx) {
        this.ctx.resetTransform?.();
        this.ctx.scale(dpr, dpr);
      }

      this.queryNode.x = this.width * 0.4;
      this.queryNode.y = this.height * 0.45;
    }

    spawnParticles() {
      this.particles = [];
      for (let i = 0; i < this.numParticles; i++) {
        // Label probability matching dataset (28% positive)
        const isClass1 = Math.random() < 0.28;
        this.particles.push({
          x: Math.random() * (this.width || 800),
          y: Math.random() * (this.height || 600),
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: isClass1 ? Math.random() * 2.2 + 1.8 : Math.random() * 1.6 + 1.2,
          isClass1,
          alpha: Math.random() * 0.5 + 0.3
        });
      }
    }

    animate() {
      if (this.isVisible && this.ctx) {
        this.draw();
      }
      requestAnimationFrame(this.animate);
    }

    draw() {
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;

      ctx.clearRect(0, 0, w, h);

      // Move query node
      this.queryNode.x += this.queryNode.vx;
      this.queryNode.y += this.queryNode.vy;
      this.queryNode.pulse += 0.04;

      if (this.queryNode.x < 50 || this.queryNode.x > w - 50) this.queryNode.vx *= -1;
      if (this.queryNode.y < 50 || this.queryNode.y > h - 50) this.queryNode.vy *= -1;

      // Update and draw background particles
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Mouse gentle repulsion
        if (this.mouse.active) {
          const dx = p.x - this.mouse.x;
          const dy = p.y - this.mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 1) {
            const force = (120 - dist) / 120 * 0.8;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isClass1
          ? `rgba(225, 29, 72, ${p.alpha})`
          : `rgba(148, 163, 184, ${p.alpha * 0.5})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < this.particles.length; j++) {
          const p2 = this.particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < this.maxConnectDistance) {
            const lineAlpha = (1 - d / this.maxConnectDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect to traveling query node if near
        const qdx = p.x - this.queryNode.x;
        const qdy = p.y - this.queryNode.y;
        const qDist = Math.sqrt(qdx * qdx + qdy * qdy);
        if (qDist < 160) {
          const qAlpha = (1 - qDist / 160) * 0.4;
          ctx.beginPath();
          ctx.moveTo(this.queryNode.x, this.queryNode.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = p.isClass1 ? `rgba(16, 185, 129, ${qAlpha})` : `rgba(56, 189, 248, ${qAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      // Draw Query Node (Traveling Signal)
      const qRadius = 7 + Math.sin(this.queryNode.pulse) * 2;
      const ripple = (this.queryNode.pulse * 10) % 40;

      // Ripple halo
      ctx.beginPath();
      ctx.arc(this.queryNode.x, this.queryNode.y, qRadius + ripple, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(56, 189, 248, ${Math.max(0, 0.4 - ripple / 40)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Query node body
      ctx.beginPath();
      ctx.arc(this.queryNode.x, this.queryNode.y, qRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('kNN', this.queryNode.x, this.queryNode.y);
    }
  }

  /**
   * ML Pipeline Traveling Packet Animator
   */
  class PipelineAnimator {
    constructor() {
      this.nodes = document.querySelectorAll('.pipeline-stage-node');
      this.activeIdx = 0;
      if (this.nodes.length > 0) {
        this.startCycle();
      }
    }

    startCycle() {
      setInterval(() => {
        this.nodes.forEach((n) => n.classList.remove('pipeline-active'));
        if (this.nodes[this.activeIdx]) {
          this.nodes[this.activeIdx].classList.add('pipeline-active');
        }
        this.activeIdx = (this.activeIdx + 1) % this.nodes.length;
      }, 1600);
    }
  }

  /**
   * 7-Model Selection Showcase
   */
  class ModelUniverse {
    constructor() {
      this.init();
    }

    init() {
      window.addEventListener('DOMContentLoaded', () => {
        const modelCards = document.querySelectorAll('[data-model-item]');
        const detailContainer = document.getElementById('selected-model-detail-card');
        const revealBtn = document.getElementById('btn-reveal-champion');

        if (!modelCards.length || !window.BLOODINTEL_DATA) return;

        const showModel = (id) => {
          const modelData = window.BLOODINTEL_DATA.models.find((m) => m.id === id);
          if (!modelData || !detailContainer) return;

          modelCards.forEach((c) => {
            if (c.getAttribute('data-model-item') === id) {
              c.classList.add('active-model');
            } else {
              c.classList.remove('active-model');
            }
          });

          detailContainer.innerHTML = `
            <div class="model-detail-inner border border-white/10 rounded-2xl p-6 bg-slate-900/60 backdrop-blur-xl">
              <div class="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs font-mono px-2 py-0.5 rounded ${modelData.isBest ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'}">
                      ${modelData.type}
                    </span>
                    ${modelData.isBest ? '<span class="text-xs font-bold text-emerald-400 flex items-center gap-1 font-mono">★ SELECTED CHAMPION</span>' : ''}
                  </div>
                  <h3 class="text-xl font-bold text-white">${modelData.name}</h3>
                </div>

                <div class="text-right">
                  <div class="text-2xl font-bold font-mono ${modelData.isBest ? 'text-emerald-400' : 'text-slate-200'}">
                    ${(modelData.testAccuracy * 100).toFixed(2)}%
                  </div>
                  <div class="text-xs font-mono text-slate-400">Holdout Test Accuracy</div>
                </div>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                <div class="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div class="text-[11px] font-mono text-slate-400">Train Acc</div>
                  <div class="text-sm font-bold font-mono text-white">${(modelData.trainAccuracy * 100).toFixed(2)}%</div>
                </div>
                <div class="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div class="text-[11px] font-mono text-slate-400">Precision (C1)</div>
                  <div class="text-sm font-bold font-mono text-white">${(modelData.precision * 100).toFixed(1)}%</div>
                </div>
                <div class="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div class="text-[11px] font-mono text-slate-400">Recall (C1)</div>
                  <div class="text-sm font-bold font-mono text-white">${(modelData.recall * 100).toFixed(1)}%</div>
                </div>
                <div class="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div class="text-[11px] font-mono text-slate-400">ROC-AUC</div>
                  <div class="text-sm font-bold font-mono ${modelData.rocAuc >= 0.74 ? 'text-emerald-400' : 'text-white'}">${modelData.rocAuc.toFixed(4)}</div>
                </div>
              </div>

              <div class="space-y-2 mt-4 text-xs text-slate-300">
                <p><strong>Hyperparameters:</strong> <span class="font-mono text-slate-400">${modelData.parameters}</span></p>
                <p><strong>Overfitting Delta (Train vs Test):</strong> <span class="font-mono ${parseFloat(modelData.overfittingDelta) > 10 ? 'text-rose-400 font-bold' : 'text-emerald-400'}">${modelData.overfittingDelta}</span></p>
                <p class="pt-2 border-t border-white/10 leading-relaxed text-slate-300">${modelData.rationale}</p>
              </div>
            </div>
          `;
        };

        modelCards.forEach((card) => {
          card.addEventListener('click', () => {
            const id = card.getAttribute('data-model-item');
            showModel(id);
          });
        });

        if (revealBtn) {
          revealBtn.addEventListener('click', () => {
            showModel('knn');
            detailContainer?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          });
        }

        // Show default best model
        showModel('knn');
      });
    }
  }

  // Hero Live Profile Mock Stream
  class HeroLiveStream {
    constructor() {
      this.init();
    }

    init() {
      const streamRec = document.getElementById('hero-stream-rec');
      const streamFreq = document.getElementById('hero-stream-freq');
      const streamVol = document.getElementById('hero-stream-vol');
      const streamTen = document.getElementById('hero-stream-ten');
      const streamDecision = document.getElementById('hero-stream-decision');

      if (!streamRec) return;

      const sampleProfiles = [
        { rec: 2, freq: 16, vol: 4000, ten: 35, dec: 'CLASS 1 (LIKELY)' },
        { rec: 14, freq: 9, vol: 2250, ten: 72, dec: 'CLASS 0 (UNLIKELY)' },
        { rec: 4, freq: 6, vol: 1500, ten: 43, dec: 'CLASS 1 (LIKELY)' },
        { rec: 26, freq: 2, vol: 500, ten: 45, dec: 'CLASS 0 (UNLIKELY)' },
        { rec: 2, freq: 4, vol: 1000, ten: 14, dec: 'CLASS 1 (LIKELY)' }
      ];

      let idx = 0;
      setInterval(() => {
        idx = (idx + 1) % sampleProfiles.length;
        const cur = sampleProfiles[idx];

        streamRec.textContent = `${cur.rec} mo`;
        streamFreq.textContent = `${cur.freq} donations`;
        streamVol.textContent = `${cur.vol} c.c.`;
        streamTen.textContent = `${cur.ten} mo history`;

        const isLikely = cur.dec.includes('CLASS 1');
        streamDecision.className = `font-mono text-xs px-2.5 py-1 rounded-full font-bold ${
          isLikely ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
        }`;
        streamDecision.textContent = cur.dec;
      }, 3600);
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    window.BloodIntelHeroVisualizer = new HeroNetworkVisualizer();
    window.BloodIntelPipeline = new PipelineAnimator();
    window.BloodIntelModelUniverse = new ModelUniverse();
    window.BloodIntelHeroStream = new HeroLiveStream();
  });
})();
