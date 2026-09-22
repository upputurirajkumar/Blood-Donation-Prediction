/**
 * BLOODINTEL — 2D KNN Neighborhood Visualizer
 * High-performance Canvas & Vector rendering of Metric Space
 */

(function () {
  'use strict';

  class KnnNeighborhoodVisualizer {
    constructor() {
      this.canvas = document.getElementById('knn-canvas');
      this.tooltip = document.getElementById('knn-tooltip');
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
      this.currentResult = null;
      this.hoveredNode = null;
      this.animationFrameId = null;
      this.pulsePhase = 0;

      if (this.canvas) {
        this.init();
      }
    }

    init() {
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());

      // Interactive mouse hover
      this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
      this.canvas.addEventListener('mouseleave', () => this.handleMouseLeave());

      // Start render loop
      this.loop = this.loop.bind(this);
      this.animationFrameId = requestAnimationFrame(this.loop);
    }

    resizeCanvas() {
      if (!this.canvas) return;
      const rect = this.canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      this.width = rect.width || 600;
      this.height = Math.max(380, Math.min(520, rect.width * 0.65));

      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.canvas.style.width = `${this.width}px`;
      this.canvas.style.height = `${this.height}px`;

      if (this.ctx) {
        this.ctx.resetTransform?.();
        this.ctx.scale(dpr, dpr);
      }
    }

    render(result) {
      this.currentResult = result;
      // Pre-calculate 2D projected positions for the 5 neighbors
      if (!result || !result.neighbors) return;

      const centerX = this.width / 2;
      const centerY = this.height / 2;
      const maxDistanceRadius = Math.min(centerX, centerY) * 0.78;

      // Find max distance in top 5 to scale appropriately
      const maxD = Math.max(1.8, Math.max(...result.neighbors.map((n) => n.distance)) * 1.15);

      // Angle distribution around center for clean visual separation
      const angleOffsets = [-0.65, 0.45, 1.85, 3.1, -2.2];

      this.nodes2D = result.neighbors.map((neighbor, idx) => {
        const normDist = (neighbor.distance / maxD) * maxDistanceRadius;
        const angle = angleOffsets[idx % angleOffsets.length] + (idx * 0.15);
        return {
          idx,
          neighbor,
          distance: neighbor.distance,
          label: neighbor.label,
          x: centerX + Math.cos(angle) * normDist,
          y: centerY + Math.sin(angle) * normDist,
          radius: 11
        };
      });
    }

    loop() {
      this.pulsePhase += 0.035;
      this.draw();
      this.animationFrameId = requestAnimationFrame(this.loop);
    }

    draw() {
      if (!this.ctx) return;
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // 1. Draw subtle coordinate radar circles
      const radarRadii = [40, 85, 140, 200];
      radarRadii.forEach((r, idx) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = idx === 0 ? 'rgba(255, 255, 255, 0.09)' : 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        ctx.setLineDash(idx % 2 === 1 ? [4, 6] : []);
        ctx.stroke();
        ctx.setLineDash([]);

        // Label distance ring
        ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`d=${(0.5 * (idx + 1)).toFixed(1)}`, cx + r + 4, cy - 4);
      });

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - 220, cy);
      ctx.lineTo(cx + 220, cy);
      ctx.moveTo(cx, cy - 220);
      ctx.lineTo(cx, cy + 220);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.stroke();

      // If no result yet, draw placeholder invitation
      if (!this.currentResult || !this.nodes2D) {
        ctx.beginPath();
        ctx.arc(cx, cy, 14 + Math.sin(this.pulsePhase) * 2, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '12px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Awaiting Prediction Input...', cx, cy + 38);
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillText('Adjust parameters and run model', cx, cy + 54);
        return;
      }

      // 2. Draw Distance Lines (Euclidean vectors) to 5 nearest neighbors
      this.nodes2D.forEach((node) => {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(node.x, node.y);

        const isPositive = node.label === 1;
        const color = isPositive ? 'rgba(16, 185, 129, 0.45)' : 'rgba(225, 29, 72, 0.45)';

        ctx.strokeStyle = color;
        ctx.lineWidth = node === this.hoveredNode ? 2.5 : 1.2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Distance marker along the line
        const midX = (cx + node.x) / 2;
        const midY = (cy + node.y) / 2;
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.fillRect(midX - 20, midY - 9, 40, 16);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.strokeRect(midX - 20, midY - 9, 40, 16);

        ctx.fillStyle = isPositive ? '#6ee7b7' : '#fda4af';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`d=${node.distance.toFixed(2)}`, midX, midY);
      });

      // 3. Draw 5 Nearest Neighbor Nodes
      this.nodes2D.forEach((node) => {
        const isPos = node.label === 1;
        const isHover = node === this.hoveredNode;
        const baseColor = isPos ? '#10b981' : '#e11d48';
        const glowColor = isPos ? 'rgba(16, 185, 129, 0.5)' : 'rgba(225, 29, 72, 0.5)';

        // Glow ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + (isHover ? 6 : 3), 0, Math.PI * 2);
        ctx.fillStyle = glowColor;
        ctx.fill();

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isHover ? '#ffffff' : baseColor;
        ctx.shadowColor = baseColor;
        ctx.shadowBlur = isHover ? 18 : 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Rank label
        ctx.fillStyle = isHover ? '#0f172a' : '#ffffff';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`#${node.idx + 1}`, node.x, node.y);

        // Subtitle pill
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.font = '9px "Space Grotesk", sans-serif';
        ctx.fillText(isPos ? 'DONATED' : 'DID NOT', node.x, node.y + 18);
      });

      // 4. Draw Center Node (Query Donor)
      const centerPulse = Math.sin(this.pulsePhase) * 4;

      // Outer ripple
      ctx.beginPath();
      ctx.arc(cx, cy, 24 + centerPulse, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.fill();

      // Main center node
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#0284c7';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('YOU', cx, cy);

      // Label below
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 10px "JetBrains Mono", monospace';
      ctx.fillText('TARGET DONOR (x₀)', cx, cy + 32);
    }

    handleMouseMove(e) {
      if (!this.nodes2D || !this.tooltip) return;
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let found = null;
      for (const node of this.nodes2D) {
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        if (Math.sqrt(dx * dx + dy * dy) <= node.radius + 8) {
          found = node;
          break;
        }
      }

      this.hoveredNode = found;

      if (found) {
        const raw = found.neighbor.raw;
        this.tooltip.style.display = 'block';
        this.tooltip.style.left = `${mouseX + 16}px`;
        this.tooltip.style.top = `${mouseY - 12}px`;
        this.tooltip.innerHTML = `
          <div class="tooltip-header font-bold text-xs ${found.label === 1 ? 'text-emerald-400' : 'text-rose-400'}">
            Neighbor #${found.idx + 1} — ${found.label === 1 ? 'Class 1 (Donated)' : 'Class 0 (Did Not Donate)'}
          </div>
          <div class="tooltip-metric text-xs font-mono mt-1">
            Distance: <strong>${found.distance.toFixed(3)}</strong>
          </div>
          <div class="tooltip-grid text-xs text-slate-300 mt-1 grid grid-cols-2 gap-x-2">
            <span>Recency: <strong>${raw.monthsSinceLastDonation}m</strong></span>
            <span>Frequency: <strong>${raw.numberOfDonations}</strong></span>
            <span>Volume: <strong>${raw.totalVolumeDonated}cc</strong></span>
            <span>Tenure: <strong>${raw.monthsSinceFirstDonation}m</strong></span>
          </div>
        `;
      } else {
        this.tooltip.style.display = 'none';
      }
    }

    handleMouseLeave() {
      this.hoveredNode = null;
      if (this.tooltip) {
        this.tooltip.style.display = 'none';
      }
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    window.BloodIntelKnnVisualizer = new KnnNeighborhoodVisualizer();
  });
})();
