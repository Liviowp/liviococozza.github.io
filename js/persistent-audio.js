(() => {
  // Keep normal browser navigation: the previous page-swapping approach
  // could leave page scripts, menus and interactive sections disconnected.
  if (window.__siteAudioControlsReady) return;
  window.__siteAudioControlsReady = true;

  const player = document.getElementById('persistentAudioPlayer');
  if (!player) return;
  const audio = player.querySelector('audio');
  if (!audio) return;

  const heroButton = document.getElementById('heroMusicToggle');
  const playerButton = player.querySelector('button');
  const label = player.querySelector('#siteAudioLabel');
  const volume = player.querySelector('input[type="range"]');

  function paint() {
    if (heroButton) {
      heroButton.setAttribute('aria-pressed', String(!audio.paused));
      const icon = heroButton.querySelector('.hero-music-icon');
      const text = heroButton.querySelector('.hero-music-label');
      if (icon) icon.textContent = audio.paused ? '▶' : 'Ⅱ';
      if (text) text.textContent = audio.paused ? 'Play background music' : 'Pause background music';
    }
    if (playerButton) playerButton.textContent = audio.paused ? '▶' : 'Ⅱ';
    if (label) label.textContent = audio.paused ? 'PLAY MUSIC' : 'MUSIC ON';
  }

  async function toggleAudio() {
    if (audio.paused) {
      try { await audio.play(); }
      catch (error) {
        if (heroButton) {
          const text = heroButton.querySelector('.hero-music-label');
          if (text) text.textContent = 'Audio unavailable — try again';
        }
        return;
      }
    } else {
      audio.pause();
    }
    paint();
  }

  if (heroButton) heroButton.addEventListener('click', toggleAudio);
  if (playerButton) playerButton.addEventListener('click', toggleAudio);
  if (volume) {
    audio.volume = Number(volume.value);
    volume.addEventListener('input', () => { audio.volume = Number(volume.value); });
  }
  audio.addEventListener('play', paint);
  audio.addEventListener('pause', paint);
  audio.addEventListener('ended', paint);
  paint();
})();