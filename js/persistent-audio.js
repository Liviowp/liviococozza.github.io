(() => {
if (window.__persistentAudioNavigation) return;
window.__persistentAudioNavigation = true;
const player = document.getElementById('persistentAudioPlayer');
if (!player) return;
const audio = player.querySelector('audio');
const toggle = player.querySelector('button');
const label = player.querySelector('#siteAudioLabel');
const volume = player.querySelector('input');
const paint = () => { toggle.textContent = audio.paused ? '▶' : 'Ⅱ'; label.textContent = audio.paused ? 'PLAY MUSIC' : 'MUSIC ON'; };
toggle.addEventListener('click', async () => { if (audio.paused) { try { await audio.play(); } catch(e) { label.textContent = 'PRESS PLAY'; } } else audio.pause(); paint(); });
audio.addEventListener('play', paint); audio.addEventListener('pause', paint); audio.addEventListener('ended', paint);
volume.addEventListener('input', () => audio.volume = Number(volume.value)); audio.volume = Number(volume.value); paint();
const loaded = new Set(Array.from(document.scripts).map(s => s.src).filter(Boolean));
let busy = false;
async function go(href, push) {
 if (busy) return; busy = true;
 try {
  const res = await fetch(href); if (!res.ok) throw new Error('fetch');
  const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
  const nextPlayer = doc.getElementById('persistentAudioPlayer'); if (!nextPlayer) throw new Error('player');
  nextPlayer.remove();
  document.title = doc.title || document.title;
  document.head.querySelectorAll('link[rel="stylesheet"],style').forEach(n => n.remove());
  doc.head.querySelectorAll('link[rel="stylesheet"],style').forEach(n => document.head.appendChild(n.cloneNode(true)));
  const scripts = Array.from(doc.body.querySelectorAll('script')); scripts.forEach(s => s.remove());
  const incomingNodes = Array.from(doc.body.childNodes);
  Array.from(document.body.childNodes).forEach(node => { if (node !== player) node.remove(); });
  incomingNodes.forEach(node => document.body.insertBefore(node, player));
  if (push) history.pushState({}, '', href);
  for (const old of scripts) {
   const src = old.getAttribute('src');
   if (src) {
    const absolute = new URL(src, href).href; if (loaded.has(absolute)) continue;
    await new Promise((resolve, reject) => { const s = document.createElement('script'); s.src = absolute; s.onload = () => { loaded.add(absolute); resolve(); }; s.onerror = reject; document.body.appendChild(s); });
   } else { const s = document.createElement('script'); s.textContent = old.textContent; document.body.appendChild(s); }
  }
  const hash = new URL(href, location.href).hash;
  if (hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()); else scrollTo(0,0);
  paint();
 } catch(e) { location.href = href; } finally { busy = false; }
}
document.addEventListener('click', e => {
 const a = e.target.closest('a[href]'); if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
 const u = new URL(a.href, location.href);
 if (u.origin !== location.origin || !/^https?:$/.test(u.protocol)) return;
 if (u.pathname === location.pathname && u.search === location.search && u.hash) return;
 if (!/\.html?$/.test(u.pathname) && u.pathname !== '/') return;
 e.preventDefault(); go(u.href, true);
});
addEventListener('popstate', () => go(location.href, false));
})();