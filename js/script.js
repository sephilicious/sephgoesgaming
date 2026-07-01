(function () {
  /* ── DOM refs ── */
  const grid       = document.getElementById('videoGrid');
  const showMoreBtn = document.getElementById('showMoreBtn');
  const modal      = document.getElementById('videoModal');
  const modalIframe = document.getElementById('modalIframe');
  const modalTitle = document.getElementById('modalTitle');
  const modalViews = document.getElementById('modalViews');
  const modalTime  = document.getElementById('modalTime');
  const modalClose = document.getElementById('modalClose');

  let visibleCount  = 8;
  let currentFilter = 'all';

  /* ── helpers ── */
  function extractId(url) {
    if (!url) return null;
    var m =
      url.match(/[?&]v=([\w-]{11})/) ||
      url.match(/youtu\.be\/([\w-]{11})/) ||
      url.match(/shorts\/([\w-]{11})/);
    return m ? m[1] : null;
  }

  /* ── modal ── */
  function openModal(v) {
    var id = extractId(v.url);
    if (!id) return;
    modalIframe.src  = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
    modalTitle.textContent = v.title;
    modalViews.textContent = v.views ? v.views + ' views' : '';
    modalTime.textContent  = v.time  || '';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modalIframe.src = '';
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  /* ── render grid ── */
  function render() {
    var filtered = videos.filter(function (v) {
      return currentFilter === 'all' || v.game === currentFilter;
    });
    grid.innerHTML = '';
    filtered.slice(0, visibleCount).forEach(function (v) {
      var id   = extractId(v.url);
      var card = document.createElement('div');
      card.className   = 'video-card reveal';
      card.style.cursor = 'pointer';

      var thumbInner = '';
      if (id) {
        thumbInner += '<img class="thumb-img" '
          + 'src="https://img.youtube.com/vi/' + id + '/maxresdefault.jpg" '
          + 'onerror="this.onerror=null;this.src=\'https://img.youtube.com/vi/' + id + '/hqdefault.jpg\'" '
          + 'alt="">';
        thumbInner += '<div class="play-icon">&#9654;</div>';
      }
      thumbInner += '<span class="game-badge">' + v.badge + '</span>';
      thumbInner += '<span class="duration">'   + v.dur   + '</span>';

      card.innerHTML =
        '<div class="thumb">' + thumbInner + '</div>'
        + '<div class="video-meta">'
        +   '<h4>' + v.title + '</h4>'
        +   '<div class="sub">'
        +     '<span>' + (v.views ? v.views + ' views' : '') + '</span>'
        +     '<span>' + (v.time  || '')                      + '</span>'
        +   '</div>'
        + '</div>';

      card.addEventListener('click', function () {
        if (id) { openModal(v); }
        else     { window.open('https://www.youtube.com/@SephGoesGaming', '_blank'); }
      });
      grid.appendChild(card);
    });

    showMoreBtn.style.display = visibleCount >= filtered.length ? 'none' : 'block';
    observeReveals();
  }

  /* ── filter buttons ── */
  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      visibleCount  = 8;
      render();
    });
  });

  showMoreBtn.addEventListener('click', function () {
    visibleCount += 8;
    render();
  });

  /* ── scroll reveal ── */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el  = entry.target;
        var idx = parseInt(el.dataset.staggerIndex || 0, 10);
        setTimeout(function () { el.classList.add('visible'); }, idx * 70);
        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  function observeReveals() {
    document.querySelectorAll('.reveal:not(.visible)').forEach(function (el, i) {
      if (!el.dataset.observed) {
        el.dataset.observed    = 'true';
        el.dataset.staggerIndex = i % 4;
        revealObserver.observe(el);
      }
    });
  }

  /* ── circuit canvas ── */
  function initCircuit() {
    var canvas = document.getElementById('heroCircuit');
    if (!canvas) return;
    var ctx    = canvas.getContext('2d');
    var timer;

    function resize() {
      var hero = canvas.parentElement;
      canvas.width  = hero ? hero.offsetWidth  : window.innerWidth;
      canvas.height = hero ? hero.offsetHeight : window.innerHeight;
    }

    function draw() {
      var W = canvas.width, H = canvas.height;
      if (!W || !H) return;
      ctx.clearRect(0, 0, W, H);

      var COLS = 13, ROWS = 8;
      var cW = W / COLS, cH = H / ROWS;
      var stride = COLS + 1;
      var nodes  = [];

      for (var r = 0; r <= ROWS; r++) {
        for (var c = 0; c <= COLS; c++) {
          nodes.push({
            x:      c * cW + (Math.random() - 0.5) * cW * 0.35,
            y:      r * cH + (Math.random() - 0.5) * cH * 0.35,
            active: Math.random() > 0.38
          });
        }
      }

      ctx.lineWidth = 0.7;
      for (var r2 = 0; r2 <= ROWS; r2++) {
        for (var c2 = 0; c2 <= COLS; c2++) {
          var a = nodes[r2 * stride + c2];
          if (!a.active) continue;

          /* horizontal */
          if (c2 < COLS && Math.random() > 0.42) {
            var bh = nodes[r2 * stride + c2 + 1];
            if (bh.active) {
              ctx.strokeStyle = 'rgba(243,195,23,' + (0.07 + Math.random() * 0.17) + ')';
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              if (Math.random() > 0.3) {
                var mx = a.x + (bh.x - a.x) * (0.4 + Math.random() * 0.2);
                ctx.lineTo(mx, a.y); ctx.lineTo(mx, bh.y);
              }
              ctx.lineTo(bh.x, bh.y);
              ctx.stroke();
            }
          }

          /* vertical */
          if (r2 < ROWS && Math.random() > 0.44) {
            var bv = nodes[(r2 + 1) * stride + c2];
            if (bv.active) {
              ctx.strokeStyle = 'rgba(243,195,23,' + (0.06 + Math.random() * 0.14) + ')';
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              if (Math.random() > 0.3) {
                var my = a.y + (bv.y - a.y) * (0.4 + Math.random() * 0.2);
                ctx.lineTo(a.x, my); ctx.lineTo(bv.x, my);
              }
              ctx.lineTo(bv.x, bv.y);
              ctx.stroke();
            }
          }
        }
      }

      /* nodes */
      nodes.forEach(function (n) {
        if (!n.active) return;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(243,195,23,' + (0.2 + Math.random() * 0.4) + ')';
        ctx.fill();
      });

      /* vignette */
      var vig = ctx.createRadialGradient(W/2, H/2, H * 0.15, W/2, H/2, H * 0.82);
      vig.addColorStop(0, 'rgba(11,10,8,0)');
      vig.addColorStop(1, 'rgba(11,10,8,0.85)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);
    }

    function loop() {
      draw();
      timer = setTimeout(loop, 2800 + Math.random() * 1400);
    }

    resize();
    loop();
    window.addEventListener('resize', function () { clearTimeout(timer); resize(); loop(); });
  }

  /* ── init ── */
  render();
  observeReveals();
  document.querySelectorAll('.hero-in').forEach(function (el) { el.classList.add('play'); });
  initCircuit();

})();
