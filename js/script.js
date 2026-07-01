const grid = document.getElementById('videoGrid');
const showMoreBtn = document.getElementById('showMoreBtn');
const modal = document.getElementById('videoModal');
const modalIframe = document.getElementById('modalIframe');
const modalTitle = document.getElementById('modalTitle');
const modalViews = document.getElementById('modalViews');
const modalTime = document.getElementById('modalTime');
const modalClose = document.getElementById('modalClose');

let visibleCount = 8;
let currentFilter = 'all';

function extractVideoId(url){
  if (!url) return null;
  const patterns = [
    /[?&]v=([\w-]{11})/,
    /youtu\.be\/([\w-]{11})/,
    /shorts\/([\w-]{11})/
  ];
  for (const p of patterns){
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function openModal(v){
  const id = extractVideoId(v.url);
  if (!id) return;
  modalIframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  modalTitle.textContent = v.title;
  modalViews.textContent = v.views ? v.views + ' views' : '';
  modalTime.textContent = v.time || '';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  modal.classList.remove('open');
  modalIframe.src = '';
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function render(){
  const filtered = videos.filter(v => currentFilter === 'all' || v.game === currentFilter);
  grid.innerHTML = '';
  filtered.slice(0, visibleCount).forEach(v => {
    const id = extractVideoId(v.url);
    const card = document.createElement('div');
    card.className = 'video-card reveal';
    card.style.cursor = id ? 'pointer' : 'default';
    card.innerHTML = `
      <div class="thumb">
        ${id ? `<img class="thumb-img" src="https://img.youtube.com/vi/${id}/maxresdefault.jpg" onerror="this.onerror=null;this.src='https://img.youtube.com/vi/${id}/hqdefault.jpg'" alt="${v.title}">` : ''}
        ${id ? `<div class="play-icon">▶</div>` : ''}
        <span class="game-badge">${v.badge}</span>
        <span class="duration">${v.dur}</span>
      </div>
      <div class="video-meta">
        <h4>${v.title}</h4>
        <div class="sub"><span>${v.views ? v.views + ' views' : ''}</span><span>${v.time || ''}</span></div>
      </div>
    `;
    if (id){
      card.addEventListener('click', () => openModal(v));
    } else {
      card.addEventListener('click', () => window.open('https://www.youtube.com/@SephGoesGaming', '_blank'));
    }
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
