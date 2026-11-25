    const canvas = document.getElementById('bubblesCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      if (prefersReducedMotion) drawBubbles(false);
    });

    class Bubble {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.radius = Math.random() * 4 + 1;
        this.speed = Math.random() * 1.2 + 0.4;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.oscillation = Math.random() * 0.02;
        this.angle = Math.random() * Math.PI * 2;
      }

      update() {
        this.y -= this.speed;
        this.angle += this.oscillation;
        this.x += Math.sin(this.angle) * 0.5;

        if (this.y < -10) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${this.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.4)';
        ctx.fill();
        ctx.closePath();
      }
    }

    const bubbles = Array.from({ length: 45 }, () => new Bubble());

    function drawBubbles(update) {
      ctx.clearRect(0, 0, width, height);
      bubbles.forEach(bubble => {
        if (update) bubble.update();
        bubble.draw();
      });
    }

    function animate() {
      if (document.hidden || prefersReducedMotion) return;
      drawBubbles(true);
      requestAnimationFrame(animate);
    }

    if (prefersReducedMotion) {
      drawBubbles(false);
    } else {
      animate();
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) animate();
      });
    }

    // Media Modal Database & Logic
    const mediaData = {
      video: [
        { title: "Tactical Briefing & Game Strategy", desc: "Analysis of opponent center defense and extra-man offense rotations.", thumb: "images/galleria-strategia.jpg" },
        { title: "Poolside Coaching Session", desc: "High-intensity technical drills during evening training.", thumb: "images/galleria-bordo-vasca.jpg" },
        { title: "Water Polo Match Dynamics", desc: "Full-match supervision and strategic timeouts.", thumb: "images/allenamento-in-vasca.jpg" }
      ],
      pics: [
        { title: "Pro Recco Poolside Atmosphere", desc: "Elite training environments and historical heritage.", thumb: "images/esperienza-pro-recco.jpg" },
        { title: "Outdoor Olympic Arena", desc: "International tournament match preparation.", thumb: "images/arena-olimpica.jpg" },
        { title: "Indoor High-Performance Setup", desc: "Systematic tactical execution under professional lighting.", thumb: "images/esperienza-indoor.jpg" },
        { title: "Night Training Focus", desc: "Relentless discipline and athletic concentration.", thumb: "images/esperienza-notte.jpg" },
        { title: "Mentorship & Athlete Connection", desc: "Individual communication on deck.", thumb: "images/galleria-mentorship.jpg" }
      ]
    };

    function openMediaModal(type) {
      document.getElementById('mediaModal').style.display = 'flex';
      switchTab(type);
    }

    function closeMediaModal() {
      document.getElementById('mediaModal').style.display = 'none';
    }

    function switchTab(type) {
      const vidBtn = document.getElementById('tabVideoBtn');
      const picsBtn = document.getElementById('tabPicsBtn');
      const title = document.getElementById('modalTitle');
      const grid = document.getElementById('modalGridContent');

      if (type === 'video') {
        vidBtn.className = 'btn btn-primary';
        picsBtn.className = 'btn btn-secondary';
        title.innerText = 'Video Archive & Masterclasses';
      } else {
        picsBtn.className = 'btn btn-primary';
        vidBtn.className = 'btn btn-secondary';
        title.innerText = 'Official Photo Gallery & Moments';
      }

      grid.innerHTML = mediaData[type].map(item => `
        <div style="background: var(--color-midnight-base); border: 1px solid var(--color-midnight-border); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column;">
          <img src="${item.thumb}" alt="${item.title}" style="width: 100%; height: 160px; object-fit: cover;">
          <div style="padding: 1rem; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <h4 style="color: var(--color-white); font-family: var(--font-heading); font-size: 1rem; margin-bottom: 0.3rem;">${item.title}</h4>
              <p style="font-size: 0.8rem; color: var(--color-text-dim);">${item.desc}</p>
            </div>
            <span style="font-size: 0.75rem; color: var(--color-pool-light); margin-top: 0.8rem; font-weight: 600; text-transform: uppercase;">${type === 'video' ? '▶ Play Video Clip' : '🔍 View High-Res'}</span>
          </div>
        </div>
      `).join('');
    }

    // Close modal on background click
    window.onclick = function(event) {
      const modal = document.getElementById('mediaModal');
      if (event.target === modal) {
        closeMediaModal();
      }
    }
