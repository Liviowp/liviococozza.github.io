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
