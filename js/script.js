const grid = document.getElementById('videoGrid');
const showMoreBtn = document.getElementById('showMoreBtn');
let visibleCount = 8;
let currentFilter = 'all';

function render(){
  const filtered = videos.filter(v => currentFilter === 'all' || v.game === currentFilter);
  grid.innerHTML = '';
  filtered.slice(0, visibleCount).forEach(v => {
    const card = document.createElement('a');
    card.className = 'video-card reveal';
    card.href = v.url && v.url.trim() !== '' ? v.url : 'https://www.youtube.com/@SephGoesGaming';
    card.target = '_blank';
    card.innerHTML = `
      <div class="thumb">
        <span class="game-badge">${v.badge}</span>
        <span class="duration">${v.dur}</span>
        <span class="dps">${v.dps}</span>
      </div>
      <div class="video-meta">
        <h4>${v.title}</h4>
        <div class="sub"><span>${v.views ? v.views + ' views' : ''}</span><span>${v.time || ''}</span></div>
      </div>
    `;
    grid.appendChild(card);
  });
  showMoreBtn.style.display = visibleCount >= filtered.length ? 'none' : 'block';
  observeReveals();
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    visibleCount = 8;
    render();
  });
});

showMoreBtn.addEventListener('click', () => {
  visibleCount += 8;
  render();
});

/* ---- scroll reveal ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting){
      const el = entry.target;
      setTimeout(() => el.classList.add('visible'), (el.dataset.staggerIndex || 0) * 70);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

function observeReveals(){
  document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
    if (!el.dataset.observed){
      el.dataset.observed = 'true';
      const siblings = el.parentElement ? Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal')) : [];
      el.dataset.staggerIndex = siblings.indexOf(el);
      revealObserver.observe(el);
    }
  });
}

render();

/* ---- hero entrance on load ---- */
document.querySelectorAll('.hero-in').forEach(el => el.classList.add('play'));
