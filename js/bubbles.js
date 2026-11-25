(() => {
  'use strict';
  const canvas = document.getElementById('bubblesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const speedScale = reduced ? 0.45 : 1;
  let width = 0, height = 0, running = false;
  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  class Bubble {
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + Math.random() * 80;
      this.r = Math.random() * 5 + 1.8;
      this.speed = (Math.random() * 0.9 + 0.35) * speedScale;
      this.alpha = Math.random() * 0.38 + 0.14;
      this.phase = Math.random() * Math.PI * 2;
      this.swing = Math.random() * 0.012 * speedScale;
    }
    constructor() { this.reset(true); }
    update() {
      this.y -= this.speed;
      this.phase += this.swing;
      this.x += Math.sin(this.phase) * 0.35 * speedScale;
      if (this.y < -12) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56,189,248,${this.alpha})`;
      ctx.shadowBlur = 7;
      ctx.shadowColor = 'rgba(56,189,248,0.35)';
      ctx.fill();
    }
  }
  const bubbles = Array.from({ length: 38 }, () => new Bubble());
  function frame() {
    if (document.hidden) { running = false; return; }
    ctx.clearRect(0, 0, width, height);
    bubbles.forEach(b => { b.update(); b.draw(); });
    requestAnimationFrame(frame);
  }
  function start() {
    if (running || document.hidden) return;
    running = true;
    requestAnimationFrame(frame);
  }
  ctx.clearRect(0, 0, width, height);
  bubbles.forEach(b => b.draw());
  start();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) running = false;
    else start();
  });
})();